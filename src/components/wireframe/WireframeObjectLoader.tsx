"use client";

import dynamic from "next/dynamic";
import { useReducedMotion } from "framer-motion";
import { WireframeFallback } from "./WireframeFallback";

const WireframeObject = dynamic(() => import("./WireframeObject"), {
  ssr: false,
  loading: () => <WireframeFallback />,
});

export function WireframeObjectLoader() {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <WireframeFallback />;
  }

  return <WireframeObject />;
}
