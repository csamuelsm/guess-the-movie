import type { Metadata } from 'next';

import Providers from '~/app/providers';
import Layout from '~/lib/layout';
import { Analytics } from '@vercel/analytics/react';
import Script from 'next/script';

type RootLayoutProps = {
  children: React.ReactNode;
};

const APP_NAME = 'GuessTheMovie | Daily Movie Guessing Game';

export const metadata: Metadata = {
  title: { default: APP_NAME, template: '%s | GuessTheMovie' },
  description: 'The objective of the game Guess The Movie is to discover the secret movie of the day. To do this, you must guess movies that you think are similar to the secret movie. It is similar to games like Wordle and Contexto.',
  viewport: {
    width: 'device-width',
    initialScale: 1,
  },
  applicationName: APP_NAME,
  appleWebApp: {
    capable: true,
    title: APP_NAME,
    statusBarStyle: 'default',
  },
  formatDetection: {
    telephone: false,
  },
  themeColor: '#FFFFFF',
  openGraph: {
    url: 'https://guess-the-movie-one.vercel.app/',
    siteName: 'Guess the Movie',
    locale: 'en',
    title: 'GuessTheMovie',
    description: 'The objective of the game Guess The Movie is to discover the secret movie of the day. To do this, you must guess movies that you think are similar to the secret movie.  It is similar to games like Wordle and Contexto.',
    images: {
      url: 'gtm-og-image.png',
      alt: 'Guess The Movie og-image',
    },
  },
  twitter: {
    creator: '@csamsanm',
    card: 'summary_large_image',
  },
};

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Layout>{children}</Layout>
          <Analytics />
          <Script async strategy="afterInteractive" id="adsbygoogle-init"
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1009095463777730"
            crossOrigin="anonymous"></Script>
          <Script src="https://www.googletagmanager.com/gtag/js?id=G-2PXQWQ0MM6" />
          <Script id="google-analytics">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'G-2PXQWQ0MM6');
            `}
          </Script>
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
