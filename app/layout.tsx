import type { Metadata } from 'next'
import '@/styles/globals.css'
import '@/styles/markdown.css'
import AppContextProvider from '@/components/AppContext'
import EventBusContextProvider from '@/components/EventBusContext'
import { NextAuthProvider } from '@/components/NextAuthProvider'

export const metadata: Metadata = {
  title: 'Free Chat AI',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <NextAuthProvider>
          <AppContextProvider>
            <EventBusContextProvider>
              {children}
            </EventBusContextProvider>
          </AppContextProvider>
        </NextAuthProvider>
      </body>
    </html>
  )
}
