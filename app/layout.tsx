import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'JCL Scoreboard',
  description: 'Japan Challenge League (JCL) 練習用スコアボード',
  openGraph: {
    title: 'JCL Scoreboard',
    description: 'Japan Challenge League (JCL) 練習用スコアボード',
    type: 'website',
    locale: 'ja_JP',
    siteName: 'JCL Scoreboard',
  },
  twitter: {
    card: 'summary',
    title: 'JCL Scoreboard',
    description: 'Japan Challenge League (JCL) 練習用スコアボード',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
