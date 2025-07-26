import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Vanya Awasthi | Portfolio Website | Developer',
  description: 'Vanya Awasthi Portfolio Website',
  keywords: 'vanya, awasthi, vanya awasthi, madhya pradesh, developer, android developer',
  authors: [{ name: 'Vanya Awasthi', url: 'https://sheisstarwithoutmoon.github.io/Portfolio/' }],
}

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
