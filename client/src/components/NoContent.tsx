import React from "react";
import NoContentImage from "../assets/images/no-content.png";
import type { NoContentProps } from "../misc/types";

const NoContent: React.FC<NoContentProps> = ({ msg, action }): React.ReactNode => {
  return (
    <div className="flex-center flex-column gap-3">
      <img
        src={NoContentImage}
        alt="No Content"
        width={200}
        height={200}
        className="" />

      <p className="text-center fw-semibold fs-1 text-main">{msg}</p>

      {action}
    </div>
  );
};

export default NoContent;
