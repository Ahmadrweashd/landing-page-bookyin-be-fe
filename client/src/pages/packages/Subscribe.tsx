import React from 'react';
import type { Request } from '../../misc/types';
import { useAppContext } from '../../context/AppProvider';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { createRequest } from '../../api-client';
import { useMutation } from 'react-query';
import { Form as FormikForm, Formik, type FormikHelpers } from 'formik';
import { Card, Col, Row } from 'react-bootstrap';
import InputField from '../../components/form/InputField';
import Button from '../../components/form/Button';
import { addRequestForm as initialValues } from '../../constants/formValues';
import { addRequestValidation as validationSchema } from '../../constants/formValidation';

const Subscribe = (): React.JSX.Element => {
  const params = useParams()

  const { showToast } = useAppContext();
  const navigateTo = useNavigate();
  const { t: language } = useTranslation('global');

  const mutation = useMutation(createRequest, {
    onSuccess: () => {
      showToast({ message: language('pages.requests.messages.add-success'), type: 'SUCCESS' });
      navigateTo('/');
    },
    onError: () => {
      showToast({ message: language('pages.requests.messages.add-error'), type: 'ERROR' });
    },
  });

  const onSubmit = async (
    values: Partial<Request>,
    formik: FormikHelpers<Partial<Request>>
  ) => {
    values.packageId = Number(params.packageId)

    await mutation.mutateAsync({ request: values });
    formik.resetForm();
    formik.setSubmitting(false);
  };

  return (
    <main id="add-request" className='min-h-100vh'>
      <Row className="justify-content-center">
        <Col xs={12} lg={8}>
          <Card>
            <Card.Body>
              <Card.Title className="mb-4 border-bottom text-uppercase text-main">
                {language('pages.requests.addRequest')}
              </Card.Title>

              <p className="text-muted">
                {language('pages.requests.welcomeMessage')}
              </p>

              <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={validationSchema(language)}
              >
                {(formik) => (
                  <FormikForm className="form">
                    <Row className="g-2">
                      <Col lg={6}>
                        <InputField
                          name="name"
                          label={language('pages.requests.form.labels.name')}
                          type="text"
                        />
                      </Col>
                      <Col lg={6}>
                        <InputField
                          name="businessName"
                          label={language('pages.requests.form.labels.businessName')}
                          type="text"
                        />
                      </Col>
                      <Col lg={6}>
                        <InputField
                          name="phone"
                          label={language('pages.requests.form.labels.phone')}
                          type="text"
                        />
                      </Col>
                    </Row>

                    <div className="d-flex justify-content-end mt-4">
                      <Button
                        variant="main"
                        className="btn"
                        type="submit"
                        disabled={formik.isSubmitting || !formik.dirty || !formik.isValid}
                      >
                        {language('pages.requests.form.buttons.submit')}
                      </Button>
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
              <h2 className="display-6 fw-bold mb-3">
                {language('pages.requests.rightPanel.title-create')}
              </h2>
              <p className="lead mb-0">
                {language('pages.requests.rightPanel.subtitle-create')}
              </p>
            </div>
          </div>
        </Col>
      </Row>
    </main>
  );
};

export default Subscribe;
