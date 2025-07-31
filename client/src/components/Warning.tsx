import React from "react";
import { Button } from "react-bootstrap";
import { CiWarning } from "react-icons/ci";
import type { WarningProps } from "../misc/types";

const Warning: React.FC<WarningProps & { onClose: () => void }> = ({
  message,
  onClose,
  handleBtn2,
  btn1,
  btn2,
  styleBtn1 = "secondary",
  styleBtn2 = "danger",
}): React.ReactNode => {
  return (
    <div className="notification-warning mx-2 flex-center position-fixed">
      <div className="warning-box bg-white p-2 border border-2 border-black rounded-3 shadow text-black">
        <div className="warning-header mb-1 px-2 py-2 flex-center-y gap-1 border-bottom border-3 border-black">
          <CiWarning fontSize={45} />
          <h2 className="m-0">Warning</h2>
        </div>

        <p className="warning-message mb-2 px-3 fs-5">{message}</p>

        <div className="warning-actions flex-center gap-2">
          <Button
            className="w-100 d-block rounded-1"
            variant={styleBtn1}
            onClick={onClose}
          >
            {btn1}
          </Button>
          <Button
            className="w-100 d-block rounded-1"
            variant={styleBtn2}
            onClick={() => {
              handleBtn2();
              onClose();
            }}
          >
            {btn2}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Warning;
