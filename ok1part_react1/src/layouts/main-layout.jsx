import TFooter from '@/components/tfooter';
import TNavBar from '@/components/tnavbar';
import { motion } from 'framer-motion';
import Head from 'next/head';

export default function MainLayout({
  transparentBar = false,
  children,
  title,
}) {
  return (
    <>
      <Head>
        <title>{title ? 'OK1st Part' + ' - ' + title : 'OK1st Part'}</title>
        <meta name='description' content='OK1st Part, powered by Techwelf' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      {transparentBar ? (
        <TNavBar key={0} transparentBar={true} />
      ) : (
        <TNavBar key={1} />
      )}
      <a style={{ position: 'relative', top: -67 }} id='page-start' />
      <motion.div
        id='body'
        style={{
          marginTop: transparentBar ? '-68px' : 0,
          overscrollBehaviorY: 'contain',
          //overflowY: 'auto',
          width: '100vw',
          maxWidth: '100%',
        }}
      >
        {children}
        <TFooter />
      </motion.div>
    </>
  );
}
