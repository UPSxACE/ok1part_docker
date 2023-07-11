import DashboardPageHeader from '@/components/dashboard-page-header';
import DashboardWrapper from '@/components/dashboard-wrapper';
import UsersTable from '@/components/pages/users/tables/userstable';
import DashboardLayout from '@/layouts/dashboard-layout';
import { Box } from '@mui/material';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

export default function Users() {
  const { t } = useTranslation();
  return (
    <DashboardWrapper>
      <DashboardPageHeader
        title={t('users_pagename')}
        rightText={`Dashboard / ${t('users_pagename')}`}
      />
      <Box
        sx={{
          flex: 1,
          flexDirection: 'column',
          display: 'flex',
        }}
      >
        <UsersTable />
      </Box>
    </DashboardWrapper>
  );
}

Users.getLayout = function getLayout(page) {
  return <DashboardLayout title={'users_pagename'}>{page}</DashboardLayout>;
};

//export default withAuth(Users);

export async function getStaticProps({ locale }) {
  return {
    props: {
      // not compatible with getInitialProps
      ...(await serverSideTranslations(locale, ['common', 'footer'])),
      // Will be passed to the page component as props
    },
  };
}
