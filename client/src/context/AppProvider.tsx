import React, { createContext, useContext, useState } from "react";
import type {
  ToastMessage,
  WarningProps,
  AppContext as AppContextType,
  CommonParent,
  User
} from "../misc/types"
import { useQuery } from "react-query";
import Loading from "../components/Loading";
import { validateAuthentication } from "../api-client";
import { Toast } from "../components/Toast";
import Warning from "../components/Warning";

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: CommonParent): React.JSX.Element => {
  const [toast, setToast] = useState<ToastMessage | undefined>(undefined);
  const [warning, setWarning] = useState<WarningProps | undefined>(undefined);

  const { isError, isLoading, data } = useQuery<User>("validateToken", validateAuthentication);

  if (isLoading) return <Loading />;

  return (
    <AppContext.Provider
      value={{
        isLoggedIn: !isError,
        showToast: (toastMessage) => setToast(toastMessage),
        showWarning: (warning) => setWarning(warning),
        user: data || null,
      }}
    >
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(undefined)}
        />
      )}
      {warning && (
        <Warning
          message={warning.message}
          btn1={warning.btn1}
          btn2={warning.btn2}
          styleBtn1={warning.styleBtn1}
          styleBtn2={warning.styleBtn2}
          onClose={() => setWarning(undefined)}
          handleBtn2={warning.handleBtn2}
        />
      )}
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextType => {
  const CONTEXT = useContext(AppContext);
  return CONTEXT as AppContextType;
};

export default AppProvider;