import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import LeafyGreenProviderWrapper from '@/providers/leafygreen';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Account Research Bot',
  description: 'Chat with a bot to ask questions about your accounts',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <LeafyGreenProviderWrapper>
        <body className={inter.className}>{children}</body>
      </LeafyGreenProviderWrapper>
    </html>
  );
}
