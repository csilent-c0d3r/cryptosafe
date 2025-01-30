import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'CST Token Presale',
  description: 'Buy CST tokens during the presale period',
};

export default function TokenSaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
