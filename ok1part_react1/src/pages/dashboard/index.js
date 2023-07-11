import Panel from '@/components/pages/home/panel';
import DashboardLayout from '@/layouts/dashboard-layout';
import { Box, Typography } from '@mui/material';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const style = {
  display: 'flex',
  flexDirection: 'column',
  width: { md: 'calc(100% / 3)', paddingTop: 10 },
  flex: 1,
};

export default function DashboardIndex() {
  return (
    <Box
      sx={{
        width: '100%',
        minHeight: 'calc(100vh - 70px)',
        display: 'flex',
        justifyContent: 'flex-start',
        px: 4,
        py: 3.5,
        backgroundColor: 'primary.components4',
        flexDirection: 'column',
      }}
    >
      {/*<DashboardPageHeader title='Home' rightText={'Dashboard / Home'} />*/}
      <Typography
        variant='h4'
        sx={{
          fontSize: '3rem',
          fontWeight: 500,
          textAlign: 'center',
          paddingBottom: 3,
        }}
      >
        Welcome to Ok1st!
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 4,
          justifyContent: 'space-around',
        }}
      >
        <Panel
          title='Create users and assign permissions'
          description='Create accounts for your workers, and give them permissions to manage forms, approve forms, or manage the application.'
          buttonText='USERS'
          imgPath='/connection.png'
          route='/dashboard/users'
        />
        <Panel
          title='Add invoicing info'
          description='Fill the billing form with your data in order to not lose access to the application.'
          buttonText='INVOICING'
          imgPath='/taxes.png'
          route='/dashboard/invoicing'
        />
        <Panel
          title='Setup your company dashboard'
          description='Add operators to the default cycle, and whitelist IPs to get public access to your application.'
          buttonText='SETTINGS'
          imgPath='/machine.png'
          route='/dashboard/settings'
        />
      </Box>
    </Box>
  );
}

DashboardIndex.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

//export default withAuth(DashboardIndex);

export async function getStaticProps({ locale }) {
  return {
    props: {
      // not compatible with getInitialProps
      ...(await serverSideTranslations(locale, ['common', 'footer'])),
      // Will be passed to the page component as props
    },
  };
}
