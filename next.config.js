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
      {
        protocol: "http",
        hostname: "10.10.12.111",
        port: "8050",
        pathname: "/media/profile_images/**",
      },
      {
        protocol: "http",
        hostname: "10.10.12.111",
        port: "8050",
        pathname: "/media/blog_images/**",
      },
    ],
  },
};

module.exports = nextConfig;
