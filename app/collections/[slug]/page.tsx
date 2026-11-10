import type { Metadata } from 'next';
import CollectionClient from './CollectionClient';

const CATEGORY_TITLES: Record<string, string> = {
  all: 'Healthcare & Medical Products Catalog | MedVenta India',
  'surgical-supplies': 'Surgical Supplies & Operating Room Consumables | MedVenta India',
  'laboratory-equipment': 'Laboratory Diagnostics & Blood Collection Tubes | MedVenta India',
  sutures: 'Surgical Sutures & Wound Closure Devices | MedVenta India',
  'sutures-wound-closure': 'Surgical Sutures & Wound Closure Devices | MedVenta India',
  diagnostics: 'Clinical Diagnostic Instrumentation & OPD Sets | MedVenta India',
  catheters: 'Vascular Access, CVCs & Urinary Catheters | MedVenta India',
  nephrology: 'Nephrology, Dialysis Consumables & Tubing Sets | MedVenta India',
  'wound-care': 'Advanced Wound Care Dressings & Surgical Care | MedVenta India',
};

interface CollectionPageProps {
  params: { slug: string };
  searchParams: Record<string, string | string[] | undefined>;
}

export async function generateMetadata({
  params,
  searchParams,
}: CollectionPageProps): Promise<Metadata> {
  const slug = (params.slug || 'all').toLowerCase();
  const isVendorFacet = slug === 'vendors' || slug === 'frontpage';
  const hasFacetParams = Object.keys(searchParams || {}).length > 0;

  const cleanCanonical = isVendorFacet
    ? 'https://www.medventa.in/collections/all'
    : `https://www.medventa.in/collections/${slug}`;

  const title =
    CATEGORY_TITLES[slug] ||
    `${slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())} Medical Catalog | MedVenta India`;

  return {
    title,
    description:
      'Over 350,000 US FDA-approved and CE-marked medical supplies, surgical sutures, vascular access catheters, and diagnostic consumables for hospital procurement across India.',
    alternates: {
      canonical: cleanCanonical,
    },
    robots:
      isVendorFacet || hasFacetParams
        ? { index: false, follow: true }
        : { index: true, follow: true },
  };
}

export default function CollectionSlugPage({ params }: CollectionPageProps) {
  return <CollectionClient params={params} />;
}
