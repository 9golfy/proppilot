import type { Metadata } from 'next';
import { ThemeProvider } from '@/components/common/ThemeProvider';
import { TooltipProvider } from '@/components/ui/tooltip';
import '@/index.css';

export const metadata: Metadata = {
  title: 'PropPilot AI',
  description: 'AI sales media, listing pages, and campaign tools for real estate teams.',
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <TooltipProvider>{children}</TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
