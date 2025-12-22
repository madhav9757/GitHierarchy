// app/layout.tsx
import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { ScrollArea } from '@/components/ui/scroll-area';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'GitHub Tree Viewer',
  description: 'A Next.js application to view GitHub repository file structures.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-colors duration-300`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex flex-col min-h-screen">
            <Header />

            {/* Scrollable main content */}
            <ScrollArea className="flex-grow">
              <div className="w-full max-w-7xl mx-auto px-6 md:px-12 py-6 md:py-12">
                {children}
              </div>
            </ScrollArea>

            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
