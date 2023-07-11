import { Box } from '@mui/material';
import FilterBar from './filter-bar';
import DashboardMiniWrapper from '@/components/common/dashboard/dashboard-mini-wrapper';
import dynamic from 'next/dynamic';
const FilteredData = dynamic(() => import('./filtered-data'), { ssr: false });
export default function DataModePage() {
  return (
    <Box sx={{ flex: 1 }}>
      <DashboardMiniWrapper sx={{ padding: 0 }}>
        <FilterBar />
      </DashboardMiniWrapper>

      <FilteredData />
    </Box>
  );
}
