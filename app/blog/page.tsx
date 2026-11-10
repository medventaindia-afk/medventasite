import type { Metadata } from 'next';
import BlogIndexClient from './BlogIndexClient';

export const metadata: Metadata = {
  title: 'Clinical Procurement & Medical Export Knowledge Hub | MedVenta India',
  description:
    'Technical guides on CDSCO medical device imports, Incoterms 2020 CIF/FOB exports, Ethicon/Medtronic sutures, CVC vascular access, and hospital rate contracts.',
  alternates: {
    canonical: 'https://www.medventa.in/blog',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function BlogIndexPage() {
  return <BlogIndexClient />;
}

