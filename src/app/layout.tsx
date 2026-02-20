// app/layout.tsx
import type { Metadata } from 'next';
import './globals.css';
import BungkusAplikasi from '@/components/layout/AppShell';

export const metadata: Metadata = {
  title: 'Ramadhan Habit Tracker',
  description: 'Pantau ibadah dan kebiasaan baik selama Ramadhan',
};

export default function LayoutUtama({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className="antialiased">
        <BungkusAplikasi>
          {children}
        </BungkusAplikasi>
      </body>
    </html>
  );
}