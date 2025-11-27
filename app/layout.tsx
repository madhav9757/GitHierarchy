// layout.tsx (Fixed)

import { ThemeProvider } from '../components/theme-provider';
import './globals.css';

export const metadata = {
  title: 'GitHub Repo Structure Viewer',
  description: "View the file tree structure of any public GitHub user's repositories.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}