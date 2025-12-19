import type { Metadata } from 'next'
import { Inter, Noto_Sans_KR, Fraunces } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const notoSansKR = Noto_Sans_KR({ 
  subsets: ['latin'],
  variable: '--font-noto-sans-kr',
  weight: ['400', '500', '700'],
  display: 'swap',
})

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  axes: ['opsz', 'SOFT', 'WONK'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Miss Gogi Korean BBQ | Premium Korean BBQ in Doraville, GA',
  description: 'Experience authentic Korean BBQ with premium galbi, prime short rib, and all-you-can-eat options in Doraville, GA. Reserve your table today!',
  keywords: 'Korean BBQ, Miss Gogi, Doraville, Georgia, Korean restaurant, KBBQ, all you can eat, premium BBQ',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${notoSansKR.variable} ${fraunces.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}