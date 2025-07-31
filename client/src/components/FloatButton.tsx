import React from "react";
import type { FloatButtonProps } from "../misc/types";
import Button from "./form/Button";

const FloatButton: React.FC<FloatButtonProps> = ({
  onClick,
  top = "auto",
  right = "auto",
  bottom = "auto",
  left = "auto",
  children,
}): React.ReactNode => {
  return (
    <Button
      variant="main"
      className="float-button p-2 flex-center border-0 rounded-circle position-absolute"
      onClick={onClick}
      style={{ top, right, bottom, left }}
    >
      {children}
    </Button>
  );
};

export default FloatButton;
