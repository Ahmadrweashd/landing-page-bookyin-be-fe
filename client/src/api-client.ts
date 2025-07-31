import { getAuthHeaders } from "./misc/helpers";
import type {
  AddRequestAPIProps,
  CreateCustomersAPIProps,
  CreatePackageAPIProps,
  CreateServiceAPIProps,
  EditGlobalSettingsAPIProps,
  EditPasswordAPIProps,
  EditPhoneAPIProps,
  GetCustomersAPIProps,
  GetMessagesAPIProps,
  GetPackageAPIProps,
  Login,
  SendContactMessageAPIProps,
  UpdateCustomersAPIProps,
  UpdatePackageAPIProps,
  UpdateServiceAPIProps,
  User,
} from "./misc/types";

const DOMAIN = import.meta.env.VITE_DOMAIN;
const API_DIR = import.meta.env.VITE_API_DIR;

const API_BASE_URL = `${DOMAIN}/${API_DIR}`;

export const validateAuthentication = async (): Promise<User> => {
  const response = await fetch(`${API_BASE_URL}/auth/verify`, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  const responseBody = await response.json();

  if (!response.ok) throw new Error("Error check verification");

  return responseBody;
};


export const login = async (formData: Login) => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  const responseBody = await response.json();

  if (!response.ok) throw new Error(responseBody.msg);

  return responseBody;
};

export const getCustomers = async ({ page, limit }: GetCustomersAPIProps) => {
  const response = await fetch(`${API_BASE_URL}/customers?page=${page}&limit=${limit}`);

  const responseBody = await response.json();

  if (!response.ok) throw new Error(responseBody.msg);

  return responseBody;
};

export const getCustomersServices = async () => {
  const response = await fetch(`${API_BASE_URL}/customers/services`);

  const responseBody = await response.json();

  if (!response.ok) throw new Error(responseBody.msg);

  return responseBody;
};

export const getCustomerProfileImage = async (id: number) => {
  const response = await fetch(`${API_BASE_URL}/customers/${id}/profile-image`);

  if (!response.ok) throw new Error("Failed fetch profile image");

  return response.blob();
};

export const getCustomerBackgroundImage = async (id: number) => {
  const response = await fetch(`${API_BASE_URL}/customers/${id}/background-image`);

  if (!response.ok) throw new Error("Failed fetch Background image");

  return response.blob();
};

export const deleteCustomer = async (id: number) => {
  const response = await fetch(`${API_BASE_URL}/customers/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });

  const responseBody = await response.json();

  if (!response.ok) throw new Error(responseBody.msg);

  return responseBody;
};

export const createCustomer = async ({ formData }: CreateCustomersAPIProps) => {
  const response = await fetch(`${API_BASE_URL}/customers`, {
    method: "POST",
    body: formData,
    headers: getAuthHeaders(),
  });

  const responseBody = await response.json();

  if (!response.ok) throw new Error(responseBody.msg);

  return responseBody;
};

export const updateCustomer = async ({ formData, id }: UpdateCustomersAPIProps) => {
  const response = await fetch(`${API_BASE_URL}/customers/${id}`, {
    method: "PUT",
    body: formData,
    headers: getAuthHeaders(),
  });

  const responseBody = await response.json();

  if (!response.ok) throw new Error(responseBody.msg);

  return responseBody;
};

export const getCustomerById = async (id: number | string) => {
  const response = await fetch(`${API_BASE_URL}/customers/${id}`);

  const responseBody = await response.json();

  if (!response.ok) throw new Error(responseBody.msg);

  return responseBody;
};

export const getCustomerByBusinessName = async (businessName: string) => {
  const response = await fetch(`${API_BASE_URL}/customers/business/${businessName}`);

  const responseBody = await response.json();

  if (!response.ok) throw new Error(responseBody.msg);

  return responseBody;
};

export const getPackages = async ({ page, limit }: GetPackageAPIProps) => {
  const response = await fetch(`${API_BASE_URL}/packages?page=${page}&limit=${limit}`);

  const responseBody = await response.json();

  if (!response.ok) throw new Error(responseBody.msg);

  return responseBody;
};

export const deletePackage = async (id: number) => {
  const response = await fetch(`${API_BASE_URL}/packages/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });

  const responseBody = await response.json();

  if (!response.ok) throw new Error(responseBody.msg);

  return responseBody;
};

export const createPackage = async ({ packageObj }: CreatePackageAPIProps) => {
  const response = await fetch(`${API_BASE_URL}/packages`, {
    method: "POST",
    body: JSON.stringify(packageObj),
    headers: getAuthHeaders({ key: "Content-type", value: "application/json" }),
  });

  const responseBody = await response.json();

  if (!response.ok) throw new Error(responseBody.msg);

  return responseBody;
};

export const getPackageById = async (id: number | string) => {
  const response = await fetch(`${API_BASE_URL}/packages/${id}`);

  const responseBody = await response.json();

  if (!response.ok) throw new Error(responseBody.msg);

  return responseBody;
};

export const updatePackage = async ({ packageObj, id }: UpdatePackageAPIProps) => {
  const response = await fetch(`${API_BASE_URL}/packages/${id}`, {
    method: "PUT",
    body: JSON.stringify(packageObj),
    headers: getAuthHeaders({ key: "Content-type", value: "application/json" }),
  });

  const responseBody = await response.json();

  if (!response.ok) throw new Error(responseBody.msg);

  return responseBody;
};

export const getServices = async () => {
  const response = await fetch(`${API_BASE_URL}/services`);

  const responseBody = await response.json();

  if (!response.ok) throw new Error(responseBody.msg);

  return responseBody;
};

export const createService = async ({ service }: CreateServiceAPIProps) => {
  const response = await fetch(`${API_BASE_URL}/services`, {
    method: "POST",
    body: JSON.stringify(service),
    headers: getAuthHeaders({ key: "Content-type", value: "application/json" }),
  });

  const responseBody = await response.json();

  if (!response.ok) throw new Error(responseBody.msg);

  return responseBody;
};

export const deleteService = async (id: number) => {
  const response = await fetch(`${API_BASE_URL}/services/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });

  const responseBody = await response.json();

  if (!response.ok) throw new Error(responseBody.msg);

  return responseBody;
};

export const updateService = async ({ service, id }: UpdateServiceAPIProps) => {
  const response = await fetch(`${API_BASE_URL}/services/${id}`, {
    method: "PUT",
    body: JSON.stringify(service),
    headers: getAuthHeaders({ key: "Content-type", value: "application/json" }),
  });

  const responseBody = await response.json();

  if (!response.ok) throw new Error(responseBody.msg);

  return responseBody;
};

export const getServiceById = async (id: number | string) => {
  const response = await fetch(`${API_BASE_URL}/services/${id}`);

  const responseBody = await response.json();

  if (!response.ok) throw new Error(responseBody.msg);

  return responseBody;
};

export const updatePassword = async ({ formData }: EditPasswordAPIProps) => {
  const response = await fetch(`${API_BASE_URL}/auth/edit-password`, {
    method: "PUT",
    body: JSON.stringify(formData),
    headers: getAuthHeaders({ key: "Content-type", value: "application/json" }),
  });

  const responseBody = await response.json();

  if (!response.ok) throw new Error(responseBody.msg);

  return responseBody;
};

export const updatePhone = async ({ formData }: EditPhoneAPIProps) => {
  const response = await fetch(`${API_BASE_URL}/auth/edit-phone`, {
    method: "PUT",
    body: JSON.stringify(formData),
    headers: getAuthHeaders({ key: "Content-type", value: "application/json" }),
  });

  const responseBody = await response.json();

  if (!response.ok) throw new Error(responseBody.msg);

  return responseBody;
};

export const updateGlobalSettings = async ({ formData }: EditGlobalSettingsAPIProps) => {
  const response = await fetch(`${API_BASE_URL}/settings/edit-settings`, {
    method: "PUT",
    body: JSON.stringify(formData),
    headers: getAuthHeaders({ key: "Content-type", value: "application/json" }),
  });

  const responseBody = await response.json();

  if (!response.ok) throw new Error(responseBody.msg);

  return responseBody;
};

export const getGlobalSettings = async () => {
  const response = await fetch(`${API_BASE_URL}/settings/settings`);

  const responseBody = await response.json();

  if (!response.ok) throw new Error(responseBody.msg);

  return responseBody;
};

export const sendContactMessage = async ({ message }: SendContactMessageAPIProps) => {
  const response = await fetch(`${API_BASE_URL}/contacts`, {
    method: "POST",
    body: JSON.stringify(message),
    headers: { "Content-type": "application/json" },
  });

  const responseBody = await response.json();

  if (!response.ok) throw new Error(responseBody.msg);

  return responseBody;
}

export const createRequest = async ({ request }: AddRequestAPIProps) => {
  const response = await fetch(`${API_BASE_URL}/requests`, {
    method: "POST",
    body: JSON.stringify(request),
    headers: { "Content-type": "application/json" },
  });

  const responseBody = await response.json();

  if (!response.ok) throw new Error(responseBody.msg);

  return responseBody;
};

export const getRequests = async ({ page, limit }: GetCustomersAPIProps) => {
  const response = await fetch(`${API_BASE_URL}/requests?page=${page}&limit=${limit}`, {
    headers: getAuthHeaders({ key: "Content-type", value: "application/json" }),
  });

  const responseBody = await response.json();

  if (!response.ok) throw new Error(responseBody.msg);

  return responseBody;
};

export const deleteRequest = async (id: number) => {
  const response = await fetch(`${API_BASE_URL}/requests/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });

  const responseBody = await response.json();

  if (!response.ok) throw new Error(responseBody.msg);

  return responseBody;
};

export const convertRequestToCustomer = async (id: number) => {
  const response = await fetch(`${API_BASE_URL}/customers/convert-request/${id}`, {
    method: 'POST',
    headers: getAuthHeaders(),
  });

  const responseBody = await response.json();

  if (!response.ok) throw new Error(responseBody.msg);

  return responseBody;
};

export const getActivePackages = async ({ page, limit }: GetPackageAPIProps) => {
  const response = await fetch(`${API_BASE_URL}/packages/actives?page=${page}&limit=${limit}`);

  const responseBody = await response.json();

  if (!response.ok) throw new Error(responseBody.msg);

  return responseBody;
};

export const getMessages = async ({ page, limit }: GetMessagesAPIProps) => {
  const response = await fetch(`${API_BASE_URL}/contacts/?page=${page}&limit=${limit}`, {
    headers: getAuthHeaders({ key: "Content-type", value: "application/json" }),
  });

  const responseBody = await response.json();

  if (!response.ok) throw new Error(responseBody.msg);

  return responseBody;
};

export const markAsRead = async (ids: number[]) => {
  const response = await fetch(`${API_BASE_URL}/contacts`, {
    method: "PUT",
    body: JSON.stringify({ ids }),
    headers: getAuthHeaders({ key: "Content-type", value: "application/json" }),
  });

  const responseBody = await response.json();

  if (!response.ok) throw new Error(responseBody.msg);

  return responseBody;
};

export const deleteMessage = async (id: number) => {
  const response = await fetch(`${API_BASE_URL}/contacts/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });

  const responseBody = await response.json();

  if (!response.ok) throw new Error(responseBody.msg);

  return responseBody;
}