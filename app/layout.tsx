import type { Metadata } from 'next';
import './globals.css';
import MedicalSchema from '@/components/seo/MedicalSchema';
import { CartProvider } from '@/context/CartContext';

export const metadata: Metadata = {
  title: 'MedVenta India',
  description: 'Over 350,000 World-Class Healthcare Products – Sourced Globally. Serving Hospitals, Clinics & Healthcare Professionals Across India.',
  metadataBase: new URL('https://www.medventa.in'),
  openGraph: {
    title: 'MedVenta India',
    description: 'Over 350,000 World-Class Healthcare Products – Sourced Globally.',
    url: 'https://www.medventa.in',
    siteName: 'MedVenta India',
    locale: 'en_IN',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className="js no-touch" lang="en">
      <head>
        <link rel="preload" href="/cdn/fonts/libre_franklin/librefranklin_n6.c976b0b721ea92417572301ef17640150832a2b9.woff2" as="font" crossOrigin="anonymous" />
        <link rel="stylesheet" href="/cdn/shop/t/2/assets/theme.css" />
        <link rel="stylesheet" href="/cdn/shop/t/2/assets/ripple.css" />
        <style dangerouslySetInnerHTML={{ __html: `
          .site-logo { max-width: 173px; }
          .site-logo-image { max-height: 65px; }
          #shopify-section-template--18628639424695__dynamic_slideshow { --autoplay-interval: 9s; }
          .highlights-banner__template--18628639424695__dynamic_highlights_banner .highlights-banner__content { background-color: #ffffff; }
          .highlights-banner__template--18628639424695__dynamic_highlights_banner .highlights-banner__content:before { background: linear-gradient(to right, #ffffff 10%, rgba(255, 255, 255, 0) 100%); }
          .highlights-banner__template--18628639424695__dynamic_highlights_banner .highlights-banner__content:after { background: linear-gradient(to left, #ffffff 10%, rgba(255, 255, 255, 0) 100%); }
          .highlights-banner__template--18628639424695__dynamic_highlights_banner .highlights-banner__block { color: #1d1d1d; }
          .highlights-banner__template--18628639424695__dynamic_highlights_banner .highlights-banner__icon { color: #046e82; }
          #shopify-section-template--18628639424695__dynamic_collection_list .collection-list__content { grid-template-columns: repeat(6, minmax(auto, 1fr)); }
          @media only screen and (max-width: 860px) {
            #shopify-section-template--18628639424695__dynamic_collection_list .collection-list__content { grid-template-columns: repeat(2, minmax(auto, 1fr)); }
          }
          /* Custom active slide animation */
          .slideshow-slide { transition: opacity 0.5s ease-in-out; }
          .slideshow-slide.active-slide { display: block !important; opacity: 1; }
          .slideshow-slide.inactive-slide { display: none !important; opacity: 0; }
        `}} />
        <MedicalSchema />
      </head>
      <body className="template-index" data-instant-allow-query-string>
        <svg className="icon-star-reference" aria-hidden="true" focusable="false" role="presentation" xmlns="http://www.w3.org/2000/svg" style={{ display: 'none' }}>
          <symbol id="icon-star">
            <rect className="icon-star-background" width="20" height="20" fill="currentColor"></rect>
            <path d="M10 3L12.163 7.60778L17 8.35121L13.5 11.9359L14.326 17L10 14.6078L5.674 17L6.5 11.9359L3 8.35121L7.837 7.60778L10 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
          </symbol>
          <clipPath id="icon-star-clip">
            <path d="M10 3L12.163 7.60778L17 8.35121L13.5 11.9359L14.326 17L10 14.6078L5.674 17L6.5 11.9359L3 8.35121L7.837 7.60778L10 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
          </clipPath>
        </svg>
        <a className="skip-to-main" href="#site-main">Skip to content</a>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
