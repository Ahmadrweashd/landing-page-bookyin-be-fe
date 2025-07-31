import React, { useState } from 'react';
import { Row, Col, Card, Form, Button as BsButton } from 'react-bootstrap';
import { Formik, type FormikHelpers, Form as FormikForm } from 'formik';
import { useMutation } from 'react-query';
import { useAppContext } from '../../context/AppProvider';
import type { Package, PackageService, ServiceInput } from '../../misc/types';
import InputField from '../../components/form/InputField';
import TextAreaField from '../../components/form/TextAreaField';
import { addPackageForm as initialValues } from '../../constants/formValues';
import { addPackageForm as packageValidation } from '../../constants/formValidation';
import { useTranslation } from 'react-i18next';
import { createPackage } from '../../api-client';
import Button from '../../components/form/Button';
import { useNavigate } from 'react-router-dom';
import SelectorField from '../../components/form/SelectorField';

const AddPackage = (): React.JSX.Element => {
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [services, setServices] = useState<ServiceInput[]>([]);
  const [newServiceName, setNewServiceName] = useState<Partial<PackageService>>({});

  const { showToast } = useAppContext();
  const navigateTo = useNavigate();
  const { t: language } = useTranslation('global');

  const handleChangeStep = (action: 'next' | 'previous') => {
    let tempStep = step;

    if (action === 'next') {
      tempStep++;
      if (tempStep > 5) tempStep = 5;
    } else {
      tempStep--;
      if (tempStep < 1) tempStep = 1;
    }

    setStep(tempStep as 1 | 2);
  };

  const mutation = useMutation(createPackage, {
    onSuccess: () => {
      showToast({ message: language('pages.packages.add-success') || 'Package added successfully', type: 'SUCCESS' });
      navigateTo('/dashboard');
    },
    onError: () => {
      showToast({ message: language('pages.packages.add-error') || 'Failed to add package', type: 'ERROR' });
    },
  });

  const handleAddService = () => {
    const { arName = '', heName = '', enName = '' } = newServiceName;
    const trimmedAr = arName.trim();
    const trimmedHe = heName.trim();
    const trimmedEn = enName.trim();

    if (!trimmedAr || !trimmedHe || !trimmedEn) {
      showToast({ message: language('pages.packages.errors.allLanguagesRequired'), type: 'ERROR' });
      return;
    }

    if (services.some(s =>
      s.arName?.toLowerCase() === trimmedAr.toLowerCase() &&
      s.heName?.toLowerCase() === trimmedHe.toLowerCase() &&
      s.enName?.toLowerCase() === trimmedEn.toLowerCase()
    )) {
      showToast({ message: language('pages.packages.errors.duplicateService'), type: 'ERROR' });
      return;
    }

    setServices(prev => [
      ...prev,
      {
        id: Date.now(),
        arName: trimmedAr,
        heName: trimmedHe,
        enName: trimmedEn,
        isSpecial: false,
      }
    ]);
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

  const onSubmit = async (values: Partial<Package>, formik: FormikHelpers<Partial<Package>>) => {
    const payload: Partial<Package> = {
      ...values,
      services: services.map(service => ({
        arName: service.arName,
        heName: service.heName,
        enName: service.enName,
        isSpecial: service.isSpecial
      })),
    };

    await mutation.mutateAsync({ packageObj: payload });

    formik.resetForm();
    setServices([]);
    formik.setSubmitting(false);
  };

  return (
    <main id="add-package">
      <Row className="justify-content-center">
        <Col xs={12} lg={8}>
          <Card>
            <Card.Body>
              <Card.Title className="mb-4 border-bottom text-uppercase text-main">
                {language('pages.packages.addPackage')}
              </Card.Title>

              <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={packageValidation(language)}
              >
                {(formik) => (
                  <FormikForm className="form">
                    {step === 1 && (
                      <Row className="g-3">
                        <Col xs={12} lg={6}>
                          <InputField
                            name="priceMonthly"
                            label={language('pages.packages.form.labels.priceMonthly')}
                            type="number"
                            labelStyle="flex-center-y gap-1"
                          />
                        </Col>
                        <Col xs={12} lg={6}>
                          <InputField
                            name="priceYearly"
                            label={language('pages.packages.form.labels.priceYearly')}
                            type="number"
                            labelStyle="flex-center-y gap-1"
                          />
                        </Col>
                        <Col xs={12} lg={6}>
                          <SelectorField
                            name="type"
                            label={language('pages.packages.form.labels.type')}
                            inputClasses="form-select"
                            options={[
                              { key: language('pages.packages.types.basic'), value: 'basic' },
                              { key: language('pages.packages.types.premium'), value: 'premium' },
                              { key: language('pages.packages.types.golden'), value: 'golden' },
                            ]}
                            labelStyle="flex-center-y gap-1"
                          />
                        </Col>
                        <Col xs={6}>
                          <Form.Check
                            type="checkbox"
                            id="isActive"
                            label={language('pages.packages.form.labels.isActive')}
                            checked={formik.values.isActive}
                            onChange={formik.handleChange}
                            name="isActive"
                          />
                        </Col>
                        <Col xs={6}>
                          <Form.Check
                            type="checkbox"
                            id="isComingSoon"
                            label={language('pages.packages.form.labels.isComingSoon')}
                            checked={formik.values.isComingSoon}
                            onChange={formik.handleChange}
                            name="isComingSoon"
                          />
                        </Col>
                      </Row>
                    )}

                    {step === 2 && (
                      <Row className="g-3">
                        <Col xs={12}>
                          <TextAreaField
                            name="arNote"
                            dir="rtl"
                            label={language('pages.packages.form.labels.arNote')}
                            labelStyle="flex-center-y gap-1"
                          />
                        </Col>
                        <Col xs={12}>
                          <TextAreaField
                            name="arServiceNote"
                            dir="rtl"
                            label={language('pages.packages.form.labels.arServicesNote')}
                            labelStyle="flex-center-y gap-1"
                          />
                        </Col>
                      </Row>
                    )}

                    {step === 3 && (
                      <Row className="g-3">
                        <Col xs={12}>
                          <TextAreaField
                            name="heNote"
                            dir="rtl"
                            label={language('pages.packages.form.labels.heNote')}
                            labelStyle="flex-center-y gap-1"
                          />
                        </Col>
                        <Col xs={12}>
                          <TextAreaField
                            name="heServiceNote"
                            dir="rtl"
                            label={language('pages.packages.form.labels.heServicesNote')}
                            labelStyle="flex-center-y gap-1"
                          />
                        </Col>
                      </Row>
                    )}

                    {step === 4 && (
                      <Row className="g-3">
                        <Col xs={12}>
                          <TextAreaField
                            name="enNote"
                            dir="ltr"
                            label={language('pages.packages.form.labels.enNote')}
                            labelStyle="flex-center-y gap-1"
                          />
                        </Col>
                        <Col xs={12}>
                          <TextAreaField
                            name="enServiceNote"
                            dir="ltr"
                            label={language('pages.packages.form.labels.enServicesNote')}
                            labelStyle="flex-center-y gap-1"
                          />
                        </Col>
                      </Row>
                    )}

                    {step === 5 && (
                      <>
                        <Form.Group className="mb-3" controlId="newServiceName">
                          <Form.Label>{language('pages.packages.form.labels.addService')}</Form.Label>
                          <div className="row g-2 mb-2">
                            <div className="col">
                              <Form.Control
                                type="text"
                                dir="rtl"
                                value={newServiceName.arName || ''}
                                onChange={(e) => setNewServiceName(prev => ({ ...prev, arName: e.target.value }))}
                                placeholder={language('pages.packages.form.placeholders.serviceNameAr')}
                              />
                            </div>
                            <div className="col">
                              <Form.Control
                                type="text"
                                dir="rtl"
                                value={newServiceName.heName || ''}
                                onChange={(e) => setNewServiceName(prev => ({ ...prev, heName: e.target.value }))}
                                placeholder={language('pages.packages.form.placeholders.serviceNameHe')}
                              />
                            </div>
                            <div className="col">
                              <Form.Control
                                type="text"
                                dir="ltr"
                                value={newServiceName.enName || ''}
                                onChange={(e) => setNewServiceName(prev => ({ ...prev, enName: e.target.value }))}
                                placeholder={language('pages.packages.form.placeholders.serviceNameEn')}
                              />
                            </div>
                            <div className="col-auto">
                              <BsButton variant="primary" onClick={handleAddService} disabled={!newServiceName.arName || !newServiceName.heName || !newServiceName.enName}>Add</BsButton>
                            </div>
                          </div>
                        </Form.Group>

                        {services.length === 0 && (
                          <p className="text-muted">{language('pages.packages.no-services')}</p>
                        )}

                        <ul className="list-group">
                          {services.map((service) => (
                            <li key={service.id} className="list-group-item d-flex justify-content-between align-items-center">
                              <div>
                                <Form.Check
                                  type="checkbox"
                                  id={`service-special-${service.id}`}
                                  label={`${service.arName} / ${service.heName} / ${service.enName}`}
                                  checked={service.isSpecial}
                                  onChange={() => toggleSpecial(service.id)}
                                />
                              </div>
                              <BsButton variant="danger" size="sm" onClick={() => deleteService(service.id)}>
                                {language("common.delete")}
                              </BsButton>
                            </li>
                          ))}
                        </ul>
                      </>
                    )}

                    <div className="d-flex justify-content-between mt-4">
                      <div>
                        {step > 1 && (
                          <Button variant="main-outline" className="btn px-4" type="button" onClick={() => handleChangeStep("previous")}>
                            {language('common.previous')}
                          </Button>
                        )}
                      </div>
                      <div>
                        {step < 5 && (
                          <Button variant="main-outline" className="btn px-4" type="button" onClick={() => handleChangeStep("next")}>
                            {language('common.next')}
                          </Button>
                        )}
                        {step === 5 && (
                          <Button
                            variant="main"
                            className="btn"
                            type="submit"
                            disabled={formik.isSubmitting || !formik.dirty || !formik.isValid}
                          >
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
              <h2 className="display-6 fw-bold mb-3">{language('pages.packages.rightPanel.title-create')}</h2>
              <p className="lead mb-0">{language('pages.packages.rightPanel.subtitle-create')}</p>
            </div>
          </div>
        </Col>
      </Row>
    </main>
  );
};

export default AddPackage;