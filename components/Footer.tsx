'use client';

import React from 'react';
import Link from 'next/link';

// Footer matches the original Shopify static-footer.liquid exactly —
// 4 columns: Main menu | Legal & Company's Policies | License Requirements | Business Information

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <div id="shopify-section-sections--18628639916215__footer" className="shopify-section shopify-section-group-footer-group">
      <footer role="contentinfo" aria-label="Footer">
        <section className="site-footer-wrapper">
          <div className="site-footer-item">
            <div className="site-footer-blocks column-count-4">

              {/* Column 1: Main menu */}
              <div className="site-footer-block-item site-footer-block-menu has-accordion">
                <h2 className="site-footer-block-title">Main menu</h2>
                <div className="site-footer-block-content">
                  <ul className="navmenu navmenu-depth-1">
                    <li className="navmenu-item navmenu-id-home">
                      <Link className="navmenu-link navmenu-link-depth-1 navmenu-link-active" href="/">Home</Link>
                    </li>
                    <li className="navmenu-item navmenu-id-catalog">
                      <Link className="navmenu-link navmenu-link-depth-1" href="/collections/all">Catalog</Link>
                    </li>
                    <li className="navmenu-item navmenu-id-blog">
                      <Link className="navmenu-link navmenu-link-depth-1" href="/blog">Knowledge Base</Link>
                    </li>
                    <li className="navmenu-item navmenu-id-supply">
                      <Link className="navmenu-link navmenu-link-depth-1" href="/supply">Supply Network</Link>
                    </li>
                    <li className="navmenu-item navmenu-id-contact">
                      <Link className="navmenu-link navmenu-link-depth-1" href="/pages/contact">Contact</Link>
                    </li>
                    <li className="navmenu-item navmenu-id-request-quote">
                      <Link className="navmenu-link navmenu-link-depth-1" href="/in/b2b-quote">Request a Quote</Link>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Column 2: Legal & Company's Policies */}
              <div className="site-footer-block-item site-footer-block-menu has-accordion">
                <h2 className="site-footer-block-title">Legal &amp; Company&apos;s Policies</h2>
                <div className="site-footer-block-content">
                  <ul className="navmenu navmenu-depth-1">
                    <li className="navmenu-item navmenu-id-privacy-policy">
                      <Link className="navmenu-link navmenu-link-depth-1" href="/policies/privacy-policy">Privacy Policy</Link>
                    </li>
                    <li className="navmenu-item navmenu-id-contact-information">
                      <Link className="navmenu-link navmenu-link-depth-1" href="/policies/contact-information">Contact Information</Link>
                    </li>
                    <li className="navmenu-item navmenu-id-refund-policy">
                      <Link className="navmenu-link navmenu-link-depth-1" href="/policies/refund-policy">Refund Policy</Link>
                    </li>
                    <li className="navmenu-item navmenu-id-shipping-policy">
                      <Link className="navmenu-link navmenu-link-depth-1" href="/policies/shipping-policy">Shipping Policy</Link>
                    </li>
                    <li className="navmenu-item navmenu-id-terms-of-service">
                      <Link className="navmenu-link navmenu-link-depth-1" href="/policies/terms-of-service">Terms of Service</Link>
                    </li>
                    <li className="navmenu-item navmenu-id-contact-us">
                      <Link className="navmenu-link navmenu-link-depth-1" href="/pages/contact-us">Contact Us</Link>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Column 3: License Requirements */}
              <div className="site-footer-block-item site-footer-block-rich-text">
                <h2 className="site-footer-block-title">License Requirements</h2>
                <div className="site-footer-block-content rte">
                  <p>You must be a licensed healthcare facility, laboratory, research institute, or healthcare professional registered with the Medical Council of India or other relevant licensing authority. We only sell select wound care products and orthopedic products to individual consumers at this time.</p>
                </div>
              </div>

              {/* Column 4: Business Information */}
              <div className="site-footer-block-item site-footer-block-rich-text">
                <h2 className="site-footer-block-title">Business Information</h2>
                <div className="site-footer-block-content rte">
                  <p>Address: M-135, 2nd Floor, Connaught Place, New Delhi – 110001, India<br /><br />Phone: +91 8368490741<br />Email: medventaindia@gmail.com</p>
                  <p><br />Business Hours:<br />Monday – Saturday: 10:00 AM – 6:00 PM (IST)<br />Closed on Sundays and Public Holidays<br /><br /></p>
                </div>
              </div>

            </div>
          </div>

          {/* Bottom row */}
          <div className="site-footer-item site-footer-item--information">
            <div className="site-footer__row site-footer__row--second">
              <div className="site-footer__row-inner-wrapper-left">
                <nav className="site-footer-navigation" aria-label="Footer">
                  <ul className="navmenu navmenu-depth-1">
                    <li className="navmenu-item">
                      <Link className="navmenu-link navmenu-link-depth-1" href="/policies/privacy-policy">Privacy Policy</Link>
                    </li>
                    <li className="navmenu-item">
                      <Link className="navmenu-link navmenu-link-depth-1" href="/policies/refund-policy">Refund Policy</Link>
                    </li>
                    <li className="navmenu-item">
                      <Link className="navmenu-link navmenu-link-depth-1" href="/policies/terms-of-service">Terms of Service</Link>
                    </li>
                    <li className="navmenu-item">
                      <Link className="navmenu-link navmenu-link-depth-1" href="/policies/shipping-policy">Shipping Policy</Link>
                    </li>
                    <li className="navmenu-item">
                      <Link className="navmenu-link navmenu-link-depth-1" href="/pages/contact-us">Contact Us</Link>
                    </li>
                  </ul>
                </nav>
              </div>
              <div className="site-footer__row-inner-wrapper-right">
                <p className="site-footer-copyright">© {year} Medventa</p>
              </div>
            </div>
          </div>
        </section>
      </footer>
    </div>
  );
}
