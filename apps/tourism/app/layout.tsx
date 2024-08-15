import { AuthProvider } from '@pkm/libs/auth';
import './global.css';
import { ReactElement } from 'react';
import { Inter, Montserrat, Source_Sans_3 } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
});

const source_sans_3 = Source_Sans_3({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-source-sans-3',
});

export const metadata = {
  title: 'Wisata Indonesia',
  description: 'Wisata Indonesia by PKM',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): ReactElement {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${montserrat.variable} ${source_sans_3.variable}`}
    >
      <AuthProvider>
        <body>{children}</body>
      </AuthProvider>
    </html>
  );
}
