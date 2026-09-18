'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function CheckoutPage() {
  const { cartItems, subtotal, clearCart } = useCart();

  const [formData, setFormData] = useState({
    emailOrPhone: '',
    isInstitution: false,
    institutionName: '',
    gstin: '',
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    state: 'Delhi',
    pincode: '',
    phone: '',
    shippingMethod: 'standard',
    paymentMethod: 'upi',
    upiId: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvv: '',
    poNumber: ''
  });

  const [placedOrder, setPlacedOrder] = useState<any>(null);
  const [submitting, setSubmitting] = useState(false);

  const formatINR = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      const orderNumber = 'MED-' + Math.floor(100000 + Math.random() * 900000);
      setPlacedOrder({
        orderNumber,
        items: [...cartItems],
        total: subtotal,
        formData: { ...formData },
        date: new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })
      });
      clearCart();
      setSubmitting(false);
    }, 1200);
  };

  // If order was placed, render order confirmation screen
  if (placedOrder) {
    return (
      <div style={{ minHeight: '100vh', background: '#f8fafc', padding: '40px 20px', fontFamily: 'var(--font-body, "Libre Franklin", sans-serif)' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', background: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '48px 36px', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div style={{ width: '64px', height: '64px', background: '#dcfce7', color: '#16a34a', borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', marginBottom: '16px' }}>
              ✓
            </div>
            <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#1d1d1d', margin: '0 0 8px 0' }}>
              Order Confirmed!
            </h1>
            <p style={{ color: '#64748b', fontSize: '15px', margin: 0 }}>
              Thank you for ordering with Medventa India. Your order number is <strong>{placedOrder.orderNumber}</strong>.
            </p>
          </div>

          {/* Order Details Card */}
          <div style={{ background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0', padding: '24px', marginBottom: '32px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', fontSize: '14px' }}>
              <div>
                <span style={{ color: '#888', display: 'block', fontSize: '12px' }}>DISPATCH ADDRESS</span>
                <strong style={{ color: '#1d1d1d' }}>{placedOrder.formData.firstName} {placedOrder.formData.lastName}</strong>
                {placedOrder.formData.institutionName && <div style={{ color: '#046e82', fontWeight: 600 }}>{placedOrder.formData.institutionName}</div>}
                <div>{placedOrder.formData.address}</div>
                {placedOrder.formData.apartment && <div>{placedOrder.formData.apartment}</div>}
                <div>{placedOrder.formData.city}, {placedOrder.formData.state} - {placedOrder.formData.pincode}</div>
                <div style={{ color: '#666', marginTop: '4px' }}>Phone: {placedOrder.formData.phone || placedOrder.formData.emailOrPhone}</div>
              </div>

              <div>
                <span style={{ color: '#888', display: 'block', fontSize: '12px' }}>ORDER DETAILS</span>
                <div><strong>Date:</strong> {placedOrder.date}</div>
                <div><strong>Payment Method:</strong> {placedOrder.formData.paymentMethod.toUpperCase()}</div>
                <div><strong>Shipping:</strong> Standard Insured Delivery (Free)</div>
                {placedOrder.formData.gstin && <div><strong>GSTIN:</strong> {placedOrder.formData.gstin}</div>}
                {placedOrder.formData.poNumber && <div><strong>PO Number:</strong> {placedOrder.formData.poNumber}</div>}
              </div>
            </div>
          </div>

          {/* Items Summary */}
          <div style={{ marginBottom: '32px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '14px', borderBottom: '1px solid #eee', paddingBottom: '8px' }}>
              Ordered Products
            </h3>
            {placedOrder.items.map((it: any, idx: number) => (
              <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #f3f4f6' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <img src={it.product.image} alt={it.product.name} style={{ width: '48px', height: '48px', objectFit: 'contain', border: '1px solid #eee', borderRadius: '4px', padding: '4px' }} />
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 700 }}>{it.product.name}</div>
                    <div style={{ fontSize: '12px', color: '#666' }}>Qty: {it.quantity} × {formatINR(it.product.price)}</div>
                  </div>
                </div>
                <div style={{ fontSize: '15px', fontWeight: 800 }}>{formatINR(it.product.price * it.quantity)}</div>
              </div>
            ))}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px', fontSize: '18px', fontWeight: 800, color: '#1d1d1d' }}>
              <span>Total Paid / Invoiced:</span>
              <span>{formatINR(placedOrder.total)}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center' }}>
            <Link
              href="/"
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
              Return to Storefront
            </Link>
            <button
              onClick={() => window.print()}
              style={{
                background: '#ffffff',
                border: '1px solid #cbd5e1',
                color: '#334155',
                padding: '12px 24px',
                borderRadius: '6px',
                fontWeight: 700,
                fontSize: '14px',
                cursor: 'pointer'
              }}
            >
              🖨️ Print Tax Invoice
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', fontFamily: 'var(--font-body, "Libre Franklin", sans-serif)' }}>

      {/* Checkout Header */}
      <header style={{ background: '#ffffff', borderBottom: '1px solid #e2e8f0', padding: '16px 20px' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
            <img
              src="/cdn/shop/files/ChatGPT_Image_Aug_13_2025_10_35_46_AM_1_579x173.png?v=1755106616"
              alt="Medventa"
              style={{ maxHeight: '42px', width: 'auto' }}
            />
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#16a34a', fontSize: '13px', fontWeight: 700 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
            <span>256-Bit SSL Encrypted Checkout</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '32px 20px 80px' }}>

        {cartItems.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', background: '#ffffff', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '12px' }}>Your cart is empty</h2>
            <p style={{ color: '#666', marginBottom: '20px' }}>Add items from the catalog before checking out.</p>
            <Link href="/collections/all" style={{ background: '#1d1d1d', color: '#fff', padding: '10px 24px', borderRadius: '6px', textDecoration: 'none', fontWeight: 700 }}>
              Go to Catalog
            </Link>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '48px' }} className="checkout-grid">

            {/* Left: Checkout Form */}
            <form onSubmit={handlePlaceOrder}>
              {/* 1. Contact Information */}
              <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '24px', marginBottom: '24px' }}>
                <h2 style={{ fontSize: '17px', fontWeight: 700, color: '#1d1d1d', margin: '0 0 16px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>1. Contact Information</span>
                  <Link href="/cart" style={{ fontSize: '13px', color: '#046e82', fontWeight: 600, textDecoration: 'none' }}>
                    Edit Cart
                  </Link>
                </h2>

                <div style={{ marginBottom: '14px' }}>
                  <label htmlFor="contact-input" style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>
                    Email Address or Mobile Phone <span style={{ color: '#dc2626' }}>*</span>
                  </label>
                  <input
                    id="contact-input"
                    type="text"
                    required
                    placeholder="dr.sharma@hospital.org or +91 98765 43210"
                    value={formData.emailOrPhone}
                    onChange={e => setFormData({ ...formData, emailOrPhone: e.target.value })}
                    style={{ width: '100%', padding: '11px 14px', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '14px', boxSizing: 'border-box' }}
                  />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                  <input
                    type="checkbox"
                    id="is-institution"
                    checked={formData.isInstitution}
                    onChange={e => setFormData({ ...formData, isInstitution: e.target.checked })}
                    style={{ width: '16px', height: '16px', cursor: 'pointer' }}
                  />
                  <label htmlFor="is-institution" style={{ fontSize: '13px', color: '#374151', cursor: 'pointer', fontWeight: 600 }}>
                    Purchasing on behalf of a Hospital, Clinic, or Diagnostic Center
                  </label>
                </div>

                {formData.isInstitution && (
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginTop: '12px', background: '#f8fafc', padding: '16px', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
                    <div>
                      <label htmlFor="institution-name" style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>
                        Institution / Hospital Name <span style={{ color: '#dc2626' }}>*</span>
                      </label>
                      <input
                        id="institution-name"
                        type="text"
                        required={formData.isInstitution}
                        placeholder="Apollo Specialty Hospitals"
                        value={formData.institutionName}
                        onChange={e => setFormData({ ...formData, institutionName: e.target.value })}
                        style={{ width: '100%', padding: '9px 12px', borderRadius: '4px', border: '1px solid #cbd5e1', fontSize: '13px', boxSizing: 'border-box' }}
                      />
                    </div>
                    <div>
                      <label htmlFor="gstin-input" style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>
                        GSTIN (for Input Tax Credit)
                      </label>
                      <input
                        id="gstin-input"
                        type="text"
                        placeholder="07AAAAA0000A1Z5"
                        value={formData.gstin}
                        onChange={e => setFormData({ ...formData, gstin: e.target.value })}
                        style={{ width: '100%', padding: '9px 12px', borderRadius: '4px', border: '1px solid #cbd5e1', fontSize: '13px', boxSizing: 'border-box' }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* 2. Shipping Address */}
              <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '24px', marginBottom: '24px' }}>
                <h2 style={{ fontSize: '17px', fontWeight: 700, color: '#1d1d1d', margin: '0 0 16px 0' }}>
                  2. Delivery Address
                </h2>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
                  <div>
                    <label htmlFor="first-name" style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>First Name <span style={{ color: '#dc2626' }}>*</span></label>
                    <input
                      id="first-name"
                      type="text"
                      required
                      placeholder="Dr. Rajesh"
                      value={formData.firstName}
                      onChange={e => setFormData({ ...formData, firstName: e.target.value })}
                      style={{ width: '100%', padding: '11px 14px', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '14px', boxSizing: 'border-box' }}
                    />
                  </div>
                  <div>
                    <label htmlFor="last-name" style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>Last Name <span style={{ color: '#dc2626' }}>*</span></label>
                    <input
                      id="last-name"
                      type="text"
                      required
                      placeholder="Sharma"
                      value={formData.lastName}
                      onChange={e => setFormData({ ...formData, lastName: e.target.value })}
                      style={{ width: '100%', padding: '11px 14px', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '14px', boxSizing: 'border-box' }}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '14px' }}>
                  <label htmlFor="address-line" style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>Address (Street, Hospital Wing, Building) <span style={{ color: '#dc2626' }}>*</span></label>
                  <input
                    id="address-line"
                    type="text"
                    required
                    placeholder="Wing C, Central Stores, Plot 14, Institutional Area"
                    value={formData.address}
                    onChange={e => setFormData({ ...formData, address: e.target.value })}
                    style={{ width: '100%', padding: '11px 14px', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '14px', boxSizing: 'border-box' }}
                  />
                </div>

                <div style={{ marginBottom: '14px' }}>
                  <label htmlFor="apt-line" style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>Apartment, suite, unit (optional)</label>
                  <input
                    id="apt-line"
                    type="text"
                    placeholder="Floor 2, Medical Procurement Dept."
                    value={formData.apartment}
                    onChange={e => setFormData({ ...formData, apartment: e.target.value })}
                    style={{ width: '100%', padding: '11px 14px', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '14px', boxSizing: 'border-box' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr', gap: '14px', marginBottom: '14px' }}>
                  <div>
                    <label htmlFor="city-input" style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>City <span style={{ color: '#dc2626' }}>*</span></label>
                    <input
                      id="city-input"
                      type="text"
                      required
                      placeholder="New Delhi"
                      value={formData.city}
                      onChange={e => setFormData({ ...formData, city: e.target.value })}
                      style={{ width: '100%', padding: '11px 14px', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '14px', boxSizing: 'border-box' }}
                    />
                  </div>
                  <div>
                    <label htmlFor="state-select" style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>State <span style={{ color: '#dc2626' }}>*</span></label>
                    <select
                      id="state-select"
                      value={formData.state}
                      onChange={e => setFormData({ ...formData, state: e.target.value })}
                      style={{ width: '100%', padding: '11px 14px', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '14px', boxSizing: 'border-box', background: '#fff' }}
                    >
                      <option value="Delhi">Delhi</option>
                      <option value="Maharashtra">Maharashtra</option>
                      <option value="Karnataka">Karnataka</option>
                      <option value="Tamil Nadu">Tamil Nadu</option>
                      <option value="Telangana">Telangana</option>
                      <option value="West Bengal">West Bengal</option>
                      <option value="Gujarat">Gujarat</option>
                      <option value="Uttar Pradesh">Uttar Pradesh</option>
                      <option value="Haryana">Haryana</option>
                      <option value="Other">Other State</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="pincode-input" style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>PIN Code <span style={{ color: '#dc2626' }}>*</span></label>
                    <input
                      id="pincode-input"
                      type="text"
                      required
                      placeholder="110001"
                      value={formData.pincode}
                      onChange={e => setFormData({ ...formData, pincode: e.target.value })}
                      style={{ width: '100%', padding: '11px 14px', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '14px', boxSizing: 'border-box' }}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="phone-input" style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>Contact Phone for Delivery Dispatch <span style={{ color: '#dc2626' }}>*</span></label>
                  <input
                    id="phone-input"
                    type="tel"
                    required
                    placeholder="+91 83684 90741"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    style={{ width: '100%', padding: '11px 14px', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '14px', boxSizing: 'border-box' }}
                  />
                </div>
              </div>

              {/* 3. Payment Method */}
              <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '24px', marginBottom: '28px' }}>
                <h2 style={{ fontSize: '17px', fontWeight: 700, color: '#1d1d1d', margin: '0 0 16px 0' }}>
                  3. Payment Method
                </h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {/* UPI */}
                  <label style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px', border: formData.paymentMethod === 'upi' ? '2px solid #046e82' : '1px solid #e2e8f0', borderRadius: '8px', cursor: 'pointer', background: formData.paymentMethod === 'upi' ? '#f0f9fa' : '#fff' }}>
                    <input
                      type="radio"
                      name="payment"
                      checked={formData.paymentMethod === 'upi'}
                      onChange={() => setFormData({ ...formData, paymentMethod: 'upi' })}
                    />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, fontSize: '14px', color: '#1d1d1d' }}>UPI (Google Pay, PhonePe, Paytm, BHIM)</div>
                      <div style={{ fontSize: '12px', color: '#666' }}>Instant zero-fee settlement via QR code or Virtual Payment Address</div>
                    </div>
                  </label>

                  {/* Cards */}
                  <label style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px', border: formData.paymentMethod === 'card' ? '2px solid #046e82' : '1px solid #e2e8f0', borderRadius: '8px', cursor: 'pointer', background: formData.paymentMethod === 'card' ? '#f0f9fa' : '#fff' }}>
                    <input
                      type="radio"
                      name="payment"
                      checked={formData.paymentMethod === 'card'}
                      onChange={() => setFormData({ ...formData, paymentMethod: 'card' })}
                    />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, fontSize: '14px', color: '#1d1d1d' }}>Credit & Debit Cards (Visa, MasterCard, RuPay)</div>
                      <div style={{ fontSize: '12px', color: '#666' }}>Corporate cards & institutional cards supported</div>
                    </div>
                  </label>

                  {/* Net Banking */}
                  <label style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px', border: formData.paymentMethod === 'netbanking' ? '2px solid #046e82' : '1px solid #e2e8f0', borderRadius: '8px', cursor: 'pointer', background: formData.paymentMethod === 'netbanking' ? '#f0f9fa' : '#fff' }}>
                    <input
                      type="radio"
                      name="payment"
                      checked={formData.paymentMethod === 'netbanking'}
                      onChange={() => setFormData({ ...formData, paymentMethod: 'netbanking' })}
                    />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, fontSize: '14px', color: '#1d1d1d' }}>Net Banking (All Indian Commercial Banks)</div>
                      <div style={{ fontSize: '12px', color: '#666' }}>Direct RTGS / NEFT transfer credentials provided</div>
                    </div>
                  </label>

                  {/* Cash on Delivery */}
                  <label style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px', border: formData.paymentMethod === 'cod' ? '2px solid #046e82' : '1px solid #e2e8f0', borderRadius: '8px', cursor: 'pointer', background: formData.paymentMethod === 'cod' ? '#f0f9fa' : '#fff' }}>
                    <input
                      type="radio"
                      name="payment"
                      checked={formData.paymentMethod === 'cod'}
                      onChange={() => setFormData({ ...formData, paymentMethod: 'cod' })}
                    />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, fontSize: '14px', color: '#1d1d1d' }}>Cash / Pay on Delivery (COD)</div>
                      <div style={{ fontSize: '12px', color: '#666' }}>Available for orders up to ₹25,000</div>
                    </div>
                  </label>

                  {/* Institutional PO */}
                  <label style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px', border: formData.paymentMethod === 'po' ? '2px solid #046e82' : '1px solid #e2e8f0', borderRadius: '8px', cursor: 'pointer', background: formData.paymentMethod === 'po' ? '#f0f9fa' : '#fff' }}>
                    <input
                      type="radio"
                      name="payment"
                      checked={formData.paymentMethod === 'po'}
                      onChange={() => setFormData({ ...formData, paymentMethod: 'po' })}
                    />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, fontSize: '14px', color: '#1d1d1d' }}>Institutional Purchase Order (Net 30 Terms)</div>
                      <div style={{ fontSize: '12px', color: '#666' }}>For registered hospitals & clinics holding credit accounts</div>
                    </div>
                  </label>
                </div>

                {formData.paymentMethod === 'po' && (
                  <div style={{ marginTop: '14px', background: '#f8fafc', padding: '14px', borderRadius: '6px', border: '1px solid #cbd5e1' }}>
                    <label htmlFor="po-number" style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>
                      Hospital PO Reference Number
                    </label>
                    <input
                      id="po-number"
                      type="text"
                      placeholder="PO/2026/09/8412"
                      value={formData.poNumber}
                      onChange={e => setFormData({ ...formData, poNumber: e.target.value })}
                      style={{ width: '100%', padding: '9px 12px', borderRadius: '4px', border: '1px solid #cbd5e1', fontSize: '13px', boxSizing: 'border-box' }}
                    />
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={submitting}
                style={{
                  width: '100%',
                  background: '#1d1d1d',
                  color: '#ffffff',
                  padding: '18px 24px',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: 800,
                  border: 'none',
                  cursor: submitting ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                  boxShadow: '0 4px 14px rgba(0,0,0,0.15)'
                }}
              >
                {submitting ? 'Processing Order...' : `Complete Order • ${formatINR(subtotal)}`}
              </button>
            </form>

            {/* Right: Order Summary Sidebar */}
            <div>
              <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '24px', position: 'sticky', top: '24px', boxShadow: '0 2px 10px rgba(0,0,0,0.03)' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 700, margin: '0 0 16px 0', borderBottom: '1px solid #e2e8f0', paddingBottom: '12px' }}>
                  Order Summary ({cartItems.length} {cartItems.length === 1 ? 'item' : 'items'})
                </h3>

                <div style={{ maxHeight: '340px', overflowY: 'auto', marginBottom: '16px' }}>
                  {cartItems.map(it => (
                    <div key={it.product.id} style={{ display: 'flex', gap: '12px', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #f3f4f6' }}>
                      <div style={{ position: 'relative', width: '56px', height: '56px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4px', flexShrink: 0 }}>
                        <img src={it.product.image} alt={it.product.name} style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} />
                        <span style={{ position: 'absolute', top: '-6px', right: '-6px', background: '#64748b', color: '#fff', fontSize: '10px', fontWeight: 700, width: '18px', height: '18px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          {it.quantity}
                        </span>
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: '13px', fontWeight: 700, color: '#1d1d1d', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{it.product.name}</div>
                        <div style={{ fontSize: '11px', color: '#64748b' }}>{it.product.brand}</div>
                      </div>
                      <div style={{ fontSize: '13px', fontWeight: 700, color: '#1d1d1d' }}>
                        {formatINR(it.product.price * it.quantity)}
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '14px', fontSize: '14px', display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ color: '#64748b' }}>Subtotal</span>
                  <span style={{ fontWeight: 700 }}>{formatINR(subtotal)}</span>
                </div>
                <div style={{ fontSize: '14px', display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ color: '#64748b' }}>Shipping</span>
                  <span style={{ color: '#16a34a', fontWeight: 700 }}>FREE</span>
                </div>
                <div style={{ fontSize: '14px', display: 'flex', justifyContent: 'space-between', marginBottom: '14px' }}>
                  <span style={{ color: '#64748b' }}>Estimated GST</span>
                  <span style={{ color: '#64748b', fontSize: '12px' }}>Included in price</span>
                </div>

                <div style={{ borderTop: '2px solid #1d1d1d', paddingTop: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span style={{ fontSize: '17px', fontWeight: 800 }}>Total</span>
                  <span style={{ fontSize: '22px', fontWeight: 800, color: '#1d1d1d' }}>{formatINR(subtotal)}</span>
                </div>
              </div>
            </div>

          </div>
        )}

      </div>

      <style>{`
        @media (max-width: 860px) {
          .checkout-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
