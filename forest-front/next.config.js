/** @type {import('next').NextConfig} */

const withPlugins = require("next-compose-plugins");
const withPWA = require("next-pwa");
const prod = process.env.NODE_ENV === "production";

const config = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL,
    NEXT_PUBLIC_GA_ID: process.env.NEXT_PUBLIC_GA_ID,
  },
  images: {
    disableStaticImages: false,
  },
  async redirects() {
    return [
      {
        source: "/teacher/class/study/:path*",
        destination: "/teacher/class",
        permanent: false,
      },
      {
        source: "/test/:path*",
        destination: "/student/dashboard",
        permanent: false,
      },
      {
        source: "/workbook/:path",
        destination: "/workbook",
        permanent: false,
      },
    ];
  },
};

const nextConfig = withPWA({
  disable: prod ? false : true,
  dest: "public",
})(config);

module.exports = nextConfig;
