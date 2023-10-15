import type { Metadata } from 'next';

import Providers from '~/app/providers';
import Layout from '~/lib/layout';

type RootLayoutProps = {
  children: React.ReactNode;
};

const APP_NAME = 'GuessTheMovie';

export const metadata: Metadata = {
  title: { default: APP_NAME, template: '%s | GuessTheMovie' },
  description: 'The objective of the game Guess The Movie is to discover the secret movie of the day. To do this, you must guess movies that you think are similar to the secret movie.',
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
    //url: window.location.href,
    title: 'GuessTheMovie',
    description: 'The objective of the game Guess The Movie is to discover the secret movie of the day. To do this, you must guess movies that you think are similar to the secret movie.',
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
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
