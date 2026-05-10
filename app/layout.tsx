import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './styles/globals.css'

import { SolanaProvider } from '@/lib/solana-provider'
import { ThemeProvider } from '@/components/shared/theme-provider'
import { AuthProvider } from '@/lib/auth-context'

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: 'PeerChain - Decentralized Peer-Learning & Micro-Funding',
  description: 'A decentralized platform for peer learning and micro-funding powered by blockchain technology',
  generator: 'v0.app',
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <SolanaProvider>
            <AuthProvider>
              {children}
            </AuthProvider>
            {process.env.NODE_ENV === 'production' && <Analytics />}
          </SolanaProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}