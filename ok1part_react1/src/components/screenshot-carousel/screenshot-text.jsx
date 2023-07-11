import { Box, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { styled } from '@mui/system';
import Image from 'next/image';
import { useMeasure } from 'react-use';

// Full Height and Width NextJS Image
const FhwImage = styled(Image)((props) => {
  return {
    height: 'calc(100vh - 68px)',
    objectFit: 'cover',
    width: '100vw',
    maxWidth: '100%',
  };
});

export default function ScreenshotText({
  title,
  desc,
  imgPath,
  negativeOffset = 0,
}) {
  const { t } = useTranslation();
  const [ref, image_obj] = useMeasure();

  return (
    <Box>
      <FhwImage
        ref={ref}
        alt='App Screenshot'
        src={imgPath}
        width='0'
        height='0'
        sizes='100vw'
      />

      <Box
        component={'div'}
        sx={{
          width: {
            xs: '100%',
          },
          paddingRight: { md: 4 },
          position: 'absolute',
          minHeight: '220px',
          paddingBottom: '20px',
          bottom: 0,

          backgroundColor: 'rgba(0,0,0,0.5)',

          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          maxWidth: image_obj.width,
        }}
      >
        <Box
          sx={{
            width: image_obj.width - 200,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <Typography
            color='text.primary'
            variant='h4'
            component='h2'
            sx={{
              marginTop: 2,
              marginBottom: 2,
              textAlign: 'center',
              color: 'text.primary',
            }}
          >
            {title}
          </Typography>
          <Typography
            color='text.primary'
            variant='body1'
            component='p'
            sx={{
              marginBottom: 4,
              textAlign: 'center',
              color: 'text.primary',
            }}
          >
            {desc}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
