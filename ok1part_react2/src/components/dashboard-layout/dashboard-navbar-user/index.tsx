import { removeAccessToken } from '@/api';
import appConfig from '@/app-config';
import UserAvatar from '@/components/common/user-avatar';
import { AuthenticationContext } from '@/contexts/authentication-context';
import { IconButton, Menu, MenuItem, Tooltip, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext, useState } from 'react';
import LanguagePicker from './language-picker';
import useLanguageMenu from './language-menu/use-language-menu';
import LanguageMenu from './language-menu';

export default function DashboardNavbarUser() {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  function handleOpenUserMenu(event: React.MouseEvent<HTMLElement>) {
    setAnchorElUser(event.currentTarget);
  }

  function handleCloseUserMenu() {
    setAnchorElUser(null);
  }

  const authContext = useContext(AuthenticationContext);

  const router = useRouter();

  const languageMenuConfig = useLanguageMenu();

  return (
    <Box
      sx={{
        boxShadow: '0px 1px 3px #00000040;',
        height: 70,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        paddingX: 1.5,
        backgroundColor: 'theme1.components2',
        position: 'sticky',
        top: 0,
        zIndex: 10,
      }}
    >
      <Box
        sx={{
          display: 'flex',
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
      <Box sx={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
        {authContext?.value?.username && (
          <Typography
            component='span'
            variant='h6'
            sx={{ fontSize: '1.1rem', pt: 0.25 }}
          >
            {authContext?.value?.username}
          </Typography>
        )}
        <LanguagePicker onClick={languageMenuConfig.handleOpenLanguageMenu} />
        <LanguageMenu config={languageMenuConfig} />
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
        {authContext?.value?.isDone && !authContext?.value?.username
          ? [
              <Link key={0} href={'/login'} onClick={handleCloseUserMenu}>
                <MenuItem>
                  <Typography>Login</Typography>
                </MenuItem>
              </Link>,
            ]
          : [
              <a
                key={1}
                href={'/'}
                onClick={(e) => {
                  handleCloseUserMenu();
                  removeAccessToken();
                  if (authContext) {
                    authContext.setValue({
                      username: null,
                      permissions: null,
                      isDone: true,
                    });
                  }
                }}
              >
                <MenuItem>
                  <Typography>Logout</Typography>
                </MenuItem>
              </a>,
            ]}
      </Menu>
    </Box>
  );
}
