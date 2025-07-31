import React from "react";
import type { LoadingBoxProps } from "../misc/types";

const LoadingBox: React.FC<LoadingBoxProps> = ({ className, width, height }): React.ReactNode => {
  const style: React.CSSProperties = {
    ...(width && { width }),
    ...(height && { height }),
  };

  return (
    <div className={`loading-box overflow-hidden ${className}`} style={style}>
      <div className="animated-shape w-100 h-100 position-relative" />
    </div>
  );
};

export default LoadingBox;
