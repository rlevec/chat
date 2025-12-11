import React, { useState } from "react";
import imageStyles from "./styles/image.module.css";
import Icon from "../icon";

export default function Image({
  src,
  alt = "",
  width,
  height,
  fallback = "Failed to load image",
  additionalContainerClassName = "",
  replacementContainerClassName = "",
  objectFit = "cover",
  additionalImageClassName = "",
  replacementImageClassName = "",
  isFallbackIcon = false,
  fallbackIcon = "",
  fallbackIconReplacementClassName = "",
  disableCache = false,
}) {
  const [status, setStatus] = useState("loading");

  const finalSrc = disableCache ? `${src}?t=${new Date().getTime()}` : src;

  return (
    <div
      className={`${
        replacementContainerClassName ?? imageStyles.container
      } ${additionalContainerClassName}`}
      style={{ width: width || "auto", height: height || "auto" }}
    >
      {status === "loading" && <div className={imageStyles.placeholder} />}
      {status !== "error" && (
        <img
          src={finalSrc}
          alt={alt}
          width={width}
          height={height}
          loading="lazy"
          onLoad={() => setStatus("loaded")}
          onError={() => setStatus("error")}
          style={{ objectFit }}
          className={`${
            replacementImageClassName ?? imageStyles.image
          } ${additionalImageClassName} ${
            status === "loaded" ? imageStyles.loaded : ""
          }`}
        />
      )}
      {status === "error" &&
        (isFallbackIcon && fallbackIcon ? (
          <Icon
            className={fallbackIconReplacementClassName ?? imageStyles?.fallback_icon}
            type={fallbackIcon}
          />
        ) : (
          <div className={imageStyles.error}>{fallback}</div>
        ))}
    </div>
  );
}
