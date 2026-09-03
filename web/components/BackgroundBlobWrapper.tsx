"use client";

import dynamic from "next/dynamic";

const BackgroundBlob = dynamic(() => import("./BackgroundBlob"), {
  ssr: false,
});

export function BackgroundBlobWrapper() {
  return <BackgroundBlob />;
}
