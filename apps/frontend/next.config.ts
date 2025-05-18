/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com'], // If you plan to use images from Unsplash
  },
  async redirects() {
    return [
      {
        source: '/collections',
        destination: '/#collections',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
