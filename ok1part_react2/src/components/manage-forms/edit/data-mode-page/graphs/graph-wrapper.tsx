import DashboardMiniWrapper from '@/components/common/dashboard/dashboard-mini-wrapper';

export default function GraphWrapper({ children, sx = {} }: any) {
  return (
    <DashboardMiniWrapper
      sx={{
        minHeight: 350,
        minWidth: 'calc(50% - 8px)',
        flex: 1,
        ...sx,
        paddingTop: 4,
        paddingBottom: 2,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {children}
    </DashboardMiniWrapper>
  );
}
