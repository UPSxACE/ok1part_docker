import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import getDashboardLayout from '@/utils/get-dashboard-layout';
import useQuery from '@/utils/use-query';
import api from '@/api';
import { Box, Typography } from '@mui/material';
import LoaderPrimary from '@/components/common/loader-primary';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
export default function Home() {
  const { response, error, isLoading } = useQuery(api.getPublicInfo);
  const companyName = response?.data?.companyName;

  if (isLoading) {
    return (
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <LoaderPrimary />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          flexDirection: 'column',
        }}
      >
        <Typography
          variant='h1'
          component='i'
          sx={{ color: '#ed6c02', fontSize: { xs: '5rem', md: 160 } }}
        >
          <FontAwesomeIcon icon={faTriangleExclamation} />
        </Typography>
        <Typography
          variant='h4'
          component='h1'
          sx={{ fontSize: { xs: '1.1rem', md: '1.9rem' } }}
        >
          Unknown IP, please login
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        flexDirection: 'column',
      }}
    >
      <Typography variant='h4'>
        {companyName ? 'Welcome to ' + companyName + '!' : 'Welcome!'}
      </Typography>
    </Box>
  );
}

Home.getLayout = (page: any) => {
  return getDashboardLayout(page, {});
};

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      // not compatible with getInitialProps
      ...(await serverSideTranslations(locale, ['common', 'home'])),
      // Will be passed to the page component as props
    },
  };
}
