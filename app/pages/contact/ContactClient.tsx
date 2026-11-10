'use client';

import React, { useState } from 'react';
import AnnouncementBar from '@/components/AnnouncementBar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="template-page">
      <AnnouncementBar />
      <Navbar />
      <main id="site-main" className="site-main" role="main">
        <article className="site-page" data-template-page data-template-contact style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 20px' }}>
          <header className="page-masthead" style={{ marginBottom: '32px', textAlign: 'center' }}>
            <h1 className="page-title" style={{ fontSize: '32px', fontWeight: 700, color: '#1d1d1d' }}>Contact Us</h1>
          </header>

          <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px' }} className="contact-grid">

            {/* Contact Form */}
            <div>
              <h2 style={{ fontWeight: 700, fontSize: '20px', marginBottom: '20px' }}>Send Us a Message</h2>
              {submitted ? (
                <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '8px', padding: '24px', textAlign: 'center' }}>
                  <p style={{ color: '#166534', fontWeight: 600, fontSize: '16px' }}>✓ Message Received!</p>
                  <p style={{ color: '#15803d', fontSize: '14px' }}>Thank you for contacting us. We will respond within 2 business hours.</p>
                  <button onClick={() => setSubmitted(false)} style={{ marginTop: '16px', background: '#046e82', color: '#fff', border: 'none', borderRadius: '4px', padding: '8px 20px', cursor: 'pointer', fontWeight: 600 }}>
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="form-fields">
                  <div className="form-field">
                    <label className="form-field-label" htmlFor="contact-name">Full Name <span style={{ color: '#d32' }}>*</span></label>
                    <input
                      className="form-field-input"
                      type="text"
                      id="contact-name"
                      required
                      placeholder="Your full name"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div className="form-field">
                    <label className="form-field-label" htmlFor="contact-email">Email Address <span style={{ color: '#d32' }}>*</span></label>
                    <input
                      className="form-field-input"
                      type="email"
                      id="contact-email"
                      required
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                  <div className="form-field">
                    <label className="form-field-label" htmlFor="contact-phone">Phone Number</label>
                    <input
                      className="form-field-input"
                      type="tel"
                      id="contact-phone"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                  <div className="form-field">
                    <label className="form-field-label" htmlFor="contact-subject">Subject <span style={{ color: '#d32' }}>*</span></label>
                    <input
                      className="form-field-input"
                      type="text"
                      id="contact-subject"
                      required
                      placeholder="How can we help?"
                      value={formData.subject}
                      onChange={e => setFormData({ ...formData, subject: e.target.value })}
                    />
                  </div>
                  <div className="form-field">
                    <label className="form-field-label" htmlFor="contact-message">Message <span style={{ color: '#d32' }}>*</span></label>
                    <textarea
                      className="form-field-input"
                      id="contact-message"
                      required
                      rows={5}
                      placeholder="Tell us about your requirements..."
                      value={formData.message}
                      onChange={e => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>
                  <div style={{ marginTop: '12px' }}>
                    <button type="submit" className="button-primary" style={{ width: '100%', padding: '12px', fontSize: '14px', borderRadius: '4px', cursor: 'pointer', textAlign: 'center' }}>Send Message</button>
                  </div>
                </form>
              )}
            </div>

            {/* Contact Info */}
            <div>
              <h2 style={{ fontWeight: 700, fontSize: '20px', marginBottom: '20px' }}>Get in Touch</h2>
              <div className="rte" style={{ lineHeight: 1.8 }}>
                <p><strong>Medventa Institutional Procurement Division</strong></p>
                <p>M-135, 2nd Floor, Connaught Place<br />New Delhi – 110001, India</p>
                <p>
                  <strong>Phone:</strong>{' '}
                  <a href="tel:+918368490741" style={{ color: '#046e82' }}>+91 8368490741</a>
                </p>
                <p>
                  <strong>Email:</strong>{' '}
                  <a href="mailto:medventaindia@gmail.com" style={{ color: '#046e82' }}>medventaindia@gmail.com</a>
                </p>
                <p>
                  <strong>WhatsApp:</strong>{' '}
                  <a href="https://wa.me/918368490741" target="_blank" rel="noopener noreferrer" style={{ color: '#046e82' }}>
                    Chat on WhatsApp
                  </a>
                </p>
                <p>
                  <strong>Business Hours:</strong><br />
                  Monday – Saturday: 10:00 AM – 6:00 PM (IST)<br />
                  Closed on Sundays and Public Holidays
                </p>
              </div>

              <div style={{ marginTop: '32px', background: '#f5f3ed', borderRadius: '8px', padding: '20px' }}>
                <h3 style={{ fontWeight: 700, fontSize: '16px', marginBottom: '8px' }}>Need Bulk or Institutional Pricing?</h3>
                <p style={{ fontSize: '14px', color: '#555', marginBottom: '16px' }}>
                  We provide custom RFQ quotations for hospitals, clinical laboratories, and healthcare facilities.
                </p>
                <a
                  href="/in/b2b-quote"
                  className="button-primary"
                  style={{ display: 'inline-block', textDecoration: 'none', padding: '10px 20px', fontSize: '13px', borderRadius: '4px' }}
                >
                  Request a Quote
                </a>
              </div>
            </div>

          </div>
        </article>
      </main>
      <Footer />
      <style>{`
        @media (max-width: 768px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
