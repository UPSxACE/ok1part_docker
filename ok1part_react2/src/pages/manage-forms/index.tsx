import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import getDashboardLayout from '@/utils/get-dashboard-layout';
import DashboardWrapper from '@/components/common/dashboard/dashboard-wrapper';
import LoaderPrimary from '@/components/common/loader-primary';
import Box from '@mui/material/Box';
import MaterialTable from '../../components/manage-forms/material-table';
import useColumns from '../../components/manage-forms/use-columns';
import api, { ApiFormAll } from '@/api';
import { useEffect, useState } from 'react';
import useQuery from '@/utils/use-query';

export default function ManageForms() {
  const columns = useColumns();

  const [tableData, setTableData] = useState([]);

  const { response, isLoading, error } = useQuery(api.getForms);

  useEffect(() => {
    // NOTE: This useEffect is necessary to avoid issues related to the rendering of the MaterialTable component when,
    // for example, going back a page
    if (response) {
      setTableData(response?.data);
    }
  }, [response]);

  if (isLoading || error) {
    return (
      <DashboardWrapper>
        <Box
          sx={{
            display: 'flex',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <LoaderPrimary />
        </Box>
      </DashboardWrapper>
    );
  }

  return (
    <DashboardWrapper>
      <MaterialTable
        key={String(isLoading)}
        data={tableData as ApiFormAll}
        columns={columns}
      />
    </DashboardWrapper>
  );
}

ManageForms.getLayout = (page: any) =>
  getDashboardLayout(page, {
    header: {
      title: 'ManageForms',
      rightText: 'Dashboard/ManageForms',
    },
  });

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      // not compatible with getInitialProps
      ...(await serverSideTranslations(locale, ['common', 'manage-forms'])),
      // Will be passed to the page component as props
    },
  };
}
