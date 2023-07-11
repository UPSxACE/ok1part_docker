import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export interface IDashboardPageHeaderProps {
  title: string;
  rightText: string;
  faIcon?: IconDefinition;
}

export default function DashboardPageHeader({
  title,
  rightText,
  faIcon,
}: IDashboardPageHeaderProps) {
  return (
    <Box sx={{ width: '100%', display: 'flex', marginBottom: 1.5 }}>
      {faIcon && (
        <Typography component='h1' variant='h6'>
          <FontAwesomeIcon icon={faIcon} />
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
