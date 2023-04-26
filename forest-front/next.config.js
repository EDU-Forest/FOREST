/** @type {import('next').NextConfig} */

const withPlugins = require("next-compose-plugins");
const withPWA = require("next-pwa");
const prod = process.env.NODE_ENV === "production";

const config = {
  reactStrictMode: true,
  images: {
    disableStaticImages: false,
  },
};

const nextConfig = withPWA({
  disable: prod ? false : true,
  dest: "public",
})(config);

module.exports = nextConfig;
