import React from 'react';
import Link from 'next/link';

export default function AnnouncementBar() {
  return (
    // Announcement bar: bg #f5f3ed, text centered, shows on all pages
    // Exact copy of static-announcement section from header-group.json
    <div
      style={{
        background: '#f5f3ed',
        borderBottom: '1px solid #e5e5e5',
        padding: '10px 16px',
        textAlign: 'center',
      }}
    >
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '13px',
          color: '#000',
          margin: 0,
        }}
      >
        Proudly Serving Healthcare Needs Across India –{' '}
        <Link
          href="/pages/contact"
          style={{
            color: '#046e82',
            fontWeight: 600,
            textDecoration: 'underline',
            textUnderlineOffset: '2px',
          }}
        >
          Contact Us Today!
        </Link>
      </p>
    </div>
  );
}
