import type { Metadata } from 'next';
import AnnouncementBar from '@/components/AnnouncementBar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Refund Policy | Medventa India',
  description: 'Read the Medventa Refund Policy for medical supplies and healthcare products purchased through our platform.',
};

export default function RefundPolicyPage() {
  return (
    <div className="template-page">
      <AnnouncementBar />
      <Navbar />
      <main id="site-main" className="site-main" role="main">
        <article className="site-page" data-template-page style={{ maxWidth: '1000px', margin: '0 auto', padding: '40px 20px' }}>
          <header className="page-masthead" style={{ marginBottom: '32px', textAlign: 'center' }}>
            <h1 className="page-title" style={{ fontSize: '32px', fontWeight: 700, color: '#1d1d1d' }}>Refund Policy</h1>
          </header>
          <div className="page-content rte" style={{ fontSize: '15px', lineHeight: 1.8, color: '#333' }}>
            <p>At Medventa, we are committed to ensuring the quality and compliance of all medical and surgical supplies we provide to healthcare institutions. Please read our refund policy carefully.</p>

            <h2>Return Eligibility</h2>
            <p>Due to the nature of medical supplies and regulatory requirements, our return and refund policy is as follows:</p>
            <ul>
              <li><strong>Defective or Damaged Products:</strong> Products that arrive damaged, defective, or do not match the order specifications are eligible for return or replacement within 7 days of delivery.</li>
              <li><strong>Incorrect Items:</strong> If you receive an item different from what was ordered, we will arrange for a return and replacement at no additional cost.</li>
              <li><strong>Expired Products:</strong> Products that are expired upon delivery will be replaced immediately.</li>
            </ul>

            <h2>Non-Returnable Items</h2>
            <p>The following items cannot be returned for health and safety reasons:</p>
            <ul>
              <li>Opened sterile packaging or single-use medical devices</li>
              <li>Items without original packaging or missing batch/lot numbers</li>
              <li>Products that have been used or installed</li>
              <li>Refrigerated or temperature-sensitive products after delivery</li>
              <li>Custom or special-order products procured specifically for your institution</li>
            </ul>

            <h2>Refund Process</h2>
            <p>To initiate a return or refund:</p>
            <ol>
              <li>Contact us within 7 days of delivery at medventaindia@gmail.com or +91 8368490741</li>
              <li>Provide your order number, item description, and reason for return with photographic evidence</li>
              <li>Our quality team will review your request within 2 business days</li>
              <li>Upon approval, arrange return shipment (we provide prepaid labels for eligible returns)</li>
              <li>Refunds are processed within 7–14 business days after we receive and inspect the returned item</li>
            </ol>

            <h2>Refund Methods</h2>
            <p>Approved refunds will be credited to the original payment method or as a credit note for future purchases, based on your preference and the payment method used.</p>

            <h2>B2B and Institutional Orders</h2>
            <p>For institutional bulk orders placed under a Rate Contract or through a formal RFQ process, refunds and replacements are governed by the terms of the purchase agreement. Please contact your dedicated account manager.</p>

            <h2>GST and Tax Credit Notes</h2>
            <p>For all refunds processed, we will issue a GST-compliant Credit Note for Input Tax Credit (ITC) purposes.</p>

            <h2>Contact</h2>
            <p>For refund-related queries:<br />
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
