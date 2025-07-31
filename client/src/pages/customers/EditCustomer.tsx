import React, { useEffect, useState } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { Formik, type FormikHelpers, Form as FormikForm } from 'formik';
import { useMutation, useQuery } from 'react-query';
import { useAppContext } from '../../context/AppProvider';
import type { Customer, CustomersServices, ServiceAction } from '../../misc/types';
import InputField from '../../components/form/InputField';
import FileInputField from '../../components/form/FileInputField';
import TextAreaField from '../../components/form/TextAreaField';
import { useTranslation } from 'react-i18next';
import { updateCustomer, getCustomerById } from '../../api-client';
import Button from '../../components/form/Button';
import {
  FaUser, FaBuilding, FaImage, FaMapMarkerAlt, FaGlobe,
  FaStar,
  FaMobile
} from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import { editCustomerForm as customerValidation } from '../../constants/formValidation';
import Loading from '../../components/Loading';
import ServicesSection from '../../components/customers/ServicesSsections';

const EditCustomer = (): React.JSX.Element => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedServices, setSelectedServices] = useState<ServiceAction[]>([]);
  const [customer, setCustomer] = useState<Customer | null>(null);

  const params = useParams();
  const { showToast } = useAppContext();
  const navigate = useNavigate();
  const { t: language } = useTranslation("global");

  const { data, isLoading } = useQuery(['customer', params.id], () => getCustomerById(params.id!), {
    enabled: !!params.id,
  });

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

  const mutation = useMutation(updateCustomer, {
    onSuccess: () => {
      showToast({ message: language('pages.customers.messages.edit-success'), type: 'SUCCESS' });
      navigate("/dashboard");
    },
    onError: () => {
      showToast({ message: language('pages.customers.messages.edit-error'), type: 'ERROR' });
    },
  });

  const onSubmit = async (
    values: Customer,
    formik: FormikHelpers<Customer>
  ) => {
    const formData = new FormData();

    const appendIfChanged = <K extends keyof Customer>(
      key: K,
      transform: (val: string) => string = (val) => val
    ): void => {
      if (values[key] !== customer?.[key]) {
        const value = values[key];
        if (value !== undefined && value !== null && value !== '') {
          formData.append(key, transform(value as string));
        }
      }
    };

    appendIfChanged('name');
    appendIfChanged('businessName');
    appendIfChanged('backgroundImageURL');
    appendIfChanged('profileURL');
    appendIfChanged('location');
    appendIfChanged('website');
    appendIfChanged('phone');
    appendIfChanged('evaluation');
    appendIfChanged('isSpecial', val => val ? '1' : '0');

    const dedupedServicesMap = new Map<string, typeof selectedServices[number]>();
    selectedServices.forEach((service) => {
      dedupedServicesMap.set(service.name, service);
    });
    const dedupedServices = Array.from(dedupedServicesMap.values());

    if (dedupedServices.length > 0) {
      formData.append('services', JSON.stringify(dedupedServices));
    }

    await mutation.mutateAsync({ formData, id: params.id || -1 });
    formik.setSubmitting(false);
  };

  useEffect(() => {
    if (data?.customer) {
      setCustomer(data.customer);

      if (Array.isArray(data.customer.CustomerServices)) {
        const servicesWithAction: ServiceAction[] = data.customer.CustomerServices.map((service: CustomersServices) => ({
          name: service.name,
          action: 'add' as const,
        }));
        setSelectedServices(servicesWithAction);
      } else {
        setSelectedServices([]);
      }
    }
  }, [data]);

  if (isLoading) return <Loading />;

  if (!customer) return <></>;

  return (
    <main id='edit-customer'>
      <Row className="justify-content-center">
        <Col xs={12} lg={8}>
          <Card>
            <Card.Body>
              <Card.Title className="mb-4 border-bottom text-uppercase text-main">
                {language('pages.customers.editCustomer')}
              </Card.Title>

              <Formik
                initialValues={{ ...customer }}
                onSubmit={onSubmit}
                enableReinitialize
                validationSchema={customerValidation(language)}
              >
                {(formik) => (
                  <FormikForm className="form">
                    {step === 1 && (
                      <Row className='g-1'>
                        <Col lg={6}>
                          <InputField
                            type='text'
                            name="name"
                            label={language('pages.customers.form.labels.name')}
                            Icon={<FaUser />}
                            labelStyle="flex-center-y gap-1"
                          />
                        </Col>
                        <Col lg={6}>
                          <InputField
                            type='text'
                            name="businessName"
                            label={language('pages.customers.form.labels.businessName')}
                            Icon={<FaBuilding />}
                            labelStyle="flex-center-y gap-1"
                          />
                        </Col>
                        <Col lg={6}>
                          <FileInputField
                            name="backgroundImageURL"
                            label={language('pages.customers.form.labels.backgroundImage')}
                            accept="image/*"
                            Icon={<FaImage />}
                            labelStyle="flex-center-y gap-1"
                          />
                        </Col>
                        <Col lg={6}>
                          <FileInputField
                            name="profileURL"
                            label={language('pages.customers.form.labels.profileImage')}
                            accept="image/*"
                            Icon={<FaImage />}
                            labelStyle="flex-center-y gap-1"
                          />
                        </Col>
                        <Col xs={12}>
                          <TextAreaField
                            name="evaluation"
                            label={language('pages.customers.form.labels.evaluation')}
                            Icon={<FaStar />}
                            labelStyle="flex-center-y gap-1"
                          />
                        </Col>
                        <Col lg={6}>
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
                    )}

                    {step === 2 && (
                      <Row className='g-1'>
                        <Col lg={6}>
                          <InputField
                            type='text'
                            name="location"
                            label={language('pages.customers.form.labels.location')}
                            Icon={<FaMapMarkerAlt />}
                            labelStyle="flex-center-y gap-1"
                          />
                        </Col>
                        <Col lg={6}>
                          <InputField
                            type='text'
                            name="website"
                            label={language('pages.customers.form.labels.website')}
                            Icon={<FaGlobe />}
                            labelStyle="flex-center-y gap-1"
                          />
                        </Col>
                        <Col lg={6} xs={12}>
                          <InputField name="phone" inputMode="numeric" label={language('pages.customers.form.labels.phone')} Icon={<FaMobile />} labelStyle="flex-center-y gap-1" type="text" />
                        </Col>
                      </Row>
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
                            disabled={formik.isSubmitting || !formik.isValid}
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
              <h2 className="display-6 fw-bold mb-3">{language('pages.customers.rightPanel.title-edit')}</h2>
              <p className="lead mb-0">{language('pages.customers.rightPanel.subtitle-edit')}</p>
            </div>
          </div>
        </Col>
      </Row>
    </main>
  );
};

export default EditCustomer;
