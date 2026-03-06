import type { Metadata } from 'next'
import './globals.css'
import { DataProvider } from '@/contexts/DataContext'

export const metadata: Metadata = {
  title: 'Wedding Finance - Organize seu Casamento',
  description: 'Sistema de organização financeira para casamentos',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>
        <DataProvider>{children}</DataProvider>
      </body>
    </html>
  )
}
