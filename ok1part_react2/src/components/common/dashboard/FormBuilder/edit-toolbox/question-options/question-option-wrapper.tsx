import { ListItem, ListItemButton, SxProps } from '@mui/material';

export default function QuestionOptionWrapper({
  children,
  sx = {},
}: {
  children: React.ReactNode;
  sx?: SxProps;
}) {
  return (
    <ListItem sx={sx} disablePadding>
      <ListItemButton
        sx={{
          cursor: 'default',
          marginX: -3,
          paddingX: 3,
          height: 56,
        }}
        disableGutters
        disableRipple
      >
        {children}
      </ListItemButton>
    </ListItem>
  );
}
