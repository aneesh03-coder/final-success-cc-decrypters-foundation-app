/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination:
          "https://final-success-cc-decrypters-foundation-app-aneesh03-coder.vercel.app/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
