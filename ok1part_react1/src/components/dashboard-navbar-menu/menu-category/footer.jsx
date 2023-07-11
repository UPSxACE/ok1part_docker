import { Box } from '@mui/material';

export default function Footer({ style = {}, children }) {
  return <Box sx={style}>{children}</Box>;
}
