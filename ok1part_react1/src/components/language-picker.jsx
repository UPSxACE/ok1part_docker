import appConfig from '@/app-config';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

// Make sure you use this component together with the hook "useLanguagePicker" to make your life easier

// Example:

// const {
//     anchorElLanguage,
//     currentLanguage,
//     setLanguage,
//     languagesEnabled,
//     handleOpenLanguageMenu,
//     handleCloseLanguageMenu,
//   } = useLanguagePicker();

// return (
//     <>
//       {languagesEnabled && (
//         <LanguagePicker
//           state={{ currentLanguage, setLanguage }}
//           onClick={handleOpenLanguageMenu}
//           iconButtonStyle={{ marginLeft: 'auto' }}
//         />
//       )}
//       <LanguageMenu
//         anchorElLanguage={anchorElLanguage}
//         handleCloseLanguageMenu={handleCloseLanguageMenu}
//         setLanguage={setLanguage}
//       />
//     </>
//   );

const {
  Tooltip,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  Typography,
} = require('@mui/material');

export function LanguageIcon({ name, imgPath, small = false }) {
  return (
    <Avatar
      sx={{
        color: 'text.primary',
        height: small ? 25 : 40,
        width: small ? 25 : 40,
      }}
      alt={name + ' flag'}
      src={imgPath}
    />
  );
}

export function LanguageMenu({
  anchorElLanguage,
  handleCloseLanguageMenu,
  setLanguage,
}) {
  const { t } = useTranslation();
  const router = useRouter();

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
        <Link
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
        >
          <MenuItem onClick={handleCloseLanguageMenu}>
            <ListItemIcon>
              <LanguageIcon
                small
                pressable
                name='English'
                imgPath={appConfig.languages[language].flagPath}
              />
            </ListItemIcon>
            <Typography color='text.secondary' textAlign='center'>
              {t(appConfig.languages[language].name)}
            </Typography>
          </MenuItem>
        </Link>
      ))}
    </Menu>
  );
}

export default function LanguagePicker({
  iconButtonStyle = {},
  languageIconStyle = {},
  onClick = () => {},
  state,
}) {
  const { currentLanguage, setLanguage } = state;

  return (
    <Tooltip title='Change Language'>
      <IconButton
        onClick={onClick}
        sx={{ p: 0, height: 52, width: 52, ...iconButtonStyle }}
      >
        <LanguageIcon
          name={currentLanguage.id}
          imgPath={currentLanguage.flagPath}
          sx={{ ...languageIconStyle }}
        />
      </IconButton>
    </Tooltip>
  );
}
