import type { Metadata } from 'next';
import { Geist, Geist_Mono, Manrope } from 'next/font/google';
import './globals.css';
import AuthProvider from '@/providers/auth.provider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const manrope = Manrope({
  variable: '--font-manrope',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  title: 'Velion - chat',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
  },
  description: 'Velion chat tiempo real',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang='es'
      className={`
        ${geistSans.variable}
        ${geistMono.variable}
        ${manrope.variable}
        h-full
      `}
    >
      <body className='min-h-full antialiased'>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
