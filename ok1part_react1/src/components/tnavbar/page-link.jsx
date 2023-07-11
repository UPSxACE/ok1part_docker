import { Typography } from '@mui/material';
import { styled, useTheme } from '@mui/system';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';

export default function PageLink({ route, pageName, secondary, ...props }) {
  const { t } = useTranslation();

  return (
    <Link
      href={route}
      style={{ marginRight: 8, color: 'black', textDecoration: 'none' }}
      {...props}
      scroll={false}
    >
      <Typography
        color={secondary ? 'text.secondary' : 'text.primary'}
        variant='body1'
        component='span'
        sx={{
          '&:hover': {
            color: 'primary.special3',
            transition: '300ms',
          },
        }}
      >
        {t(pageName)}
      </Typography>
    </Link>
  );
}
