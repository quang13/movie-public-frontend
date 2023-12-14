/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        hostname: "res.cloudinary.com",
      },
      {
        hostname: "chaolua3.live",
      },
      {
        hostname: "scontribute.tuoitre.vn",
        protocol: "https",
      },
      {
        hostname: "znews-photo.zingcdn.me",
        protocol: "https",
      },
      {
        hostname: "picsum.photos",
        protocol: "https",
      },
    ],
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  }
};
module.exports = nextConfig;
