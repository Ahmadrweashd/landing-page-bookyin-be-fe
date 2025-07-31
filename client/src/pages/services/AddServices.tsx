import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Button as BsButton } from 'react-bootstrap';
import { Formik, Form as FormikForm, type FormikHelpers } from 'formik';
import { useMutation } from 'react-query';
import { useAppContext } from '../../context/AppProvider';
import { useTranslation } from 'react-i18next';
import InputField from '../../components/form/InputField';
import Button from '../../components/form/Button';
import { createService } from '../../api-client';
import { useNavigate } from 'react-router-dom';
import { addServiceForm as initialValues } from '../../constants/formValues';
import { addServiceForm as validationSchema } from '../../constants/formValidation';
import type { Service } from '../../misc/types';
import TextAreaField from '../../components/form/TextAreaField';
import { SERVICE_ICONS } from '../../constants/global';

const AddService = (): React.JSX.Element => {
  const [step, setStep] = useState(1);
  const [search, setSearch] = useState('');
  const [icons, setIcons] = useState<string[]>(SERVICE_ICONS);

  const { showToast } = useAppContext();
  const navigateTo = useNavigate();
  const { t: language } = useTranslation('global');

  const mutation = useMutation(createService, {
    onSuccess: () => {
      showToast({ message: language('pages.services.add-success'), type: 'SUCCESS' });
      navigateTo('/dashboard');
    },
    onError: () => {
      showToast({ message: language('pages.services.add-error'), type: 'ERROR' });
    },
  });

  useEffect(() => {
    if (!search) {
      setIcons(SERVICE_ICONS);
    } else {
      const filtered = SERVICE_ICONS.filter((icon) =>
        icon.toLowerCase().includes(search.toLowerCase())
      );
      setIcons(filtered);
    }
  }, [search]);

  const handleChangeStep = (action: 'next' | 'previous') => {
    let tempStep = step;

    if (action === 'next') {
      tempStep = Math.min(4, tempStep + 1);
    } else {
      tempStep = Math.max(1, tempStep - 1);
    }

    setStep(tempStep as 1 | 2 | 3 | 4);
  };

  const onSubmit = async (values: Partial<Service>, formikHelpers: FormikHelpers<Partial<Service>>) => {
    await mutation.mutateAsync({ service: values });
    formikHelpers.resetForm();
    formikHelpers.setSubmitting(false);
  };

  return (
    <main id='add-service'>
      <Row className="justify-content-center">
        <Col lg={8}>
          <Card>
            <Card.Body>
              <Card.Title className="mb-4 border-bottom text-uppercase text-main">
                {language('pages.services.add-service')}
              </Card.Title>

              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema(language)}
                onSubmit={onSubmit}
              >
                {(formik) => (
                  <FormikForm>
                    {step === 1 && (
                      <>
                        <InputField
                          type="text"
                          name="enTitle"
                          label={language('pages.services.form.labels.enTitle')}
                          dir="ltr"
                        />
                        <TextAreaField
                          name="enDescription"
                          label={language('pages.services.form.labels.enDescription')}
                          dir="ltr"
                        />
                      </>
                    )}

                    {step === 2 && (
                      <>
                        <InputField
                          type="text"
                          name="arTitle"
                          label={language('pages.services.form.labels.arTitle')}
                          dir="rtl"
                        />
                        <TextAreaField
                          name="arDescription"
                          label={language('pages.services.form.labels.arDescription')}
                          dir="rtl"
                        />
                      </>
                    )}

                    {step === 3 && (
                      <>
                        <InputField
                          type="text"
                          name="heTitle"
                          label={language('pages.services.form.labels.heTitle')}
                          dir="rtl"
                        />
                        <TextAreaField
                          name="heDescription"
                          label={language('pages.services.form.labels.heDescription')}
                          dir="rtl"
                        />
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
                          {icons.filter((iconClass) =>
                            iconClass.toLowerCase().includes(search.toLowerCase())
                          ).map((iconClass) => (
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
                          <Button
                            type="button"
                            variant="main-outline"
                            className="btn"
                            onClick={() => handleChangeStep('previous')}
                          >
                            {language('common.previous')}
                          </Button>
                        )}
                      </div>

                      <div>
                        {step < 4 && (
                          <Button
                            type="button"
                            variant="main-outline"
                            className="btn"
                            onClick={() => handleChangeStep('next')}
                          >
                            {language('common.next')}
                          </Button>
                        )}
                        {step === 4 && (
                          <Button
                            type="submit"
                            variant="main"
                            className="btn"
                            disabled={formik.isSubmitting || !formik.isValid || !formik.dirty}
                          >
                            {language('pages.services.actions.submit')}
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
              <h2 className="display-6 fw-bold mb-3">{language('pages.services.rightPanel.title-create')}</h2>
              <p className="lead mb-0">{language('pages.services.rightPanel.subtitle-create')}</p>
            </div>
          </div>
        </Col>
      </Row>
    </main>
  );
};

export default AddService;
