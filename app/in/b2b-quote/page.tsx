'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import AnnouncementBar from '@/components/AnnouncementBar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { 
  Building2, 
  ShieldCheck, 
  Clock, 
  CheckCircle2, 
  Send, 
  FileText, 
  PhoneCall, 
  MessageCircle,
  Truck,
  FileSpreadsheet
} from 'lucide-react';

const TIER_1_CITIES = [
  'Delhi NCR (New Delhi, Gurgaon, Noida, Faridabad)',
  'Mumbai / MMR (Mumbai, Thane, Navi Mumbai)',
  'Bengaluru (Karnataka)',
  'Chennai (Tamil Nadu)',
  'Hyderabad (Telangana)',
  'Kolkata (West Bengal)',
  'Pune (Maharashtra)',
  'Ahmedabad (Gujarat)',
  'International / GCC (UAE, Saudi Arabia)',
  'Other Location in India'
];

const INSTITUTION_TYPES = [
  'Tertiary / Multi-Speciality Hospital',
  'Private Surgical Clinic / Daycare Center',
  'Diagnostic Laboratory / Pathology Network',
  'Medical College & Research Institute',
  'Government Hospital / PSU Health Center',
  'Authorized Sub-Distributor / Wholesaler'
];

const PRODUCT_CATEGORIES = [
  'Surgical Supplies & Disposables',
  'Sutures & Needles (Medtronic / Ethicon)',
  'BD Vacutainers & Blood Collection Systems',
  'Catheters, Nephrology & Dialysis Consumables',
  'Laboratory Equipment & Reagents (Sarstedt)',
  'Diagnostics & ENT/Ophthalmic Sets (Welch Allyn)',
  'Advanced Wound Care & Antibiotics (VitaStem Ultra)',
  'Orthopedic Implants & Rehabilitation Braces'
];

function B2BQuoteForm() {
  const searchParams = useSearchParams();
  const prefillProduct = searchParams?.get('product') || '';

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    institutionName: '',
    institutionType: INSTITUTION_TYPES[0],
    city: TIER_1_CITIES[0],
    gstin: '',
    contactName: '',
    designation: '',
    email: '',
    phone: '',
    selectedCategories: [] as string[],
    procurementFrequency: 'One-time Bulk Order',
    budgetRange: '₹2 Lakh – ₹10 Lakh',
    message: prefillProduct ? `Inquiry for product: ${prefillProduct}` : ''
  });

  useEffect(() => {
    if (prefillProduct && !formData.message) {
      setFormData(prev => ({ ...prev, message: `Inquiry for product: ${prefillProduct}` }));
    }
  }, [prefillProduct]);

  const toggleCategory = (cat: string) => {
    setFormData(prev => {
      const exists = prev.selectedCategories.includes(cat);
      if (exists) {
        return { ...prev, selectedCategories: prev.selectedCategories.filter(c => c !== cat) };
      } else {
        return { ...prev, selectedCategories: [...prev.selectedCategories, cat] };
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate high-speed form submission
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 800);
  };

  return (
    <div className="bg-[#fcfbf9] min-h-screen flex flex-col">
      <AnnouncementBar />
      <Navbar />
      
      {/* Top Breadcrumb & Page Banner */}
      <section className="bg-[#121212] text-white py-12 px-4 border-b border-gray-800">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
            <span>Home</span>
            <span>/</span>
            <span className="text-[#e99114]">Institutional B2B Procurement Desk</span>
          </div>
          <div className="max-w-3xl">
            <span className="inline-block bg-[#046e82] text-white text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded mb-3">
              Official Institutional Quotation (RFQ)
            </span>
            <h1 className="text-3xl sm:text-4xl font-black font-heading text-white tracking-tight mb-4">
              Request a Customized B2B Quote
            </h1>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
              Tier-1 wholesale pricing, GST tax invoicing, and credit terms for Hospitals, Diagnostic Chains, Clinics, and Surgeons across India and the GCC.
            </p>
          </div>
        </div>
      </section>

      {/* Trust & SLA Banner */}
      <section className="bg-[#f5f3ed] border-b border-[#e5e5e5] py-4 px-4">
        <div className="max-w-[1400px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-[#046e82] shrink-0" />
            <div>
              <p className="font-bold text-[#1d1d1d]">CDSCO Authorized</p>
              <p className="text-[#666] text-[11px]">100% Genuine Certified Stock</p>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <Clock className="w-5 h-5 text-[#046e82] shrink-0" />
            <div>
              <p className="font-bold text-[#1d1d1d]">Guaranteed 2-Hour Response</p>
              <p className="text-[#666] text-[11px]">Direct Pricing Team Dispatch</p>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <FileSpreadsheet className="w-5 h-5 text-[#046e82] shrink-0" />
            <div>
              <p className="font-bold text-[#1d1d1d]">GST & Tender Invoicing</p>
              <p className="text-[#666] text-[11px]">ITC Credit Ready Documents</p>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <Truck className="w-5 h-5 text-[#046e82] shrink-0" />
            <div>
              <p className="font-bold text-[#1d1d1d]">Pan-India Express Dispatch</p>
              <p className="text-[#666] text-[11px]">Air/Road Freight Logistics</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-[1400px] mx-auto px-4 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Form Container (Left 8 Cols) */}
          <div className="lg:col-span-8 bg-white border border-[#e5e5e5] rounded-lg shadow-sm p-6 sm:p-8">
            
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h2 className="text-2xl font-bold text-[#1d1d1d]">
                  RFQ Successfully Received!
                </h2>
                <p className="text-sm text-[#555] max-w-md mx-auto leading-relaxed">
                  Thank you, <strong>{formData.contactName || 'Valued Partner'}</strong>. Your institutional quotation request for <strong>{formData.institutionName || 'your facility'}</strong> has been assigned to our senior institutional procurement desk.
                </p>
                <div className="bg-[#f5f3ed] p-4 rounded-lg text-xs max-w-md mx-auto text-left space-y-2 border border-[#e5e5e5]">
                  <p><strong>Reference ID:</strong> MED-RFQ-{Math.floor(100000 + Math.random() * 900000)}</p>
                  <p><strong>Estimated Quote Delivery:</strong> Within 2 Business Hours</p>
                  <p><strong>Direct Helpline:</strong> +91 8368490741</p>
                </div>
                <div className="pt-4">
                  <button
                    onClick={() => setSubmitted(false)}
                    className="bg-[#046e82] hover:bg-[#035565] text-white text-xs font-bold px-6 py-2.5 rounded transition"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                
                {/* Section 1: Institution Details */}
                <div>
                  <div className="flex items-center gap-2 border-b border-[#eee] pb-2 mb-4">
                    <Building2 className="w-5 h-5 text-[#046e82]" />
                    <h2 className="text-base font-bold text-[#1d1d1d]">
                      1. Healthcare Facility & Institutional Details
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <label className="block font-semibold text-[#333] mb-1">
                        Hospital / Laboratory / Clinic Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Apex Super Speciality Hospital"
                        value={formData.institutionName}
                        onChange={e => setFormData({ ...formData, institutionName: e.target.value })}
                        className="w-full border border-[#ccc] rounded px-3 py-2 text-sm focus:border-[#046e82] outline-none"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-[#333] mb-1">
                        Facility Type <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={formData.institutionType}
                        onChange={e => setFormData({ ...formData, institutionType: e.target.value })}
                        className="w-full border border-[#ccc] rounded px-3 py-2 text-sm bg-white focus:border-[#046e82] outline-none"
                      >
                        {INSTITUTION_TYPES.map(t => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block font-semibold text-[#333] mb-1">
                        Operating Region / Tier-1 City <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={formData.city}
                        onChange={e => setFormData({ ...formData, city: e.target.value })}
                        className="w-full border border-[#ccc] rounded px-3 py-2 text-sm bg-white focus:border-[#046e82] outline-none"
                      >
                        {TIER_1_CITIES.map(c => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block font-semibold text-[#333] mb-1">
                        GSTIN / Drug License Number (Optional for Quote)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 07AAAAA0000A1Z5"
                        value={formData.gstin}
                        onChange={e => setFormData({ ...formData, gstin: e.target.value.toUpperCase() })}
                        className="w-full border border-[#ccc] rounded px-3 py-2 text-sm focus:border-[#046e82] outline-none uppercase"
                      />
                    </div>
                  </div>
                </div>

                {/* Section 2: Contact Person */}
                <div>
                  <div className="flex items-center gap-2 border-b border-[#eee] pb-2 mb-4">
                    <PhoneCall className="w-5 h-5 text-[#046e82]" />
                    <h2 className="text-base font-bold text-[#1d1d1d]">
                      2. Procurement Officer / Clinician Contact Information
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <label className="block font-semibold text-[#333] mb-1">
                        Contact Person Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Dr. Rajesh Sharma / Mr. Arun Verma"
                        value={formData.contactName}
                        onChange={e => setFormData({ ...formData, contactName: e.target.value })}
                        className="w-full border border-[#ccc] rounded px-3 py-2 text-sm focus:border-[#046e82] outline-none"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-[#333] mb-1">
                        Designation / Role
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Purchase Head / Medical Director / Surgeon"
                        value={formData.designation}
                        onChange={e => setFormData({ ...formData, designation: e.target.value })}
                        className="w-full border border-[#ccc] rounded px-3 py-2 text-sm focus:border-[#046e82] outline-none"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-[#333] mb-1">
                        Official Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="procurement@hospital.com"
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        className="w-full border border-[#ccc] rounded px-3 py-2 text-sm focus:border-[#046e82] outline-none"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-[#333] mb-1">
                        Mobile / WhatsApp Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full border border-[#ccc] rounded px-3 py-2 text-sm focus:border-[#046e82] outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Section 3: Product Requirements & Order Scope */}
                <div>
                  <div className="flex items-center gap-2 border-b border-[#eee] pb-2 mb-4">
                    <FileText className="w-5 h-5 text-[#046e82]" />
                    <h2 className="text-base font-bold text-[#1d1d1d]">
                      3. Required Product Lines & Procurement Scope
                    </h2>
                  </div>

                  <p className="text-xs text-[#666] mb-3">
                    Select all product families you require pricing for:
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-5 text-xs">
                    {PRODUCT_CATEGORIES.map(cat => {
                      const checked = formData.selectedCategories.includes(cat);
                      return (
                        <label
                          key={cat}
                          onClick={() => toggleCategory(cat)}
                          className={`flex items-center gap-2.5 p-2.5 rounded border cursor-pointer transition select-none ${
                            checked
                              ? 'bg-[#046e82]/10 border-[#046e82] text-[#046e82] font-semibold'
                              : 'border-[#ddd] hover:bg-gray-50 text-[#333]'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => {}}
                            className="rounded text-[#046e82] focus:ring-0"
                          />
                          <span>{cat}</span>
                        </label>
                      );
                    })}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs mb-4">
                    <div>
                      <label className="block font-semibold text-[#333] mb-1">
                        Procurement Frequency
                      </label>
                      <select
                        value={formData.procurementFrequency}
                        onChange={e => setFormData({ ...formData, procurementFrequency: e.target.value })}
                        className="w-full border border-[#ccc] rounded px-3 py-2 text-sm bg-white focus:border-[#046e82] outline-none"
                      >
                        <option>One-time Bulk Purchase</option>
                        <option>Annual Rate Contract (ARC) - Monthly Supply</option>
                        <option>Quarterly Replenishment</option>
                        <option>Tender Kit / Hospital Setup Project</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-semibold text-[#333] mb-1">
                        Estimated Budget Bracket
                      </label>
                      <select
                        value={formData.budgetRange}
                        onChange={e => setFormData({ ...formData, budgetRange: e.target.value })}
                        className="w-full border border-[#ccc] rounded px-3 py-2 text-sm bg-white focus:border-[#046e82] outline-none"
                      >
                        <option>Below ₹1 Lakh</option>
                        <option>₹1 Lakh – ₹5 Lakh</option>
                        <option>₹5 Lakh – ₹20 Lakh</option>
                        <option>₹20 Lakh – ₹50 Lakh</option>
                        <option>₹50 Lakh+ (Institutional Scale)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-[#333] mb-1 text-xs">
                      Specification / Bill of Quantities (BoQ) or Special Remarks
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Paste specific product codes, brand preferences (e.g. BD Vacutainer 4ml K2 EDTA, Medtronic Vicryl 3-0 sutures, Welch Allyn otoscope heads), quantities, and target delivery timelines..."
                      value={formData.message}
                      onChange={e => setFormData({ ...formData, message: e.target.value })}
                      className="w-full border border-[#ccc] rounded px-3 py-2 text-sm focus:border-[#046e82] outline-none"
                    ></textarea>
                  </div>
                </div>

                {/* Submit CTA */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full sm:w-auto bg-[#e99114] hover:bg-[#d27d0a] text-white font-bold text-sm px-8 py-3.5 rounded shadow-sm flex items-center justify-center gap-2 transition"
                  >
                    {loading ? (
                      <span>Transmitting RFQ to Desk...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Institutional Quote Request</span>
                      </>
                    )}
                  </button>
                  <p className="text-[11px] text-[#777] mt-2">
                    Direct confidential dispatch to Medventa Institutional Sales Team (Connaught Place, New Delhi).
                  </p>
                </div>

              </form>
            )}

          </div>

          {/* Right Sidebar: Direct Contacts & Verification (Right 4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Direct WhatsApp / Phone Card */}
            <div className="bg-[#121212] text-white rounded-lg p-6 space-y-4">
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#e99114] bg-[#e99114]/10 px-2 py-0.5 rounded">
                Urgent Hospital Procurement
              </span>
              <h3 className="text-lg font-bold font-heading">
                Need an Immediate Quote for Emergency Surgery or ICU?
              </h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                Connect directly with our senior purchase desk for immediate catalog availability, price locks, and expedited metro dispatch.
              </p>
              
              <div className="space-y-3 pt-2">
                <a 
                  href="https://wa.me/918368490741?text=Hello%20Medventa%20I%20need%20a%20bulk%20hospital%20quote"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-black font-bold text-xs py-3 px-4 rounded transition"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat on WhatsApp (+91 8368490741)</span>
                </a>

                <a 
                  href="tel:+918368490741"
                  className="flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 text-white font-semibold text-xs py-3 px-4 rounded transition"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Call Direct: +91 8368490741</span>
                </a>
              </div>
            </div>

            {/* Why Procure From Medventa Card */}
            <div className="bg-white border border-[#e5e5e5] rounded-lg p-6 space-y-3 text-xs">
              <h4 className="font-bold text-sm text-[#1d1d1d] border-b border-[#eee] pb-2">
                The Medventa Advantage
              </h4>
              <ul className="space-y-2.5 text-[#555]">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#046e82] shrink-0 mt-0.5" />
                  <span><strong>Direct Authorized Sourcing:</strong> Welch Allyn, BD, Medtronic, Cook Medical, Sarstedt.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#046e82] shrink-0 mt-0.5" />
                  <span><strong>Tier-1 Hub Inventory:</strong> Ready buffer stock maintained for Delhi NCR, Mumbai, and Bengaluru networks.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#046e82] shrink-0 mt-0.5" />
                  <span><strong>Single-Vendor Consolidation:</strong> Consolidate sutures, catheters, diagnostics, and wound care on one single invoice.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#046e82] shrink-0 mt-0.5" />
                  <span><strong>GCC Export Readiness:</strong> Seamless export documentation for Dubai, Abu Dhabi, and Riyadh hospital groups.</span>
                </li>
              </ul>
            </div>

            {/* Office Location Card */}
            <div className="bg-[#f5f3ed] border border-[#e5e5e5] rounded-lg p-5 text-xs text-[#555] space-y-2">
              <p className="font-bold text-[#1d1d1d]">
                Medventa Institutional Procurement Division
              </p>
              <p>M-135, 2nd Floor, Connaught Place, New Delhi – 110001, India</p>
              <p><strong>Email:</strong> info@medventa.in / medventaindia@gmail.com</p>
              <p><strong>Desk Hours:</strong> Mon – Sat: 10:00 AM – 6:00 PM IST</p>
            </div>

          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
}

export default function B2BQuotePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#f5f3ed] flex items-center justify-center text-[#046e82] font-semibold text-lg">Loading B2B Quote Portal...</div>}>
      <B2BQuoteForm />
    </Suspense>
  );
}
