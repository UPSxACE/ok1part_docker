import { Box } from '@mui/material';

export default function DashboardWrapper({ notAligned, children }) {
  return (
    <Box
      sx={{
        width: '100%',
        minHeight: 'calc(100vh - 70px)',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <Box
        sx={{
          flex: 1,
          backgroundColor: 'white',
          borderRadius: 0,
          backgroundColor: 'primary.components4',
          overflow: 'hidden',
          width: '100%',
          position: 'relative',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            overflow: 'auto',
            flex: 1,
            display: 'flex',
            minHeight: '100%',
          }}
        >
          <Box
            sx={{
              px: 4,
              pt: notAligned ? 4 : 1.5,
              pb: 4,
              display: 'flex',
              flexDirection: 'column',
              position: 'absolute',
              minHeight: '100%',
              width: '100%',
            }}
          >
            {children}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
