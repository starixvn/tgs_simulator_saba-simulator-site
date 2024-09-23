import React from "react";

type ImageIconProps = {
  imageName: string;
  altText: string;
  className?: string;
};

const SabaIcon = ({ imageName, altText, className }: ImageIconProps) => {
  return (
    <img src={`/images/${imageName}`} alt={altText} className={className} />
  );
};

export default SabaIcon;
