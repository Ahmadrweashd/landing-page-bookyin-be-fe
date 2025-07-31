import React, { useEffect, useState } from "react";
import type { CompressedImageProps } from "../misc/types";
import LoadingBox from "./LoadingBox";

const CompressedImage: React.FC<CompressedImageProps> = ({
  src,
  alt,
  style,
  loading = undefined,
  clickEvent,
  animation,
  animationDelay,
  width,
  height,
}): React.ReactElement => {
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setImageLoaded(true);
    };

    img.src = src;
  }, [src]);

  return imageLoaded ? (
    <img
      src={src}
      alt={alt}
      loading={loading}
      className={style}
      onClick={clickEvent}
      data-ani={animation}
      data-delay={animationDelay}
      width={width}
      height={height}
    />
  ) : (
    <LoadingBox
      width={width}
      height={height}
      className={style}
    />
  );
};

export default CompressedImage;
