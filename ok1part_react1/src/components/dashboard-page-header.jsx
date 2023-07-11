import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, Typography } from '@mui/material';

export default function DashboardPageHeader({ icon, title, rightText }) {
  return (
    <Box sx={{ width: '100%', display: 'flex', marginBottom: 1 }}>
      {icon && (
        <Typography component='h1' variant='h6'>
          <FontAwesomeIcon icon={icon} />
        </Typography>
      )}
      <Typography component='h1' variant='h6'>
        {title}
      </Typography>
      {rightText && (
        <Typography component='span' variant='h6' sx={{ marginLeft: 'auto' }}>
          {rightText}
        </Typography>
      )}
    </Box>
  );
}
