import DashboardPageHeader from '@/components/dashboard-page-header';
import DashboardWrapper from '@/components/dashboard-wrapper';
import InvoicingForm from '@/components/pages/invoicing/forms/invoicingform';
import DashboardLayout from '@/layouts/dashboard-layout';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function Invoicing() {
  return (
    <DashboardWrapper>
      <DashboardPageHeader
        title='Invoicing'
        rightText={'Dashboard / Invoicing'}
      />
      <InvoicingForm shadow />
    </DashboardWrapper>
  );
}

Invoicing.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

//export default withAuth(Invoicing);

export async function getStaticProps({ locale }) {
  return {
    props: {
      // not compatible with getInitialProps
      ...(await serverSideTranslations(locale, ['common', 'footer'])),
      // Will be passed to the page component as props
    },
  };
}
