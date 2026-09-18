import type { Metadata } from 'next';
import AnnouncementBar from '@/components/AnnouncementBar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Contact Information | Medventa India',
  description: 'Find Medventa contact details, office address, phone numbers, and business hours.',
};

export default function ContactInformationPage() {
  return (
    <div className="template-page">
      <AnnouncementBar />
      <Navbar />
      <main id="site-main" className="site-main" role="main">
        <article className="site-page" data-template-page style={{ maxWidth: '1000px', margin: '0 auto', padding: '40px 20px' }}>
          <header className="page-masthead" style={{ marginBottom: '32px', textAlign: 'center' }}>
            <h1 className="page-title" style={{ fontSize: '32px', fontWeight: 700, color: '#1d1d1d' }}>Contact Information</h1>
          </header>
          <div className="page-content rte" style={{ fontSize: '15px', lineHeight: 1.8, color: '#333' }}>
            <p><strong>Medventa Institutional Procurement Division</strong></p>
            <p>M-135, 2nd Floor, Connaught Place<br />New Delhi – 110001, India</p>
            <p><strong>Phone:</strong> +91 8368490741</p>
            <p><strong>Email:</strong> medventaindia@gmail.com / info@medventa.in</p>
            <p><strong>Business Hours:</strong><br />Monday – Saturday: 10:00 AM – 6:00 PM (IST)<br />Closed on Sundays and Public Holidays</p>
            <p>For bulk institutional procurement enquiries, please use our <a href="/in/b2b-quote" style={{ color: '#046e82', fontWeight: 600 }}>B2B Quote Request Form</a>.</p>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
