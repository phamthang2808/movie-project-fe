import PropTypes from "prop-types";
import { useState } from "react";
import defaultAvatar from "../assets/images/vn.jpg";

const SafeAvatar = ({ src, alt, className, ...props }) => {
  const [imgSrc, setImgSrc] = useState(src || defaultAvatar);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setImgSrc(defaultAvatar);
    }
  };

  // Update imgSrc when src prop changes
  const finalSrc = src && src.trim() !== "" ? imgSrc : defaultAvatar;

  return (
    <img
      src={finalSrc}
      alt={alt}
      className={className}
      onError={handleError}
      {...props}
    />
  );
};

SafeAvatar.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  className: PropTypes.string,
};

export default SafeAvatar;

