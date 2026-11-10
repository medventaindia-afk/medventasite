import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const SHOPIFY_NOISE_PARAMS = ['_pos', '_fid', '_ss', 'oseid'];

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const { pathname } = url;

  // 1. Permanently redirect legacy Shopify nested product paths (/collections/*/products/<handle>)
  // directly to canonical /products/<handle>, stripping search-telemetry params in 1 hop.
  const nestedProductMatch = pathname.match(/^\/collections\/[^/]+\/products\/([^/]+)\/?$/i);
  if (nestedProductMatch) {
    const cleanUrl = new URL(`/products/${nestedProductMatch[1]}`, request.url);
    return NextResponse.redirect(cleanUrl, 301);
  }

  // 2. Strip legacy Shopify telemetry parameters (_pos, _fid, _ss, oseid) via 301 on /products/*
  if (pathname.startsWith('/products/')) {
    let modified = false;
    for (const param of SHOPIFY_NOISE_PARAMS) {
      if (url.searchParams.has(param)) {
        url.searchParams.delete(param);
        modified = true;
      }
    }
    if (modified) {
      return NextResponse.redirect(url, 301);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/collections/:slug/products/:handle*',
    '/products/:handle*',
  ],
};

