import { globalTheme } from '@/theme';
import Box from '@mui/material/Box';

export default function DashboardWrapper({
  children,
  sx = {},
}: {
  children: React.ReactNode;
  sx?: { [key: string]: any };
}) {
  return (
    <Box
      sx={{
        backgroundColor: 'white',
        width: '100%',
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
    >
      {children}
    </Box>
  );
}
