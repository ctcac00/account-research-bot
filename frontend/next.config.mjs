/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'storage-us-gcs.bfldr.com',
      },
    ],
  },
};

export default nextConfig;
