import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import AnnouncementBar from '@/components/AnnouncementBar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getAllLocations, getLocationBySlug } from '@/data/locations';
import { getAllCategories } from '@/data/categories';

interface PageProps {
  params: { location: string };
}

export async function generateStaticParams() {
  const locations = getAllLocations();
  return locations.map((loc) => ({
    location: loc.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const location = getLocationBySlug(params.location);
  if (!location) {
    return { title: 'Location Not Found | MedVenta' };
  }

  const title = `Hospital Medical Supply Hub in ${location.name}, ${location.country} | MedVenta`;
  const description = `Direct medical device and surgical consumable supply across ${location.name}. Verified ${location.regulatoryBody} compliance, fast transit via ${location.customsPort}, and institutional pricing.`;
  const canonicalUrl = `https://www.medventa.in/supply/${location.slug}`;

  return {
    title,
    description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: 'website',
      siteName: 'MedVenta India',
    },
  };
}

export default function LocationMasterHubPage({ params }: PageProps) {
  const location = getLocationBySlug(params.location);
  if (!location) {
    notFound();
  }

  const categories = getAllCategories();

  // Schema: LocalBusiness / MedicalBusiness
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MedicalBusiness',
    name: `MedVenta Medical Supply Hub - ${location.name}`,
    url: `https://www.medventa.in/supply/${location.slug}`,
    description: `Clinical device and surgical consumables distribution hub serving hospitals and clinics in ${location.name}, ${location.country}.`,
    serviceArea: {
      '@type': 'City',
      name: location.name,
      containedInPlace: {
        '@type': 'Country',
        name: location.country,
      },
    },
    currenciesAccepted: location.type === 'Export' ? 'USD, EUR, AED' : 'INR',
    paymentAccepted: 'Wire Transfer, Letter of Credit (LC), UPI, Corporate PO Net 30',
  };

  const whatsappMessage = encodeURIComponent(
    `Hi MedVenta, I am looking for medical supplies and hospital rate contract pricing in ${location.name}, ${location.country}.`
  );

  return (
    <div className="site-wrapper min-h-screen bg-slate-50 text-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <AnnouncementBar />
      <Navbar />

      {/* Breadcrumb */}
      <nav className="border-b border-slate-200 bg-white py-3" aria-label="Breadcrumb">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ol className="flex items-center space-x-2 text-xs text-slate-500">
            <li><Link href="/" className="hover:text-teal-700">Home</Link></li>
            <li><span className="mx-1 text-slate-300">/</span></li>
            <li><Link href="/supply" className="hover:text-teal-700">Supply Network</Link></li>
            <li><span className="mx-1 text-slate-300">/</span></li>
            <li className="font-semibold text-slate-900" aria-current="page">{location.name}</li>
          </ol>
        </div>
      </nav>

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* City Hero */}
        <div className="mb-10 rounded-2xl border border-slate-200 bg-gradient-to-br from-[#0F2D4E] via-[#0a1e35] to-[#046e82] p-8 text-white shadow-xl sm:p-12">
          <div className="badge-pill !bg-white/10 !border-white/20 !text-cyan-300 mb-4">
            <span className="badge-dot"></span>
            {location.type === 'Export' ? 'International Export Gateway' : 'Domestic Healthcare Capital'} &bull; {location.hubType}
          </div>

          <h1 className="aesthetic-title text-left !text-3xl sm:!text-4xl lg:!text-5xl !text-white !mb-4">
            Hospital Medical Device Supply Hub: <span className="text-cyan-300">{location.name}</span>
          </h1>

          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-200 sm:text-base">
            {location.localDescription} MedVenta coordinates direct manufacturer-to-hospital delivery of CDSCO, CE 0123, and FDA 510(k) cleared surgical devices, vascular catheters, diagnostic instrumentation, and wound closure sutures.
          </p>

          <div className="mt-6 flex flex-wrap gap-4">
            <Link
              href={`/in/b2b-quote?location=${encodeURIComponent(location.name)}`}
              className="rounded-lg bg-amber-500 px-6 py-2.5 text-sm font-bold text-slate-950 hover:bg-amber-400 transition-colors shadow"
            >
              Request {location.name} Hospital Quotation
            </Link>
            <a
              href={`https://wa.me/919999999999?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-800/80 px-6 py-2.5 text-sm font-semibold text-white hover:bg-slate-700 transition-colors"
            >
              WhatsApp Local Representative
            </a>
          </div>
        </div>

        {/* Local Logistics & Regulatory Framework Grid */}
        <div className="mb-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="text-xs font-bold uppercase tracking-wider text-teal-800">
              Regulatory Jurisdiction
            </div>
            <h3 className="mt-2 text-sm font-bold text-slate-900">
              {location.regulatoryBody}
            </h3>
            <p className="mt-1 text-xs text-slate-500">
              Full documentation with Free Sale Certificates (FSC) and batch-specific test reports.
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="text-xs font-bold uppercase tracking-wider text-teal-800">
              Customs Port &amp; Clearance
            </div>
            <h3 className="mt-2 text-sm font-bold text-slate-900">
              {location.customsPort}
            </h3>
            <p className="mt-1 text-xs text-slate-500">
              Pre-cleared digital customs declarations minimizing demurrage and clearance delay.
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="text-xs font-bold uppercase tracking-wider text-teal-800">
              Delivery Lead Time
            </div>
            <h3 className="mt-2 text-sm font-bold text-slate-900">
              {location.deliveryLeadTime}
            </h3>
            <p className="mt-1 text-xs text-slate-500">
              Temperature-monitored courier and container transport to central hospital stores.
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="text-xs font-bold uppercase tracking-wider text-teal-800">
              Tax &amp; Fiscal Terms
            </div>
            <h3 className="mt-2 text-sm font-bold text-slate-900">
              {location.taxOrDuty}
            </h3>
            <p className="mt-1 text-xs text-slate-500">
              Transparent invoicing ensuring 100% tax recovery or verified customs duty exemptions.
            </p>
          </div>
        </div>

        {/* 7 Specialized Product Category Hubs for this Location */}
        <section className="mb-14">
          <div className="border-b border-slate-200 pb-4 mb-6">
            <h2 className="text-2xl font-bold text-slate-950">
              Medical Product Categories Supplied in {location.name}
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Select a specialized category to review localized technical specifications, inventory availability, and tender pricing for {location.name}.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {categories.map((cat) => (
              <div
                key={cat.slug}
                className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-teal-600 hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                    <span>HSN {cat.hsnCode.split(' ')[0]}</span>
                    <span className="text-teal-700 font-semibold">{location.name} Hub</span>
                  </div>

                  <h3 className="mt-3 text-lg font-bold text-slate-900 hover:text-teal-700 transition-colors">
                    <Link href={`/supply/${location.slug}/${cat.slug}`}>
                      {cat.name} in {location.name}
                    </Link>
                  </h3>

                  <p className="mt-2 text-xs leading-relaxed text-slate-600">
                    {cat.overview}
                  </p>

                  <div className="mt-4 space-y-1.5 border-t border-slate-100 pt-3">
                    {cat.specsSummary.slice(0, 2).map((s, idx) => (
                      <div key={idx} className="flex justify-between text-[11px]">
                        <span className="text-slate-500 font-medium">{s.label}:</span>
                        <span className="text-slate-800 font-semibold truncate max-w-[160px]">{s.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 border-t border-slate-100 pt-4 flex items-center justify-between">
                  <Link
                    href={`/supply/${location.slug}/${cat.slug}`}
                    className="text-xs font-bold text-teal-800 hover:text-teal-900 inline-flex items-center gap-1"
                  >
                    View Local Supply Dossier →
                  </Link>
                  <Link
                    href={`/in/b2b-quote?location=${encodeURIComponent(location.name)}&category=${encodeURIComponent(cat.name)}`}
                    className="rounded bg-amber-50 px-2.5 py-1 text-[11px] font-semibold text-amber-800 hover:bg-amber-100"
                  >
                    Get Quote
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Notable Hospital Networks Section */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
          <h2 className="text-base font-bold text-slate-900">
            Key Institutional Clients &amp; Hospital Networks in {location.name}
          </h2>
          <p className="mt-1 text-xs text-slate-500">
            MedVenta clinical consumables and devices are compatible with OT and ICU protocols across premier healthcare facilities:
          </p>
          <div className="mt-4 flex flex-wrap gap-2.5">
            {location.keyHospitals.map((hosp, i) => (
              <span
                key={i}
                className="rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-1.5 text-xs font-semibold text-slate-800"
              >
                🏥 {hosp}
              </span>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
