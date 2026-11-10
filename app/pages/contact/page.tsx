import type { Metadata } from 'next';
import ContactClient from './ContactClient';

export const metadata: Metadata = {
  title: 'Contact Institutional Procurement Desk | MedVenta India',
  description:
    'Contact MedVenta India corporate procurement desk in Connaught Place, New Delhi (+91 8368490741 / info@medventa.in) for hospital supplies and tender support.',
  alternates: {
    canonical: 'https://www.medventa.in/pages/contact',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ContactPage() {
  return <ContactClient />;
}

