/** @type {import('next').NextConfig} */
const buildTime = new Date().toISOString();
const nextConfig = {
  env: {
    NEXT_PUBLIC_BUILD_TIME: buildTime,
  },
};

export default nextConfig;
