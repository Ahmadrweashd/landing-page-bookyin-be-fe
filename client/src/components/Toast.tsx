import React, { useEffect } from "react";
import type { ToastProps } from "../misc/types";
import { BiX, BiCheckCircle, BiErrorCircle } from "react-icons/bi";
import { cn } from "../misc/helpers";

export const Toast: React.FC<ToastProps> = ({ message, type, onClose }): React.ReactNode => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3500);

    return () => {
      clearTimeout(timer);
    };
  }, [onClose]);

  const isSuccess: boolean = type === "SUCCESS";

  return (
    <div className={cn(
      isSuccess,
      "border-success",
      "border-danger",
      "my-toast bg-background py-2 px-2 d-flex align-items-center border-start border-3 rounded-2 shadow-lg position-fixed overflow-hidden"
    )}>

      {isSuccess ? (
        <BiCheckCircle size={30} color="green" className="me-2" />
      ) : (
        <BiErrorCircle size={30} color="red" className="me-2" />
      )}

      <p className="mb-0 flex-1 fs-6 text-black">{message}</p>

      <BiX
        onClick={onClose}
        size={30}
        className={cn(
          isSuccess,
          "border-success",
          "border-danger",
          "close-icon p-1 border-start text-black pointer transition-03"
        )}
      />
    </div>
  );
};
