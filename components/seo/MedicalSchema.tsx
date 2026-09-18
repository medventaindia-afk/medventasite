import React from 'react';

export default function MedicalSchema() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'MedicalOrganization',
    name: 'Medventa',
    legalName: 'Medventa Healthcare Solutions',
    url: 'https://medventa.in',
    logo: 'https://medventa.in/logo.png',
    description: 'Premier B2B healthcare distributor and medical equipment supplier in India, providing over 350,000 surgical supplies, sutures, lab consumables, catheters, and advanced wound care products to hospitals and clinics across Delhi NCR, Mumbai, Bengaluru, and pan-India.',
    telephone: '+918368490741',
    email: 'info@medventa.in',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'M-135, 2nd Floor, Connaught Place',
      addressLocality: 'New Delhi',
      addressRegion: 'Delhi',
      postalCode: '110001',
      addressCountry: 'IN'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '28.6328',
      longitude: '77.2197'
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday'
        ],
        opens: '10:00',
        closes: '18:00'
      }
    ],
    areaServed: [
      'Delhi NCR',
      'Mumbai',
      'Bengaluru',
      'Chennai',
      'Hyderabad',
      'Kolkata',
      'Pune',
      'Ahmedabad',
      'India'
    ],
    knowsAbout: [
      'Surgical Supplies',
      'Medical Disposables',
      'Becton Dickinson Vacutainers',
      'Medtronic Sutures',
      'Welch Allyn Diagnostics',
      'Nephrology Catheters',
      'Advanced Wound Care'
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
    />
  );
}
