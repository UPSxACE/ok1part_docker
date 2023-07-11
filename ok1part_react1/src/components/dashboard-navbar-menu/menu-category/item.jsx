import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, ListItem, ListItemButton, Typography } from '@mui/material';
import Link from 'next/link';

// This should be fetched from database
const user_access_level = 32;

export default function Item({
  title,
  route = '#',
  faIcon,
  open,
  permissionNeeded = 0,
}) {
  if (permissionNeeded === 0 || permissionNeeded & user_access_level) {
    return (
      <Link style={{ textDecoration: 'none' }} href={route}>
        <ListItem
          sx={{
            display: 'flex',
            alignItems: 'center',

            opacity: 0.85,
            '&:hover': {
              opacity: 1,
              cursor: 'pointer',
            },
            height: 50,
            alignItems: 'center',
          }}
          disablePadding
        >
          <ListItemButton sx={{ p: 0, height: '100%', px: 1.5 }}>
            <Box sx={{ width: 40, display: 'flex', justifyContent: 'center' }}>
              <Typography
                sx={{
                  width: 40,
                  display: 'flex',
                  justifyContent: 'center',
                  fontSize: '1.625rem',
                }}
                color={'text.primary'}
                variant={'h4'}
                component='i'
              >
                <FontAwesomeIcon icon={faIcon} />
              </Typography>
            </Box>

            <Typography
              color={'text.primary'}
              variant={'h6'}
              component='h2'
              ml={1.5}
              sx={{ whiteSpace: open ? 'initial' : 'nowrap' }}
            >
              {title}
            </Typography>
          </ListItemButton>
        </ListItem>
      </Link>
    );
  }
}
