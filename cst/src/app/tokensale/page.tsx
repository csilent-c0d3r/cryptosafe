'use client';

import dynamic from 'next/dynamic';

// Dynamically import TokenSale with no SSR
const TokenSale = dynamic(
  () => import('@/components/TokenSale/TokenSale'),
  { ssr: false }
);

export default function TokenSalePage() {
  return <TokenSale />;
}
