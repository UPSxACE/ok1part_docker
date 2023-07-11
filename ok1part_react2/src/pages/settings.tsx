import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import getDashboardLayout from '@/utils/get-dashboard-layout';
import DashboardWrapper from '@/components/common/dashboard/dashboard-wrapper';
import LoaderPrimary from '@/components/common/loader-primary';
import Box from '@mui/material/Box';
import AccordionForm from '@/components/settings/accordion-form';
import useUapTable from '@/components/settings/use-uap-table';
import UapTable from '@/components/settings/uap-table';
import FamilyTable from '@/components/settings/family-table';
import useFamilyTable from '@/components/settings/use-family-table';
import useReferenceTable from '@/components/settings/use-reference-table';
import ReferenceTable from '@/components/settings/reference-table';
import ReasonTable from '@/components/settings/reason-table';
import useReasonTable from '@/components/settings/use-reason-table';
import useShiftTable from '@/components/settings/use-shift-table';
import ShiftTable from '@/components/settings/shift-table';
import { useTranslation } from 'next-i18next';

export default function Settings() {
  const uapConfig = useUapTable();
  const familyConfig = useFamilyTable();
  const referenceConfig = useReferenceTable();
  const reasonConfig = useReasonTable();
  const shiftConfig = useShiftTable();

  const isLoading = uapConfig.uap_is_loading || false;
  const error = uapConfig.uap_error || false;

  const { t } = useTranslation();

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
    <DashboardWrapper sx={{ p: 0, overflow: 'hidden' }}>
      <AccordionForm.Form>
        <AccordionForm.Part id={0} title={t('common:Uap')}>
          <UapTable {...uapConfig} />
        </AccordionForm.Part>
        <AccordionForm.Part id={1} title={t('common:Family')}>
          <FamilyTable
            {...familyConfig}
            uap_table_data={uapConfig.uap_table_data}
          />
        </AccordionForm.Part>
        <AccordionForm.Part id={2} title={t('common:Reference')}>
          <ReferenceTable
            {...referenceConfig}
            uap_table_data={uapConfig.uap_table_data}
            family_table_data={familyConfig.family_table_data}
          />
        </AccordionForm.Part>
        <AccordionForm.Part id={3} title={t('common:Reason')}>
          <ReasonTable {...reasonConfig} />
        </AccordionForm.Part>
        <AccordionForm.Part id={4} title={t('common:Shift')}>
          <ShiftTable {...shiftConfig} />
        </AccordionForm.Part>
      </AccordionForm.Form>
    </DashboardWrapper>
  );
}

Settings.getLayout = (page: any) =>
  getDashboardLayout(page, {
    header: {
      title: 'Settings',
      rightText: 'Dashboard/Settings',
    },
  });

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      // not compatible with getInitialProps
      ...(await serverSideTranslations(locale, ['common', 'settings'])),
      // Will be passed to the page component as props
    },
  };
}
