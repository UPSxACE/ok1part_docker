import { Box, List, Typography } from '@mui/material';
import { Children, cloneElement, isValidElement } from 'react';

export default function Group({ title, children, open }) {
  return (
    <List
      sx={{
        py: 0,
        ':not(:first-of-type)': {
          paddingTop: 0,
        },
      }}
    >
      {/*<Typography color={'text.primary'} variant={'h6'} component='h1'>
        {title}
      </Typography>*/}
      {Children.map(children, (child) => {
        if (isValidElement(child)) {
          return cloneElement(child, {
            open: open,
          });
        }
        return child;
      })}
    </List>
  );
}
