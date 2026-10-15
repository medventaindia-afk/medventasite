import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { PRODUCTS, type Product } from '@/data/products';
import blogsData from '@/data/seo_blog_enriched.json';

interface SearchPageProps {
  searchParams: {
    q?: string;
    category?: string;
  };
}

export const metadata = {
  title: 'Search Medical Supplies & Equipment | MedVanta India',
  description: 'Search MedVanta catalog for institutional medical consumables, surgical sutures, vascular access, and diagnostic equipment.',
};

export default function SearchPage({ searchParams }: SearchPageProps) {
  const query = (searchParams.q || '').trim().toLowerCase();
  const categoryFilter = (searchParams.category || '').trim().toLowerCase();

  const cleanCat = categoryFilter.replace(/^product_type:\s*/i, '').replace(/[-_]/g, ' ').trim();

  // Filter products using exact Product properties (name, brand, sku, specs, description)
  const matchedProducts = PRODUCTS.filter((p) => {
    const matchesCategory =
      !cleanCat ||
      p.category.toLowerCase().includes(cleanCat) ||
      p.categorySlug.toLowerCase().includes(categoryFilter) ||
      p.name.toLowerCase().includes(cleanCat);

    if (!query) return matchesCategory;

    const inName = p.name.toLowerCase().includes(query);
    const inDesc = p.description.toLowerCase().includes(query);
    const inBrand = p.brand.toLowerCase().includes(query);
    const inSku = p.sku.toLowerCase().includes(query);
    const inSpecs = p.specs ? p.specs.toLowerCase().includes(query) : false;
    const inTechSpecs = p.technicalSpecs?.some(
      (s) => s.label.toLowerCase().includes(query) || s.value.toLowerCase().includes(query)
    );

    return matchesCategory && (inName || inDesc || inBrand || inSku || inSpecs || inTechSpecs);
  });

  // Filter relevant knowledge base articles
  const matchedBlogs = (blogsData as any[]).filter((b) => {
    if (query) {
      const titleMatch = b.title?.toLowerCase().includes(query);
      const kwMatch = b.keywords?.some((k: string) => k.toLowerCase().includes(query));
      const excerptMatch = b.directAnswer?.toLowerCase().includes(query);
      return titleMatch || kwMatch || excerptMatch;
    }
    if (cleanCat) {
      const catMatch = b.category?.toLowerCase().includes(cleanCat);
      const titleMatch = b.title?.toLowerCase().includes(cleanCat);
      return catMatch || titleMatch;
    }
    return false;
  }).slice(0, 4);

  return (
    <div className="site-wrapper" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#fcfcfc' }}>
      <Navbar />

      <main id="site-main" style={{ flex: '1 0 auto', maxWidth: '1350px', width: '100%', margin: '0 auto', padding: '32px 20px 64px' }}>
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" style={{ marginBottom: '20px', fontSize: '13px', color: '#6b7280' }}>
          <Link href="/" style={{ color: '#046e82', textDecoration: 'none' }}>Home</Link>
          <span style={{ margin: '0 8px' }}>/</span>
          <span>Search</span>
          {query && <span style={{ color: '#111827', fontWeight: 600 }}> &ldquo;{query}&rdquo;</span>}
        </nav>

        {/* Search Header */}
        <div style={{ borderBottom: '1px solid #e5e7eb', paddingBottom: '20px', marginBottom: '32px' }}>
          <h1 style={{ fontFamily: 'var(--font-heading, Inter, sans-serif)', fontSize: '28px', fontWeight: 800, color: '#111827', margin: '0 0 8px 0' }}>
            {query ? `Search Results for "${query}"` : 'Institutional Medical Catalog Search'}
          </h1>
          <p style={{ margin: 0, fontSize: '14.5px', color: '#4b5563' }}>
            Showing {matchedProducts.length} verified procurement product{matchedProducts.length === 1 ? '' : 's'}
            {categoryFilter ? ` in category "${categoryFilter}"` : ''}.
          </p>
        </div>

        {/* Results Grid */}
        {matchedProducts.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px', marginBottom: '48px' }}>
            {matchedProducts.map((product) => (
              <div
                key={product.handle}
                style={{
                  background: '#ffffff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
                }}
              >
                <Link href={`/products/${product.handle}`} style={{ display: 'block', position: 'relative', paddingTop: '75%', background: '#f8fafc', overflow: 'hidden' }}>
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'contain', padding: '16px' }}
                    loading="lazy"
                  />
                </Link>
                <div style={{ padding: '18px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: '#046e82', letterSpacing: '0.05em', marginBottom: '6px' }}>
                    {product.brand} • SKU: {product.sku}
                  </div>
                  <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#111827', margin: '0 0 10px 0', lineHeight: 1.35 }}>
                    <Link href={`/products/${product.handle}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                      {product.name}
                    </Link>
                  </h3>
                  <p style={{ fontSize: '13px', color: '#6b7280', margin: '0 0 16px 0', lineHeight: 1.5, flex: 1 }}>
                    {product.description.slice(0, 110)}...
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '12px', borderTop: '1px solid #f3f4f6' }}>
                    <div>
                      <span style={{ fontSize: '11px', color: '#9ca3af', display: 'block' }}>Contract Rate</span>
                      <span style={{ fontSize: '17px', fontWeight: 800, color: '#0f2d4e' }}>₹{product.price.toLocaleString('en-IN')}</span>
                    </div>
                    <Link
                      href={`https://wa.me/919958044704?text=Hello%20MedVanta%20Procurement%20Desk,%20inquiring%20about%20${encodeURIComponent(product.name)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        background: '#e99114',
                        color: '#ffffff',
                        fontSize: '12px',
                        fontWeight: 700,
                        padding: '8px 14px',
                        borderRadius: '4px',
                        textDecoration: 'none',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      Instant RFQ
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '64px 20px', background: '#ffffff', borderRadius: '8px', border: '1px solid #e5e7eb', marginBottom: '48px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#1f2937', marginBottom: '12px' }}>
              No exact product matches found for &ldquo;{query}&rdquo;
            </h2>
            <p style={{ fontSize: '14.5px', color: '#6b7280', maxWidth: '520px', margin: '0 auto 24px' }}>
              We maintain custom institutional sourcing for over 350,000 hospital SKUs across BD, Covidien, Ethicon, Cook Medical, and Welch Allyn.
            </p>
            <div style={{ display: 'inline-flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
              <Link
                href="/collections/all"
                style={{ background: '#0f2d4e', color: '#ffffff', padding: '10px 22px', borderRadius: '4px', fontWeight: 700, fontSize: '13.5px', textDecoration: 'none' }}
              >
                Browse All Categories
              </Link>
              <Link
                href="https://wa.me/919958044704?text=RFQ%20Inquiry%20from%20MedVanta%20Site"
                target="_blank"
                rel="noopener noreferrer"
                style={{ background: '#e99114', color: '#ffffff', padding: '10px 22px', borderRadius: '4px', fontWeight: 700, fontSize: '13.5px', textDecoration: 'none' }}
              >
                Request Custom Quotation
              </Link>
            </div>
          </div>
        )}

        {/* Relevant Knowledge Base Articles */}
        {matchedBlogs.length > 0 && (
          <div style={{ marginTop: '48px', paddingTop: '36px', borderTop: '1px solid #e5e7eb' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#111827', marginBottom: '20px' }}>
              Related Clinical &amp; Procurement Guides
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
              {matchedBlogs.map((b) => (
                <div key={b.slug} style={{ background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '6px', padding: '18px' }}>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: '#046e82', textTransform: 'uppercase', marginBottom: '6px' }}>
                    {b.category}
                  </div>
                  <h4 style={{ fontSize: '14.5px', fontWeight: 700, margin: '0 0 8px 0', lineHeight: 1.4 }}>
                    <Link href={`/blog/${b.slug}`} style={{ color: '#111827', textDecoration: 'none' }}>
                      {b.title}
                    </Link>
                  </h4>
                  <p style={{ fontSize: '12.5px', color: '#6b7280', margin: '0 0 12px 0', lineHeight: 1.45 }}>
                    {b.directAnswer ? b.directAnswer.slice(0, 95) : ''}...
                  </p>
                  <Link href={`/blog/${b.slug}`} style={{ fontSize: '12.5px', color: '#e99114', fontWeight: 700, textDecoration: 'none' }}>
                    Read Full Dossier →
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
