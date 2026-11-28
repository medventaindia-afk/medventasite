import type { Metadata } from 'next';
import React from 'react';
import HomeClient from '@/components/HomeClient';

export const metadata: Metadata = {
  title: 'Medical & Surgical Supplies Supplier in India | MedVenta India',
  description:
    'India\'s leading institutional healthcare procurement portal. Sourcing over 350,000 surgical sutures, vascular access catheters, diagnostic tubes, and clinical hospital equipment with pan-India express delivery.',
  alternates: {
    canonical: 'https://www.medventa.in',
  },
  robots: {
    index: true,
    follow: true,
  },
};

const srOnly: React.CSSProperties = {
  position: 'absolute', width: 1, height: 1, padding: 0, margin: -1,
  overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap', border: 0,
};

export default function HomePage() {
  return (
    <>
      <h1 style={srOnly}>Medical &amp; Surgical Supplies Supplier in India – Hospitals, Clinics &amp; Institutions | MedVenta India</h1>
      <HomeClient />
    </>
  );
}

