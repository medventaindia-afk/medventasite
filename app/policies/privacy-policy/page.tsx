import type { Metadata } from 'next';
import AnnouncementBar from '@/components/AnnouncementBar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Privacy Policy | Medventa India',
  description: 'Read our Privacy Policy to understand how Medventa collects, uses, and protects your personal information.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="template-page">
      <AnnouncementBar />
      <Navbar />
      <main id="site-main" className="site-main" role="main">
        <article className="site-page" data-template-page style={{ maxWidth: '1000px', margin: '0 auto', padding: '40px 20px' }}>
          <header className="page-masthead" style={{ marginBottom: '32px', textAlign: 'center' }}>
            <h1 className="page-title" style={{ fontSize: '32px', fontWeight: 700, color: '#1d1d1d' }}>Privacy Policy</h1>
          </header>
          <div className="page-content rte" style={{ fontSize: '15px', lineHeight: 1.8, color: '#333' }}>
            <p>This Privacy Policy describes how Medventa (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) collects, uses, and shares information about you when you use our services, including when you visit our website at www.medventa.in, make a purchase, or otherwise contact us.</p>

            <h2>Information We Collect</h2>
            <p>We collect information you provide directly to us, such as when you create an account, make a purchase, or contact us for support. This may include:</p>
            <ul>
              <li>Name, email address, phone number, and billing/shipping address</li>
              <li>Payment information (credit card numbers, bank details)</li>
              <li>Business/institution details (GSTIN, drug license number, facility name)</li>
              <li>Communications you send to us</li>
            </ul>

            <h2>How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Process transactions and send related information, including purchase confirmations and invoices</li>
              <li>Send you technical notices, updates, security alerts, and support messages</li>
              <li>Respond to your comments, questions, and requests and provide customer service</li>
              <li>Send you marketing and promotional communications (you may opt-out at any time)</li>
              <li>Monitor and analyze trends, usage, and activities in connection with our services</li>
              <li>Comply with legal obligations</li>
            </ul>

            <h2>Information Sharing</h2>
            <p>We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties except as described in this policy. We may share information with:</p>
            <ul>
              <li>Service providers who assist us in operating our website and conducting our business</li>
              <li>Logistics and shipping partners to fulfill your orders</li>
              <li>Financial institutions for payment processing</li>
              <li>Government authorities when required by law</li>
            </ul>

            <h2>Data Security</h2>
            <p>We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure.</p>

            <h2>Cookies</h2>
            <p>We use cookies and similar tracking technologies to track activity on our website and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.</p>

            <h2>Your Rights</h2>
            <p>You have the right to access, update, or delete the information we have on you. You may also object to processing of your personal data, ask us to restrict processing, or request portability of your personal data.</p>

            <h2>Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us at:<br />
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
