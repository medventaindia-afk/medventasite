import type { Metadata } from 'next';
import HomeClient from '@/components/HomeClient';

export const metadata: Metadata = {
  title: 'MedVenta India | Institutional Medical Supplies & Surgical Consumables Portal',
  description:
    'India\'s leading institutional healthcare procurement portal. Sourcing over 350,000 surgical sutures, vascular access catheters, diagnostic tubes, and clinical hospital equipment.',
  alternates: {
    canonical: 'https://www.medventa.in',
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function IndiaPage() {
  return <HomeClient />;
}
