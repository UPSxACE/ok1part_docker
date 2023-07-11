import { Box, Typography } from '@mui/material';
import { styled } from '@mui/system';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';

const CategoryLink = styled(Link)((props) => ({
  textDecoration: 'none',
  transition:
    'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 125ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border-color 125ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,color 125ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;',

  '&:hover': {
    color: props.theme.palette.primary.special3,
  },
}));

const CategoryExternalLink = styled('a')((props) => ({
  textDecoration: 'none',
  transition:
    'background-color 125ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 125ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border-color 125ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,color 125ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;',

  '&:hover': {
    color: props.theme.palette.primary.special3,
  },
}));

function CategoryList({ children }) {
  return (
    <ul
      style={{
        paddingLeft: 0,
        listStyle: 'none',
        margin: 0,
      }}
    >
      {children}
    </ul>
  );
}

function CategoryTitle({ children }) {
  return (
    <Typography
      color='text.primary'
      variant='h6'
      component='h1'
      fontWeight={600}
      mb={1.5}
    >
      {children}
    </Typography>
  );
}

function CategoryItem({ href, ext_href, children }) {
  const style = { paddingY: 0.25 };

  if (ext_href) {
    return (
      <Typography
        color='text.primary'
        variant='body2'
        component='li'
        sx={style}
      >
        <CategoryExternalLink
          target={'_blank'}
          rel='noreferrer'
          href={ext_href}
        >
          {children}
        </CategoryExternalLink>
      </Typography>
    );
  }

  if (href) {
    return (
      <Typography
        color='text.primary'
        variant='body2'
        component='li'
        sx={style}
      >
        <CategoryLink href={href} scroll={false}>
          {children}
        </CategoryLink>
      </Typography>
    );
  }

  return (
    <Typography color='text.primary' variant='body2' component='li' sx={style}>
      {children}
    </Typography>
  );
}

export default function Info() {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        //'& > div:not(:first-child):not(:last-child)': { flexGrow: 1 },
        //'& > div': { display: 'flex', flexDirection: 'column' },
        '& > div': { width: '25%' },
      }}
    >
      <Box>
        <Image
          alt='Techwelf logo'
          width={150}
          height={62}
          src='/logowhite.png'
        />
      </Box>
      {/*<Box>
        <CategoryTitle>{t('Product')}</CategoryTitle>
        <CategoryList
          style={{
            paddingLeft: 0,
            listStyle: 'none',
            margin: 0,
          }}
        >
          <CategoryItem href={'/#page-start'}>{t('Home')}</CategoryItem>
          <CategoryItem href={'/#product'}>{t('FeaturesTab')}</CategoryItem>
          <CategoryItem href={'/#features'}>{t('Printscreens')}</CategoryItem>
        </CategoryList>
      </Box>*/}
      <Box>
        <CategoryTitle>{t('Company')}</CategoryTitle>
        <CategoryList
          style={{
            paddingLeft: 0,
            listStyle: 'none',
            margin: 0,
          }}
        >
          <CategoryItem>Brigantia Ecopark</CategoryItem>
          <CategoryItem>Avenida Cidade de Léon, 506</CategoryItem>
          <CategoryItem>5300-253 Bragança</CategoryItem>
          <CategoryItem>Portugal</CategoryItem>
          <CategoryItem>geral@techwelf.com</CategoryItem>
          <CategoryItem>(+351) 918 153 028</CategoryItem>
        </CategoryList>
      </Box>
      <Box>
        <CategoryTitle>{t('Social Media')}</CategoryTitle>
        <CategoryList>
          <CategoryItem
            ext_href={'https://www.facebook.com/profile.php?id=100057266026408'}
          >
            Facebook
          </CategoryItem>
          <CategoryItem ext_href={'https://twitter.com/techwelf'}>
            Twitter
          </CategoryItem>
          <CategoryItem ext_href={'https://www.instagram.com/techwelf/'}>
            Instagram
          </CategoryItem>
          <CategoryItem ext_href={'https://www.linkedin.com/company/techwelf/'}>
            LinkedIn
          </CategoryItem>
        </CategoryList>
      </Box>
    </Box>
  );
}
