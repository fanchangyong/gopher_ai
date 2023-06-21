import './globals.css'
import { Inter } from 'next/font/google'
import { AuthProvider } from './contexts'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Gopher AI',
  description: 'Gopher AI robots manager',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
