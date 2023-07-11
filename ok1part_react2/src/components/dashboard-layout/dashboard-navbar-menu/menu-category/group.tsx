import List from '@mui/material/List';

interface IGroup {
  children?: React.ReactNode;
  title: string;
}

export default function Group({ children, title }: IGroup) {
  return (
    <List
      sx={{
        py: 0,
        ':not(:first-of-type)': {
          paddingTop: 0,
        },
      }}
    >
      {children}
    </List>
  );
}
