import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import AnnouncementBar from '@/components/AnnouncementBar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getAllLocations } from '@/data/locations';
import { getAllCategories } from '@/data/categories';

export const metadata: Metadata = {
  title: 'Global & Domestic Medical Supply Network | 40 Healthcare Hubs | MedVenta',
  description: 'Explore MedVenta verified hospital supply corridors across 25 Indian tertiary care capitals and 15 international export gateways in the GCC and Africa.',
  alternates: {
    canonical: 'https://www.medventa.in/supply',
  },
};

export default function SupplyNetworkDirectoryPage() {
  const locations = getAllLocations();
  const categories = getAllCategories();

  const domesticLocations = locations.filter(l => l.type === 'Domestic');
  const exportLocations = locations.filter(l => l.type === 'Export');

  return (
    <div className="site-wrapper min-h-screen bg-slate-50 text-slate-900">
      <AnnouncementBar />
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-teal-800">
            <span className="h-2 w-2 rounded-full bg-teal-600"></span>
            Multimodal Clinical Logistics &amp; Export Infrastructure
          </div>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
            Hospital Supply Corridors &amp; Global Export Network
          </h1>
          <p className="mt-3 text-base text-slate-600 sm:text-lg">
            MedVenta operates direct clinical distribution across 40 healthcare capitals worldwide. From same-day OT replenishments in Indian metros to containerized ocean freight across Jebel Ali, Jeddah, and Mombasa.
          </p>
        </div>

        {/* Quick Category Matrix Strip */}
        <div className="mb-14 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-4">
            Core Medical Categories Supplied Across All Hubs:
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
            {categories.map((cat) => (
              <div
                key={cat.slug}
                className="rounded-xl border border-slate-100 bg-slate-50/70 p-3 text-center transition-all hover:bg-slate-100"
              >
                <p className="text-xs font-bold text-slate-900 leading-snug">{cat.name}</p>
                <p className="text-[10px] text-slate-500 mt-1 font-mono">{cat.hsnCode.split(' ')[0]}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Region 1: India Domestic Healthcare Hubs (25 Cities) */}
        <section className="mb-14">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-950">
                India Domestic Hospital Supply Corridors (25 Hubs)
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                CDSCO Class A–D compliant inventory, 12–24h metro transit, and 100% GST Input Tax Credit (ITC) invoicing.
              </p>
            </div>
            <span className="rounded-md bg-teal-100 px-2.5 py-1 text-xs font-semibold text-teal-900">
              Pan-India Coverage
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {domesticLocations.map((loc) => (
              <Link
                key={loc.slug}
                href={`/supply/${loc.slug}`}
                className="group flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:border-teal-600 hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>{loc.country}</span>
                    <span className="text-[10px] font-semibold text-teal-700 bg-teal-50 px-1.5 py-0.5 rounded">
                      {loc.hubType.split(' ')[0]}
                    </span>
                  </div>
                  <h3 className="mt-2 text-base font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                    {loc.name}
                  </h3>
                  <p className="mt-1 text-xs text-slate-500 line-clamp-2">
                    {loc.localDescription}
                  </p>
                </div>
                <div className="mt-4 border-t border-slate-100 pt-3 text-[11px] font-medium text-teal-800 flex items-center justify-between">
                  <span>Explore 7 Categories</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Region 2: Global Export Gateways (15 Cities: GCC & Africa) */}
        <section className="mb-14">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-950">
                Global Export &amp; Port Gateways (15 Hubs)
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                CIF / FOB Incoterms 2020, Chamber legalized Certificate of Origin, Free Sale Certificates, and MoHAP / SFDA / PPB / NAFDAC alignment.
              </p>
            </div>
            <span className="rounded-md bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-900">
              GCC &amp; Africa Tenders
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {exportLocations.map((loc) => (
              <Link
                key={loc.slug}
                href={`/supply/${loc.slug}`}
                className="group flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:border-amber-600 hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>{loc.country}</span>
                    <span className="text-[10px] font-semibold text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded">
                      {loc.region}
                    </span>
                  </div>
                  <h3 className="mt-2 text-base font-bold text-slate-900 group-hover:text-amber-700 transition-colors">
                    {loc.name}
                  </h3>
                  <p className="mt-1 text-xs text-slate-500 line-clamp-2">
                    {loc.localDescription}
                  </p>
                </div>
                <div className="mt-4 border-t border-slate-100 pt-3 text-[11px] font-medium text-amber-800 flex items-center justify-between">
                  <span>Export Dossiers</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Global Procurement Callout */}
        <div className="rounded-2xl bg-gradient-to-r from-slate-900 to-teal-950 p-8 text-white text-center shadow-xl">
          <h3 className="text-2xl font-bold">Request an Institutional Quote for Your City</h3>
          <p className="mx-auto mt-2 max-w-2xl text-sm text-slate-300">
            Whether setting up annual rate contracts for a 500-bed hospital in India or preparing containerized ocean shipments for overseas Ministry tenders, our procurement specialists provide complete pricing and documentation within 24 hours.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link
              href="/in/b2b-quote"
              className="rounded-lg bg-amber-500 px-6 py-2.5 text-sm font-bold text-slate-950 hover:bg-amber-400 transition-colors shadow"
            >
              Request Institutional Quotation
            </Link>
            <Link
              href="/blog"
              className="rounded-lg border border-slate-700 bg-slate-800/80 px-6 py-2.5 text-sm font-semibold text-white hover:bg-slate-700 transition-colors"
            >
              View 100 Technical Dossiers
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
