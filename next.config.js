/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["res.cloudinary.com", "sgp1.digitaloceanspaces.com"],
  },
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = nextConfig;
