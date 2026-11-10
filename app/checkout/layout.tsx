import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Checkout | MedVenta India',
  robots: { index: false, follow: false },
};

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return children;
}

