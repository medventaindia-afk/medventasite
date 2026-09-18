import type { Metadata } from 'next';
import AnnouncementBar from '@/components/AnnouncementBar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Shipping Policy | Medventa India',
  description: 'Learn about Medventa shipping timelines, logistics partners, and delivery policies for medical supplies across India.',
};

export default function ShippingPolicyPage() {
  return (
    <div className="template-page">
      <AnnouncementBar />
      <Navbar />
      <main id="site-main" className="site-main" role="main">
        <article className="site-page" data-template-page style={{ maxWidth: '1000px', margin: '0 auto', padding: '40px 20px' }}>
          <header className="page-masthead" style={{ marginBottom: '32px', textAlign: 'center' }}>
            <h1 className="page-title" style={{ fontSize: '32px', fontWeight: 700, color: '#1d1d1d' }}>Shipping Policy</h1>
          </header>
          <div className="page-content rte" style={{ fontSize: '15px', lineHeight: 1.8, color: '#333' }}>
            <p>Medventa provides reliable, temperature-compliant logistics for medical and surgical supplies across India and select international markets.</p>

            <h2>Processing Time</h2>
            <p>Orders are processed Monday through Saturday, 10:00 AM – 6:00 PM IST. Orders placed before 2:00 PM on business days are generally dispatched the same day. Orders placed after 2:00 PM or on Sundays/public holidays are processed the next business day.</p>
            <p>For institutional bulk orders or Rate Contract deliveries, specific dispatch timelines are communicated in the purchase agreement.</p>

            <h2>Delivery Timelines</h2>
            <ul>
              <li><strong>Tier-1 Metro Cities</strong> (Delhi NCR, Mumbai, Bengaluru, Chennai, Hyderabad, Kolkata, Pune, Ahmedabad): 1–3 business days</li>
              <li><strong>Tier-2 Cities:</strong> 2–4 business days</li>
              <li><strong>Remote / Tier-3 locations:</strong> 4–7 business days</li>
              <li><strong>International (GCC – UAE, Saudi Arabia):</strong> 7–14 business days, subject to customs clearance</li>
            </ul>

            <h2>Shipping Charges</h2>
            <p>Shipping charges are calculated based on the order weight, volume, and destination. For institutional orders above a minimum order value (communicated at the time of quotation), shipping may be complimentary. Exact shipping costs are provided in the quotation or at checkout.</p>

            <h2>Cold Chain & Temperature-Sensitive Products</h2>
            <p>Certain diagnostic reagents, biological specimens, and temperature-sensitive products are shipped with validated cold chain packaging. These orders require a signature on delivery and must not be left unattended.</p>

            <h2>Tracking</h2>
            <p>Once your order is dispatched, you will receive a shipment tracking number via email and/or WhatsApp. You can use this to track your delivery in real time through our logistics partner&apos;s platform.</p>

            <h2>Logistics Partners</h2>
            <p>We work with reputed logistics partners including BlueDart, Delhivery, Ecom Express, and specialized medical logistics providers for cold-chain shipments.</p>

            <h2>Damaged in Transit</h2>
            <p>If your shipment arrives damaged, please refuse delivery and immediately contact us at medventaindia@gmail.com or +91 8368490741. Photographs of the damaged packaging must be shared within 24 hours of delivery.</p>

            <h2>Contact</h2>
            <p>For shipping-related queries:<br />
            Email: medventaindia@gmail.com<br />
            Phone: +91 8368490741<br />
            Hours: Monday–Saturday, 10:00 AM – 6:00 PM IST</p>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
