import { globalTheme } from '@/theme';
import { SxProps, Theme } from '@mui/material';
import Box from '@mui/material/Box';

export default function DashboardMiniWrapper({
  children,
  sx,
  wrapperProps,
}: {
  children: React.ReactNode;
  sx?: SxProps<Theme>;
  wrapperProps?: any;
}) {
  return (
    <Box
      sx={{
        backgroundColor: 'white',
        flex: 1,
        boxShadow: (globalTheme as any).palette.theme1.dashboardWrapperShadow,
        paddingX: 2,
        paddingY: 1.5,
        borderRadius: 1,
        border: '1px solid #dadce0',
        display: 'flex',
        flexDirection: 'column',
        ...sx,
      }}
      {...wrapperProps}
    >
      {children}
    </Box>
  );
}
