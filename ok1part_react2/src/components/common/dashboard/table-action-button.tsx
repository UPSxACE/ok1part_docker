import ButtonDashboard from './button-dashboard';

export default function TableActionButton(
  props: React.ComponentProps<typeof ButtonDashboard> & { title: string }
) {
  return (
    <ButtonDashboard
      sx={{
        height: 35,
        borderRadius: 0.5,
        '&:not(:first-of-type)': { ml: 1 },
      }}
      variant='contained'
      {...props}
    >
      {props.title}
    </ButtonDashboard>
  );
}
