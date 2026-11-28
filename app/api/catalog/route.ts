import { NextRequest, NextResponse } from 'next/server';
import { getShopifyCatalogPage } from '@/lib/shopify';

export async function GET(req: NextRequest) {
  const sp = req.nextUrl.searchParams;
  const after = sp.get('after');
  const q = (sp.get('q') || '').slice(0, 100);
  const page = await getShopifyCatalogPage({ first: 48, after: after || null, search: q });
  if (!page) return NextResponse.json({ error: 'Catalogue unavailable' }, { status: 503 });
  return NextResponse.json(page, { headers: { 'Cache-Control': 'public, max-age=120' } });
}
