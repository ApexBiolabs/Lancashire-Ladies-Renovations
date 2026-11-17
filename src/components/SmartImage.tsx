"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";

/**
 * next/image with a graceful, on-brand fallback if a photo
 * fails to load (e.g. a remote image is removed).
 */
export function SmartImage(props: ImageProps) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <div
        role="img"
        aria-label={typeof props.alt === "string" ? props.alt : ""}
        className={`placeholder-texture absolute inset-0 ${props.className ?? ""}`}
      />
    );
  }
  // eslint-disable-next-line jsx-a11y/alt-text
  return <Image {...props} onError={() => setFailed(true)} />;
}
