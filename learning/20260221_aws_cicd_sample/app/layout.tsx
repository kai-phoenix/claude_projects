import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AWS CI/CD Sample',
  description: 'AWS CI/CD pipeline with Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  )
}
