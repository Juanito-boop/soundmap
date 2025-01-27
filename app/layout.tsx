import './globals.css'; 
import { Analytics } from "@vercel/analytics/react"
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Soundmap Artist Guesser',
  description: 'soundmap user: VXN.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
			<Analytics />
      <body className={inter.className}>{children}</body>
    </html>
  );
}
