/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    workerThreads: false,
    cpus: 1,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.shopify.com',
      },
      {
        protocol: 'https',
        hostname: 'www.medventa.in',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      }
    ],
  },
  async redirects() {
    return [
      {
        source: '/supply/delhi',
        destination: '/supply/delhi-ncr',
        permanent: true,
      },
      {
        source: '/supply/delhi/:category',
        destination: '/supply/delhi-ncr/:category',
        permanent: true,
      },
      {
        source: '/supply/bangalore',
        destination: '/supply/bengaluru',
        permanent: true,
      },
      {
        source: '/supply/bangalore/:category',
        destination: '/supply/bengaluru/:category',
        permanent: true,
      },
      {
        source: '/pages/contact-us',
        destination: '/pages/contact',
        permanent: true,
      },
      {
        source: '/b2b-quote',
        destination: '/in/b2b-quote',
        permanent: true,
      },
      {
        source: '/pages/b2b-enquiry',
        destination: '/in/b2b-quote',
        permanent: true,
      },
      {
        source: '/pages/privacy-policy',
        destination: '/policies/privacy-policy',
        permanent: true,
      },
      {
        source: '/pages/terms-of-service',
        destination: '/policies/terms-of-service',
        permanent: true,
      },
      {
        source: '/pages/refund-policy',
        destination: '/policies/refund-policy',
        permanent: true,
      },
      {
        source: '/pages/shipping-policy',
        destination: '/policies/shipping-policy',
        permanent: true,
      },
      {
        source: '/pages/contact-information',
        destination: '/policies/contact-information',
        permanent: true,
      },
      {
        source: '/collections',
        destination: '/collections/all',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
