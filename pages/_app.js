import React from 'react';
import Head from 'next/head';

import '../styles/globals.css';

// Fonts
import '../public/fonts/satoshi.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Dock Verifiable Credentials Demo</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
