import { FormEventHandler } from 'react';
import ButtonDashboard from '../button-dashboard';

export default function NextButton({
  sx = {},
  onClick = () => {},
  disabled = false,
}: {
  sx?: any;
  onClick?: FormEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}) {
  return (
    <ButtonDashboard
      sx={{ width: 'min-content', marginTop: 2, ...sx }}
      variant='contained'
      type='button'
      onClick={onClick || (() => {})}
      disabled={disabled}
    >
      Next
    </ButtonDashboard>
  );
}
