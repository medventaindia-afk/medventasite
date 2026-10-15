import type { Metadata } from 'next';
import './globals.css';
import MedicalSchema from '@/components/seo/MedicalSchema';
import { CartProvider } from '@/context/CartContext';

export const metadata: Metadata = {
  title: 'MedVenta India | Institutional Medical Supplies & Surgical Consumables Portal',
  description: 'India\'s leading institutional healthcare procurement portal. Sourcing over 350,000 surgical sutures, vascular access catheters, diagnostic tubes, and clinical hospital equipment with pan-India express delivery.',
  metadataBase: new URL('https://www.medventa.in'),
  keywords: [
    'medical supplies India',
    'hospital procurement India',
    'surgical sutures bulk',
    'Ethicon Vicryl CIF',
    'Cook Medical CVC kit',
    'BD vacutainer wholesale',
    'NABH medical consumables',
    'hospital supply chain Delhi Mumbai Bengaluru'
  ],
  alternates: {
    canonical: 'https://www.medventa.in',
  },
  openGraph: {
    title: 'MedVenta India | Institutional Medical Supplies & Healthcare Portal',
    description: 'Over 350,000 World-Class Healthcare Products – Sourced Globally. Serving Hospitals, Clinics & Healthcare Professionals Across India.',
    url: 'https://www.medventa.in',
    siteName: 'MedVenta India',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: 'https://www.medventa.in/cdn/shop/files/ChatGPT_Image_Aug_13_2025_02_02_46_PM_1536x564.png',
        width: 1536,
        height: 564,
        alt: 'MedVenta India - Institutional Medical Procurement Portal',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MedVenta India | Institutional Medical Supplies',
    description: 'Sourcing over 350,000 surgical sutures, vascular catheters, diagnostic tubes & hospital equipment pan-India.',
    images: ['https://www.medventa.in/cdn/shop/files/ChatGPT_Image_Aug_13_2025_02_02_46_PM_1536x564.png'],
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

        {/* Floating WhatsApp / Institutional RFQ Concierge Widget */}
        <a 
          href="https://wa.me/918368490741?text=Hi%20MedVenta%2C%20I%20would%20like%20to%20request%20an%20institutional%20quotation%20%2F%20hospital%20pricing%20for%20medical%20consumables."
          target="_blank"
          rel="noopener noreferrer"
          className="floating-rfq-concierge"
          aria-label="Direct WhatsApp Procurement Concierge"
        >
          <span className="ping-dot">
            <span></span>
            <span></span>
          </span>
          <span>B2B RFQ Concierge</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-emerald-400">
            <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.04 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 15 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67Z"/>
          </svg>
        </a>
      </body>
    </html>
  );
}
