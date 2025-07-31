import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Form, Button as BsButton } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from 'react-query';
import { Formik, Form as FormikForm, type FormikHelpers } from 'formik';
import { useTranslation } from 'react-i18next';
import { useAppContext } from '../../context/AppProvider';
import { getPackageById, updatePackage } from '../../api-client';
import { updatePackageForm as validationSchema } from '../../constants/formValidation';
import InputField from '../../components/form/InputField';
import TextAreaField from '../../components/form/TextAreaField';
import Button from '../../components/form/Button';
import Loading from '../../components/Loading';
import type { Package, PackageService, ServiceInput } from '../../misc/types';

const EditPackage = (): React.JSX.Element => {
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [services, setServices] = useState<Partial<PackageService>[]>([]);
  const [newServiceName, setNewServiceName] = useState<Partial<PackageService>>({});
  const [pkg, setPkg] = useState<Package | null>(null);

  const params = useParams();
  const navigate = useNavigate();
  const { showToast } = useAppContext();
  const { t: language } = useTranslation('global');

  const { data, isLoading } = useQuery(['package', params.id], () => getPackageById(params.id!), {
    enabled: !!params.id,
  });

  const mutation = useMutation(updatePackage, {
    onSuccess: () => {
      showToast({ message: language('pages.packages.messages.edit-success'), type: 'SUCCESS' });
      navigate('/dashboard');
    },
    onError: () => {
      showToast({ message: language('pages.packages.messages.edit-error'), type: 'ERROR' });
    },
  });

  const handleChangeStep = (action: 'next' | 'previous') => {
    setStep((prev) => {
      const next = action === 'next' ? prev + 1 : prev - 1;
      return Math.max(1, Math.min(5, next)) as typeof step;
    });
  };

  const handleAddService = () => {
    const { arName, heName, enName } = newServiceName;
    if (!arName || !heName || !enName) return;

    if (services.some(s => s.arName === arName && s.heName === heName && s.enName === enName)) {
      showToast({ message: 'Service already exists', type: 'ERROR' });
      return;
    }

    setServices(prev => [...prev, { id: Date.now(), ...newServiceName, isSpecial: false }]);
    setNewServiceName({});
  };

  const toggleSpecial = (id: number) => {
    setServices(prev =>
      prev.map(s => (s.id === id ? { ...s, isSpecial: !s.isSpecial } : s))
    );
  };

  const deleteService = (id: number) => {
    setServices(prev => prev.filter(s => s.id !== id));
  };

  const onSubmit = async (values: Package, formik: FormikHelpers<Package>) => {
    const payload: Partial<Package> = {
      ...values,
      services: services.map(service => ({
        arName: service.arName,
        heName: service.heName,
        enName: service.enName,
        isSpecial: service.isSpecial
      })),
    };

    await mutation.mutateAsync({ packageObj: payload, id: params.id! });
    formik.setSubmitting(false);
  };

  useEffect(() => {
    if (data?.package) {
      setPkg(data.package);

      if (Array.isArray(data.package.PackageServices)) {
        setServices(
          data.package.PackageServices.map((service: ServiceInput, i: number) => ({
            id: Date.now() + i,
            arName: service.arName,
            heName: service.heName,
            enName: service.enName,
            isSpecial: service.isSpecial ?? false,
          }))
        );
      }
    }
  }, [data]);

  if (isLoading) return <Loading />;
  if (!pkg) return <></>;

  return (
    <main>
      <Row className='justify-content-center'>
        <Col xs={12} lg={8}>
          <Card>
            <Card.Body>
              <Card.Title className='mb-4 border-bottom text-uppercase text-main'>
                {language('pages.packages.editPackage')}
              </Card.Title>

              <Formik
                initialValues={{ ...pkg }}
                onSubmit={onSubmit}
                enableReinitialize
                validationSchema={validationSchema(language)}
              >
                {(formik) => (
                  <FormikForm>
                    {step === 1 && (
                      <Row className='g-3'>
                        <Col xs={12} lg={6}>
                          <InputField name='priceMonthly' label={language('pages.packages.form.labels.priceMonthly')} type='number' labelStyle='flex-center-y gap-1' />
                        </Col>
                        <Col xs={12} lg={6}>
                          <InputField name='priceYearly' label={language('pages.packages.form.labels.priceYearly')} type='number' labelStyle='flex-center-y gap-1' />
                        </Col>
                        <Col xs={6}>
                          <Form.Check type='checkbox' id='isActive' label={language('pages.packages.form.labels.isActive')} checked={formik.values.isActive} onChange={formik.handleChange} name='isActive' />
                        </Col>
                        <Col xs={6}>
                          <Form.Check type='checkbox' id='isComingSoon' label={language('pages.packages.form.labels.isComingSoon')} checked={formik.values.isComingSoon} onChange={formik.handleChange} name='isComingSoon' />
                        </Col>
                        <Col xs={12} lg={6}>
                          <Form.Select name='type' value={formik.values.type} onChange={formik.handleChange} className='form-select'>
                            <option value='basic'>{language('pages.packages.types.basic')}</option>
                            <option value='premium'>{language('pages.packages.types.premium')}</option>
                            <option value='golden'>{language('pages.packages.types.golden')}</option>
                          </Form.Select>
                        </Col>
                      </Row>
                    )}

                    {step === 2 && (
                      <>
                        <TextAreaField name='arNote' label='Arabic Note' dir='rtl' />
                        <TextAreaField name='arServiceNote' label='Arabic Service Note' dir='rtl' />
                      </>
                    )}

                    {step === 3 && (
                      <>
                        <TextAreaField name='heNote' label='Hebrew Note' dir='rtl' />
                        <TextAreaField name='heServiceNote' label='Hebrew Service Note' dir='rtl' />
                      </>
                    )}

                    {step === 4 && (
                      <>
                        <TextAreaField name='enNote' label='English Note' dir='ltr' />
                        <TextAreaField name='enServiceNote' label='English Service Note' dir='ltr' />
                      </>
                    )}

                    {step === 5 && (
                      <>
                        <Form.Group className='mb-3' controlId='newServiceName'>
                          <Form.Label>{language('pages.packages.form.labels.addService')}</Form.Label>
                          <div className='row g-2 mb-2'>
                            <div className='col'>
                              <Form.Control type='text' dir='rtl' value={newServiceName.arName || ''} onChange={(e) => setNewServiceName(prev => ({ ...prev, arName: e.target.value }))} placeholder={language('pages.packages.form.placeholders.serviceNameAr')} />
                            </div>
                            <div className='col'>
                              <Form.Control type='text' dir='rtl' value={newServiceName.heName || ''} onChange={(e) => setNewServiceName(prev => ({ ...prev, heName: e.target.value }))} placeholder={language('pages.packages.form.placeholders.serviceNameHe')} />
                            </div>
                            <div className='col'>
                              <Form.Control type='text' dir='ltr' value={newServiceName.enName || ''} onChange={(e) => setNewServiceName(prev => ({ ...prev, enName: e.target.value }))} placeholder={language('pages.packages.form.placeholders.serviceNameEn')} />
                            </div>
                            <div className='col-auto'>
                              <BsButton variant='primary' onClick={handleAddService} disabled={!newServiceName.arName || !newServiceName.heName || !newServiceName.enName}>Add</BsButton>
                            </div>
                          </div>
                        </Form.Group>

                        <ul className='list-group'>
                          {services.map((service) => (
                            <li key={service.id} className='list-group-item d-flex justify-content-between align-items-center'>
                              <div>
                                <Form.Check type='checkbox' id={`service-special-${service.id}`} label={`${service.arName} / ${service.heName} / ${service.enName}`} checked={service.isSpecial} onChange={() => toggleSpecial(service.id!)} />
                              </div>
                              <BsButton variant='danger' size='sm' onClick={() => deleteService(service.id!)}>
                                {language('common.delete')}
                              </BsButton>
                            </li>
                          ))}
                        </ul>
                      </>
                    )}

                    <div className='d-flex justify-content-between mt-4'>
                      <div>
                        {step > 1 && (
                          <Button variant='main-outline' className='btn px-4' type='button' onClick={() => handleChangeStep('previous')}>
                            {language('common.previous')}
                          </Button>
                        )}
                      </div>
                      <div>
                        {step < 5 && (
                          <Button variant='main-outline' className='btn px-4' type='button' onClick={() => handleChangeStep('next')}>
                            {language('common.next')}
                          </Button>
                        )}
                        {step === 5 && (
                          <Button variant='main' className='btn' type='submit' disabled={formik.isSubmitting || !formik.isValid}>
                            {language('pages.packages.form.buttons.submit')}
                          </Button>
                        )}
                      </div>
                    </div>
                  </FormikForm>
                )}
              </Formik>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4} className="p-0 d-none d-lg-block">
          <div className="gradient-banner h-100 w-100 p-4 flex-center rounded-end text-center text-white">
            <div className="fade-in">
              <h2 className="display-6 fw-bold mb-3">{language('pages.packages.rightPanel.title-edit')}</h2>
              <p className="lead mb-0">{language('pages.packages.rightPanel.subtitle-edit')}</p>
            </div>
          </div>
        </Col>
      </Row>
    </main>
  );
};

export default EditPackage;
