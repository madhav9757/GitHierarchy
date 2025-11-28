// app/layout.tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { ThemeToggle } from '@/components/theme-toggle'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'GitHub Tree Viewer',
  description: 'A Next.js application to view GitHub repository file structures.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen flex flex-col">
            <header className="flex justify-between items-center p-4 border-b">
              <h1 className="text-xl font-bold">
                <a href="/">GitHub Tree Viewer</a>
              </h1>
              <ThemeToggle />
            </header>
            <main className="flex-grow p-4 md:p-8">
              {children}
            </main>
            <footer className="text-center p-4 text-sm text-gray-500 border-t">
                Built with Next.js and GitHub API
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}