import Button from '@mui/material/Button';
import { styled } from '@mui/system';

const ButtonDashboard = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'grey',
})((props: { grey?: boolean; seaBlue?: boolean }) => ({
  boxShadow: 'none',
  backgroundColor: props.grey
    ? 'grey'
    : props.seaBlue
    ? '#0078b9'
    : 'primary.main',
  '&:hover': {
    backgroundColor: props.grey
      ? 'grey'
      : props.seaBlue
      ? '#034366'
      : 'primary.main',
    boxShadow: 'none',
  },
}));

export default ButtonDashboard;
