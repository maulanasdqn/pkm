import './global.css';
import Script from 'next/script';
import { AuthProvider } from '@pkm/libs/auth';
import { ReactElement } from 'react';
import { GoogleTagManager } from '@next/third-parties/google';
import { Inter, Montserrat, Source_Sans_3 } from 'next/font/google';
import { NextSSRPlugin } from '@uploadthing/react/next-ssr-plugin';
import { extractRouterConfig } from 'uploadthing/server';
import { tourismFileRouter } from '@pkm/libs/uploadthing/tourism/server';
import { Partytown } from '@builder.io/partytown/react';

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
  title: 'Wisata Desa Bojongsari',
  description: 'Wisata Desa Bojongsari Kabupaten Bandung',
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
        <NextSSRPlugin routerConfig={extractRouterConfig(tourismFileRouter)} />

        <body>
          {' '}
          <Partytown debug={true} />
          <Script
            type="text/partytown"
            id="google-tag-manager"
            dangerouslySetInnerHTML={{
              __html: `
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-MZ3PFF64');
            `,
            }}
          />
          {children}
        </body>
        <GoogleTagManager gtmId="GTM-MZ3PFF64" />
      </AuthProvider>
    </html>
  );
}
