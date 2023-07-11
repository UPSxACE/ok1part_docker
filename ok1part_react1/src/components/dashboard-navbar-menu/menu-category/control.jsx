import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { Box, Divider, Drawer, IconButton } from '@mui/material';
import { Children, cloneElement, isValidElement } from 'react';

export default function Control({ state, handleDrawerToggle, children }) {
  const { open, setOpen } = state;
  return (
    <Drawer
      variant='permanent'
      open={open}
      sx={{
        height: '100%',
        '& .MuiPaper-root': {
          backgroundColor: 'primary.special2',
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
        <IconButton onClick={handleDrawerToggle} sx={{ color: 'white' }}>
          {open ? (
            <ChevronLeft sx={{ fontSize: 50 }} />
          ) : (
            <ChevronRight sx={{ fontSize: 50 }} />
          )}
        </IconButton>
      </Box>
      {Children.map(children, (child) => {
        if (isValidElement(child)) {
          return cloneElement(child, {
            open: open,
          });
        }
        return child;
      })}
    </Drawer>
  );
}
