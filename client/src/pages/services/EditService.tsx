import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Row, Col, Card, Button as BsButton } from 'react-bootstrap';
import { Formik, Form as FormikForm, type FormikHelpers } from 'formik';
import { useMutation, useQuery } from 'react-query';
import { useAppContext } from '../../context/AppProvider';
import { useTranslation } from 'react-i18next';
import InputField from '../../components/form/InputField';
import TextAreaField from '../../components/form/TextAreaField';
import Button from '../../components/form/Button';
import { getServiceById, updateService } from '../../api-client';
import { SERVICE_ICONS } from '../../constants/global';
import { editServiceForm } from '../../constants/formValidation';
import type { Service } from '../../misc/types';
import Loading from '../../components/Loading';

const EditService = (): React.JSX.Element => {
  const { id } = useParams();
  const [step, setStep] = useState(1);
  const [search, setSearch] = useState('');
  const [icons, setIcons] = useState<string[]>(SERVICE_ICONS);

  const { showToast } = useAppContext();
  const navigateTo = useNavigate();
  const { t: language } = useTranslation('global');

  const { data: serviceData, isLoading } = useQuery(['service', id], () => getServiceById(Number(id)));

  const mutation = useMutation(updateService, {
    onSuccess: () => {
      showToast({ message: language('pages.services.edit-success'), type: 'SUCCESS' });
      navigateTo('/dashboard');
    },
    onError: () => {
      showToast({ message: language('pages.services.edit-error'), type: 'ERROR' });
    },
  });

  useEffect(() => {
    if (!search) {
      setIcons(SERVICE_ICONS);
    } else {
      setIcons(SERVICE_ICONS.filter(icon => icon.toLowerCase().includes(search.toLowerCase())));
    }
  }, [search]);

  const handleChangeStep = (action: 'next' | 'previous') => {
    setStep(prev => {
      const next = action === 'next' ? prev + 1 : prev - 1;
      return Math.min(4, Math.max(1, next)) as 1 | 2 | 3 | 4;
    });
  };

  const onSubmit = async (
    values: Partial<Service>,
    formikHelpers: FormikHelpers<Partial<Service>>
  ) => {
    try {
      await mutation.mutateAsync({ id: Number(id), service: values });
      formikHelpers.resetForm({ values });
    } finally {
      formikHelpers.setSubmitting(false);
    }
  };


  if (isLoading) return <Loading />;
  if (!serviceData || !serviceData.service) return <></>;

  return (
    <main>
      <Row className="justify-content-center">
        <Col lg={8}>
          <Card>
            <Card.Body>
              <Card.Title className="mb-4 border-bottom text-uppercase text-main">
                {language('pages.services.edit-service')}
              </Card.Title>

              <Formik
                initialValues={serviceData.service}
                validationSchema={editServiceForm(language)}
                onSubmit={onSubmit}
                enableReinitialize
              >
                {(formik) => (
                  <FormikForm>
                    {step === 1 && (
                      <>
                        <InputField type="text" name="enTitle" label={language('pages.services.form.labels.enTitle')} dir="ltr" />
                        <TextAreaField name="enDescription" label={language('pages.services.form.labels.enDescription')} dir="ltr" />
                      </>
                    )}
                    {step === 2 && (
                      <>
                        <InputField type="text" name="arTitle" label={language('pages.services.form.labels.arTitle')} dir="rtl" />
                        <TextAreaField name="arDescription" label={language('pages.services.form.labels.arDescription')} dir="rtl" />
                      </>
                    )}
                    {step === 3 && (
                      <>
                        <InputField type="text" name="heTitle" label={language('pages.services.form.labels.heTitle')} dir="rtl" />
                        <TextAreaField name="heDescription" label={language('pages.services.form.labels.heDescription')} dir="rtl" />
                      </>
                    )}
                    {step === 4 && (
                      <>
                        <InputField type="text" inputMode='numeric' name="order" label={language('pages.services.form.labels.order')} dir="ltr" />
                        <input
                          type="text"
                          placeholder={language('pages.services.form.labels.iconSearch')}
                          onChange={(e) => setSearch(e.target.value)}
                          className="form-control mt-2"
                          dir="ltr"
                        />
                        <InputField
                          type="text"
                          name="icon"
                          label={language('pages.services.form.labels.selectedIcon')}
                          disabled
                          dir="ltr"
                        />
                        <div className="icons-window mt-3 d-flex flex-wrap gap-2 overflow-y-auto">
                          {icons.map((iconClass) => (
                            <BsButton
                              key={iconClass}
                              variant={formik.values.icon === iconClass ? 'primary' : 'outline-secondary'}
                              onClick={() => formik.setFieldValue('icon', iconClass)}
                              className="flex-center"
                            >
                              <i className={`${iconClass} fs-4`}></i>
                            </BsButton>
                          ))}
                        </div>
                      </>
                    )}
                    <div className="d-flex justify-content-between mt-4">
                      <div>
                        {step > 1 && (
                          <Button type="button" variant="main-outline" className='btn' onClick={() => handleChangeStep('previous')}>
                            {language('common.previous')}
                          </Button>
                        )}
                      </div>
                      <div>
                        {step < 4 && (
                          <Button type="button" variant="main-outline" className='btn' onClick={() => handleChangeStep('next')}>
                            {language('common.next')}
                          </Button>
                        )}
                        {step === 4 && (
                          <Button type="submit" className='btn' variant="main" disabled={formik.isSubmitting}>
                            {language('pages.services.actions.update')}
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
              <h2 className="display-6 fw-bold mb-3">{language('pages.services.rightPanel.title-edit')}</h2>
              <p className="lead mb-0">{language('pages.services.rightPanel.subtitle-edit')}</p>
            </div>
          </div>
        </Col>
      </Row>
    </main>
  );
};

export default EditService;
