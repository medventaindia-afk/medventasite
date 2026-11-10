import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/cart',
          '/checkout',
          '/api/',
          '/search',
          '/account',
          '/recommendations',
          '/customer_authentication',
          '/sf_private_access_tokens',
          '/collections/vendors$',
          '/collections/vendors?*',
          '/collections/frontpage',
          '/collections/*?*page=*',
          '/collections/*?*grid_list*',
          '/collections/*?*filter.v.*',
          '/collections/*?*sort_by=*',
          '/collections/*?*q=*',
          '/in/b2b-quote?*',
          '/*?*_pos=*',
          '/*?*_fid=*',
          '/*?*_ss=*',
        ],
      },
    ],
    sitemap: 'https://www.medventa.in/sitemap.xml',
  };
}
