/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        hostname: 'storage-us-gcs.bfldr.com',
      },
    ],
  },
};

export default nextConfig;
