'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import AnnouncementBar from '@/components/AnnouncementBar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useCart } from '@/context/CartContext';

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, clearCart, subtotal, totalItems, isCheckingOut, proceedToCheckout } = useCart();
  const [orderNote, setOrderNote] = useState('');

  const formatINR = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <div className="template-cart">
      <AnnouncementBar />
      <Navbar />

      <main id="site-main" className="site-main" role="main">
        <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '32px 20px 80px' }}>

          {/* Cart Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderBottom: '2px solid #1d1d1d', paddingBottom: '16px', marginBottom: '32px' }}>
            <h1 style={{ fontFamily: 'var(--font-heading, "League Spartan", sans-serif)', fontSize: '32px', fontWeight: 700, margin: 0, color: '#1d1d1d' }}>
              Your Cart {totalItems > 0 && <span style={{ fontSize: '20px', color: '#666', fontWeight: 400 }}>({totalItems} {totalItems === 1 ? 'item' : 'items'})</span>}
            </h1>
            <Link href="/collections/all" style={{ color: '#046e82', fontWeight: 600, fontSize: '14px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              ← Continue Shopping
            </Link>
          </div>

          {cartItems.length === 0 ? (
            /* Empty Cart State */
            <div style={{ textAlign: 'center', padding: '64px 20px', background: '#fafafa', borderRadius: '12px', border: '1px dashed #ddd' }}>
              <div style={{ width: '64px', height: '64px', background: '#f0f0f0', borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', color: '#999' }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <circle cx="9" cy="21" r="1"/>
                  <circle cx="20" cy="21" r="1"/>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                </svg>
              </div>
              <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#1d1d1d', marginBottom: '10px' }}>Your Cart is Empty</h2>
              <p style={{ color: '#666', fontSize: '15px', maxWidth: '440px', margin: '0 auto 24px', lineHeight: 1.5 }}>
                Browse our catalog of over 350,000 global medical and surgical supplies to add products to your order.
              </p>
              <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link
                  href="/collections/all"
                  style={{
                    background: '#1d1d1d',
                    color: '#ffffff',
                    padding: '12px 28px',
                    borderRadius: '6px',
                    fontWeight: 700,
                    fontSize: '14px',
                    textDecoration: 'none'
                  }}
                >
                  Explore Catalog
                </Link>
                <Link
                  href="/in/b2b-quote"
                  style={{
                    background: '#e99114',
                    color: '#ffffff',
                    padding: '12px 28px',
                    borderRadius: '6px',
                    fontWeight: 700,
                    fontSize: '14px',
                    textDecoration: 'none'
                  }}
                >
                  Request Institutional Quote
                </Link>
              </div>
            </div>
          ) : (
            /* Active Cart State */
            <div>
              {/* Free Delivery Bar */}
              <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '8px', padding: '12px 20px', marginBottom: '28px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ color: '#16a34a', fontSize: '18px' }}>✓</span>
                <span style={{ fontSize: '14px', color: '#166534', fontWeight: 600 }}>
                  Your order qualifies for <strong>Free Insured Nationwide Shipping</strong> across India!
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '40px' }} className="cart-layout-grid">

                {/* Left: Items List */}
                <div>
                  <div style={{ border: '1px solid #e5e7eb', borderRadius: '10px', overflow: 'hidden', background: '#ffffff' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', padding: '14px 20px', background: '#f9fafb', borderBottom: '1px solid #e5e7eb', fontSize: '12px', fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.04em' }} className="cart-table-header">
                      <div>Product</div>
                      <div style={{ textAlign: 'center' }}>Price</div>
                      <div style={{ textAlign: 'center' }}>Quantity</div>
                      <div style={{ textAlign: 'right' }}>Total</div>
                    </div>

                    {cartItems.map(item => (
                      <div
                        key={item.product.id}
                        style={{
                          display: 'grid',
                          gridTemplateColumns: '2fr 1fr 1fr 1fr',
                          alignItems: 'center',
                          padding: '20px',
                          borderBottom: '1px solid #f3f4f6',
                          gap: '16px'
                        }}
                        className="cart-table-row"
                      >
                        {/* Product info */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                          <Link href={`/products/${item.product.handle}`} style={{ width: '80px', height: '80px', background: '#fbfbfb', border: '1px solid #e5e7eb', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, padding: '6px' }}>
                            <img src={item.product.image} alt={item.product.name} style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} />
                          </Link>
                          <div>
                            <span style={{ fontSize: '11px', color: '#046e82', fontWeight: 700, textTransform: 'uppercase' }}>{item.product.brand}</span>
                            <Link href={`/products/${item.product.handle}`} style={{ textDecoration: 'none', color: '#1d1d1d', display: 'block', margin: '4px 0' }}>
                              <span style={{ fontSize: '14px', fontWeight: 700, lineHeight: 1.3 }}>{item.product.name}</span>
                            </Link>
                            <span style={{ fontSize: '11px', color: '#888', display: 'block', fontFamily: 'monospace' }}>SKU: {item.product.sku}</span>
                            <button
                              onClick={() => removeFromCart(item.product.id)}
                              style={{ background: 'none', border: 'none', color: '#dc2626', fontSize: '12px', padding: 0, marginTop: '8px', cursor: 'pointer', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                            >
                              ✕ Remove
                            </button>
                          </div>
                        </div>

                        {/* Unit price */}
                        <div style={{ textAlign: 'center', fontSize: '14px', fontWeight: 600, color: '#1d1d1d' }}>
                          {formatINR(item.product.price)}
                        </div>

                        {/* Quantity counter */}
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                          <div style={{ display: 'inline-flex', alignItems: 'center', border: '1px solid #d1d5db', borderRadius: '4px', background: '#ffffff', overflow: 'hidden' }}>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              style={{ padding: '6px 12px', background: '#f9fafb', border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: '14px' }}
                            >
                              −
                            </button>
                            <span style={{ padding: '6px 12px', fontSize: '13px', fontWeight: 700, minWidth: '32px', textAlign: 'center' }}>
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              style={{ padding: '6px 12px', background: '#f9fafb', border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: '14px' }}
                            >
                              +
                            </button>
                          </div>
                        </div>

                        {/* Total price */}
                        <div style={{ textAlign: 'right', fontSize: '16px', fontWeight: 800, color: '#1d1d1d' }}>
                          {formatINR(item.product.price * item.quantity)}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Order Notes / Hospital PO Reference */}
                  <div style={{ marginTop: '24px', background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '18px 20px' }}>
                    <label htmlFor="order-note" style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#374151', marginBottom: '6px' }}>
                      Special Instructions / Hospital Purchase Order (PO) Notes:
                    </label>
                    <textarea
                      id="order-note"
                      rows={3}
                      value={orderNote}
                      onChange={e => setOrderNote(e.target.value)}
                      placeholder="Add any specific batch/lot requirements, hospital delivery bay, GSTIN, or PO details..."
                      style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '13px', fontFamily: 'inherit', resize: 'vertical' }}
                    />
                  </div>
                </div>

                {/* Right: Order Summary */}
                <div>
                  <div style={{ background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '10px', padding: '24px', position: 'sticky', top: '90px', boxShadow: '0 4px 16px rgba(0,0,0,0.04)' }}>
                    <h2 style={{ fontSize: '18px', fontWeight: 700, margin: '0 0 20px 0', borderBottom: '1px solid #e5e7eb', paddingBottom: '14px', color: '#1d1d1d' }}>
                      Order Summary
                    </h2>

                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '14px', color: '#555' }}>
                      <span>Subtotal ({totalItems} items)</span>
                      <span style={{ fontWeight: 700, color: '#1d1d1d' }}>{formatINR(subtotal)}</span>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '14px', color: '#555' }}>
                      <span>Estimated Shipping</span>
                      <span style={{ fontWeight: 700, color: '#16a34a' }}>FREE</span>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '18px', fontSize: '14px', color: '#555' }}>
                      <span>Estimated Taxes (GST)</span>
                      <span style={{ fontSize: '12px', color: '#777' }}>Included in price</span>
                    </div>

                    <div style={{ borderTop: '2px solid #e5e7eb', paddingTop: '16px', marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                      <span style={{ fontSize: '18px', fontWeight: 800, color: '#1d1d1d' }}>Total</span>
                      <div style={{ textAlign: 'right' }}>
                        <span style={{ fontSize: '24px', fontWeight: 800, color: '#1d1d1d' }}>{formatINR(subtotal)}</span>
                        <div style={{ fontSize: '11px', color: '#888' }}>Tax invoice generated with order</div>
                      </div>
                    </div>

                    {/* Checkout Button */}
                    <button
                      onClick={proceedToCheckout}
                      disabled={isCheckingOut}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        width: '100%',
                        background: isCheckingOut ? '#555555' : '#1d1d1d',
                        color: '#ffffff',
                        padding: '16px 20px',
                        borderRadius: '6px',
                        fontSize: '15px',
                        fontWeight: 700,
                        border: 'none',
                        cursor: isCheckingOut ? 'not-allowed' : 'pointer',
                        textTransform: 'uppercase',
                        letterSpacing: '0.04em',
                        marginBottom: '14px',
                        boxSizing: 'border-box',
                        transition: 'background 0.2s ease'
                      }}
                    >
                      {isCheckingOut ? (
                        <>
                          <svg className="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ animation: 'spin 1s linear infinite' }}>
                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.25"/>
                            <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor"/>
                          </svg>
                          <span>Connecting to Shopify Checkout...</span>
                        </>
                      ) : (
                        <>
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                            <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                          </svg>
                          <span>Proceed to Checkout</span>
                        </>
                      )}
                    </button>

                    {/* Secondary B2B Quote Option for Institutional Buyers */}
                    <div style={{ background: '#f5f3ed', border: '1px solid #e8e4d8', borderRadius: '6px', padding: '14px', textAlign: 'center' }}>
                      <div style={{ fontSize: '12px', fontWeight: 700, color: '#1d1d1d', marginBottom: '4px' }}>
                        Need an Institutional Rate Contract or RFQ?
                      </div>
                      <div style={{ fontSize: '11px', color: '#666', marginBottom: '10px' }}>
                        Convert this cart into a formal quote request with hospital tiered pricing.
                      </div>
                      <Link
                        href="/in/b2b-quote"
                        style={{
                          background: 'linear-gradient(135deg, #e99114 0%, #cf7b07 100%)',
                          color: '#ffffff',
                          display: 'block',
                          padding: '10px',
                          borderRadius: '4px',
                          fontWeight: 700,
                          fontSize: '12px',
                          textDecoration: 'none'
                        }}
                      >
                        Convert Cart to Quote Request
                      </Link>
                    </div>

                    {/* Trust Badges */}
                    <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', gap: '16px', fontSize: '11px', color: '#777' }}>
                      <span>🔒 256-Bit SSL Secure</span>
                      <span>•</span>
                      <span>✓ GST Compliant</span>
                      <span>•</span>
                      <span>📦 Insured Transit</span>
                    </div>

                  </div>
                </div>

              </div>
            </div>
          )}

        </div>
      </main>

      <Footer />

      <style>{`
        @media (max-width: 860px) {
          .cart-layout-grid {
            grid-template-columns: 1fr !important;
          }
          .cart-table-header {
            display: none !important;
          }
          .cart-table-row {
            grid-template-columns: 1fr !important;
            gap: 12px !important;
            text-align: left !important;
          }
        }
      `}</style>
    </div>
  );
}
