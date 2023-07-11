import { ListItemIcon, Menu, MenuItem, Typography } from '@mui/material';
import appConfig, { PossibleLanguages } from '@/app-config';
import { LanguageIcon } from '../language-picker/language-icon';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

export default function LanguageMenu({ config }: any) {
  const {
    anchorElLanguage,
    setAnchorElLanguage,
    handleOpenLanguageMenu,
    handleCloseLanguageMenu,
  } = config;

  const { t } = useTranslation();
  const router = useRouter();
  const { pathname, asPath, query } = router;

  return (
    <Menu
      disableScrollLock={true}
      sx={{ mt: '45px' }}
      id='menu-appbar'
      anchorEl={anchorElLanguage}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={Boolean(anchorElLanguage)}
      onClose={handleCloseLanguageMenu}
    >
      {Object.keys(appConfig.languages).map((language) => (
        /*<Link
        locale={appConfig.languages[language].id}
        key={appConfig.languages[language].id}
        href={router.pathname}
        onClick={() => {
          const setCookie = (locale) => {
            document.cookie = `NEXT_LOCALE=${locale}; max-age=31536000; path=/`;
          };
          setCookie(appConfig.languages[language].id);
          setLanguage(appConfig.languages[language].id);
        }}
      >*/
        <MenuItem
          onClick={(e: any) => {
            document.cookie = `NEXT_LOCALE=${language}; max-age=31536000; path=/`;
            router.push({ pathname, query }, asPath, { locale: language });
            handleCloseLanguageMenu(e);
          }}
          key={appConfig.languages[language as PossibleLanguages].id}
        >
          <ListItemIcon>
            <LanguageIcon
              small
              pressable
              name='English'
              imgPath={
                appConfig.languages[language as PossibleLanguages].flagPath
              }
            />
          </ListItemIcon>
          <Typography color='text.primary' textAlign='center'>
            {t(appConfig.languages[language as PossibleLanguages].name)}
          </Typography>
        </MenuItem>
        /*</Link>*/
      ))}
    </Menu>
  );
}
