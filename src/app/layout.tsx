import type { Metadata } from 'next';
import { portfolio } from '@/lib/portfolio';
import './globals.css';

export const metadata: Metadata = {
  title: portfolio.profile.name,
  description: portfolio.profile.summary || `${portfolio.profile.name} Portfolio Website`,
  keywords: 'vanya, awasthi, vanya awasthi, developer, portfolio',
  authors: [{ name: portfolio.profile.name, url: portfolio.profile.github || 'https://github.com/sheisstarwithoutmoon' }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body id="top">
        {children}
      </body>
    </html>
  )
}
