import CircularProgress from '@mui/material/CircularProgress';

export default function LoaderPrimary(props: any) {
  return (
    <CircularProgress
      color='primary'
      {...props}
      sx={{ height: 'auto', ...props.sx }}
    />
  );
}
