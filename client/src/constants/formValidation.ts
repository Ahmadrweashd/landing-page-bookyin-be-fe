import * as Yup from "yup";
import { type TFunction } from "i18next";

export const loginForm = (t: TFunction) =>
  Yup.object({
    phone: Yup.string()
      .required(t("pages.login.form.errors.required-phone")),
    password: Yup.string()
      .min(6, t("pages.login.form.errors.short-password"))
      .required(t("pages.login.form.errors.required-password")),
  });

export const addCustomerForm = (t: TFunction) =>
  Yup.object({
    name: Yup.string()
      .required(t('pages.customers.form.errors.required-name'))
      .max(100, t('pages.customers.form.errors.max-name')),

    businessName: Yup.string()
      .required(t('pages.customers.form.errors.required-business-name'))
      .max(100, t('pages.customers.form.errors.max-business-name')),

    backgroundImageURL: Yup.mixed<File>()
      .nullable()
      .test('fileSize', t('pages.customers.form.errors.background-size'), (value) => {
        if (!value) return true;
        return (value as File).size <= 5 * 1024 * 1024;
      })
      .test('fileType', t('pages.customers.form.errors.background-type'), (value) => {
        if (!value) return true;
        return ['image/jpeg', 'image/png', 'image/webp'].includes((value as File).type);
      }),

    profileURL: Yup.mixed<File>()
      .nullable()
      .test('fileSize', t('pages.customers.form.errors.profile-size'), (value) => {
        if (!value) return true;
        return (value as File).size <= 5 * 1024 * 1024;
      })
      .test('fileType', t('pages.customers.form.errors.profile-type'), (value) => {
        if (!value) return true;
        return ['image/jpeg', 'image/png', 'image/webp'].includes((value as File).type);
      }),

    location: Yup.string().max(100, t('pages.customers.form.errors.max-location')),
    phone: Yup.string().max(20, t('pages.customers.form.errors.max-phone')),
    website: Yup.string().url(t('pages.customers.form.errors.invalid-website')),
    note: Yup.string().max(500, t('pages.customers.form.errors.max-note')),
    isSpecial: Yup.boolean(),
  });

export const editCustomerForm = (t: TFunction) =>
  Yup.object({
    name: Yup.string()
      .nullable()
      .max(100, t('pages.customers.form.errors.max-name')),

    businessName: Yup.string()
      .nullable()
      .max(100, t('pages.customers.form.errors.max-business-name')),

    backgroundImageURL: Yup.mixed<File>()
      .nullable()
      .test('fileSize', t('pages.customers.form.errors.background-size'), (value) => {
        if (!value) return true;
        return (value as File).size <= 5 * 1024 * 1024;
      })
      .test('fileType', t('pages.customers.form.errors.background-type'), (value) => {
        if (!value) return true;
        return ['image/jpeg', 'image/png', 'image/webp'].includes((value as File).type);
      }),

    profileURL: Yup.mixed<File>()
      .nullable()
      .test('fileSize', t('pages.customers.form.errors.profile-size'), (value) => {
        if (!value) return true;
        return (value as File).size <= 5 * 1024 * 1024;
      })
      .test('fileType', t('pages.customers.form.errors.profile-type'), (value) => {
        if (!value) return true;
        return ['image/jpeg', 'image/png', 'image/webp'].includes((value as File).type);
      }),

    location: Yup.string()
      .nullable()
      .max(100, t('pages.customers.form.errors.max-location')),

    phone: Yup.string()
      .nullable()
      .max(20, t('pages.customers.form.errors.max-phone')),

    website: Yup.string()
      .nullable()
      .url(t('pages.customers.form.errors.invalid-website')),

    note: Yup.string()
      .nullable()
      .max(500, t('pages.customers.form.errors.max-note')),

    isSpecial: Yup.boolean(),
  });

export const addPackageForm = (t: TFunction) =>
  Yup.object({
    priceMonthly: Yup.number()
      .required(t('pages.packages.form.errors.required-priceMonthly'))
      .min(0, t('pages.packages.form.errors.min-priceMonthly')),
    priceYearly: Yup.number()
      .required(t('pages.packages.form.errors.required-priceMonthly'))
      .min(0, t('pages.packages.form.errors.min-priceMonthly')),

    arNote: Yup.string().max(500, t('pages.packages.form.errors.max-note')),
    enNote: Yup.string().max(500, t('pages.packages.form.errors.max-note')),
    heNote: Yup.string().max(500, t('pages.packages.form.errors.max-note')),

    arServiceNote: Yup.string().max(500, t('pages.packages.form.errors.max-servicesNote')),
    enServiceNote: Yup.string().max(500, t('pages.packages.form.errors.max-servicesNote')),
    heServiceNote: Yup.string().max(500, t('pages.packages.form.errors.max-servicesNote')),

    isActive: Yup.boolean(),
    isComingSoon: Yup.boolean(),

    type: Yup.string()
      .oneOf(['basic', 'premium', 'golden'], t('pages.packages.form.errors.invalid-type'))
      .required(t('pages.packages.form.errors.required-type')),

    services: Yup.array().of(
      Yup.object({
        arName: Yup.string()
          .required(t('pages.packages.form.errors.required-service-name'))
          .max(100, t('pages.packages.form.errors.max-service-name')),
        enName: Yup.string()
          .required(t('pages.packages.form.errors.required-service-name'))
          .max(100, t('pages.packages.form.errors.max-service-name')),
        heName: Yup.string()
          .required(t('pages.packages.form.errors.required-service-name'))
          .max(100, t('pages.packages.form.errors.max-service-name')),
        isSpecial: Yup.boolean(),
      })
    ),
  });

export const updatePackageForm = (t: TFunction) =>
  Yup.object({
    priceMonthly: Yup.number().min(0, t('pages.packages.form.errors.min-priceMonthly')).notRequired(),

    arNote: Yup.string().max(500, t('pages.packages.form.errors.max-note')).notRequired(),
    enNote: Yup.string().max(500, t('pages.packages.form.errors.max-note')).notRequired(),
    heNote: Yup.string().max(500, t('pages.packages.form.errors.max-note')).notRequired(),

    arServiceNote: Yup.string().max(500, t('pages.packages.form.errors.max-servicesNote')).notRequired(),
    enServiceNote: Yup.string().max(500, t('pages.packages.form.errors.max-servicesNote')).notRequired(),
    heServiceNote: Yup.string().max(500, t('pages.packages.form.errors.max-servicesNote')).notRequired(),

    isActive: Yup.boolean().notRequired(),
    isComingSoon: Yup.boolean().notRequired(),

    rival: Yup.number().min(0, t('pages.packages.form.errors.min-rival')).notRequired(),

    type: Yup.string()
      .oneOf(['basic', 'premium', 'golden'], t('pages.packages.form.errors.invalid-type'))
      .notRequired(),

    services: Yup.array()
      .of(
        Yup.object({
          arName: Yup.string().max(100, t('pages.packages.form.errors.max-service-name')).notRequired(),
          enName: Yup.string().max(100, t('pages.packages.form.errors.max-service-name')).notRequired(),
          heName: Yup.string().max(100, t('pages.packages.form.errors.max-service-name')).notRequired(),
          isSpecial: Yup.boolean().notRequired(),
        })
      )
      .notRequired(),
  });

export const addServiceForm = (t: TFunction) =>
  Yup.object({
    enTitle: Yup.string().required(t('pages.services.form.errors.required-enTitle')),
    enDescription: Yup.string().max(500, t('pages.services.form.errors.max-enDescription')),

    arTitle: Yup.string().required(t('pages.services.form.errors.required-arTitle')),
    arDescription: Yup.string().max(500, t('pages.services.form.errors.max-arDescription')),

    heTitle: Yup.string().required(t('pages.services.form.errors.required-heTitle')),
    heDescription: Yup.string().max(500, t('pages.services.form.errors.max-heDescription')),

    icon: Yup.string().required(t('pages.services.form.errors.required-icon')),
  })

export const editServiceForm = (t: TFunction) =>
  Yup.object({
    enTitle: Yup.string().optional(),
    enDescription: Yup.string()
      .max(500, t('pages.services.form.errors.max-enDescription'))
      .optional(),

    arTitle: Yup.string().optional(),
    arDescription: Yup.string()
      .max(500, t('pages.services.form.errors.max-arDescription'))
      .optional(),

    heTitle: Yup.string().optional(),
    heDescription: Yup.string()
      .max(500, t('pages.services.form.errors.max-heDescription'))
      .optional(),

    icon: Yup.string().optional(),
  });

export const editPasswordForm = (t: TFunction) =>
  Yup.object({
    password: Yup.string()
      .required(t('pages.settings.form.errors.required-password')),

    newPassword: Yup.string()
      .min(6, t('pages.settings.form.errors.min-newPassword'))
      .required(t('pages.settings.form.errors.required-newPassword')),
  });

export const editPhoneForm = (t: TFunction) =>
  Yup.object({
    password: Yup.string()
      .required(t('pages.settings.form.errors.required-password')),

    newPhone: Yup.string()
      .matches(/^[0-9]{10,15}$/, t('pages.settings.form.errors.invalid-phone'))
      .required(t('pages.settings.form.errors.required-newPhone')),
  });

export const editGlobalSettingsForm = () =>
  Yup.object({
    whatsapp: Yup.string().nullable(),
    instagram: Yup.string().nullable().url(),
    tiktok: Yup.string().nullable().url(),
    youtube: Yup.string().nullable().url(),
    email: Yup.string().nullable().email(),
    location: Yup.string().nullable(),
  });

export const contactForm = (t: TFunction) => Yup.object({
  name: Yup.string().required(t("pages.landing.contact.form.errors.name")),
  phone: Yup.string().required(t("pages.landing.contact.form.errors.phone")),
  message: Yup.string().required(t("pages.landing.contact.form.errors.message"))
});

export const addRequestValidation = (t: TFunction) =>
  Yup.object({
    name: Yup.string()
      .required(t('pages.requests.form.errors.name')),
    businessName: Yup.string()
      .required(t('pages.requests.form.errors.businessName')),
    phone: Yup.string()
      .required(t('pages.requests.form.errors.phone')),
  });