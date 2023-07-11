import { Box, Button, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';

const style = {
  display: 'flex',
  flexDirection: 'column',
  width: 345,
  paddingTop: 1,
  backgroundColor: 'white',
  padding: 4,

  boxShadow: '0px 1px 3px #0000000f',
  borderRadius: 1,
  border: '1px solid #dadce0',
};

export default function Panel({
  title,
  description,
  buttonText,
  imgPath,
  route,
}) {
  return (
    <Box sx={style}>
      <Typography variant='h5' fontWeight={500} sx={{ minHeight: '6rem' }}>
        {title}
      </Typography>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            position: 'relative',
            width: 160,
            height: 160,
          }}
        >
          <Image src={imgPath} fill alt='Flat Design' />
        </Box>
      </Box>
      <Typography
        variant='body1'
        sx={{
          minHeight: '15%',
          marginTop: 4,
          paddingBottom: 2,
          minHeight: '7rem',
        }}
      >
        {description}
      </Typography>
      <Link href={route}>
        <Button variant='contained' sx={{ width: '100%' }}>
          {buttonText}
        </Button>
      </Link>
    </Box>
  );
}
