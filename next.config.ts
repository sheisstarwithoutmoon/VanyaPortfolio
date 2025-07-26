import type { NextConfig } from "next";
import Image from 'next/image';

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true,
  },
  output: 'export', 
};

export default nextConfig;
