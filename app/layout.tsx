import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { ThemeProvider } from '@/components/theme-provider'
import {cn} from'@/lib/utils'
import { Toaster } from '@/components/ui/toaster'
import { ProModal } from '@/components/pro-modal'
import Head from 'next/head';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Your Intelligent Friend',
  description: 'Discover a new way to interact with technology through Companion.AI, your AI friend for personalized assistance, insights, and companionship.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
    <html lang="en" suppressHydrationWarning>
      <Head>
      <link rel="icon" href="/logo.png" />
      </Head>
      <body className={cn("bg-secondary", inter.className)}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <ProModal />
      {children}
      <Toaster />
      </ThemeProvider>
     
      </body>
    </html>
    </ClerkProvider>
  )
}
