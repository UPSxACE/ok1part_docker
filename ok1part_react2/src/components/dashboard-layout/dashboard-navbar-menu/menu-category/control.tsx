import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

export interface IControlProps {
  state: {
    open: boolean;
    setOpen: React.Dispatch<any>;
  };
  handleDrawerToggle: Function;
  children?: React.ReactNode;
}

export default function Control({
  state,
  handleDrawerToggle,
  children,
}: IControlProps) {
  const { open, setOpen } = state;

  return (
    <Drawer
      variant='permanent'
      open={open}
      sx={{
        height: '100%',
        '& .MuiPaper-root': {
          width: open ? 300 : 64,
          position: 'relative',
          overflow: 'hidden',
          transition: 'width 0.35s',
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-start',
          height: 70,
          alignItems: 'center',
        }}
      >
        <IconButton className='secondary' onClick={handleDrawerToggle as any}>
          {open ? (
            <ChevronLeft sx={{ fontSize: 50 }} />
          ) : (
            <ChevronRight sx={{ fontSize: 50 }} />
          )}
        </IconButton>
      </Box>
      {children}
    </Drawer>
  );
}
