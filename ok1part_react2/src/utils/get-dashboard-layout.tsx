import DashboardLayout, {
  IDashboardLayoutProps,
} from '@/layouts/dashboard-layout';

export default function getDashboardLayout(
  page: any,
  config?: IDashboardLayoutProps
) {
  return <DashboardLayout {...config}>{page}</DashboardLayout>;
}
