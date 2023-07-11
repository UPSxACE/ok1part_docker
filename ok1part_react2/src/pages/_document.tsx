import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  const isDevelopment = process.env.NODE_ENV === 'development';
  return (
    <Html lang='en'>
      {/*eslint-disable-next-line @next/next/no-sync-scripts*/}
      {isDevelopment && <script src='http://localhost:8097'></script>}
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
