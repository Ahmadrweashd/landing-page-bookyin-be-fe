import React from "react";
import { Form as FForm, Formik, type FormikHelpers } from "formik";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { FaLock } from "react-icons/fa";
import { FiSmartphone } from "react-icons/fi";
import type { Login as LoginType } from "../misc/types";
import { login } from "../api-client";
import { useAppContext } from "../context/AppProvider";
import InputField from "../components/form/InputField";
import { loginForm as initialValues } from "../constants/formValues";
import { loginForm as getLoginValidation } from "../constants/formValidation";
import Button from "../components/form/Button";
import { useTranslation } from "react-i18next";
import { setLocalStorage } from "../misc/helpers";
import { SESSION_TOKEN_NAME } from "../constants/global";

const Login = (): React.JSX.Element => {
  const { showToast } = useAppContext();
  const [language] = useTranslation("global");
  const navigateTo = useNavigate();
  const queryClient = useQueryClient();
  const loginValidation = getLoginValidation(language);

  const mutation = useMutation(login, {
    onSuccess: async (data) => {
      setLocalStorage(SESSION_TOKEN_NAME, data.token)
      await queryClient.invalidateQueries("validateToken");
      showToast({ message: language("pages.login.messages.login-success"), type: "SUCCESS" });
      navigateTo("/dashboard");
    },
    onError: () => {
      showToast({ message: language("pages.login.messages.login-error"), type: "ERROR" });
    },
  });

  const onSubmit = async (
    data: LoginType,
    formikHelpers: FormikHelpers<LoginType>
  ) => {
    await mutation.mutateAsync(data);
    formikHelpers.setSubmitting(false);
  };

  return (
    <main id="login" className="login-wrapper flex-center min-h-100vh">
      <div className="login-container d-flex rounded-4 overflow-hidden shadow bg-background">
        <div className="left-pane d-none d-md-flex flex-column flex-center text-white p-5 position-relative">
          <h2 className="fw-bold">{language("pages.login.greeting")}</h2>
          <p className="text-center">{language("pages.login.left-text")}</p>
        </div>

        <div className="right-pane bg-background w-100 p-5">
          <h1 className="mb-2 fw-bold text-black">{language("pages.login.subtitle")}</h1>
          <h3 className="mb-3 fw-bold text-main">{language("pages.login.title")}</h3>

          <Formik
            initialValues={initialValues}
            validationSchema={loginValidation}
            onSubmit={onSubmit}
          >
            {(formik) => (
              <FForm className="d-flex flex-column gap-3">
                <InputField
                  type="text"
                  inputMode="numeric"
                  name="phone"
                  label={language("pages.login.form.labels.phone")}
                  placeholder={language("pages.login.form.placeholders.phone")}
                  labelStyle="flex-center-y gap-2 fw-semibold"
                  Icon={<FiSmartphone />}
                />

                <InputField
                  type="password"
                  name="password"
                  label={language("pages.login.form.labels.password")}
                  placeholder={language("pages.login.form.placeholders.password")}
                  labelStyle="flex-center-y gap-2 fw-semibold"
                  Icon={<FaLock />}
                  autoComplete="off"
                />

                <Button
                  type="submit"
                  variant="main"
                  className="btn w-100 py-2 fw-bold"
                  disabled={!formik.isValid || formik.isSubmitting || !formik.dirty}
                >
                  {formik.isSubmitting
                    ? language("pages.login.buttons.signing-in")
                    : language("pages.login.buttons.signin")}
                </Button>
              </FForm>
            )}
          </Formik>
        </div>
      </div>
    </main>
  );
};

export default Login;
