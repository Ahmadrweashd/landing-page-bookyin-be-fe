import type { Customer, EditGlobalSettingsForm, EditPasswordForm, EditPhoneForm, Message, Package, Request, Service } from "../misc/types";

export const loginForm = {
  phone: '',
  password: '',
};

export const addCustomerForm: Partial<Customer> = {
  name: '',
  businessName: '',
  backgroundImageURL: null,
  profileURL: null,
  location: '',
  phone: '',
  website: '',
  evaluation: '',
  isSpecial: false,
}

export const addPackageForm: Partial<Package> = {
  priceMonthly: 0,
  priceYearly: 0,
  arNote: '',
  enNote: '',
  heNote: '',
  arServiceNote: '',
  heServiceNote: '',
  enServiceNote: '',
  isActive: true,
  isComingSoon: false,
  services: [],
  type: "basic"
};

export const addServiceForm: Partial<Service> = {
  arDescription: "",
  arTitle: "",
  enDescription: "",
  enTitle: "",
  heDescription: "",
  heTitle: "",
  icon: "",
  order: 0
};

export const editPasswordForm: EditPasswordForm = {
  password: "",
  newPassword: ""
};

export const editPhoneForm: EditPhoneForm = {
  password: "",
  newPhone: ""
};

export const editGlobalSettingsForm: EditGlobalSettingsForm = {
  whatsapp: "",
  instagram: "",
  tiktok: "",
  youtube: "",
  email: "",
  location: "",
  mobileNumber: "",
  customersNumber: 0,
  packagesNumber: 0,
  arTitle: "",
  enTitle: "",
  heTitle: "",
  arSubtitle: "",
  enSubtitle: "",
  heSubtitle: "",
  arServicesTitle: "",
  enServicesTitle: "",
  heServicesTitle: "",
  arServicesSubtitle: "",
  enServicesSubtitle: "",
  heServicesSubtitle: "",
  arCustomersTitle: "",
  enCustomersTitle: "",
  heCustomersTitle: "",
  arCustomersSubtitle: "",
  enCustomersSubtitle: "",
  heCustomersSubtitle: "",
  arPackagesTitle: "",
  enPackagesTitle: "",
  hePackagesTitle: "",
  arPackagesSubtitle: "",
  enPackagesSubtitle: "",
  hePackagesSubtitle: "",
  arHeroCustomersTitle: "",
  enHeroCustomersTitle: "",
  heHeroCustomersTitle: "",
  arHeroPackagesTitle: "",
  enHeroPackagesTitle: "",
  heHeroPackagesTitle: "",
  arHeroCustomersSubtitle: "",
  enHeroCustomersSubtitle: "",
  heHeroCustomersSubtitle: "",
  arHeroPackagesSubtitle: "",
  enHeroPackagesSubtitle: "",
  heHeroPackagesSubtitle: ""
};

export const contactForm: Partial<Message> = {
  name: '',
  phone: '',
  message: ''
};

export const addRequestForm: Partial<Request> = {
  name: '',
  phone: '',
  businessName: '',
};
