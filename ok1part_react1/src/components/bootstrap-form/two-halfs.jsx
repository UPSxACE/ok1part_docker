import { Box } from '@mui/material';
import { Children, cloneElement, isValidElement } from 'react';

export default function TwoHalfs(props) {
  return (
    <Box sx={{ display: 'flex' }}>
      {Children.map(props.children, (child) => {
        if (isValidElement(child)) {
          const childProps = { ...child.props, ...props };
          // Remove `children` prop to avoid passing it down
          delete childProps.children;
          return cloneElement(child, childProps);
        }
        return child;
      })}
    </Box>
  );
}
