import {
  ListItem,
  ListItemButton,
  ListItemText,
  SxProps,
  Typography,
} from '@mui/material';

export interface IDetailItemProps {
  title: string;
  children?: React.ReactNode;
  value?: string | React.ReactNode;
  sx?: SxProps;
}

export default function DetailItem({
  title,
  value,
  children,
  sx = {},
}: IDetailItemProps) {
  return (
    <ListItem sx={sx} disablePadding>
      <ListItemButton
        sx={{
          cursor: 'default',
          marginX: -2,
          padding: 1,
          height: 40,
        }}
        disableGutters
        disableRipple
      >
        <ListItemText>{title}</ListItemText>
        <Typography variant='body1' component='span'>
          {value}
        </Typography>
        {children}
      </ListItemButton>
    </ListItem>
  );
}
