import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import AnnouncementBar from '@/components/AnnouncementBar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TechnicalDiagram from '@/components/blog/TechnicalDiagram';
import { 
  getAllBlogPosts, 
  getBlogPostBySlug, 
  getRelatedPosts, 
  type EnrichedBlogPost 
} from '@/data/seoBlogService';
import { PRODUCTS } from '@/data/products';

interface PageProps {
  params: { slug: string };
}

// 1. Generate Static Params for all 100 blog posts
export async function generateStaticParams() {
  const posts = getAllBlogPosts();
  return posts.map(post => ({
    slug: post.slug,
  }));
}

// 2. Generate SEO Metadata
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = getBlogPostBySlug(params.slug);
  if (!post) {
    return {
      title: 'Technical Dossier Not Found | MedVenta',
      description: 'The requested medical procurement dossier was not found.',
    };
  }

  const title = `${post.title} | MedVenta`;
  const description = post.directAnswer.slice(0, 160);
  const canonicalUrl = `https://www.medventa.in/blog/${post.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: 'article',
      publishedTime: post.publishedDate,
      authors: [post.author.name],
      siteName: 'MedVenta India',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    keywords: [post.primaryKeyword, ...post.secondaryKeywords, ...post.entities],
  };
}

export default function BlogPostDetailPage({ params }: PageProps) {
  const post = getBlogPostBySlug(params.slug);
  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(post.id, 4);

  // Match a related MedVenta catalog product for direct Buy Now & Quote hooks
  const matchedProduct = PRODUCTS.find(p => {
    const titleLower = post.title.toLowerCase();
    const handleLower = p.handle.toLowerCase();
    if (titleLower.includes('vicryl') || titleLower.includes('polysorb')) {
      return handleLower.includes('polysorb') || handleLower.includes('suture');
    }
    if (titleLower.includes('prolene')) {
      return handleLower.includes('prolene');
    }
    if (titleLower.includes('stapler')) {
      return handleLower.includes('surgiclip');
    }
    if (titleLower.includes('cvc') || titleLower.includes('lumen')) {
      return handleLower.includes('cvc') || handleLower.includes('triple-lumen');
    }
    if (titleLower.includes('cannula') || titleLower.includes('insyte')) {
      return handleLower.includes('insyte');
    }
    if (titleLower.includes('vacutainer') || titleLower.includes('blood tube')) {
      return handleLower.includes('vacutainer') || handleLower.includes('sarstedt');
    }
    if (titleLower.includes('otoscope') || titleLower.includes('ophthalmoscope')) {
      return handleLower.includes('welch-allyn');
    }
    if (titleLower.includes('gel') || titleLower.includes('vitastem')) {
      return handleLower.includes('vitastem');
    }
    return false;
  }) || PRODUCTS[0];

  // Dual Schema: MedicalWebPage + FAQPage + Article
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'MedicalWebPage',
        '@id': `https://www.medventa.in/blog/${post.slug}#webpage`,
        url: `https://www.medventa.in/blog/${post.slug}`,
        name: post.title,
        description: post.directAnswer,
        aspect: ['Overview', 'Specifications', 'Regulatory', 'Procurement'],
        medicalAudience: {
          '@type': 'MedicalAudience',
          audienceType: 'Healthcare Professionals, Hospital Purchase Directors, Surgeons, Tender Authorities',
        },
        about: {
          '@type': 'MedicalDevice',
          name: post.primaryKeyword,
          description: post.directAnswer,
        },
        reviewedBy: {
          '@type': 'Person',
          name: post.author.name,
          jobTitle: post.author.role,
          description: post.author.credentials,
        },
        publisher: {
          '@type': 'Organization',
          name: 'MedVenta India',
          url: 'https://www.medventa.in',
          logo: {
            '@type': 'ImageObject',
            url: 'https://www.medventa.in/cdn/shop/files/medventa_logo.png',
          },
        },
      },
      {
        '@type': 'Article',
        '@id': `https://www.medventa.in/blog/${post.slug}#article`,
        headline: post.title,
        datePublished: post.publishedDate,
        dateModified: '2026-09-16',
        author: {
          '@type': 'Person',
          name: post.author.name,
          jobTitle: post.author.role,
          description: post.author.credentials,
          worksFor: {
            '@type': 'Organization',
            name: 'MedVenta India',
          },
        },
        reviewedBy: {
          '@type': 'Person',
          name: post.author.name,
          jobTitle: post.author.role,
        },
        publisher: {
          '@type': 'Organization',
          name: 'MedVenta India',
          url: 'https://www.medventa.in',
        },
        mainEntityOfPage: `https://www.medventa.in/blog/${post.slug}`,
      },
      {
        '@type': 'FAQPage',
        '@id': `https://www.medventa.in/blog/${post.slug}#faq`,
        mainEntity: [
          {
            '@type': 'Question',
            name: post.featuredQuestion,
            acceptedAnswer: {
              '@type': 'Answer',
              text: post.directAnswer,
            },
          },
          ...post.paaQueries.map((q, idx) => ({
            '@type': 'Question',
            name: q,
            acceptedAnswer: {
              '@type': 'Answer',
              text: post.faqAnswers[idx] || post.directAnswer,
            },
          })),
        ],
      },
    ],
  };

  const whatsappMessage = encodeURIComponent(
    `Hi MedVenta, I am viewing your technical dossier on "${post.title}" and would like to request an institutional quotation / CIF pricing.`
  );

  return (
    <div className="site-wrapper min-h-screen bg-slate-50 text-slate-900">
      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <AnnouncementBar />
      <Navbar />

      {/* Breadcrumb Navigation */}
      <nav className="border-b border-slate-200 bg-white py-3" aria-label="Breadcrumb">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ol className="flex items-center space-x-2 text-xs text-slate-500">
            <li>
              <Link href="/" className="hover:text-[#046e82] transition-colors">Home</Link>
            </li>
            <li>
              <span className="mx-1 text-slate-300">/</span>
            </li>
            <li>
              <Link href="/blog" className="hover:text-[#046e82] transition-colors">Knowledge Base</Link>
            </li>
            <li>
              <span className="mx-1 text-slate-300">/</span>
            </li>
            <li>
              <span className="text-slate-500 font-medium">{post.category}</span>
            </li>
            <li>
              <span className="mx-1 text-slate-300">/</span>
            </li>
            <li className="truncate font-semibold text-[#0F2D4E] max-w-[280px] sm:max-w-md" aria-current="page">
              {post.primaryKeyword}
            </li>
          </ol>
        </div>
      </nav>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* Main Article Content (8 Cols) */}
          <article className="lg:col-span-8">
            {/* Header & Category Badge */}
            <div className="border-b border-slate-200 pb-6">
              <div className="badge-pill">
                <span className="badge-dot"></span>
                {post.category} &bull; Hospital Procurement Dossier
              </div>

              {/* Aesthetic Luxury H1 */}
              <h1 className="aesthetic-title text-left !text-2xl sm:!text-3xl md:!text-4xl lg:!text-[2.75rem] !leading-[1.15] !mb-4">
                {post.title}
              </h1>

              {/* Author & Verification Card */}
              <div className="mt-4 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#0F2D4E] text-sm font-bold text-white shadow-inner">
                    VM
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-[#0F2D4E]">{post.author.name}</span>
                      <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold text-emerald-800">
                        Verified Clinical Review
                      </span>
                    </div>
                    <p className="text-xs text-slate-600">{post.author.role}</p>
                    <p className="text-[11px] text-slate-500">{post.author.credentials}</p>
                  </div>
                </div>

                <div className="text-right text-xs text-slate-600">
                  <p className="font-bold text-[#0F2D4E]">ISO 13485:2016 Certified Facility</p>
                  <p className="text-slate-500">CDSCO / CE 0123 / US FDA 510(k)</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">Read time: {post.readTime} &bull; Updated Sept 2026</p>
                </div>
              </div>
            </div>

            {/* Featured Snippet Box (Direct Answer) */}
            <div className="my-8 rounded-r-xl border-l-4 border-[#0169A9] bg-[#F0F9FF] p-6 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0169A9]">
                <span className="text-base">⚡</span>
                Executive Procurement Summary &amp; Direct Answer
              </div>
              <h2 className="mt-2 text-base font-bold text-[#0F2D4E] sm:text-lg">
                Q: {post.featuredQuestion}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-800 sm:text-base">
                {post.directAnswer}
              </p>
              <div className="mt-4 flex flex-wrap gap-2 text-xs text-[#0F2D4E] font-medium pt-3 border-t border-sky-100">
                <span><strong>Primary Target:</strong> {post.primaryKeyword}</span>
                <span>•</span>
                <span><strong>Regulatory Classification:</strong> {post.schemaType}</span>
                <span>•</span>
                <span><strong>Procurement Scope:</strong> {post.bucket}</span>
              </div>
            </div>

            {/* Section 1: Clinical & Regulatory Framework */}
            <section className="my-8">
              <h2 className="text-xl font-bold text-[#0F2D4E] sm:text-2xl mb-3">
                {post.sections[0]?.heading || '1. Clinical Indication, Pathology & Regulatory Architecture'}
              </h2>
              <div className="text-sm leading-relaxed text-slate-700 sm:text-base whitespace-pre-line space-y-4">
                {post.sections[0]?.content}
              </div>
            </section>

            {/* Section 2: Technical Specifications Matrix (HTML Table) */}
            <section className="my-10">
              <h2 className="text-xl font-bold text-[#0F2D4E] sm:text-2xl mb-2">
                {post.sections[1]?.heading || '2. Engineering Specifications & Comparative Performance Matrix'}
              </h2>
              <p className="text-sm text-slate-600 mb-4">
                {post.sections[1]?.content}
              </p>

              <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
                  <thead className="bg-slate-100 text-xs font-bold uppercase tracking-wider text-[#0F2D4E]">
                    <tr>
                      <th scope="col" className="px-6 py-3.5">Engineering / Regulatory Parameter</th>
                      <th scope="col" className="px-6 py-3.5">Verified Specification &amp; Standard</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {post.specsTable.map((row, idx) => (
                      <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/70'}>
                        <td className="whitespace-nowrap px-6 py-3.5 font-semibold text-[#0F2D4E] text-xs sm:text-sm">
                          {row.param}
                        </td>
                        <td className="px-6 py-3.5 text-xs sm:text-sm text-slate-700">
                          {row.spec}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Section 3: Technical Vector Diagram / Schematic */}
            <figure className="my-8 border border-slate-200 rounded-2xl p-6 bg-white shadow-sm">
              <TechnicalDiagram type={post.diagramType} title={post.title} />
              <figcaption className="text-xs text-slate-500 text-center mt-3 font-mono">
                Figure 1.1: Technical Schematic &amp; Quality Tolerance Architecture — {post.primaryKeyword}
              </figcaption>
            </figure>

            {/* Section 4: Operational Logistics & Port Protocols */}
            {post.sections[2] && (
              <section className="my-8">
                <h2 className="text-xl font-bold text-[#0F2D4E] sm:text-2xl mb-3">
                  {post.sections[2].heading}
                </h2>
                <div className="text-sm leading-relaxed text-slate-700 sm:text-base whitespace-pre-line space-y-4">
                  {post.sections[2].content}
                </div>
              </section>
            )}

            {/* Section 5: Financial Optimization & Incoterms */}
            {post.sections[3] && (
              <section className="my-8">
                <h2 className="text-xl font-bold text-[#0F2D4E] sm:text-2xl mb-3">
                  {post.sections[3].heading}
                </h2>
                <div className="text-sm leading-relaxed text-slate-700 sm:text-base whitespace-pre-line space-y-4">
                  {post.sections[3].content}
                </div>
              </section>
            )}

            {/* In-Content Matched Product RFQ Box with Product Image */}
            <div className="my-10 bg-gradient-to-br from-white to-slate-50 border-2 border-[#046e82] rounded-2xl p-6 shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-5 w-full md:w-auto">
                <div className="relative h-28 w-28 flex-shrink-0 overflow-hidden rounded-xl bg-white border border-slate-200 flex items-center justify-center p-2 shadow-sm">
                  <img
                    src={matchedProduct.image}
                    alt={matchedProduct.name}
                    className="h-full w-full object-contain"
                  />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full uppercase tracking-wider">
                    In Stock &bull; Batch Certified
                  </span>
                  <h3 className="text-base md:text-lg font-bold text-[#0F2D4E] mt-2 leading-snug">
                    {matchedProduct.name}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1">
                    Brand: <strong>{matchedProduct.brand}</strong> &bull; SKU: {matchedProduct.sku}
                  </p>
                  <div className="mt-2 text-base font-extrabold text-[#0F2D4E]">
                    ₹{matchedProduct.price.toLocaleString('en-IN')}{' '}
                    <span className="text-xs font-normal text-slate-500">(Excl. GST &bull; 100% ITC Eligible)</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto flex-shrink-0">
                <Link
                  href={`/products/${matchedProduct.handle}`}
                  className="inline-flex items-center justify-center rounded-lg bg-[#046e82] px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-[#015a6b] transition-colors text-center"
                >
                  Buy Online
                </Link>
                <a
                  href={`https://wa.me/919999999999?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-lg border border-amber-600 bg-amber-500 px-5 py-2.5 text-xs font-bold text-slate-950 hover:bg-amber-400 transition-colors shadow-sm text-center"
                >
                  Request Hospital Quote
                </a>
              </div>
            </div>

            {/* Section 6: Hospital Store Intake, Inspection & QA Protocol */}
            {post.sections[4] && (
              <section className="my-8">
                <h2 className="text-xl font-bold text-[#0F2D4E] sm:text-2xl mb-3">
                  {post.sections[4].heading}
                </h2>
                <div className="text-sm leading-relaxed text-slate-700 sm:text-base whitespace-pre-line space-y-4">
                  {post.sections[4].content}
                </div>
              </section>
            )}

            {/* Section 7: FAQ Accordion (PAA Queries) */}
            <section className="my-10 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
              <div className="border-b border-slate-200 pb-4 mb-6">
                <h2 className="text-xl font-bold text-[#0F2D4E] sm:text-2xl">
                  Frequently Asked Questions (Clinical, Logistics &amp; Regulatory)
                </h2>
                <p className="mt-1 text-xs text-slate-500">
                  Standard regulatory, shipping, and tax credit queries addressed by MedVenta clinical procurement specialists.
                </p>
              </div>

              <div className="space-y-4">
                {post.paaQueries.map((query, index) => (
                  <details
                    key={index}
                    className="group rounded-xl border border-slate-200 bg-slate-50/50 p-4 transition-colors hover:bg-slate-50 open:bg-white open:shadow-sm"
                  >
                    <summary className="flex cursor-pointer items-center justify-between font-semibold text-[#0F2D4E] text-sm sm:text-base list-none">
                      <span className="pr-4">{query}</span>
                      <span className="ml-2 flex-shrink-0 text-slate-400 group-open:rotate-180 transition-transform">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="6 9 12 15 18 9"/>
                        </svg>
                      </span>
                    </summary>
                    <div className="mt-3 border-t border-slate-100 pt-3 text-xs sm:text-sm leading-relaxed text-slate-600">
                      {post.faqAnswers[index] || post.directAnswer}
                    </div>
                  </details>
                ))}
              </div>
            </section>

            {/* Semantic Entities Footer Tag Pool */}
            <div className="my-8 rounded-xl border border-slate-200 bg-white p-5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#0F2D4E]">
                Verified Medical &amp; Regulatory Entities in this Dossier
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {post.entities.map((entity, i) => (
                  <span
                    key={i}
                    className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-700"
                  >
                    {entity}
                  </span>
                ))}
              </div>
            </div>
          </article>

          {/* Right Sidebar: Contextual Conversion Widgets (4 Cols) */}
          <aside className="lg:col-span-4 space-y-6">
            {/* 1. Contextual Catalog Matched Product Card with Real Image */}
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm sticky top-24">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="rounded bg-teal-50 px-2 py-0.5 text-xs font-bold text-[#046e82]">
                  Featured Supply Line
                </span>
                <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-emerald-500"></span> In Stock
                </span>
              </div>

              {/* Product Image Preview */}
              <div className="relative mt-4 mb-3 h-44 w-full overflow-hidden rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center p-3">
                <img
                  src={matchedProduct.image}
                  alt={matchedProduct.name}
                  className="h-full w-full object-contain"
                />
              </div>

              <div>
                <h3 className="text-sm font-bold text-[#0F2D4E] leading-snug">
                  {matchedProduct.name}
                </h3>
                <p className="mt-1 text-xs text-slate-500">
                  Brand: <strong className="text-slate-800">{matchedProduct.brand}</strong> &bull; SKU: {matchedProduct.sku}
                </p>

                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-xl font-extrabold text-[#0F2D4E]">
                    ₹{matchedProduct.price.toLocaleString('en-IN')}
                  </span>
                  {matchedProduct.compareAtPrice && (
                    <span className="text-xs text-slate-400 line-through">
                      ₹{matchedProduct.compareAtPrice.toLocaleString('en-IN')}
                    </span>
                  )}
                  <span className="text-[10px] text-slate-500">(Excl. GST)</span>
                </div>

                <p className="mt-2 text-xs text-slate-600 line-clamp-2">
                  {matchedProduct.specs}
                </p>

                {/* Conversion Buttons */}
                <div className="mt-5 space-y-2.5">
                  <Link
                    href={`/products/${matchedProduct.handle}`}
                    className="block w-full text-center rounded-lg bg-[#046e82] py-2.5 text-xs font-bold text-white shadow-sm hover:bg-[#015a6b] transition-colors"
                  >
                    BUY NOW — INSTANT CHECKOUT
                  </Link>

                  <Link
                    href={`/in/b2b-quote?product=${encodeURIComponent(matchedProduct.name)}`}
                    className="block w-full text-center rounded-lg border border-amber-600 bg-amber-500 py-2.5 text-xs font-bold text-slate-950 hover:bg-amber-400 transition-colors shadow-sm"
                  >
                    REQUEST INSTITUTIONAL QUOTE
                  </Link>

                  <a
                    href={`https://wa.me/919999999999?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full rounded-lg border border-emerald-300 bg-emerald-50 py-2.5 text-xs font-semibold text-emerald-800 hover:bg-emerald-100 transition-colors"
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.698c.971.531 1.771.821 2.796.821 3.183 0 5.768-2.587 5.769-5.766.001-3.182-2.585-5.768-5.769-5.768zm3.396 8.161c-.144.405-.837.774-1.17.822-.312.043-.684.06-2.18-.558-1.745-.724-2.87-2.485-2.957-2.601-.088-.116-.708-.941-.708-1.796 0-.855.449-1.277.608-1.45.16-.174.348-.217.464-.217.116 0 .232.001.333.006.107.005.249-.041.391.3.144.348.491 1.199.534 1.286.043.087.072.188.014.303-.058.116-.087.188-.174.289l-.261.304c-.087.087-.179.183-.077.357.101.174.449.741.964 1.201.662.591 1.221.774 1.395.861.174.086.275.072.376-.044.101-.116.434-.506.549-.68.116-.174.232-.145.39-.087s1.011.477 1.184.564.289.13.333.202c.044.072.044.419-.1.824z"/>
                    </svg>
                    WhatsApp RFQ Dispatch
                  </a>
                </div>
              </div>

              {/* Regulatory Assurance Checklist */}
              <div className="mt-6 border-t border-slate-100 pt-4 space-y-2 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <svg className="h-4 w-4 text-[#046e82]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  <span>Chamber of Commerce Legalized COO</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="h-4 w-4 text-[#046e82]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  <span>100% GST ITC Invoicing (HSN 9018)</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="h-4 w-4 text-[#046e82]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  <span>Manufacturer Batch Testing &amp; CoA</span>
                </div>
              </div>

              {/* Related Technical Guides */}
              <div className="mt-6 border-t border-slate-100 pt-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Related Technical Dossiers
                </h4>
                <div className="mt-3 space-y-2.5">
                  {relatedPosts.map(rel => (
                    <Link
                      key={rel.id}
                      href={`/blog/${rel.slug}`}
                      className="block text-xs font-medium text-slate-700 hover:text-[#046e82] transition-colors line-clamp-2"
                    >
                      &bull; {rel.title}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}
