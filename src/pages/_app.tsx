import '@/styles/global.css';

import type { AppProps } from 'next/app';
import { Roboto } from 'next/font/google';
import { SessionProvider } from 'next-auth/react';
import type { FC, ReactNode } from 'react';

import { ManagedUIContext } from '@/components/ui/context';

// Initialize IBM_Plex_Mono font
const ibm = Roboto({
  subsets: ['latin-ext'],
  weight: '400',
});

const Noop: FC<{ children?: ReactNode }> = ({ children }) => <>{children}</>;

export default function App({ Component, pageProps }: AppProps) {
  const Layout = (Component as any).Layout || Noop;
  return (
    <SessionProvider session={pageProps.session}>
      <ManagedUIContext>
        <main className={ibm.className}>
          <Layout pageProps={pageProps}>
            <Component {...pageProps} />
          </Layout>
        </main>
      </ManagedUIContext>
    </SessionProvider>
  );
}
