import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

interface IActionIconButtonProps {
  faIcon: IconDefinition;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
}

export default function ActionIconButton({
  faIcon,
  onClick,
}: IActionIconButtonProps) {
  return (
    <Box>
      <IconButton
        sx={{ p: 0, '&:not(:first-of-type)': { ml: 1.25 }, color: 'info.main' }}
        onClick={onClick || ((e: React.MouseEvent<HTMLElement>) => {})}
      >
        <Box
          sx={{
            height: '40px',
            width: '40px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography
            sx={{
              display: 'flex',
              justifyContent: 'center',
              fontSize: '1.2rem',
            }}
            variant={'h4'}
            component='i'
          >
            <FontAwesomeIcon icon={faIcon} />
          </Typography>
        </Box>
      </IconButton>
    </Box>
  );
}
