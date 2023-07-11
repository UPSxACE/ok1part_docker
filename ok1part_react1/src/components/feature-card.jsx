import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { faFaceAngry } from '@fortawesome/free-regular-svg-icons';

export default function FeatureCard({
  width,
  icon,
  title,
  desc,
  containerStyle,
  ...props
}) {
  return (
    <Box
      {...props}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: width,
        ...props.sx,
      }}
    >
      <Box
        sx={{
          //backgroundColor: 'primary.components', //primary.components2
          //height: 300,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          borderRadius: 4,
          paddingTop: 6,
          paddingBottom: 6,
          ...containerStyle,
        }}
      >
        {icon && (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: { xs: 'center', md: 'flex-start' },
              width: '100%',
              marginBottom: 2,
            }}
          >
            {icon}
          </Box>
        )}

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: { xs: 'center', md: 'flex-start' },
            width: '100%',
          }}
        >
          <Typography variant='h5' color='text.special' component={'h3'}>
            {title}
          </Typography>
          <Typography
            color='text.secondary'
            variant='body2'
            component='p'
            sx={{ marginTop: 2, textAlign: 'justify' }}
          >
            {desc}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
