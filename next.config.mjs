/** @type {import('next').NextConfig} */
const nextConfig = {
  images :{
    // Should be used according to your needs
    remotePatterns : [{"hostname" :"**", pathname:"**"}]
  }
};

export default nextConfig;
