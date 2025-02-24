import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        <meta property="og:site_name" content="ALTCLAN" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@altclan" />
        <meta name="twitter:creator" content="@altclan" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}