'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

// Original site nav: Home | Catalog | Contact | [Request a Quote CTA button]
// Matches the Empire theme navigation from the extracted header HTML exactly.

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { totalItems } = useCart();

  return (
    <header className="site-header" style={{ position: 'sticky', top: 0, zIndex: 100 }}>
      {/* Main header row */}
      <div data-site-header-main className="site-header-main site-header--full-width">
        {/* Hamburger toggle (mobile) */}
        <button
          className="site-header-menu-toggle"
          aria-label="Menu"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <div className="site-header-menu-toggle--button" tabIndex={-1}>
            <span className="toggle-icon--bar toggle-icon--bar-top"></span>
            <span className="toggle-icon--bar toggle-icon--bar-middle"></span>
            <span className="toggle-icon--bar toggle-icon--bar-bottom"></span>
            <span className="visually-hidden">Menu</span>
          </div>
        </button>

        {/* Main content: Logo + Search + Small Promo */}
        <div className="site-header-main-content small-promo-enabled">
          {/* Logo */}
          <div className="site-header-logo">
            <Link className="site-logo" href="/">
              <img
                src="/cdn/shop/files/ChatGPT_Image_Aug_13_2025_10_35_46_AM_1_579x173.png?v=1755106616"
                alt="Medventa"
                className="site-logo-image"
                style={{ objectFit: 'cover', objectPosition: '50.0% 50.0%' }}
              />
            </Link>
          </div>

          {/* Live Search form */}
          <div className="live-search" data-live-search>
            <form
              className="live-search-form form-fields-inline"
              action="/search"
              method="get"
              role="search"
              aria-label="Product"
            >
              <div className="form-field no-label">
                <input
                  className="form-field-input live-search-form-field"
                  type="text"
                  name="q"
                  aria-label="Search"
                  placeholder="What are you looking for—"
                  autoComplete="off"
                />
                <button className="live-search-button" type="submit" aria-label="Search">
                  <svg aria-hidden="true" focusable="false" role="presentation" xmlns="http://www.w3.org/2000/svg" width="23" height="24" fill="none" viewBox="0 0 23 24">
                    <path d="M21 21L15.5 15.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <circle cx="10" cy="9" r="8" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </button>
              </div>
            </form>
          </div>

          {/* Small promo: Pricing Support */}
          <div className="small-promo">
            <span className="small-promo-icon small-promo-icon--svg">
              <svg className="icon-chat" aria-hidden="true" focusable="false" role="presentation" xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 44 44" fill="none">
                <path d="M15.5832 24.75H13.7498L6.4165 32.0833V24.75H2.74984C2.26361 24.75 1.79729 24.5569 1.45347 24.213C1.10966 23.8692 0.916504 23.4029 0.916504 22.9167V2.75001C0.916504 2.26377 1.10966 1.79746 1.45347 1.45364C1.79729 1.10983 2.26361 0.916672 2.74984 0.916672H33.9165C34.4027 0.916672 34.869 1.10983 35.2129 1.45364C35.5567 1.79746 35.7498 2.26377 35.7498 2.75001V13.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M19.25 33.9167C19.25 34.4029 19.4432 34.8692 19.787 35.213C20.1308 35.5569 20.5971 35.75 21.0833 35.75H31.1667L39.4167 43.0833V35.75H41.25C41.7362 35.75 42.2025 35.5569 42.5464 35.213C42.8902 34.8692 43.0833 34.4029 43.0833 33.9167V19.25C43.0833 18.7638 42.8902 18.2975 42.5464 17.9536C42.2025 17.6098 41.7362 17.4167 41.25 17.4167H21.0833C20.5971 17.4167 20.1308 17.6098 19.787 17.9536C19.4432 18.2975 19.25 18.7638 19.25 19.25V33.9167Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
            <div className="small-promo-content">
              <span className="small-promo-content_heading">Pricing Support</span>
              <div className="small-promo-content--desktop"><p>Available 24/7 via chat</p></div>
            </div>
          </div>
        </div>

        {/* Right: Account + Cart */}
        <div className="site-header-right">
          <ul className="site-header-actions">
            <li className="site-header-actions__account-link">
              <Link className="site-header_account-link-anchor" href="/pages/contact">
                <span className="site-header__account-icon">
                  <svg className="icon-account" aria-hidden="true" focusable="false" role="presentation" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 26" fill="none">
                    <path d="M11.3336 14.4447C14.7538 14.4447 17.5264 11.6417 17.5264 8.18392C17.5264 4.72616 14.7538 1.9231 11.3336 1.9231C7.91347 1.9231 5.14087 4.72616 5.14087 8.18392C5.14087 11.6417 7.91347 14.4447 11.3336 14.4447Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M20.9678 24.0769C19.5098 20.0278 15.7026 17.3329 11.4404 17.3329C7.17822 17.3329 3.37107 20.0278 1.91309 24.0769" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                <span className="site-header_account-link-text">Contact / Support</span>
              </Link>
            </li>
          </ul>
          <div className="site-header-cart">
            <Link className="site-header-cart--button" href="/cart">
              <span className="site-header-cart-icon site-header-cart-icon--svg" style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}>
                <svg width="25" height="24" viewBox="0 0 25 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M1 0C0.447715 0 0 0.447715 0 1C0 1.55228 0.447715 2 1 2H1.33877H1.33883C1.61048 2.00005 2.00378 2.23945 2.10939 2.81599L2.10937 2.816L2.11046 2.82171L5.01743 18.1859C5.12011 18.7286 5.64325 19.0852 6.18591 18.9826C6.21078 18.9779 6.23526 18.9723 6.25933 18.9658C6.28646 18.968 6.31389 18.9692 6.34159 18.9692H18.8179H18.8181C19.0302 18.9691 19.2141 18.9765 19.4075 18.9842L19.4077 18.9842C19.5113 18.9884 19.6175 18.9926 19.7323 18.9959C20.0255 19.0043 20.3767 19.0061 20.7177 18.9406C21.08 18.871 21.4685 18.7189 21.8028 18.3961C22.1291 18.081 22.3266 17.6772 22.4479 17.2384C22.4569 17.2058 22.4642 17.1729 22.4699 17.1396L23.944 8.46865C24.2528 7.20993 23.2684 5.99987 21.9896 6H21.9894H4.74727L4.07666 2.45562L4.07608 2.4525C3.83133 1.12381 2.76159 8.49962e-05 1.33889 0H1.33883H1ZM5.12568 8L6.8227 16.9692H18.8178H18.8179C19.0686 16.9691 19.3257 16.9793 19.5406 16.9877L19.5413 16.9877C19.633 16.9913 19.7171 16.9947 19.7896 16.9967C20.0684 17.0047 20.2307 16.9976 20.3403 16.9766C20.3841 16.9681 20.4059 16.96 20.4151 16.9556C20.4247 16.9443 20.4639 16.8918 20.5077 16.7487L21.9794 8.09186C21.9842 8.06359 21.9902 8.03555 21.9974 8.0078C21.9941 8.00358 21.9908 8.00108 21.989 8H5.12568ZM10.8666 22.4326C10.8666 23.2982 10.195 24 9.36658 24C8.53815 24 7.86658 23.2982 7.86658 22.4326C7.86658 21.567 8.53815 20.8653 9.36658 20.8653C10.195 20.8653 10.8666 21.567 10.8666 22.4326ZM18.0048 24C18.8332 24 19.5048 23.2982 19.5048 22.4326C19.5048 21.567 18.8332 20.8653 18.0048 20.8653C17.1763 20.8653 16.5048 21.567 16.5048 22.4326C16.5048 23.2982 17.1763 24 18.0048 24Z" fill="currentColor"/>
                </svg>
                {totalItems > 0 && (
                  <span style={{
                    position: 'absolute',
                    top: '-6px',
                    right: '-8px',
                    background: '#e99114',
                    color: '#ffffff',
                    fontSize: '11px',
                    fontWeight: 700,
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    lineHeight: 1
                  }}>
                    {totalItems}
                  </span>
                )}
              </span>
              <span className="visually-hidden">View cart</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Desktop Nav bar (below header main row) */}
      <div className="site-navigation-wrapper site-navigation--has-actions site-header--full-width" id="site-header-nav">
        <nav className="site-navigation" aria-label="Main">
          <ul className="navmenu navmenu-depth-1" aria-label="Main menu">
            <li className="navmenu-item navmenu-basic__item navmenu-id-home">
              <Link className="navmenu-link navmenu-link-depth-1" href="/">Home</Link>
            </li>
            <li className="navmenu-item navmenu-basic__item navmenu-id-catalog">
              <Link className="navmenu-link navmenu-link-depth-1" href="/collections/all">Catalog</Link>
            </li>
            <li className="navmenu-item navmenu-basic__item navmenu-id-blog">
              <Link className="navmenu-link navmenu-link-depth-1" href="/blog">Knowledge Base</Link>
            </li>
            <li className="navmenu-item navmenu-basic__item navmenu-id-supply">
              <Link className="navmenu-link navmenu-link-depth-1" href="/supply">Supply Network</Link>
            </li>
            <li className="navmenu-item navmenu-basic__item navmenu-id-contact">
              <Link className="navmenu-link navmenu-link-depth-1" href="/pages/contact">Contact</Link>
            </li>
            <li className="navmenu-item navmenu-basic__item navmenu-id-b2b-quote" style={{ marginLeft: '14px', display: 'inline-flex', alignItems: 'center' }}>
              <Link
                className="navmenu-link"
                href="/in/b2b-quote"
                style={{
                  background: 'linear-gradient(135deg, #e99114 0%, #cf7b07 100%)',
                  color: '#ffffff',
                  borderRadius: '6px',
                  padding: '8px 18px',
                  fontWeight: 600,
                  fontSize: '13px',
                  letterSpacing: '0.02em',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 2px 8px rgba(233,145,20,0.35)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  textDecoration: 'none',
                  transition: 'transform 0.15s ease, box-shadow 0.15s ease',
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                  <line x1="16" y1="13" x2="8" y2="13"/>
                  <line x1="16" y1="17" x2="8" y2="17"/>
                </svg>
                <span>Request a Quote</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="site-mobile-nav" id="site-mobile-nav">
          <div className="mobile-nav-panel">
            <a className="mobile-nav-close" href="#" onClick={() => setMobileOpen(false)}>
              <svg aria-hidden="true" focusable="false" role="presentation" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 13 13">
                <path fill="currentColor" fillRule="evenodd" d="M5.306 6.5L0 1.194 1.194 0 6.5 5.306 11.806 0 13 1.194 7.694 6.5 13 11.806 11.806 13 6.5 7.694 1.194 13 0 11.806 5.306 6.5z"/>
              </svg>
              <span className="visually-hidden">Close</span>
            </a>
            <div className="mobile-nav-content">
              <ul className="navmenu navmenu-depth-1" aria-label="Main menu">
                <li className="navmenu-item navmenu-id-home">
                  <Link className="navmenu-link navmenu-link-active" href="/" onClick={() => setMobileOpen(false)}>Home</Link>
                </li>
                <li className="navmenu-item navmenu-id-catalog">
                  <Link className="navmenu-link" href="/collections/all" onClick={() => setMobileOpen(false)}>Catalog</Link>
                </li>
                <li className="navmenu-item navmenu-id-blog">
                  <Link className="navmenu-link" href="/blog" onClick={() => setMobileOpen(false)}>Knowledge Base</Link>
                </li>
                <li className="navmenu-item navmenu-id-supply">
                  <Link className="navmenu-link" href="/supply" onClick={() => setMobileOpen(false)}>Supply Network</Link>
                </li>
                <li className="navmenu-item navmenu-id-contact">
                  <Link className="navmenu-link" href="/pages/contact" onClick={() => setMobileOpen(false)}>Contact</Link>
                </li>
                <li className="navmenu-item navmenu-id-b2b-quote">
                  <Link className="navmenu-link" href="/in/b2b-quote" onClick={() => setMobileOpen(false)}>Request a Quote</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
