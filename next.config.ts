import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // Genera la carpeta 'out' lista para Android/iOS
  images: {
    unoptimized: true, // Necesario al usar exportación estática
  },
};

export default nextConfig;