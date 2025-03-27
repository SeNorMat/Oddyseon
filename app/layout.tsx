import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Providers from '@/components/providers-component'
import { cn } from '@/utils/utils-file'

// Load Inter font
const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Odysseon | Crypto Education & Trading Platform',
  description: 'Learn cryptocurrency trading and improve your financial literacy with Odysseon\'s interactive educational platform.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark" style={{ colorScheme: 'dark' }}>
      <body className={cn(
        inter.className,
        "min-h-screen antialiased bg-background text-text-primary"
      )}>
        <Providers>
          {/* Space background with subtle stars effect */}
          <div className="fixed inset-0 -z-10 overflow-hidden">
            <div className="absolute inset-0 bg-background opacity-90" />
            {/* Generated stars - we'll add a few directly, but in production you might use JS to generate more */}
            <div className="space-dot h-1 w-1" style={{ top: '15%', left: '10%', animationDelay: '0s' }}></div>
            <div className="space-dot h-1.5 w-1.5" style={{ top: '35%', left: '25%', animationDelay: '0.3s' }}></div>
            <div className="space-dot h-0.5 w-0.5" style={{ top: '65%', left: '60%', animationDelay: '0.6s' }}></div>
            <div className="space-dot h-1 w-1" style={{ top: '20%', left: '85%', animationDelay: '0.9s' }}></div>
            <div className="space-dot h-2 w-2" style={{ top: '75%', left: '30%', animationDelay: '1.2s' }}></div>
            <div className="space-dot h-1 w-1" style={{ top: '45%', left: '50%', animationDelay: '1.5s' }}></div>
            {/* Add more stars for a richer effect */}
          </div>
          
          {/* Main content */}
          <main>
            {children}
          </main>
        </Providers>
      </body>
    </html>
  )
}