const { CircularProgress } = require('@mui/material');

export default function LoaderPrimary(props) {
  return (
    <CircularProgress
      color='primary'
      {...props}
      sx={{ height: 'auto', ...props.sx }}
    />
  );
}
