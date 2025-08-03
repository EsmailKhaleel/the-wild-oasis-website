/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      new URL("https://flagcdn.com/**"),
      new URL("https://res.cloudinary.com/**"),
      new URL("https://lh3.googleusercontent.com/**"),
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '3mb',
    },
  },
};

export default nextConfig;
