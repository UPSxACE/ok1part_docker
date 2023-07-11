import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import DashboardWrapper from '@/components/common/dashboard/dashboard-wrapper';
import SimplifiedMaterialTable from '@/components/forms-index/simplified-material-table';
import useColumns from '@/components/forms-index/use-columns';
import LoaderPrimary from '@/components/common/loader-primary';
import Box from '@mui/material/Box';
import { useRouter } from 'next/router';
import useQuery from '@/utils/use-query';
import api from '@/api';
import { useEffect, useState } from 'react';
import DashboardLayout from '@/layouts/dashboard-layout';
import DashboardMiniWrapper from '@/components/common/dashboard/dashboard-mini-wrapper';
import { useTranslation } from 'next-i18next';

export default function Answers() {
  const { query, isReady } = useRouter();

  const layoutConfig = {
    header: Boolean(!query?.id && isReady)
      ? {
          title: 'Answers',
          rightText: 'Dashboard/Answers',
        }
      : undefined,
    sx: Boolean(!isReady || query?.id)
      ? { sx: { alignItems: 'center', paddingY: 8 } }
      : undefined,
  };

  function getContent() {
    if (!isReady) {
      return (
        <Box
          sx={{
            flex: 1,
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <DashboardMiniWrapper sx={{ flex: 0 }}>
            <Box
              sx={{
                display: 'flex',
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                p: 6,
              }}
            >
              <LoaderPrimary />
            </Box>
          </DashboardMiniWrapper>
        </Box>
      );
    }

    if (!query?.id) {
      return <AnswersIndex />;
    } else {
      //return <FormsAnswer id={query.id} />;
    }
  }

  return <DashboardLayout {...layoutConfig}>{getContent()}</DashboardLayout>;
}

function AnswersIndex() {
  const { error, isLoading, response } = useQuery(api.getAllFormAnswers);
  const columns = useColumns();
  const [tableData, setTableData] = useState(null);

  useEffect(() => {
    // NOTE: This useEffect is necessary to avoid issues related to the rendering of the MaterialTable component when,
    // for example, going back a page
    if (response) {
      setTableData(response?.data);
    }
  }, [response]);

  if (isLoading || error || !tableData) {
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
      <SimplifiedMaterialTable
        key={String(isLoading)}
        data={tableData}
        columns={columns}
      />
    </DashboardWrapper>
  );
}

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      // not compatible with getInitialProps
      ...(await serverSideTranslations(locale, ['common', 'answers'])),
      // Will be passed to the page component as props
    },
  };
}
