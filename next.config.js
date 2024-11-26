/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["res.cloudinary.com", "sgp1.digitaloceanspaces.com"],
  },
  reactStrictMode: true,
  swcMinify: true,
  webpack(config) {
    // Find the existing rule that handles SVG imports
    const fileLoaderRule = config.module.rules.find(
      (rule) => rule.test && rule.test.test && rule.test.test(".svg")
    );

    // Exclude SVG files from the default file loader
    fileLoaderRule.exclude = /\.svg$/i;

    // Add a new rule to handle SVG imports using SVGR
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: { and: [/\.[jt]sx?$/] },
      use: ["@svgr/webpack"],
    });

    return config;
  },
};

module.exports = nextConfig;
