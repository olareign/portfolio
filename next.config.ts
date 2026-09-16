import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Server-hosted (Vercel) rather than static export: the AI CV-tailoring route
  // needs a live server to call the LLM and generate a PDF on demand.
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
