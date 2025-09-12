/** @type {import('next').NextConfig} */
const buildTime = new Date().toISOString();
const nextConfig = {
  env: {
    NEXT_PUBLIC_BUILD_TIME: buildTime,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
