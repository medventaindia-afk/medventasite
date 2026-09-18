'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import AnnouncementBar from '@/components/AnnouncementBar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { PRODUCTS, getProductByHandle, type Product } from '@/data/products';
import { useCart } from '@/context/CartContext';

interface Review {
  id: string;
  author: string;
  role: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
}

const INITIAL_REVIEWS: Record<string, Review[]> = {
  default: [
    {
      id: 'rev-1',
      author: 'Dr. Rajesh Sharma',
      role: 'Orthopedic Surgeon, Max Healthcare',
      rating: 5,
      date: '2 weeks ago',
      title: 'Excellent anatomical fit and superior quality',
      comment: 'We have procured multiple units for our clinic. The material durability and patient comfort are exceptional. Immediate stabilization with zero skin chafing.',
      verified: true,
    },
    {
      id: 'rev-2',
      author: 'Anita Desai, PT',
      role: 'Senior Physiotherapist, Apollo Clinics',
      rating: 5,
      date: '1 month ago',
      title: 'Highly recommended for post-trauma rehabilitation',
      comment: 'Patients find it extremely easy to wear and adjust. Low-profile construction allows full daily activity while maintaining precise joint alignment.',
      verified: true,
    },
    {
      id: 'rev-3',
      author: 'Vikram Mehta',
      role: 'Hospital Stores Purchase Manager',
      rating: 5,
      date: '2 months ago',
      title: 'Prompt delivery and authentic batch documentation',
      comment: 'Received complete manufacturer certification and tax invoice eligible for 100% GST input tax credit. Fast nationwide dispatch from MedVenta.',
      verified: true,
    },
  ],
};

export default function ProductDetailPage({ params: propParams }: { params?: { handle?: string } }) {
  const routeParams = useParams();
  const router = useRouter();
  const rawHandle = propParams?.handle || (routeParams?.handle as string) || '';
  const handle = decodeURIComponent(rawHandle);
  const { addToCart } = useCart();

  const product: Product = getProductByHandle(handle) || PRODUCTS[0];

  const [selectedImage, setSelectedImage] = useState<string>(product.image);
  const [quantity, setQuantity] = useState<number>(1);
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS.default);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({
    author: '',
    role: '',
    rating: 5,
    title: '',
    comment: '',
  });
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string>('shipping');

  useEffect(() => {
    if (product?.image) {
      setSelectedImage(product.image);
    }
  }, [product?.id, product?.image]);

  const relatedProducts = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleBuyItNow = () => {
    addToCart(product, quantity);
    router.push('/checkout');
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.author || !newReview.comment) return;

    const createdReview: Review = {
      id: `rev-${Date.now()}`,
      author: newReview.author,
      role: newReview.role || 'Verified Customer',
      rating: newReview.rating,
      date: 'Just now',
      title: newReview.title || 'Great product',
      comment: newReview.comment,
      verified: true,
    };

    setReviews([createdReview, ...reviews]);
    setReviewSubmitted(true);
    setShowReviewForm(false);
    setNewReview({ author: '', role: '', rating: 5, title: '', comment: '' });
  };

  const formatINR = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 2,
    }).format(val);
  };

  const savings = product.compareAtPrice ? product.compareAtPrice - product.price : 0;

  return (
    <div className="template-product" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif', color: '#1d1d1d', background: '#ffffff' }}>
      <AnnouncementBar />
      <Navbar />

      <main id="site-main" className="site-main" role="main">
        {/* Breadcrumb Navigation */}
        <div style={{ maxWidth: '1360px', margin: '0 auto', padding: '16px 20px', fontSize: '13px', color: '#666' }}>
          <nav aria-label="Breadcrumb">
            <Link href="/" style={{ color: '#046e82', textDecoration: 'none' }}>Home</Link>
            <span style={{ margin: '0 8px', color: '#ccc' }}>/</span>
            <Link href="/collections/all" style={{ color: '#046e82', textDecoration: 'none' }}>Catalog</Link>
            <span style={{ margin: '0 8px', color: '#ccc' }}>/</span>
            <span style={{ color: '#046e82' }}>{product.category}</span>
            <span style={{ margin: '0 8px', color: '#ccc' }}>/</span>
            <span style={{ color: '#1d1d1d', fontWeight: 600 }}>{product.name}</span>
          </nav>
        </div>

        {/* Main Product Section (Empire D2C 2-Column Layout) */}
        <section style={{ maxWidth: '1360px', margin: '0 auto', padding: '10px 20px 60px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(340px, 1.1fr) minmax(380px, 1.25fr)', gap: '48px' }} className="product-details-grid">

            {/* Left Column: Gallery */}
            <div>
              <div style={{
                background: '#ffffff',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                padding: '24px',
                minHeight: '440px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative'
              }}>
                <img
                  src={selectedImage || product.image}
                  alt={product.name}
                  style={{ maxHeight: '420px', maxWidth: '100%', objectFit: 'contain' }}
                  className="product-main-image"
                />
              </div>

              {/* Thumbnails */}
              {product.gallery && product.gallery.length > 1 && (
                <div style={{ display: 'flex', gap: '12px', marginTop: '16px', flexWrap: 'wrap' }}>
                  {product.gallery.map((imgUrl, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImage(imgUrl)}
                      style={{
                        width: '74px',
                        height: '74px',
                        padding: '6px',
                        background: '#ffffff',
                        border: selectedImage === imgUrl ? '2px solid #046e82' : '1px solid #e5e7eb',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                      aria-label={`Thumbnail ${i + 1}`}
                    >
                      <img
                        src={imgUrl}
                        alt={`Thumbnail ${i + 1}`}
                        style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right Column: Product Info & D2C Purchase Form */}
            <div>
              {/* Vendor Link */}
              <div style={{ fontSize: '13px', color: '#046e82', fontWeight: 600, marginBottom: '6px' }}>
                <Link href="/collections/all" style={{ color: '#046e82', textDecoration: 'none' }}>
                  {product.brand}
                </Link>
              </div>

              {/* Product Title: Clean, Bold Sans-Serif */}
              <h1 style={{
                fontSize: '26px',
                fontWeight: 700,
                color: '#1d1d1d',
                lineHeight: 1.3,
                margin: '0 0 12px 0'
              }}>
                {product.name}
              </h1>

              {/* Star Rating with Jump to Reviews Link */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
                <div style={{ display: 'flex', color: '#ffab41' }}>
                  {[...Array(5)].map((_, idx) => (
                    <svg key={idx} width="16" height="16" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                  ))}
                </div>
                <a href="#customer-reviews" style={{ fontSize: '13px', color: '#046e82', textDecoration: 'none', fontWeight: 600 }}>
                  5.0 ({reviews.length} reviews)
                </a>
              </div>

              {/* Pricing Block */}
              <div style={{ padding: '16px 0', borderTop: '1px solid #f1f5f9', borderBottom: '1px solid #f1f5f9', marginBottom: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '26px', fontWeight: 700, color: '#1d1d1d' }}>
                    {formatINR(product.price)}
                  </span>
                  {product.compareAtPrice && (
                    <span style={{ fontSize: '15px', color: '#949494', textDecoration: 'line-through' }}>
                      {formatINR(product.compareAtPrice)}
                    </span>
                  )}
                  {savings > 0 && (
                    <span style={{
                      background: '#fef2f2',
                      color: '#dc2626',
                      fontSize: '12px',
                      fontWeight: 700,
                      padding: '3px 8px',
                      borderRadius: '4px'
                    }}>
                      Save {formatINR(savings)}
                    </span>
                  )}
                </div>
                <div style={{ fontSize: '12px', color: '#666', marginTop: '6px' }}>
                  Tax included. Shipping calculated at checkout.
                </div>
                <div style={{ fontSize: '13px', color: '#3C9342', fontWeight: 600, marginTop: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span>✓</span> In stock — Ready to ship nationwide
                </div>
              </div>

              {/* Purchase Controls (Shopify D2C Standard) */}
              <div style={{ marginBottom: '24px' }}>
                <div style={{ display: 'flex', gap: '14px', alignItems: 'center', marginBottom: '14px' }}>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: '#444' }}>Quantity:</span>
                  <div style={{
                    display: 'inline-flex',
                    border: '1px solid #d1d5db',
                    borderRadius: '4px',
                    overflow: 'hidden',
                    background: '#ffffff'
                  }}>
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      style={{ width: '36px', height: '38px', border: 'none', background: 'none', cursor: 'pointer', fontSize: '16px', fontWeight: 600 }}
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                      style={{ width: '48px', height: '38px', border: 'none', textAlign: 'center', fontSize: '14px', fontWeight: 600, MozAppearance: 'textfield' }}
                      aria-label="Quantity"
                    />
                    <button
                      type="button"
                      onClick={() => setQuantity(quantity + 1)}
                      style={{ width: '36px', height: '38px', border: 'none', background: 'none', cursor: 'pointer', fontSize: '16px', fontWeight: 600 }}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Primary Add to Cart + Buy It Now Buttons */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    style={{
                      width: '100%',
                      padding: '14px 20px',
                      background: '#046e82',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '4px',
                      fontSize: '14px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      letterSpacing: '0.04em',
                      textTransform: 'uppercase',
                      transition: 'background 0.2s ease'
                    }}
                  >
                    Add to Cart
                  </button>

                  <button
                    type="button"
                    onClick={handleBuyItNow}
                    style={{
                      width: '100%',
                      padding: '14px 20px',
                      background: '#e99114',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '4px',
                      fontSize: '14px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      letterSpacing: '0.04em',
                      textTransform: 'uppercase',
                      transition: 'background 0.2s ease'
                    }}
                  >
                    Buy It Now
                  </button>
                </div>
              </div>

              {/* Key Details Quote Box (From Original Empire Theme) */}
              <div style={{
                background: '#f5f3ed',
                borderRadius: '8px',
                padding: '16px 18px',
                marginBottom: '24px',
                display: 'flex',
                gap: '12px',
                alignItems: 'flex-start'
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1d1d1d" strokeWidth="2" style={{ flexShrink: 0, marginTop: '2px' }}>
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="12" y1="16" x2="12" y2="12"/>
                  <line x1="12" y1="8" x2="12.01" y2="8"/>
                </svg>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: '#1d1d1d', marginBottom: '2px' }}>
                    Get Your Customized Quote
                  </div>
                  <div style={{ fontSize: '13px', color: '#444', lineHeight: 1.5, marginBottom: '8px' }}>
                    Click below to receive tailored institutional pricing for hospitals and clinics.
                  </div>
                  <Link
                    href={`/in/b2b-quote?product=${encodeURIComponent(product.name)}`}
                    style={{
                      display: 'inline-block',
                      fontSize: '12px',
                      fontWeight: 700,
                      color: '#046e82',
                      textDecoration: 'none',
                      border: '1px solid #046e82',
                      padding: '6px 14px',
                      borderRadius: '4px',
                      background: '#ffffff'
                    }}
                  >
                    Request a Quote
                  </Link>
                </div>
              </div>

              {/* Description Body */}
              <div style={{ fontSize: '14px', lineHeight: 1.7, color: '#333', marginBottom: '24px' }}>
                <p style={{ margin: '0 0 14px 0' }}>{product.description}</p>
                {product.features && product.features.length > 0 && (
                  <ul style={{ paddingLeft: '20px', margin: '14px 0' }}>
                    {product.features.map((feat, idx) => (
                      <li key={idx} style={{ marginBottom: '6px' }}>{feat}</li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Collapsible Tabs (Empire Theme Standard) */}
              <div style={{ borderTop: '1px solid #e5e7eb' }}>
                {/* Accordion 1: Shipping */}
                <div style={{ borderBottom: '1px solid #e5e7eb' }}>
                  <button
                    type="button"
                    onClick={() => setOpenAccordion(openAccordion === 'shipping' ? '' : 'shipping')}
                    style={{
                      width: '100%',
                      padding: '14px 0',
                      background: 'none',
                      border: 'none',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      fontSize: '14px',
                      fontWeight: 700,
                      color: '#1d1d1d',
                      cursor: 'pointer'
                    }}
                  >
                    <span>Shipping Information</span>
                    <span style={{ fontSize: '16px', color: '#666' }}>{openAccordion === 'shipping' ? '−' : '+'}</span>
                  </button>
                  {openAccordion === 'shipping' && (
                    <div style={{ padding: '0 0 16px 0', fontSize: '13px', color: '#555', lineHeight: 1.6 }}>
                      Shipping estimates are provided once we receive your request. Nationwide delivery across India to hospitals, clinics, and individual healthcare professionals.
                    </div>
                  )}
                </div>

                {/* Accordion 2: Specs */}
                <div style={{ borderBottom: '1px solid #e5e7eb' }}>
                  <button
                    type="button"
                    onClick={() => setOpenAccordion(openAccordion === 'specs' ? '' : 'specs')}
                    style={{
                      width: '100%',
                      padding: '14px 0',
                      background: 'none',
                      border: 'none',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      fontSize: '14px',
                      fontWeight: 700,
                      color: '#1d1d1d',
                      cursor: 'pointer'
                    }}
                  >
                    <span>Product Specifications</span>
                    <span style={{ fontSize: '16px', color: '#666' }}>{openAccordion === 'specs' ? '−' : '+'}</span>
                  </button>
                  {openAccordion === 'specs' && (
                    <div style={{ padding: '0 0 16px 0' }}>
                      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                        <tbody>
                          {product.technicalSpecs?.map((spec, i) => (
                            <tr key={i} style={{ borderBottom: '1px solid #f1f5f9' }}>
                              <td style={{ padding: '8px 0', color: '#666', width: '40%' }}>{spec.label}</td>
                              <td style={{ padding: '8px 0', color: '#1d1d1d', fontWeight: 500 }}>{spec.value}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>

                {/* Accordion 3: Quality Guarantee */}
                <div style={{ borderBottom: '1px solid #e5e7eb' }}>
                  <button
                    type="button"
                    onClick={() => setOpenAccordion(openAccordion === 'guarantee' ? '' : 'guarantee')}
                    style={{
                      width: '100%',
                      padding: '14px 0',
                      background: 'none',
                      border: 'none',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      fontSize: '14px',
                      fontWeight: 700,
                      color: '#1d1d1d',
                      cursor: 'pointer'
                    }}
                  >
                    <span>Authenticity &amp; Quality Guarantee</span>
                    <span style={{ fontSize: '16px', color: '#666' }}>{openAccordion === 'guarantee' ? '−' : '+'}</span>
                  </button>
                  {openAccordion === 'guarantee' && (
                    <div style={{ padding: '0 0 16px 0', fontSize: '13px', color: '#555', lineHeight: 1.6 }}>
                      {product.certifications} &bull; 100% genuine medical devices with direct manufacturer batch traceability. Compliant with CDSCO, CE, and US FDA standards.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Customer Reviews Section */}
        <section id="customer-reviews" style={{ borderTop: '1px solid #e5e7eb', background: '#fafafa', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1360px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#1d1d1d', margin: '0 0 6px 0' }}>
                  Customer Reviews
                </h2>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#666' }}>
                  <div style={{ display: 'flex', color: '#ffab41' }}>
                    {[...Array(5)].map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                  <span>Based on {reviews.length} reviews</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowReviewForm(!showReviewForm)}
                style={{
                  padding: '10px 20px',
                  background: '#046e82',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '4px',
                  fontSize: '13px',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                {showReviewForm ? 'Cancel Review' : 'Write a Review'}
              </button>
            </div>

            {/* Review Form */}
            {showReviewForm && (
              <form onSubmit={handleReviewSubmit} style={{ background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '24px', marginBottom: '32px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '16px', color: '#1d1d1d' }}>
                  Write Your Review
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '6px' }}>Your Name *</label>
                    <input
                      type="text"
                      required
                      value={newReview.author}
                      onChange={(e) => setNewReview({ ...newReview, author: e.target.value })}
                      placeholder="Dr. John Doe / Purchase Officer"
                      style={{ width: '100%', padding: '8px 12px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '13px' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '6px' }}>Hospital / Role</label>
                    <input
                      type="text"
                      value={newReview.role}
                      onChange={(e) => setNewReview({ ...newReview, role: e.target.value })}
                      placeholder="e.g. Apollo Hospital"
                      style={{ width: '100%', padding: '8px 12px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '13px' }}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '6px' }}>Rating</label>
                  <select
                    value={newReview.rating}
                    onChange={(e) => setNewReview({ ...newReview, rating: parseInt(e.target.value) })}
                    style={{ padding: '8px 12px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '13px' }}
                  >
                    <option value={5}>★★★★★ (5 out of 5 stars)</option>
                    <option value={4}>★★★★☆ (4 out of 5 stars)</option>
                    <option value={3}>★★★☆☆ (3 out of 5 stars)</option>
                  </select>
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '6px' }}>Review Title</label>
                  <input
                    type="text"
                    value={newReview.title}
                    onChange={(e) => setNewReview({ ...newReview, title: e.target.value })}
                    placeholder="Give your review a headline"
                    style={{ width: '100%', padding: '8px 12px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '13px' }}
                  />
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '6px' }}>Your Review *</label>
                  <textarea
                    rows={4}
                    required
                    value={newReview.comment}
                    onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                    placeholder="Write your comments here..."
                    style={{ width: '100%', padding: '8px 12px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '13px' }}
                  />
                </div>

                <button
                  type="submit"
                  style={{
                    padding: '10px 24px',
                    background: '#046e82',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '4px',
                    fontSize: '13px',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  Submit Review
                </button>
              </form>
            )}

            {reviewSubmitted && (
              <div style={{ background: '#ecfdf5', color: '#065f46', padding: '12px 16px', borderRadius: '6px', marginBottom: '24px', fontSize: '13px', fontWeight: 600 }}>
                Thank you! Your review has been submitted successfully.
              </div>
            )}

            {/* Reviews List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {reviews.map((rev) => (
                <div key={rev.id} style={{ background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontWeight: 700, fontSize: '14px', color: '#1d1d1d' }}>{rev.author}</span>
                        {rev.verified && (
                          <span style={{ fontSize: '11px', color: '#046e82', background: '#e0f2fe', padding: '2px 8px', borderRadius: '4px', fontWeight: 600 }}>
                            Verified Buyer
                          </span>
                        )}
                      </div>
                      <div style={{ fontSize: '12px', color: '#777', marginTop: '2px' }}>{rev.role}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ color: '#ffab41', fontSize: '14px' }}>
                        {'★'.repeat(rev.rating)}{'☆'.repeat(5 - rev.rating)}
                      </div>
                      <div style={{ fontSize: '11px', color: '#999', marginTop: '2px' }}>{rev.date}</div>
                    </div>
                  </div>
                  <div style={{ fontWeight: 600, fontSize: '14px', color: '#1d1d1d', marginBottom: '6px' }}>
                    {rev.title}
                  </div>
                  <div style={{ fontSize: '13px', color: '#444', lineHeight: 1.6 }}>
                    {rev.comment}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* You May Also Like / Related Products (Matching Screenshot 1) */}
        <section style={{ maxWidth: '1360px', margin: '0 auto', padding: '60px 20px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#1d1d1d', marginBottom: '24px' }}>
            You may also like
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '24px' }}>
            {relatedProducts.map((rel) => (
              <div
                key={rel.id}
                style={{
                  background: '#ffffff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '6px',
                  padding: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'box-shadow 0.2s ease'
                }}
              >
                <div>
                  {/* Compare Checkbox (From Screenshot 1) */}
                  <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#666', cursor: 'pointer', marginBottom: '12px' }}>
                    <input type="checkbox" style={{ cursor: 'pointer' }} />
                    <span>Compare</span>
                  </label>

                  {/* Product Image */}
                  <Link href={`/products/${rel.handle}`} style={{ textDecoration: 'none', display: 'block' }}>
                    <div style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                      <img
                        src={rel.image}
                        alt={rel.name}
                        style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
                      />
                    </div>

                    {/* Product Title */}
                    <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#1d1d1d', lineHeight: 1.4, margin: '0 0 8px 0', minHeight: '40px' }}>
                      {rel.name}
                    </h3>
                  </Link>

                  {/* Vendor */}
                  <div style={{ fontSize: '12px', color: '#888', marginBottom: '8px' }}>
                    {rel.brand}
                  </div>
                </div>

                {/* Price */}
                <div style={{ fontSize: '15px', fontWeight: 700, color: '#1d1d1d', borderTop: '1px solid #f1f5f9', paddingTop: '10px' }}>
                  {formatINR(rel.price)}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Dynamic Highlights Banner (Empire Theme Standard) */}
        <section style={{ borderTop: '1px solid #e5e7eb', background: '#f8fafc', padding: '36px 20px' }}>
          <div style={{ maxWidth: '1360px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
            <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
              <span style={{ fontSize: '24px' }}>🚚</span>
              <div>
                <div style={{ fontWeight: 700, fontSize: '14px', color: '#1d1d1d' }}>Fast Shipping</div>
                <div style={{ fontSize: '12px', color: '#666' }}>Nationwide Delivery Across India</div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
              <span style={{ fontSize: '24px' }}>✉️</span>
              <div>
                <div style={{ fontWeight: 700, fontSize: '14px', color: '#1d1d1d' }}>Email Us</div>
                <div style={{ fontSize: '12px', color: '#666' }}>info@medventa.in</div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
              <span style={{ fontSize: '24px' }}>📞</span>
              <div>
                <div style={{ fontWeight: 700, fontSize: '14px', color: '#1d1d1d' }}>Call Us</div>
                <div style={{ fontSize: '12px', color: '#666' }}>+91 8368490741</div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
              <span style={{ fontSize: '24px' }}>💬</span>
              <div>
                <div style={{ fontWeight: 700, fontSize: '14px', color: '#1d1d1d' }}>Request a Quote</div>
                <div style={{ fontSize: '12px', color: '#666' }}>Custom Pricing for Healthcare Providers</div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
