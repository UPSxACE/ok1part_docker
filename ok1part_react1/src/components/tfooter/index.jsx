import { Box, Divider, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import ColoredBox from '../colored-box';
import Info from './info';

const currentYear = new Date().getFullYear();

export default function TFooter() {
  const { t } = useTranslation();
  return (
    <ColoredBox
      component={motion.div}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        paddingX: '24px',
        paddingY: 5,
        scrollSnapAlign: { md: 'end' },
        backgroundColor: 'primary.components',
        alignItems: 'center',
      }}
    >
      <Box sx={{ width: '100%', maxWidth: 1536 }}>
        <Info />
        <Divider sx={{ borderColor: 'white', marginTop: 5, marginBottom: 5 }} />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
          }}
        >
          <Typography color='text.primary' variant='body2' component='span'>
            © TechWelf {currentYear}. {t('all_rights')}
          </Typography>
          {/*<Box sx={{ marginLeft: 'auto' }}>
          <Typography color='text.primary' variant='body2' component='span'>
            Logos
          </Typography>
        </Box>*/}
        </Box>
      </Box>
    </ColoredBox>
  );
}
