import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Link from 'next/link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export interface IItemProps {
  title: string;
  route: string;
  faIcon: IconDefinition;
  open: boolean;
}

export default function Item({ title, route = '#', faIcon, open }: IItemProps) {
  return (
    <Link href={route}>
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
        }}
        disablePadding
      >
        <ListItemButton
          className='secondary'
          sx={{ p: 0, height: '100%', px: 1.5 }}
        >
          <Box sx={{ width: 40, display: 'flex', justifyContent: 'center' }}>
            <Typography
              sx={{
                width: 40,
                display: 'flex',
                justifyContent: 'center',
                fontSize: '1.625rem',
              }}
              variant={'h4'}
              component='i'
            >
              <FontAwesomeIcon icon={faIcon} />
            </Typography>
          </Box>
          <Typography
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
