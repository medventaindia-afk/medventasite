'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import AnnouncementBar from '@/components/AnnouncementBar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

import { PRODUCTS, type Product } from '@/data/products';
import { useCart } from '@/context/CartContext';

const CATEGORIES = [
  { name: 'All Products', slug: 'all' },
  { name: 'Surgical Supplies', slug: 'surgical-supplies' },
  { name: 'Laboratory Supplies', slug: 'laboratory-equipment' },
  { name: 'Sutures', slug: 'sutures' },
  { name: 'Diagnostics', slug: 'diagnostics' },
  { name: 'Catheters', slug: 'catheters' },
  { name: 'Nephrology', slug: 'nephrology' },
  { name: 'Wound Care', slug: 'wound-care' },
];

export default function CollectionPage({ params: propParams }: { params?: { slug?: string } }) {
  const routeParams = useParams();
  const rawSlug = propParams?.slug || (routeParams?.slug as string) || 'all';
  const currentSlug = rawSlug.toLowerCase();

  const [selectedCategory, setSelectedCategory] = useState<string>(
    CATEGORIES.some(c => c.slug === currentSlug) ? currentSlug : 'all'
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [sortBy, setSortBy] = useState<'featured' | 'name-asc' | 'name-desc'>('featured');
  const router = useRouter();
  const { addToCart } = useCart();

  const handleBuyNow = (product: Product) => {
    addToCart(product, 1);
    router.push('/checkout');
  };

  // Filtered list
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(p => {
      const matchCat = selectedCategory === 'all' || p.categorySlug === selectedCategory;
      const matchBrand = selectedBrand === 'All' || p.brand === selectedBrand;
      const matchSearch =
        !searchQuery.trim() ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchBrand && matchSearch;
    }).sort((a, b) => {
      if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
      if (sortBy === 'name-desc') return b.name.localeCompare(a.name);
      return 0;
    });
  }, [selectedCategory, selectedBrand, searchQuery, sortBy]);

  const activeCategoryObj = CATEGORIES.find(c => c.slug === selectedCategory) || CATEGORIES[0];
  const brands = ['All', ...Array.from(new Set(PRODUCTS.map(p => p.brand)))];

  return (
    <div style={{ background: '#fcfcfc', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <AnnouncementBar />
      <Navbar />

      {/* Catalog Banner & Breadcrumbs */}
      <div style={{ background: '#f5f7f9', borderBottom: '1px solid #e5e8ec', padding: '24px 20px' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          {/* Breadcrumb */}
          <div style={{ fontSize: '12px', color: '#666', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
            <Link href="/" style={{ color: '#046e82', textDecoration: 'none' }}>Home</Link>
            <span>/</span>
            <Link href="/collections/all" style={{ color: '#046e82', textDecoration: 'none' }}>Catalog</Link>
            {activeCategoryObj.slug !== 'all' && (
              <>
                <span>/</span>
                <span style={{ color: '#1d1d1d', fontWeight: 600 }}>{activeCategoryObj.name}</span>
              </>
            )}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '28px', fontWeight: 700, color: '#1d1d1d', margin: '0 0 6px 0' }}>
                {activeCategoryObj.slug === 'all' ? 'Healthcare & Medical Products Catalog' : activeCategoryObj.name}
              </h1>
              <p style={{ margin: 0, fontSize: '14px', color: '#666', maxWidth: '700px' }}>
                Over 350,000 World-Class Healthcare Products – Sourced Globally. Serving Hospitals, Surgical Clinics & Healthcare Institutions Across India.
              </p>
            </div>
            <div style={{ background: '#ffffff', border: '1px solid #dcdfe4', borderRadius: '6px', padding: '6px 14px', fontSize: '13px', color: '#444' }}>
              Showing <strong style={{ color: '#1d1d1d' }}>{filteredProducts.length}</strong> verified medical products
            </div>
          </div>
        </div>
      </div>

      {/* Main Catalog Body */}
      <main style={{ maxWidth: '1400px', margin: '0 auto', padding: '32px 20px', flex: 1, width: '100%' }}>
        {/* Category Pills Bar */}
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '14px', marginBottom: '24px' }}>
          {CATEGORIES.map(cat => {
            const isActive = selectedCategory === cat.slug;
            return (
              <button
                key={cat.slug}
                onClick={() => setSelectedCategory(cat.slug)}
                style={{
                  background: isActive ? '#046e82' : '#ffffff',
                  color: isActive ? '#ffffff' : '#333333',
                  border: isActive ? '1px solid #046e82' : '1px solid #d5d9de',
                  borderRadius: '24px',
                  padding: '8px 18px',
                  fontSize: '13px',
                  fontWeight: isActive ? 600 : 500,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  boxShadow: isActive ? '0 2px 8px rgba(4,110,130,0.25)' : 'none',
                  transition: 'all 0.15s ease',
                }}
              >
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* Filters and Search Bar */}
        <div style={{ background: '#ffffff', border: '1px solid #eaeaea', borderRadius: '10px', padding: '16px 20px', marginBottom: '28px', display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
          {/* Search Input */}
          <div style={{ position: 'relative', flex: '1 1 300px' }}>
            <svg style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#888' }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              type="text"
              placeholder="Search by product name, brand, SKU or application..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '9px 12px 9px 38px',
                border: '1px solid #d0d5dd',
                borderRadius: '6px',
                fontSize: '13px',
                outline: 'none',
              }}
            />
          </div>

          {/* Brand Filter & Sorting */}
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '13px', color: '#666', fontWeight: 500 }}>Brand:</span>
              <select
                value={selectedBrand}
                onChange={e => setSelectedBrand(e.target.value)}
                style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #d0d5dd', fontSize: '13px', outline: 'none', background: '#fff' }}
              >
                {brands.map(b => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '13px', color: '#666', fontWeight: 500 }}>Sort By:</span>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value as any)}
                style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #d0d5dd', fontSize: '13px', outline: 'none', background: '#fff' }}
              >
                <option value="featured">Featured Relevance</option>
                <option value="name-asc">Product Name (A-Z)</option>
                <option value="name-desc">Product Name (Z-A)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', background: '#ffffff', borderRadius: '10px', border: '1px solid #eaeaea' }}>
            <h3 style={{ fontSize: '18px', color: '#1d1d1d', margin: '0 0 8px 0' }}>No matching products found</h3>
            <p style={{ fontSize: '14px', color: '#666', margin: '0 0 18px 0' }}>Try changing your filter settings or search query.</p>
            <button
              onClick={() => { setSelectedCategory('all'); setSelectedBrand('All'); setSearchQuery(''); }}
              style={{ background: '#046e82', color: '#ffffff', border: 'none', borderRadius: '6px', padding: '8px 18px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(310px, 1fr))', gap: '24px' }}>
            {filteredProducts.map(product => (
              <div
                key={product.id}
                style={{
                  background: '#ffffff',
                  border: '1px solid #e6e8eb',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease',
                }}
                className="catalog-product-card"
              >
                {/* Image Section */}
                <div style={{ height: '220px', position: 'relative', background: '#fbfbfb', borderBottom: '1px solid #f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
                  <Link href={`/products/${product.handle}`} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', width: '100%' }}>
                    <img
                      src={product.image}
                      alt={product.name}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/cdn/shop/collections/ChatGPT_Image_Aug_13_2025_02_37_44_PM_1024x1024.png';
                      }}
                      style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain', transition: 'transform 0.2s ease' }}
                      loading="lazy"
                    />
                  </Link>
                  {product.badge && (
                    <span style={{ position: 'absolute', top: '12px', left: '12px', background: '#046e82', color: '#ffffff', fontSize: '11px', fontWeight: 700, padding: '3px 8px', borderRadius: '4px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      {product.badge}
                    </span>
                  )}
                  <span style={{ position: 'absolute', top: '12px', right: '12px', background: '#f1f5f9', color: '#475569', fontSize: '11px', fontWeight: 600, padding: '3px 8px', borderRadius: '4px' }}>
                    {product.brand}
                  </span>
                </div>

                {/* Content Section */}
                <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  {/* Category & SKU */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ fontSize: '12px', color: '#046e82', fontWeight: 600 }}>{product.category}</span>
                    <span style={{ fontSize: '11px', color: '#888', fontFamily: 'monospace' }}>SKU: {product.sku}</span>
                  </div>

                  {/* Title */}
                  <Link href={`/products/${product.handle}`} style={{ textDecoration: 'none', color: '#1d1d1d', flexGrow: 1 }}>
                    <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#1d1d1d', margin: '0 0 8px 0', lineHeight: 1.4 }} className="catalog-product-title">
                      {product.name}
                    </h3>
                  </Link>

                  {/* Specs */}
                  <p style={{ fontSize: '12px', color: '#555', background: '#f8fafc', padding: '6px 10px', borderRadius: '4px', margin: '0 0 10px 0', border: '1px solid #edf2f7' }}>
                    <strong>Specs:</strong> {product.specs}
                  </p>

                  {/* Certifications */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#16a34a', fontWeight: 600, marginBottom: '16px' }}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                      <polyline points="22 4 12 14.01 9 11.01"/>
                    </svg>
                    <span>{product.certifications}</span>
                  </div>

                  {/* D2C Buy Now + B2B Quote CTA */}
                  <div style={{ paddingTop: '14px', borderTop: '1px solid #f0f0f0' }}>
                    {/* Price display */}
                    <div style={{ marginBottom: '10px' }}>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                        <span style={{ fontSize: '18px', fontWeight: 800, color: '#1d1d1d' }}>
                          ₹{product.price.toLocaleString('en-IN')}
                        </span>
                        {product.compareAtPrice && (
                          <span style={{ fontSize: '13px', color: '#949494', textDecoration: 'line-through' }}>
                            ₹{product.compareAtPrice.toLocaleString('en-IN')}
                          </span>
                        )}
                      </div>
                      <span style={{ fontSize: '10px', color: '#888', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginTop: '2px' }}>
                        Excl. GST / Bulk Sourcing Available
                      </span>
                    </div>
                    {/* Two CTAs: Buy Now (D2C Direct) and Get Quote (B2B) */}
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        onClick={() => handleBuyNow(product)}
                        style={{
                          flex: 1,
                          background: '#046e82',
                          color: '#ffffff',
                          padding: '10px 12px',
                          borderRadius: '4px',
                          fontSize: '12px',
                          fontWeight: 700,
                          border: 'none',
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '5px',
                          transition: 'opacity 0.15s ease',
                          letterSpacing: '0.02em',
                          textTransform: 'uppercase',
                        }}
                      >
                        Buy Now
                      </button>
                      <Link
                        href={`/in/b2b-quote?product=${encodeURIComponent(product.name)}`}
                        style={{
                          background: 'linear-gradient(135deg, #e99114 0%, #cf7b07 100%)',
                          color: '#ffffff',
                          padding: '10px 12px',
                          borderRadius: '4px',
                          fontSize: '12px',
                          fontWeight: 700,
                          textDecoration: 'none',
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '5px',
                          boxShadow: '0 2px 6px rgba(233,145,20,0.3)',
                          transition: 'opacity 0.15s ease',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        Get Quote
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bottom B2B Custom Sourcing Banner */}
        <div style={{ marginTop: '48px', background: 'linear-gradient(135deg, #0a1b2a 0%, #042e38 100%)', borderRadius: '12px', padding: '36px 32px', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>
          <div style={{ maxWidth: '680px' }}>
            <span style={{ background: 'rgba(233,145,20,0.2)', color: '#f59e0b', fontSize: '12px', fontWeight: 700, padding: '4px 10px', borderRadius: '20px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Custom Procurement
            </span>
            <h3 style={{ fontSize: '22px', fontWeight: 700, margin: '12px 0 8px 0', color: '#ffffff' }}>
              Need a product or brand not listed in the catalog?
            </h3>
            <p style={{ fontSize: '14px', color: '#cbd5e1', margin: 0, lineHeight: 1.6 }}>
              We have direct access to over 350,000 global medical and surgical supplies. Submit your requirements list or bill of materials, and our institutional procurement team will provide a comprehensive competitive quotation.
            </p>
          </div>
          <div>
            <Link
              href="/in/b2b-quote"
              style={{
                background: '#e99114',
                color: '#ffffff',
                padding: '12px 24px',
                borderRadius: '6px',
                fontSize: '14px',
                fontWeight: 700,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 4px 12px rgba(233,145,20,0.4)',
              }}
            >
              <span>Submit Custom RFP / BOQ</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </Link>
          </div>
        </div>
      </main>

      <Footer />

      <style>{`
        .catalog-product-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 24px rgba(0,0,0,0.08) !important;
          border-color: #cbd5e1 !important;
        }
      `}</style>
    </div>
  );
}
