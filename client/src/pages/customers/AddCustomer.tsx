import React, { useState } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { Formik, type FormikHelpers, Form as FormikForm } from 'formik';
import { useMutation } from 'react-query';
import { useAppContext } from '../../context/AppProvider';
import type { Customer, ServiceAction } from '../../misc/types';
import InputField from '../../components/form/InputField';
import FileInputField from '../../components/form/FileInputField';
import TextAreaField from '../../components/form/TextAreaField';
import { addCustomerForm as initialValues } from '../../constants/formValues';
import { addCustomerForm as customerValidation } from '../../constants/formValidation';
import { useTranslation } from 'react-i18next';
import { createCustomer } from '../../api-client';
import { FaUser, FaBuilding, FaImage, FaMapMarkerAlt, FaGlobe, FaStar, FaMobile } from 'react-icons/fa';
import Button from '../../components/form/Button';
import { useNavigate } from 'react-router-dom';
import ServicesSection from '../../components/customers/ServicesSsections';

const AddCustomer = (): React.JSX.Element => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedServices, setSelectedServices] = useState<ServiceAction[]>([]);

  const { showToast } = useAppContext();
  const navigateTo = useNavigate();
  const { t: language } = useTranslation('global');

  const handleChangeStep = (action: 'next' | 'previous') => {
    let tempStep = step;

    if (action === 'next') {
      tempStep++
      if (tempStep > 3) tempStep = 3;
    } else {
      tempStep--
      if (tempStep < 1) tempStep = 1;
    }

    setStep(tempStep as 1 | 2 | 3);
  };

  const mutation = useMutation(createCustomer, {
    onSuccess: () => {
      showToast({ message: language('pages.customers.messages.add-success'), type: 'SUCCESS' });
      navigateTo('/dashboard');
    },
    onError: () => {
      showToast({ message: language('pages.customers.messages.add-error'), type: 'ERROR' });
    },
  });

  const onSubmit = async (
    values: Partial<Customer>,
    formik: FormikHelpers<Partial<Customer>>
  ) => {
    const formData = new FormData();

    formData.append('name', values.name || '');
    formData.append('businessName', values.businessName || '');
    if (values.backgroundImageURL) formData.append('backgroundImageURL', values.backgroundImageURL);
    if (values.profileURL) formData.append('profileURL', values.profileURL);
    if (values.location) formData.append('location', values.location);
    if (values.website) formData.append('website', values.website);
    if (values.evaluation) formData.append('evaluation', values.evaluation);
    if (values.phone) formData.append('phone', values.phone);
    formData.append('isSpecial', values.isSpecial ? '1' : '0');

    const dedupedServicesMap = new Map<string, typeof selectedServices[number]>();
    selectedServices.forEach((service) => {
      dedupedServicesMap.set(service.name, service);
    });
    const dedupedServices = Array.from(dedupedServicesMap.values());

    if (dedupedServices.length > 0) {
      formData.append('services', JSON.stringify(dedupedServices));
    }

    await mutation.mutateAsync({ formData });

    formik.resetForm();
    formik.setSubmitting(false);
  };

  return (
    <main id="add-customer">
      <Row className="justify-content-center">
        <Col xs={12} lg={8}>
          <Card>
            <Card.Body>
              <Card.Title className="mb-4 border-bottom text-uppercase text-main">
                {language('pages.customers.addCustomer')}
              </Card.Title>

              <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={customerValidation(language)}
              >
                {(formik) => (
                  <FormikForm className="form">
                    {step === 1 && (
                      <>
                        <Row className='g-1'>
                          <Col lg={6} xs={12}>
                            <InputField name="name" label={language('pages.customers.form.labels.name')} Icon={<FaUser />} labelStyle="flex-center-y gap-1" type="text" />
                          </Col>
                          <Col lg={6} xs={12}>
                            <InputField name="businessName" label={language('pages.customers.form.labels.businessName')} Icon={<FaBuilding />} labelStyle="flex-center-y gap-1" type="text" />
                          </Col>
                          <Col lg={6} xs={12}>
                            <FileInputField name="backgroundImageURL" label={language('pages.customers.form.labels.backgroundImage')} accept="image/*" Icon={<FaImage />} labelStyle="flex-center-y gap-1" />
                          </Col>
                          <Col lg={6} xs={12}>
                            <FileInputField name="profileURL" label={language('pages.customers.form.labels.profileImage')} accept="image/*" Icon={<FaImage />} labelStyle="flex-center-y gap-1" />
                          </Col>
                          <Col xs={12}>
                            <TextAreaField name="evaluation" label={language('pages.customers.form.labels.evaluation')} Icon={<FaStar />} labelStyle="flex-center-y gap-1" />
                          </Col>
                          <Col lg={6} xs={12}>
                            <div className="form-check my-3">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                name="isSpecial"
                                id="isSpecial"
                                checked={formik.values.isSpecial}
                                onChange={formik.handleChange}
                              />
                              <label className="form-check-label" htmlFor="isSpecial">
                                {language('pages.customers.form.labels.isSpecial')}
                              </label>
                            </div>
                          </Col>
                        </Row>
                      </>
                    )}

                    {step === 2 && (
                      <>
                        <Row className='g-1'>
                          <Col lg={6} xs={12}>
                            <InputField name="location" label={language('pages.customers.form.labels.location')} Icon={<FaMapMarkerAlt />} labelStyle="flex-center-y gap-1" type="text" />
                          </Col>
                          <Col lg={6} xs={12}>
                            <InputField name="website" label={language('pages.customers.form.labels.website')} Icon={<FaGlobe />} labelStyle="flex-center-y gap-1" type="text" />
                          </Col>
                          <Col lg={6} xs={12}>
                            <InputField name="phone" inputMode="numeric" label={language('pages.customers.form.labels.phone')} Icon={<FaMobile />} labelStyle="flex-center-y gap-1" type="text" />
                          </Col>
                        </Row>
                      </>
                    )}

                    {step === 3 && (
                      <ServicesSection
                        selectedServices={selectedServices}
                        setSelectedServices={setSelectedServices}
                      />
                    )}

                    <div className="d-flex justify-content-between mt-4">
                      <div>
                        {step > 1 && (
                          <Button
                            variant="main-outline"
                            className="btn px-4"
                            type="button"
                            onClick={() => handleChangeStep("previous")}
                          >
                            {language('common.previous')}
                          </Button>
                        )}
                      </div>

                      <div>
                        {step < 3 && (
                          <Button
                            variant="main-outline"
                            className="btn px-4"
                            type="button"
                            onClick={() => handleChangeStep("next")}
                          >
                            {language('common.next')}
                          </Button>
                        )}

                        {step === 3 && (
                          <Button
                            variant="main"
                            className="btn"
                            type="submit"
                            disabled={formik.isSubmitting || !formik.dirty || !formik.isValid}
                          >
                            {language('pages.customers.form.buttons.submit')}
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
              <h2 className="display-6 fw-bold mb-3">{language('pages.customers.rightPanel.title-create')}</h2>
              <p className="lead mb-0">{language('pages.customers.rightPanel.subtitle-create')}</p>
            </div>
          </div>
        </Col>
      </Row>
    </main>
  );
};

export default AddCustomer;
