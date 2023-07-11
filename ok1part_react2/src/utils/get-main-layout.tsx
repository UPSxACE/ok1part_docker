import { IMainLayoutProps } from '@/layouts/main-layout';
import MainLayout from '@/layouts/main-layout';

export default function getMainLayout(page: any, config?: IMainLayoutProps) {
  return <MainLayout {...config}>{page}</MainLayout>;
}
