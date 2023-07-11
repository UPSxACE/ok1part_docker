import { Inter } from 'next/font/google';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import getMainLayout from '@/utils/get-main-layout';

const inter = Inter({ subsets: ['latin'] });
export default function Home() {
  return <main data-testid='landingText'>Index</main>;
}

Home.getLayout = (page: any) => getMainLayout(page);

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      // not compatible with getInitialProps
      ...(await serverSideTranslations(locale, ['common', 'home'])),
      // Will be passed to the page component as props
    },
  };
}
