import React from "react";
import { Formik, Form as FForm, type FormikHelpers } from "formik";
import { Card, Col, Row } from "react-bootstrap";
import { FaLock, FaInstagram, FaYoutube, FaMapMarkerAlt, FaMobile, FaBoxOpen, FaUsers } from "react-icons/fa";
import { FiSmartphone } from "react-icons/fi";
import { SiWhatsapp, SiTiktok } from "react-icons/si";
import { MdEmail } from "react-icons/md";
import InputField from "../components/form/InputField";
import Button from "../components/form/Button";
import { useTranslation } from "react-i18next";
import type { EditPasswordForm, EditPhoneForm, EditGlobalSettingsForm } from "../misc/types";
import {
  editPasswordForm as initialValuesEditPassword,
  editPhoneForm as initialValuesEditPhone,
} from "../constants/formValues";
import {
  editGlobalSettingsForm as editGlobalSettingsValidation,
  editPasswordForm as editPasswordValidation,
  editPhoneForm as editPhoneValidation,
} from "../constants/formValidation";
import { getGlobalSettings, updateGlobalSettings, updatePassword, updatePhone } from "../api-client";
import { useAppContext } from "../context/AppProvider";
import { useMutation, useQuery, useQueryClient } from "react-query";
import LoadingBox from "../components/LoadingBox";
import TextAreaField from "../components/form/TextAreaField";

const EditAccountSettings = (): React.JSX.Element => {
  const { t: language } = useTranslation("global");
  const { showToast } = useAppContext()

  const { data, isLoading } = useQuery(['settings'], () => getGlobalSettings());
  const queryClient = useQueryClient()

  const passwordMutation = useMutation(updatePassword, {
    onSuccess: () => {
      queryClient.invalidateQueries(['settings']);
      showToast({
        message: language("pages.settings.messages.password-success"),
        type: "SUCCESS",
      });
    },
    onError: () => {
      showToast({
        message: language("pages.settings.messages.password-error"),
        type: "ERROR",
      });
    },
  });

  const phoneMutation = useMutation(updatePhone, {
    onSuccess: () => {
      queryClient.invalidateQueries(['settings']);
      showToast({
        message: language("pages.settings.messages.phone-success"),
        type: "SUCCESS",
      });
    },
    onError: () => {
      showToast({
        message: language("pages.settings.messages.phone-error"),
        type: "ERROR",
      });
    },
  });

  const settingsMutation = useMutation(updateGlobalSettings, {
    onSuccess: () => {
      queryClient.invalidateQueries(['settings']);
      showToast({
        message: language("pages.settings.messages.settings-success"),
        type: "SUCCESS",
      });
    },
    onError: () => {
      showToast({
        message: language("pages.settings.messages.settings-error"),
        type: "ERROR",
      });
    },
  });

  const handlePasswordSubmit = async (
    values: EditPasswordForm,
    helpers: FormikHelpers<EditPasswordForm>
  ) => {
    await passwordMutation.mutateAsync({ formData: values });
    helpers.setSubmitting(false);
    helpers.resetForm();
  };

  const handlePhoneSubmit = async (
    values: EditPhoneForm,
    helpers: FormikHelpers<EditPhoneForm>
  ) => {
    await phoneMutation.mutateAsync({ formData: values });
    helpers.setSubmitting(false);
    helpers.resetForm();
  };

  const handleSettingsSubmit = async (
    values: EditGlobalSettingsForm,
    helpers: FormikHelpers<EditGlobalSettingsForm>
  ) => {
    await settingsMutation.mutateAsync({ formData: values });
    helpers.setSubmitting(false);
    helpers.resetForm();
  };

  return (
    <main>
      <div className="d-flex flex-column gap-4">
        <Row className="g-3">
          <Col md={6} xs={12}>
            <Card className="p-4">
              <h4 className="mb-3">
                {language("pages.settings.sections.edit-password")}
              </h4>
              <Formik<EditPasswordForm>
                initialValues={initialValuesEditPassword}
                validationSchema={editPasswordValidation(language)}
                onSubmit={handlePasswordSubmit}
              >
                {(formik) => (
                  <FForm className="d-flex flex-column gap-3">
                    <InputField
                      type="password"
                      name="password"
                      label={language("pages.settings.form.labels.password")}
                      Icon={<FaLock />}
                      labelStyle="flex-center-y gap-1"
                      iconStyle="flex-center"
                    />
                    <InputField
                      type="password"
                      name="newPassword"
                      label={language("pages.settings.form.labels.newPassword")}
                      Icon={<FaLock />}
                      labelStyle="flex-center-y gap-1"
                      iconStyle="flex-center"
                    />
                    <Button
                      type="submit"
                      variant="main"
                      className="btn"
                      disabled={formik.isSubmitting || !formik.dirty || !formik.isValid}
                    >
                      {language("pages.settings.form.buttons.save")}
                    </Button>
                  </FForm>
                )}
              </Formik>
            </Card>
          </Col>

          <Col md={6} xs={12}>
            <Card className="p-4">
              <h4 className="mb-3">
                {language("pages.settings.sections.edit-phone")}
              </h4>
              <Formik<EditPhoneForm>
                initialValues={initialValuesEditPhone}
                validationSchema={editPhoneValidation(language)}
                onSubmit={handlePhoneSubmit}
              >
                {(formik) => (
                  <FForm className="d-flex flex-column gap-3">
                    <InputField
                      type="password"
                      name="password"
                      label={language("pages.settings.form.labels.password")}
                      Icon={<FaLock />}
                      labelStyle="flex-center-y gap-1"
                      iconStyle="flex-center"
                    />
                    <InputField
                      type="text"
                      name="newPhone"
                      label={language("pages.settings.form.labels.newPhone")}
                      Icon={<FiSmartphone />}
                      labelStyle="flex-center-y gap-1"
                      iconStyle="flex-center"
                    />
                    <Button
                      type="submit"
                      variant="main"
                      className="btn"
                      disabled={formik.isSubmitting || !formik.dirty || !formik.isValid}
                    >
                      {language("pages.settings.form.buttons.save")}
                    </Button>
                  </FForm>
                )}
              </Formik>
            </Card>
          </Col>

          <Col xs={12}>
            {
              isLoading
                ? <LoadingBox width={"100%"} height={200} className="rounded" />
                : <Card className="p-4">
                  <h4 className="mb-3">
                    {language("pages.settings.sections.edit-global")}
                  </h4>
                  <Formik<EditGlobalSettingsForm>
                    initialValues={data}
                    validationSchema={editGlobalSettingsValidation}
                    onSubmit={handleSettingsSubmit}
                    enableReinitialize
                  >
                    {(formik) => (
                      <FForm className="d-flex flex-column gap-3">
                        <Row className="g-3">
                          <Col lg={6} md={12}>
                            <InputField
                              type="text"
                              name="whatsapp"
                              label={language("pages.settings.form.labels.whatsapp")}
                              Icon={<SiWhatsapp />}
                              labelStyle="flex-center-y gap-1"
                              iconStyle="flex-center"
                            />
                          </Col>
                          <Col lg={6} md={12}>
                            <InputField
                              type="text"
                              name="instagram"
                              label={language("pages.settings.form.labels.instagram")}
                              Icon={<FaInstagram />}
                              labelStyle="flex-center-y gap-1"
                              iconStyle="flex-center"
                            />
                          </Col>
                          <Col lg={6} md={12}>
                            <InputField
                              type="text"
                              name="tiktok"
                              label={language("pages.settings.form.labels.tiktok")}
                              Icon={<SiTiktok />}
                              labelStyle="flex-center-y gap-1"
                              iconStyle="flex-center"
                            />
                          </Col>
                          <Col lg={6} md={12}>
                            <InputField
                              type="text"
                              name="youtube"
                              label={language("pages.settings.form.labels.youtube")}
                              Icon={<FaYoutube />}
                              labelStyle="flex-center-y gap-1"
                              iconStyle="flex-center"
                            />
                          </Col>
                          <Col lg={6} md={12}>
                            <InputField
                              name="email"
                              type="email"
                              label={language("pages.settings.form.labels.email")}
                              Icon={<MdEmail />}
                              labelStyle="flex-center-y gap-1"
                              iconStyle="flex-center"
                            />
                          </Col>
                          <Col lg={6} md={12}>
                            <InputField
                              type="text"
                              inputMode="numeric"
                              name="mobileNumber"
                              label={language("pages.settings.form.labels.mobileNumber")}
                              Icon={<FaMobile />}
                              labelStyle="flex-center-y gap-1"
                              iconStyle="flex-center"
                            />
                          </Col>
                          <Col lg={6} md={12}>
                            <InputField
                              type="text"
                              inputMode="numeric"
                              name="customersNumber"
                              label={language("pages.settings.form.labels.customersNumber")}
                              Icon={<FaUsers />}
                              labelStyle="flex-center-y gap-1"
                              iconStyle="flex-center"
                            />
                          </Col>
                          <Col lg={6} md={12}>
                            <InputField
                              type="text"
                              inputMode="numeric"
                              name="packagesNumber"
                              label={language("pages.settings.form.labels.packagesNumber")}
                              Icon={<FaBoxOpen />}
                              labelStyle="flex-center-y gap-1"
                              iconStyle="flex-center"
                            />
                          </Col>
                          <Col xs={12}>
                            <InputField
                              type="text"
                              name="location"
                              label={language("pages.settings.form.labels.location")}
                              Icon={<FaMapMarkerAlt />}
                              labelStyle="flex-center-y gap-1"
                              iconStyle="flex-center"
                            />
                          </Col>
                          <Col lg={4} md={12}>
                            <TextAreaField
                              name="arTitle"
                              label={language("pages.settings.form.labels.arTitle")}
                              labelStyle="flex-center-y gap-1"
                            />
                          </Col>
                          <Col lg={4} md={12}>
                            <TextAreaField
                              name="enTitle"
                              label={language("pages.settings.form.labels.enTitle")}
                              labelStyle="flex-center-y gap-1"
                            />
                          </Col>
                          <Col lg={4} md={12}>
                            <TextAreaField
                              name="heTitle"
                              label={language("pages.settings.form.labels.heTitle")}
                              labelStyle="flex-center-y gap-1"
                            />
                          </Col>

                          <Col lg={4} md={12}>
                            <TextAreaField
                              name="arSubtitle"
                              label={language("pages.settings.form.labels.arSubtitle")}
                              labelStyle="flex-center-y gap-1"
                            />
                          </Col>
                          <Col lg={4} md={12}>
                            <TextAreaField
                              name="enSubtitle"
                              label={language("pages.settings.form.labels.enSubtitle")}
                              labelStyle="flex-center-y gap-1"
                            />
                          </Col>
                          <Col lg={4} md={12}>
                            <TextAreaField
                              name="heSubtitle"
                              label={language("pages.settings.form.labels.heSubtitle")}
                              labelStyle="flex-center-y gap-1"
                            />
                          </Col>
                          <Col lg={4} md={12}>
                            <InputField
                              type="text"
                              name="arHeroCustomersTitle"
                              label={language("pages.settings.form.labels.arHeroCustomersTitle")}
                              labelStyle="flex-center-y gap-1"
                            />
                          </Col>
                          <Col lg={4} md={12}>
                            <InputField
                              type="text"
                              name="enHeroCustomersTitle"
                              label={language("pages.settings.form.labels.enHeroCustomersTitle")}
                              labelStyle="flex-center-y gap-1"
                            />
                          </Col>
                          <Col lg={4} md={12}>
                            <InputField
                              type="text"
                              name="heHeroCustomersTitle"
                              label={language("pages.settings.form.labels.heHeroCustomersTitle")}
                              labelStyle="flex-center-y gap-1"
                            />
                          </Col>

                          <Col lg={4} md={12}>
                            <InputField
                              type="text"
                              name="arHeroPackagesTitle"
                              label={language("pages.settings.form.labels.arHeroPackagesTitle")}
                              labelStyle="flex-center-y gap-1"
                            />
                          </Col>
                          <Col lg={4} md={12}>
                            <InputField
                              type="text"
                              name="enHeroPackagesTitle"
                              label={language("pages.settings.form.labels.enHeroPackagesTitle")}
                              labelStyle="flex-center-y gap-1"
                            />
                          </Col>
                          <Col lg={4} md={12}>
                            <InputField
                              type="text"
                              name="heHeroPackagesTitle"
                              label={language("pages.settings.form.labels.heHeroPackagesTitle")}
                              labelStyle="flex-center-y gap-1"
                            />
                          </Col>

                          <Col lg={4} md={12}>
                            <InputField
                              type="text"
                              name="arHeroCustomersSubtitle"
                              label={language("pages.settings.form.labels.arHeroCustomersSubtitle")}
                              labelStyle="flex-center-y gap-1"
                            />
                          </Col>
                          <Col lg={4} md={12}>
                            <InputField
                              type="text"
                              name="enHeroCustomersSubtitle"
                              label={language("pages.settings.form.labels.enHeroCustomersSubtitle")}
                              labelStyle="flex-center-y gap-1"
                            />
                          </Col>
                          <Col lg={4} md={12}>
                            <InputField
                              type="text"
                              name="heHeroCustomersSubtitle"
                              label={language("pages.settings.form.labels.heHeroCustomersSubtitle")}
                              labelStyle="flex-center-y gap-1"
                            />
                          </Col>

                          <Col lg={4} md={12}>
                            <InputField
                              type="text"
                              name="arHeroPackagesSubtitle"
                              label={language("pages.settings.form.labels.arHeroPackagesSubtitle")}
                              labelStyle="flex-center-y gap-1"
                            />
                          </Col>
                          <Col lg={4} md={12}>
                            <InputField
                              type="text"
                              name="enHeroPackagesSubtitle"
                              label={language("pages.settings.form.labels.enHeroPackagesSubtitle")}
                              labelStyle="flex-center-y gap-1"
                            />
                          </Col>
                          <Col lg={4} md={12}>
                            <InputField
                              type="text"
                              name="heHeroPackagesSubtitle"
                              label={language("pages.settings.form.labels.heHeroPackagesSubtitle")}
                              labelStyle="flex-center-y gap-1"
                            />
                          </Col>
                          <Col lg={4} md={12}>
                            <InputField
                              type="text"
                              name="arServicesTitle"
                              label={language("pages.settings.form.labels.arServicesTitle")}
                              labelStyle="flex-center-y gap-1"
                            />
                          </Col>
                          <Col lg={4} md={12}>
                            <InputField
                              type="text"
                              name="enServicesTitle"
                              label={language("pages.settings.form.labels.enServicesTitle")}
                              labelStyle="flex-center-y gap-1"
                            />
                          </Col>
                          <Col lg={4} md={12}>
                            <InputField
                              type="text"
                              name="heServicesTitle"
                              label={language("pages.settings.form.labels.heServicesTitle")}
                              labelStyle="flex-center-y gap-1"
                            />
                          </Col>

                          <Col lg={4} md={12}>
                            <InputField
                              type="text"
                              name="arServicesSubtitle"
                              label={language("pages.settings.form.labels.arServicesSubtitle")}
                              labelStyle="flex-center-y gap-1"
                            />
                          </Col>
                          <Col lg={4} md={12}>
                            <InputField
                              type="text"
                              name="enServicesSubtitle"
                              label={language("pages.settings.form.labels.enServicesSubtitle")}
                              labelStyle="flex-center-y gap-1"
                            />
                          </Col>
                          <Col lg={4} md={12}>
                            <InputField
                              type="text"
                              name="heServicesSubtitle"
                              label={language("pages.settings.form.labels.heServicesSubtitle")}
                              labelStyle="flex-center-y gap-1"
                            />
                          </Col>

                          <Col lg={4} md={12}>
                            <InputField
                              type="text"
                              name="arCustomersTitle"
                              label={language("pages.settings.form.labels.arCustomersTitle")}
                              labelStyle="flex-center-y gap-1"
                            />
                          </Col>
                          <Col lg={4} md={12}>
                            <InputField
                              type="text"
                              name="enCustomersTitle"
                              label={language("pages.settings.form.labels.enCustomersTitle")}
                              labelStyle="flex-center-y gap-1"
                            />
                          </Col>
                          <Col lg={4} md={12}>
                            <InputField
                              type="text"
                              name="heCustomersTitle"
                              label={language("pages.settings.form.labels.heCustomersTitle")}
                              labelStyle="flex-center-y gap-1"
                            />
                          </Col>

                          <Col lg={4} md={12}>
                            <InputField
                              type="text"
                              name="arCustomersSubtitle"
                              label={language("pages.settings.form.labels.arCustomersSubtitle")}
                              labelStyle="flex-center-y gap-1"
                            />
                          </Col>
                          <Col lg={4} md={12}>
                            <InputField
                              type="text"
                              name="enCustomersSubtitle"
                              label={language("pages.settings.form.labels.enCustomersSubtitle")}
                              labelStyle="flex-center-y gap-1"
                            />
                          </Col>
                          <Col lg={4} md={12}>
                            <InputField
                              type="text"
                              name="heCustomersSubtitle"
                              label={language("pages.settings.form.labels.heCustomersSubtitle")}
                              labelStyle="flex-center-y gap-1"
                            />
                          </Col>

                          <Col lg={4} md={12}>
                            <InputField
                              type="text"
                              name="arPackagesTitle"
                              label={language("pages.settings.form.labels.arPackagesTitle")}
                              labelStyle="flex-center-y gap-1"
                            />
                          </Col>
                          <Col lg={4} md={12}>
                            <InputField
                              type="text"
                              name="enPackagesTitle"
                              label={language("pages.settings.form.labels.enPackagesTitle")}
                              labelStyle="flex-center-y gap-1"
                            />
                          </Col>
                          <Col lg={4} md={12}>
                            <InputField
                              type="text"
                              name="hePackagesTitle"
                              label={language("pages.settings.form.labels.hePackagesTitle")}
                              labelStyle="flex-center-y gap-1"
                            />
                          </Col>

                          <Col lg={4} md={12}>
                            <InputField
                              type="text"
                              name="arPackagesSubtitle"
                              label={language("pages.settings.form.labels.arPackagesSubtitle")}
                              labelStyle="flex-center-y gap-1"
                            />
                          </Col>
                          <Col lg={4} md={12}>
                            <InputField
                              type="text"
                              name="enPackagesSubtitle"
                              label={language("pages.settings.form.labels.enPackagesSubtitle")}
                              labelStyle="flex-center-y gap-1"
                            />
                          </Col>
                          <Col lg={4} md={12}>
                            <InputField
                              type="text"
                              name="hePackagesSubtitle"
                              label={language("pages.settings.form.labels.hePackagesSubtitle")}
                              labelStyle="flex-center-y gap-1"
                            />
                          </Col>
                        </Row>

                        <Button
                          type="submit"
                          variant="main"
                          className="btn"
                          disabled={formik.isSubmitting || !formik.dirty || !formik.isValid}
                        >
                          {language("pages.settings.form.buttons.save")}
                        </Button>
                      </FForm>
                    )}
                  </Formik>
                </Card>
            }
          </Col>
        </Row>
      </div>
    </main>
  );
};

export default EditAccountSettings;