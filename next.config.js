/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    dangerouslyAllowLocalIP: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "http",
        hostname: "10.10.12.111",
        port: "8050",
        pathname: "/media/projects/**",
      },
    ],
  },
};

module.exports = nextConfig;
