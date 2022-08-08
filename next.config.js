/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // async rewrites() {
  //   return [
  //     {
  //       source: "/api/:path*",
  //       destination: "http://localhost:3000/:path*",
  //     },
  //     {
  //       source: "/api/auth/:path*",
  //       destination: "http://localhost:3000/api/session",
  //     },
  //   ];
  // },
};

module.exports = nextConfig;
