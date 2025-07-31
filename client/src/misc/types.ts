export type ToastMessage = {
  message: string;
  type: "SUCCESS" | "ERROR";
};

export type ToastProps = {
  onClose: () => void
} & ToastMessage

export type Variant = "info" | "danger" | "warning" | "secondary";
export type Input = "text" | "color" | "number" | "password" | "email";
export type Dir = "auto" | "ltr" | "rtl";
export type PackageType = "basic" | "premium" | "golden"

export type WarningProps = {
  message: string;
  btn1: string;
  btn2: string;
  styleBtn1?: Variant;
  styleBtn2?: Variant;
  handleBtn2: () => void;
};

export type AppContext = {
  isLoggedIn: boolean;
  showToast: (toastMessage: ToastMessage) => void;
  showWarning: (warning: WarningProps) => void;
  user: User | null;
};

export type CommonParent = {
  children: React.JSX.Element
}

export type User = {
  id: number;
  username: string;
  email: string;
  phone: string;
  mobileNumber: string,
  whatsapp?: string;
  instagram: string;
  tiktok?: string;
  youtube?: string;
  location?: string;
}

export type GetCustomersResponse = {
  customers: Customer[];
  hasMore: boolean;
  nextPage: number;
};

export type Customer = {
  id: number;
  backgroundImageURL?: string | null;
  profileURL?: string | null;
  name: string;
  location?: string;
  website?: string;
  isSpecial: boolean;
  businessName: string;
  evaluation?: string;
  phone: string
}

export type CompressedImageProps = {
  src: string;
  alt: string;
  loading?: "eager" | "lazy" | undefined;
  style?: string;
  clickEvent?: () => void;
  animation?: string;
  animationDelay?: number;
  width: number | string,
  height: number | string
}

export type Link = {
  id: number;
  name: string;
  path: string;
}

export type Language = {
  id: number;
  lang: string;
  name: string
};

export type LanguageBoxProps = {
  size?: number;
};

export type LoadingBoxProps = {
  className?: string;
  width?: number | string;
  height?: number | string;
};

export type CustomerDashProps = {
  customer: Customer;
}

export type CustomerLandProps = {
  customer: Customer;
}

export interface InputFieldProps {
  name: string;
  label?: string;
  labelStyle?: string;
  type: Input;
  inputMode?: "numeric";
  styles?: string;
  placeholder?: string;
  dir?: string;
  innerDivStyle?: string;
  Icon?: React.ReactNode;
  iconStyle?: string;
  autoComplete?: "on" | "off",
  disabled?: boolean
}

export interface ButtonProps {
  variant: "main" | "main-outline" | "main-gradient"
}

export interface TextAreaFieldProps {
  name: string;
  label?: string;
  placeholder?: string;
  styles?: string;
  labelStyle?: string;
  dir?: "rtl" | "ltr" | "auto";
  innerDivStyle?: string;
  Icon?: React.ReactNode;
  iconStyle?: string;
}

export type TextErrorProps = {
  msg: string
}

export type GetCustomersAPIProps = {
  page: number;
  limit: number;
}

export type GetRequestsAPIProps = {
  page: number;
  limit: number;
}

export type GetPackageAPIProps = {
  page: number;
  limit: number;
}

export type GetMessagesAPIProps = {
  page: number;
  limit: number;
}

export type CreateCustomersAPIProps = {
  formData: FormData
}

export type UpdateCustomersAPIProps = {
  formData: FormData,
  id: number | string
}

export type NoContentProps = {
  msg: string,
  action?: React.ReactNode
}

export type Login = {
  phone: string,
  password: string
}

export type FileInputFieldProps = {
  name: string;
  label?: string;
  accept?: string;
  styles?: string;
  labelStyle?: string;
  innerDivStyle?: string;
  iconStyle?: string;
  Icon?: React.ReactNode;
}

export interface TextAreaFieldProps {
  name: string;
  label?: string;
  labelStyle?: string;
  styles?: string;
  placeholder?: string;
  dir?: Dir;
  innerDivStyle?: string;
}

export type FloatButtonProps = {
  onClick: () => void;
  top?: number | "auto";
  right?: number | "auto";
  bottom?: number | "auto";
  left?: number | "auto";
  children: React.ReactNode;
}

export type CustomersServices = {
  name: string
}

export interface ServiceAction {
  name: string;
  action: 'add' | 'delete' | 'new';
}

export type ServicesSectionProps = {
  selectedServices: ServiceAction[];
  setSelectedServices: React.Dispatch<React.SetStateAction<ServiceAction[]>>;
}

export type Package = {
  id: number,
  priceMonthly: number,
  priceYearly: number,
  arNote?: string,
  enNote?: string,
  heNote?: string,
  arServiceNote?: string,
  enServiceNote?: string,
  heServiceNote?: string,
  isActive: boolean,
  isComingSoon: boolean,
  services: Partial<PackageService>[]
  type: PackageType
}

export type PackageService = {
  id: number,
  arName: string,
  heName: string,
  enName: string,
  isSpecial: boolean,
}

export type CreatePackageAPIProps = {
  packageObj: Partial<Package>
}

export type CreateServiceAPIProps = {
  service: Partial<Service>
}

export type UpdatePackageAPIProps = {
  packageObj: Partial<Package>,
  id: number | string
}

export type ServiceInput = {
  arName: string;
  heName: string;
  enName: string;
  isSpecial: boolean;
  id: number;
}

export type SelectorFieldProps = {
  name: string;
  options: SelectOption[];
  label?: string;
  styles?: string;
  labelStyle?: string;
  innerDivStyle?: string;
  inputClasses?: string;
  Icon?: React.ReactNode;
  iconStyle?: string;
}

export type SelectOption = {
  key: string;
  value: string | number;
}

export interface PackageDashProps {
  package: Package;
}

export interface PackageLandProps {
  package: Package;
  isYearly: boolean;
  fantastic?: boolean,
}

export type Service = {
  id: number,
  arTitle: string,
  heTitle: string,
  enTitle: string,
  arDescription?: string,
  heDescription?: string,
  enDescription?: string
  icon?: string,
  order: number
}

export type ServiceCardDashProps = {
  service: Service;
}

export type ServiceCardLandProps = {
  service: Service;
}

export type UpdateServiceAPIProps = {
  service: Partial<Service>,
  id: number | string
}

export type EditPasswordForm = {
  password: string,
  newPassword: string
}

export type EditPasswordAPIProps = {
  formData: EditPasswordForm
}

export type EditPhoneForm = {
  password: string,
  newPhone: string
}

export type EditPhoneAPIProps = {
  formData: EditPhoneForm
}

export type EditGlobalSettingsForm = {
  whatsapp?: string;
  instagram?: string;
  tiktok?: string;
  youtube?: string;
  email?: string;
  location?: string;
  mobileNumber?: string;
  packagesNumber?: number;
  customersNumber?: number;
  arTitle?: string;
  enTitle?: string;
  heTitle?: string;
  arSubtitle?: string;
  enSubtitle?: string;
  heSubtitle?: string;
  arServicesTitle?: string;
  enServicesTitle?: string;
  heServicesTitle?: string;
  arServicesSubtitle?: string;
  enServicesSubtitle?: string;
  heServicesSubtitle?: string;
  arCustomersTitle?: string;
  enCustomersTitle?: string;
  heCustomersTitle?: string;
  arCustomersSubtitle?: string;
  enCustomersSubtitle?: string;
  heCustomersSubtitle?: string;
  arPackagesTitle?: string;
  enPackagesTitle?: string;
  hePackagesTitle?: string;
  arPackagesSubtitle?: string;
  enPackagesSubtitle?: string;
  hePackagesSubtitle?: string;
  arHeroCustomersTitle?: string;
  enHeroCustomersTitle?: string;
  heHeroCustomersTitle?: string;
  arHeroPackagesTitle?: string;
  enHeroPackagesTitle?: string;
  heHeroPackagesTitle?: string;
  arHeroCustomersSubtitle?: string;
  enHeroCustomersSubtitle?: string;
  heHeroCustomersSubtitle?: string;
  arHeroPackagesSubtitle?: string;
  enHeroPackagesSubtitle?: string;
  heHeroPackagesSubtitle?: string;
};


export type EditGlobalSettingsAPIProps = {
  formData: EditGlobalSettingsForm
}

export type LandSectionHeaderProps = {
  msg: string,
  description?: string
}

export interface ASwitchProps {
  value: boolean
  setValue: (val: boolean) => void
}

export type Message = {
  id: number,
  message: string,
  phone: string,
  name: string,
  isRead?: string
}

export type SendContactMessageAPIProps = {
  message: Partial<Message>
}

export type Request = {
  id: number,
  name: string,
  phone: string,
  businessName: string,
  packageType?: string,
  packageId: number
}

export type AddRequestAPIProps = {
  request: Partial<Request>
}

export interface DatePickerFieldProps {
  name: string;
  label?: string;
  styles?: string;
  labelStyle?: string;
  placeholder?: string;
  dir?: "ltr" | "rtl";
  innerDivStyle?: string;
  Icon?: React.ReactNode;
  iconStyle?: string;
}

export type RequestDashProps = {
  request: Request
}