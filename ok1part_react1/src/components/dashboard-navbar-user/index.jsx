import { Search } from '@mui/icons-material';
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from '@mui/material';
import appConfig from '@/app-config';
import UserAvatar from '../user-avatar';
import Link from 'next/link';
import { useContext, useState } from 'react';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import LanguagePicker, { LanguageMenu } from '../language-picker';
import useLanguagePicker from '@/hooks/language-picker';
import useClientSide from '@/hooks/client-side';

export default function DashboardNavbarUser() {
  const [anchorElUser, setAnchorElUser] = useState(null);

  const { serverIsDone } = useClientSide();

  const {
    anchorElLanguage,
    currentLanguage,
    setLanguage,
    languagesEnabled,
    handleOpenLanguageMenu,
    handleCloseLanguageMenu,
  } = useLanguagePicker();

  function handleOpenUserMenu(event) {
    setAnchorElUser(event.currentTarget);
  }

  function handleCloseUserMenu() {
    setAnchorElUser(null);
  }

  const { t } = useTranslation();

  return (
    <Box
      sx={{
        boxShadow: '0px 1px 3px #00000040;',
        height: 70,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        paddingX: 1.5,
        backgroundColor: 'primary.components2',
        position: 'relative',
        zIndex: 10,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          //boxShadow: '0px 1px 3px #00000040;',
          height: 70,
          alignItems: 'center',
          paddingLeft: 1,
        }}
      >
        <Image
          width={125}
          height={52}
          alt='OK1Part Logo'
          src={appConfig.logo_colored}
          priority
        />
      </Box>
      {appConfig.dashboardSearch && <Search sx={{ fontSize: 40 }} />}
      <Typography
        variant='h4'
        color='text.secondary'
        style={{ fontSize: 40 }}
        component={'span'}
      ></Typography>
      {languagesEnabled && (
        <LanguagePicker
          state={{ currentLanguage, setLanguage }}
          onClick={handleOpenLanguageMenu}
          iconButtonStyle={{ marginLeft: 'auto' }}
        />
      )}
      <LanguageMenu
        anchorElLanguage={anchorElLanguage}
        handleCloseLanguageMenu={handleCloseLanguageMenu}
        setLanguage={setLanguage}
      />
      <Box sx={{ marginLeft: languagesEnabled ? 0 : 'auto' }}>
        <Tooltip title='User Options'>
          <IconButton
            onClick={handleOpenUserMenu}
            sx={{ p: 0, height: 52, width: 52 }}
          >
            <UserAvatar dark />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        disableScrollLock={true}
        sx={{ mt: '45px' }}
        id='menu-appbar'
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {serverIsDone &&
          appConfig.userDashboardMenu.map((setting, index) => (
            <Link
              key={index}
              style={{ textDecoration: 'none' }}
              href={setting.route}
              onClick={handleCloseUserMenu}
            >
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography color='text.secondary' textAlign='center'>
                  {t(setting.name)}
                </Typography>
              </MenuItem>
            </Link>
          ))}
      </Menu>
    </Box>
  );
}
