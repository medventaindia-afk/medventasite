import type { Metadata } from 'next';
import AnnouncementBar from '@/components/AnnouncementBar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Terms of Service | Medventa India',
  description: 'Read the Terms of Service governing your use of the Medventa website and purchase of medical supplies.',
};

export default function TermsOfServicePage() {
  return (
    <div className="template-page">
      <AnnouncementBar />
      <Navbar />
      <main id="site-main" className="site-main" role="main">
        <article className="site-page" data-template-page style={{ maxWidth: '1000px', margin: '0 auto', padding: '40px 20px' }}>
          <header className="page-masthead" style={{ marginBottom: '32px', textAlign: 'center' }}>
            <h1 className="page-title" style={{ fontSize: '32px', fontWeight: 700, color: '#1d1d1d' }}>Terms of Service</h1>
          </header>
          <div className="page-content rte" style={{ fontSize: '15px', lineHeight: 1.8, color: '#333' }}>
            <p>Please read these Terms of Service (&quot;Terms&quot;) carefully before using the www.medventa.in website operated by Medventa (&quot;us&quot;, &quot;we&quot;, or &quot;our&quot;).</p>
            <p>By accessing or using our service, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the service.</p>

            <h2>1. Eligibility and Licensing Requirements</h2>
            <p>Our platform is designed for licensed healthcare facilities, hospitals, clinics, diagnostic laboratories, research institutes, and registered healthcare professionals. By purchasing from Medventa, you represent and warrant that:</p>
            <ul>
              <li>You are a licensed healthcare professional or authorized procurement officer for a licensed healthcare facility</li>
              <li>Your institution holds valid licenses required by the Drugs and Cosmetics Act, 1940, and applicable state drug licensing authorities</li>
              <li>You will use the products only for lawful medical, clinical, or research purposes</li>
            </ul>
            <p>Individual consumer purchases are limited to select wound care and orthopedic products that do not require professional licensing.</p>

            <h2>2. Products and Pricing</h2>
            <p>All product descriptions, specifications, and pricing are subject to change without notice. We reserve the right to discontinue any product at any time. Prices for products are subject to change without notice. We shall not be liable to you or any third party for any modification, price change, suspension, or discontinuance of the service.</p>

            <h2>3. Orders and Payment</h2>
            <p>We reserve the right to refuse any order you place with us. We may, in our sole discretion, limit or cancel quantities purchased per person, per household, or per order. Payment must be received in full before orders are dispatched. For institutional clients on credit terms, payment must be made within the agreed credit period.</p>

            <h2>4. Accuracy of Information</h2>
            <p>We are not responsible if information made available on this site is not accurate, complete, or current. The material on this site is provided for general information only and should not be relied upon or used as the sole basis for making decisions. Any reliance on the material on this site is at your own risk.</p>

            <h2>5. Products for Medical Use</h2>
            <p>All products sold are intended for professional medical use by licensed practitioners. Medventa does not provide medical advice. The products and descriptions on this website are for informational purposes only. Consult a qualified healthcare professional for medical guidance.</p>

            <h2>6. Intellectual Property</h2>
            <p>The service and its original content, features, and functionality are and will remain the exclusive property of Medventa. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of Medventa.</p>

            <h2>7. Limitation of Liability</h2>
            <p>In no event shall Medventa, its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of (or inability to access or use) the service.</p>

            <h2>8. Governing Law</h2>
            <p>These Terms shall be governed and construed in accordance with the laws of India, without regard to its conflict of law provisions. Any disputes arising under these Terms shall be subject to the exclusive jurisdiction of the courts in New Delhi, India.</p>

            <h2>9. Changes to Terms</h2>
            <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. By continuing to access or use our service after those revisions become effective, you agree to be bound by the revised terms.</p>

            <h2>10. Contact Us</h2>
            <p>If you have any questions about these Terms, please contact us at:<br />
            Email: medventaindia@gmail.com<br />
            Phone: +91 8368490741<br />
            Address: M-135, 2nd Floor, Connaught Place, New Delhi – 110001, India</p>

            <p><em>Last updated: September 2025</em></p>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
