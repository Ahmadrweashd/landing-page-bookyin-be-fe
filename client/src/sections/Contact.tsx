import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useQuery, useMutation } from 'react-query';
import { getGlobalSettings, sendContactMessage } from '../api-client';
import LoadingBox from '../components/LoadingBox';
import { cn, range } from '../misc/helpers';
import {
  FaPhoneAlt,
  FaWhatsapp,
  FaInstagram,
  FaTiktok,
  FaYoutube,
  FaMapMarkerAlt,
  FaEnvelope
} from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { Formik, Form as FForm, type FormikHelpers } from 'formik';
import InputField from '../components/form/InputField';
import Button from '../components/form/Button';
import { useAppContext } from '../context/AppProvider';
import TextAreaField from '../components/form/TextAreaField';
import { contactForm as initialValues } from '../constants/formValues';
import { contactForm as validationSchema } from '../constants/formValidation';
import type { Message } from '../misc/types';

const Contact = (): React.JSX.Element => {
  const [language, i18next] = useTranslation("global");
  const { showToast } = useAppContext();

  const currentLanguage = i18next.language

  const { data, isLoading } = useQuery(['settings'], () => getGlobalSettings());

  const socialItems = [
    { icon: <FaPhoneAlt />, key: null, value: data?.mobileNumber, link: `tel:${data?.mobileNumber}` },
    { icon: <FaEnvelope />, key: null, value: data?.email, link: `mailto:${data?.email}` },
    { icon: <FaWhatsapp />, key: 'whatsapp', value: data?.whatsapp, link: `https://wa.me/${data?.whatsapp}` },
    { icon: <FaInstagram />, key: 'instagram', value: data?.instagram, link: data?.instagram },
    { icon: <FaTiktok />, key: 'tiktok', value: data?.tiktok, link: data?.tiktok },
    { icon: <FaYoutube />, key: 'youtube', value: data?.youtube, link: data?.youtube },
    { icon: <FaMapMarkerAlt />, key: null, value: data?.location, link: data?.location },
  ];


  const mutation = useMutation(sendContactMessage, {
    onSuccess: () => {
      showToast({ message: language("pages.landing.contact.messages.success"), type: "SUCCESS" });
    },
    onError: () => {
      showToast({ message: language("pages.landing.contact.messages.error"), type: "ERROR" });
    },
  });

  const onSubmit = async (
    values: Partial<Message>,
    formikHelpers: FormikHelpers<Partial<Message>>
  ) => {
    await mutation.mutateAsync({ message: values });
    formikHelpers.resetForm();
    formikHelpers.setSubmitting(false);
  };

  return (
    <section id='contact' className='bg-background py-5 px-3'>
      <Container className='py-5 px-2'>
        <Row className='d-flex align-items-start'>
          <Col lg={5} className={cn(
            currentLanguage === "en",
            "pe-lg-5",
            "ps-lg-5",
          )}>
            <p className='mb-4 fw-medium fs-3 text-muted' data-ani={currentLanguage === "en" ? "right" : "left"}>
              {language("pages.landing.contact.msg")}
            </p>

            <ul className='px-1 list-unstyled'>
              {isLoading
                ? range(1, 3).map(i => (
                  <li
                    key={`settings-loading-${i}`}
                    className='my-3 border-main rounded overflow-hidden'
                  >
                    <LoadingBox width="100%" height={30} />
                  </li>
                ))
                : socialItems
                  .filter(item => item.value)
                  .map((item, idx) => (
                    <li
                      key={`contact-item-${idx}`}
                      className='contact-item bg-background my-3 border-main rounded overflow-hidden'
                      data-ani={currentLanguage === "en" ? "right" : "left"}
                      data-delay={Number(`0.${idx + 3}`)}
                    >
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className='text-decoration-none d-flex align-items-center gap-2 py-2 px-3 text-reset'
                      >
                        <span className='icon transition-03'>{item.icon}</span>
                        {item.key && <span title={item.value} className='fw-bold d-block'>{language(`pages.landing.contact.socials.${item.key}`)}</span>}
                        {!item.key && <span className='d-block flex-grow-1 text-truncate transition-03'>
                          {item.value}
                        </span>}
                      </a>
                    </li>
                  ))}
            </ul>
          </Col>

          <Col lg={7} className='bg-background mt-lg-0 mt-3 py-3 px-lg-4 px-2 border-main rounded' data-ani={currentLanguage === "en" ? "left" : "right"}>
            <h2 className='mb-3 fw-bold text-black'>
              {language("pages.landing.contact.form.title")}
            </h2>

            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema(language)}
              onSubmit={onSubmit}
            >
              {(formik) => (
                <FForm className='d-flex flex-column gap-3'>
                  <InputField
                    type='text'
                    name="name"
                    label={language("pages.landing.contact.form.labels.name")}
                    placeholder={language("pages.landing.contact.form.placeholders.name")}
                  />

                  <InputField
                    name="phone"
                    inputMode='numeric'
                    type="text"
                    label={language("pages.landing.contact.form.labels.phone")}
                    placeholder={language("pages.landing.contact.form.placeholders.phone")}
                  />

                  <TextAreaField
                    name="message"
                    label={language("pages.landing.contact.form.labels.message")}
                    placeholder={language("pages.landing.contact.form.placeholders.message")}
                  />

                  <Button
                    type="submit"
                    variant="main"
                    className="btn w-100 py-2 fw-bold"
                    disabled={!formik.isValid || formik.isSubmitting || !formik.dirty}
                  >
                    {language("pages.landing.contact.form.buttons.send")}
                  </Button>
                </FForm>
              )}
            </Formik>
          </Col>
        </Row>
      </Container>
    </section >
  );
};

export default Contact;
