/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
  async redirects() {
    return [
      { source: '/workshop', destination: '/saree-pre-pleating-draping-workshop/', permanent: true },
      { source: '/workshop/', destination: '/saree-pre-pleating-draping-workshop/', permanent: true },
      { source: '/saree-pre-pleating-draping', destination: '/saree-pre-pleating-draping-workshop/', permanent: true },
      { source: '/saree-pre-pleating-draping/', destination: '/saree-pre-pleating-draping-workshop/', permanent: true },
    ];
  },
};
export default nextConfig;
