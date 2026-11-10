import type { Metadata } from 'next';
import B2BQuoteClient from './B2BQuoteClient';

interface B2BQuotePageProps {
  searchParams: Record<string, string | string[] | undefined>;
}

export async function generateMetadata({
  searchParams,
}: B2BQuotePageProps): Promise<Metadata> {
  const hasParams = Object.keys(searchParams || {}).length > 0;

  return {
    title: 'Institutional B2B Hospital Quote & Rate Contract Portal | MedVenta India',
    description:
      'Request fixed 12–24 month hospital rate contracts, bulk CDSCO-compliant surgical supply quotations, and institutional BOM pricing across India, GCC & Africa.',
    alternates: {
      canonical: 'https://www.medventa.in/in/b2b-quote',
    },
    robots: hasParams
      ? { index: false, follow: true }
      : { index: true, follow: true },
  };
}

export default function B2BQuotePage() {
  return <B2BQuoteClient />;
}

