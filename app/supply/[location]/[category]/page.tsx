import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import AnnouncementBar from '@/components/AnnouncementBar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getAllLocations, getLocationBySlug } from '@/data/locations';
import { getAllCategories, getCategoryBySlug, getProductsForCategory } from '@/data/categories';

interface PageProps {
  params: {
    location: string;
    category: string;
  };
}

export async function generateStaticParams() {
  const locations = getAllLocations();
  const categories = getAllCategories();

  const paths: { location: string; category: string }[] = [];
  for (const loc of locations) {
    for (const cat of categories) {
      paths.push({
        location: loc.slug,
        category: cat.slug,
      });
    }
  }
  return paths;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const location = getLocationBySlug(params.location);
  const category = getCategoryBySlug(params.category);

  if (!location || !category) {
    return { title: 'Supply Dossier Not Found | MedVenta' };
  }

  const title = `${category.name} Bulk Supplier in ${location.name}, ${location.country} | MedVenta`;
  const description = `Hospital procurement and bulk supply of ${category.name.toLowerCase()} in ${location.name}. Verified ${location.regulatoryBody} compliance, fast transit via ${location.customsPort}, and 100% authentic inventory.`;
  const canonicalUrl = `https://www.medventa.in/supply/${location.slug}/${category.slug}`;

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
    keywords: [
      `${category.name} supplier ${location.name}`,
      `${category.name} bulk exporter ${location.name}`,
      `hospital ${category.name} ${location.name}`,
      `${category.name} price ${location.name}`,
      `${category.hsnCode} import ${location.name}`,
    ],
  };
}

export default function SupplyCategoryPage({ params }: PageProps) {
  const location = getLocationBySlug(params.location);
  const category = getCategoryBySlug(params.category);

  if (!location || !category) {
    notFound();
  }

  const matchingProducts = getProductsForCategory(category.slug);

  // Structured Data: Service + MedicalBusiness + ItemList
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: `Medical Device & Consumable Procurement: ${category.name}`,
    provider: {
      '@type': 'MedicalBusiness',
      name: 'MedVenta India',
      url: 'https://www.medventa.in',
    },
    areaServed: {
      '@type': 'City',
      name: location.name,
      containedInPlace: {
        '@type': 'Country',
        name: location.country,
      },
    },
    description: `Direct institutional supply of ${category.name} to hospitals and clinics across ${location.name}, ${location.country}.`,
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `${category.name} Catalog for ${location.name}`,
      itemListElement: matchingProducts.map((p, index) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Product',
          name: p.name,
          sku: p.sku,
          brand: p.brand,
          price: p.price,
          priceCurrency: 'INR',
        },
        position: index + 1,
      })),
    },
  };

  const whatsappMessage = encodeURIComponent(
    `Hi MedVenta, I need an institutional B2B quotation for ${category.name} in ${location.name}, ${location.country}.`
  );

  return (
    <div className="site-wrapper min-h-screen bg-slate-50 text-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <AnnouncementBar />
      <Navbar />

      {/* Breadcrumbs */}
      <nav className="border-b border-slate-200 bg-white py-3" aria-label="Breadcrumb">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ol className="flex items-center space-x-2 text-xs text-slate-500">
            <li><Link href="/" className="hover:text-[#046e82]">Home</Link></li>
            <li><span className="mx-1 text-slate-300">/</span></li>
            <li><Link href="/supply" className="hover:text-[#046e82]">Supply Network</Link></li>
            <li><span className="mx-1 text-slate-300">/</span></li>
            <li><Link href={`/supply/${location.slug}`} className="hover:text-[#046e82]">{location.name}</Link></li>
            <li><span className="mx-1 text-slate-300">/</span></li>
            <li className="font-semibold text-[#0F2D4E] truncate max-w-[200px] sm:max-w-none" aria-current="page">
              {category.name}
            </li>
          </ol>
        </div>
      </nav>

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Hero Section with Playfair Display 800 & Live Pulsing Badge */}
        <div className="mb-10 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
          <div className="badge-pill mb-3">
            <span className="badge-dot"></span>
            {location.name} Supply Corridor &bull; HSN {category.hsnCode.split(' ')[0]}
          </div>

          <h1 className="aesthetic-title text-left !text-2xl sm:!text-3xl lg:!text-4xl !leading-[1.15] !mb-3">
            {category.name} Bulk Supplier in{' '}
            <span className="text-gradient">{location.name}, {location.country}</span>
          </h1>

          <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base max-w-4xl">
            MedVenta coordinates specialized institutional procurement of <strong>{category.name.toLowerCase()}</strong> for operating suites, intensive care units, and clinical laboratories throughout {location.name}. All inventory is fully verified under {location.regulatoryBody} guidelines, serialized with batch test reports, and dispatched via {location.customsPort}.
          </p>

          <div className="mt-6 flex flex-wrap gap-4">
            <Link
              href={`/in/b2b-quote?location=${encodeURIComponent(location.name)}&category=${encodeURIComponent(category.name)}`}
              className="rounded-lg bg-[#046e82] px-6 py-2.5 text-sm font-bold text-white hover:bg-[#015a6b] transition-colors shadow-sm"
            >
              Request {location.name} Institutional Quote
            </Link>
            <a
              href={`https://wa.me/919999999999?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-emerald-300 bg-emerald-50 px-6 py-2.5 text-sm font-semibold text-emerald-800 hover:bg-emerald-100 transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.698c.971.531 1.771.821 2.796.821 3.183 0 5.768-2.587 5.769-5.766.001-3.182-2.585-5.768-5.769-5.768zm3.396 8.161c-.144.405-.837.774-1.17.822-.312.043-.684.06-2.18-.558-1.745-.724-2.87-2.485-2.957-2.601-.088-.116-.708-.941-.708-1.796 0-.855.449-1.277.608-1.45.16-.174.348-.217.464-.217.116 0 .232.001.333.006.107.005.249-.041.391.3.144.348.491 1.199.534 1.286.043.087.072.188.014.303-.058.116-.087.188-.174.289l-.261.304c-.087.087-.179.183-.077.357.101.174.449.741.964 1.201.662.591 1.221.774 1.395.861.174.086.275.072.376-.044.101-.116.434-.506.549-.68.116-.174.232-.145.39-.087s1.011.477 1.184.564.289.13.333.202c.044.072.044.419-.1.824z"/>
              </svg>
              Quick WhatsApp Inquiry
            </a>
          </div>
        </div>

        {/* Localized Regulatory & Logistics Banner */}
        <div className="mb-12 rounded-xl border border-slate-200 bg-gradient-to-r from-[#0F2D4E] to-[#046e82] p-6 text-white shadow-sm">
          <h2 className="text-sm font-bold uppercase tracking-wider text-cyan-300">
            Local Logistics &amp; Regulatory Checkpoints: {location.name}
          </h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3 text-xs">
            <div className="bg-slate-800/60 p-3.5 rounded-lg border border-white/10">
              <span className="text-slate-300 block mb-1 font-semibold">Regulatory Standard:</span>
              <span className="text-white font-medium">{location.regulatoryBody}</span>
            </div>
            <div className="bg-slate-800/60 p-3.5 rounded-lg border border-white/10">
              <span className="text-slate-300 block mb-1 font-semibold">Port &amp; Freight Corridor:</span>
              <span className="text-white font-medium">{location.customsPort}</span>
            </div>
            <div className="bg-slate-800/60 p-3.5 rounded-lg border border-white/10">
              <span className="text-slate-300 block mb-1 font-semibold">Transit &amp; Delivery Window:</span>
              <span className="text-white font-medium">{location.deliveryLeadTime}</span>
            </div>
          </div>
          <p className="mt-4 text-[11px] text-slate-300">
            <strong>Fiscal Treatment:</strong> {location.taxOrDuty}
          </p>
        </div>

        {/* Live Catalog Products Matching this Category with Product Images */}
        <section className="mb-14">
          <div className="border-b border-slate-200 pb-4 mb-6">
            <h2 className="text-2xl font-bold text-[#0F2D4E]">
              Featured {category.name} Inventory for {location.name}
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Direct dispatch from MedVenta central warehouses. Instant checkout or volume hospital rate contracts.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {matchingProducts.map((product) => (
              <div
                key={product.id}
                className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-[#046e82] hover:shadow-md group"
              >
                <div>
                  {/* Real Product Image */}
                  <div className="relative mb-4 h-44 w-full overflow-hidden rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center p-3">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span className="font-semibold text-[#046e82]">{product.brand}</span>
                    <span className="font-mono text-slate-500">SKU: {product.sku}</span>
                  </div>

                  <h3 className="mt-3 text-base font-bold text-[#0F2D4E] leading-snug hover:text-[#046e82] transition-colors">
                    <Link href={`/products/${product.handle}`}>
                      {product.name}
                    </Link>
                  </h3>

                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="text-xl font-extrabold text-[#0F2D4E]">
                      ₹{product.price.toLocaleString('en-IN')}
                    </span>
                    {product.compareAtPrice && (
                      <span className="text-xs text-slate-400 line-through">
                        ₹{product.compareAtPrice.toLocaleString('en-IN')}
                      </span>
                    )}
                    <span className="text-[10px] text-slate-500">(Excl. GST)</span>
                  </div>

                  <p className="mt-2 text-xs text-slate-600 line-clamp-2">
                    {product.specs}
                  </p>

                  <div className="mt-4 space-y-1.5 border-t border-slate-100 pt-3 text-[11px]">
                    {product.technicalSpecs.slice(0, 3).map((spec, i) => (
                      <div key={i} className="flex justify-between">
                        <span className="text-slate-500">{spec.label}:</span>
                        <span className="text-slate-800 font-semibold truncate max-w-[170px]">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 border-t border-slate-100 pt-4 space-y-2">
                  <Link
                    href={`/products/${product.handle}`}
                    className="block w-full text-center rounded-lg bg-[#046e82] py-2.5 text-xs font-bold text-white hover:bg-[#015a6b] transition-colors shadow-sm"
                  >
                    BUY NOW — INSTANT CHECKOUT
                  </Link>
                  <Link
                    href={`/in/b2b-quote?location=${encodeURIComponent(location.name)}&product=${encodeURIComponent(product.name)}`}
                    className="block w-full text-center rounded-lg border border-amber-600 bg-amber-500 py-2 text-xs font-bold text-slate-950 hover:bg-amber-400 transition-colors shadow-sm"
                  >
                    REQUEST {location.name.toUpperCase()} RFQ
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Regulatory Compliance & QA Protocols */}
        <section className="mb-14 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-xl font-bold text-[#0F2D4E]">
            Procurement Protocols &amp; Statutory Compliance for {location.name}
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-[#046e82]">
                1. Regulatory Harmonization ({location.regulatoryBody})
              </h3>
              <p className="text-xs leading-relaxed text-slate-600">
                All consignments routed to {location.name} arrive with factory sterilization certificates (EtO / Gamma), complete lot traceability, and authentic manufacturer Certificates of Analysis (CoA). International deliveries include Chamber of Commerce attested Certificates of Origin.
              </p>
            </div>
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-[#046e82]">
                2. Multimodal Transit via {location.customsPort}
              </h3>
              <p className="text-xs leading-relaxed text-slate-600">
                Shipments adhere to standard delivery timelines of {location.deliveryLeadTime}. Temperature-controlled thermal packaging protects sensitive polymers, surgical adhesives, and IV cannulas against thermal degradation during sea or air transit.
              </p>
            </div>
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-[#046e82]">
                3. Fiscal Advantage ({location.taxOrDuty})
              </h3>
              <p className="text-xs leading-relaxed text-slate-600">
                Buyers in {location.name} benefit from compliant invoicing under {category.hsnCode}. Domestic hospitals receive 100% GST Input Tax Credit (ITC) reconciliation in GSTR-2B, while export consignments are billed with zero-duty tariffs where eligible.
              </p>
            </div>
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-[#046e82]">
                4. Institutional Rate Contracts
              </h3>
              <p className="text-xs leading-relaxed text-slate-600">
                MedVenta enters into 12-to-24 month annual rate contracts with hospital purchasing consortiums in {location.name}, locking in volume discounts, reserving buffer stock, and protecting health facilities against global price shocks.
              </p>
            </div>
          </div>
        </section>

        {/* Other Medical Categories for this Location */}
        <section className="mb-14">
          <h2 className="text-lg font-bold text-[#0F2D4E] mb-4">
            Other Medical Supply Lines for {location.name}
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
            {getAllCategories()
              .filter((c) => c.slug !== category.slug)
              .map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/supply/${location.slug}/${cat.slug}`}
                  className="rounded-xl border border-slate-200 bg-white p-4 text-center shadow-sm hover:border-[#046e82] hover:shadow-md transition-all group"
                >
                  <p className="text-xs font-bold text-[#0F2D4E] group-hover:text-[#046e82]">
                    {cat.name}
                  </p>
                  <p className="text-[10px] text-slate-400 mt-1 font-mono">
                    HSN {cat.hsnCode.split(' ')[0]}
                  </p>
                </Link>
              ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
