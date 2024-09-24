import { AuthProvider } from '@pkm/libs/auth';
import './global.css';
import { Inter, Montserrat, Roboto, Source_Sans_3 } from 'next/font/google';
import { ReactElement } from 'react';

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

const roboto = Roboto({
  weight: ['100', '300', '400', '500', '700', '900'],
  subsets: ['latin'],
  variable: '--font-roboto',
});

export const metadata = {
  title: 'Pasar Digital',
  description:
    'Pasar Digital adalah sebuah platform digital yang menyediakan layanan jual beli online',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): Promise<ReactElement> {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${montserrat.variable} ${source_sans_3.variable} ${roboto.variable}`}
    >
      <AuthProvider>
        <body>{children}</body>
      </AuthProvider>
    </html>
  );
}
