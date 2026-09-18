/** @type {import('next').NextConfig} */
const nextConfig = {
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
        source: '/pages/contact-us',
        destination: '/pages/contact',
        permanent: false,
      },
      {
        source: '/b2b-quote',
        destination: '/in/b2b-quote',
        permanent: false,
      },
      {
        source: '/pages/b2b-enquiry',
        destination: '/in/b2b-quote',
        permanent: false,
      },
      {
        source: '/pages/privacy-policy',
        destination: '/policies/privacy-policy',
        permanent: false,
      },
      {
        source: '/pages/terms-of-service',
        destination: '/policies/terms-of-service',
        permanent: false,
      },
      {
        source: '/pages/refund-policy',
        destination: '/policies/refund-policy',
        permanent: false,
      },
      {
        source: '/pages/shipping-policy',
        destination: '/policies/shipping-policy',
        permanent: false,
      },
      {
        source: '/pages/contact-information',
        destination: '/policies/contact-information',
        permanent: false,
      },
      {
        source: '/collections/:slug/products/:handle',
        destination: '/products/:handle',
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
