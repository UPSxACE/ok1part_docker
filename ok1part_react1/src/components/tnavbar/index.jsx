import appConfig from '@/app-config';
import { Adb, LogoDev } from '@mui/icons-material';
import {
  AppBar,
  Avatar,
  Box,
  Container,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import { motion, useMotionValueEvent } from 'framer-motion';
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import PageLink from './page-link';
import { useScroll } from 'framer-motion';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import LanguageContext from '@/contexts/language-context';
import Link from 'next/link';
import { useRouter } from 'next/router';
import themeConfig from '@/theme-config';
import UserAvatar from '../user-avatar';
import LanguagePicker, { LanguageIcon, LanguageMenu } from '../language-picker';
import useLanguagePicker from '@/hooks/language-picker';
import useUserOptions from '@/hooks/user-options';
import useClientSide from '@/hooks/client-side';

export default function TNavBar({
  children,
  transparentBar = false,
  ...props
}) {
  const { serverIsDone } = useClientSide();
  const [anchorElNav, setAnchorElNav] = useState(null);

  const [color, setColor] = useState(!transparentBar);
  const { t } = useTranslation();

  const { scrollYProgress } = useScroll();

  useMotionValueEvent(scrollYProgress, 'change', (last) => {
    if (transparentBar) last > 0.01 ? setColor(true) : setColor(false);
  });

  const router = useRouter();

  const {
    anchorElLanguage,
    currentLanguage,
    setLanguage,
    languagesEnabled,
    handleOpenLanguageMenu,
    handleCloseLanguageMenu,
  } = useLanguagePicker();

  const { anchorElUser, handleOpenUserMenu, handleCloseUserMenu, userAccess } =
    useUserOptions();

  return (
    <AppBar
      position='sticky'
      sx={{
        fontSize: 0,
        background: color
          ? `linear-gradient(${themeConfig.palette.primary.gradientAngle}deg, ${themeConfig.palette.primary.special1} 0%, ${themeConfig.palette.primary.special2} 100%)`
          : 'transparent',
        /*backgroundColor: color
          ? 'primary.components'
          : 'rgba(0,0,0,0)' /*primary.components,*/
        boxShadow: 0,
      }}
    >
      <Container maxWidth='xl'>
        <Toolbar sx={{ paddingY: 1 }} disableGutters>
          {/* Menu Options XS */}
          <Box
            sx={{
              flex: 1,
              display: {
                xs: 'flex',
                md: 'none',
              },
            }}
          >
            <IconButton
              size='large'
              aria-label='menu'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleOpenNavMenu}
              color='inherit'
              sx={{ height: 52, width: 52 }}
            >
              <MenuIcon sx={{ color: 'text.primary' }} />
            </IconButton>
            <Menu
              disableScrollLock={true}
              id='menu-appbar'
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {renderPagesMenu()}
            </Menu>
            <Link
              href='/#page-start'
              style={{
                marginLeft: 'auto',
                marginRight:
                  languagesEnabled || userAccess ? 'auto' : 'initial',
              }}
              scroll={false}
            >
              {appConfig.logo ? (
                <Image
                  width={125}
                  height={52}
                  alt='Company logo'
                  src={appConfig.logo}
                />
              ) : (
                <LogoDev
                  sx={{
                    fontSize: 52,
                    textDecoration: 'none',
                    color: 'text.primary',
                  }}
                />
              )}
            </Link>
            {languagesEnabled && (
              <LanguagePicker
                state={{ currentLanguage, setLanguage }}
                onClick={handleOpenLanguageMenu}
              />
            )}
            {userAccess && (
              <Tooltip title='User Options'>
                <IconButton
                  onClick={handleOpenUserMenu}
                  sx={{ p: 0, height: 52, width: 52 }}
                >
                  <UserAvatar />
                </IconButton>
              </Tooltip>
            )}
            <LanguageMenu
              anchorElLanguage={anchorElLanguage}
              handleCloseLanguageMenu={handleCloseLanguageMenu}
              setLanguage={setLanguage}
            />
          </Box>
          {/* Menu Options MD */}
          <Box
            sx={{
              flex: 1,
              display: { xs: 'none', md: 'flex', alignItems: 'center' },
            }}
          >
            <Link href='/#page-start' scroll={false}>
              {appConfig.logo ? (
                <Image
                  width={125}
                  height={52}
                  alt='Company logo'
                  src={appConfig.logo}
                  style={{ marginRight: 16 }}
                />
              ) : (
                <LogoDev
                  sx={{
                    mr: 2,
                    fontSize: 52,
                    textDecoration: 'none',
                    color: 'text.primary',
                  }}
                />
              )}
            </Link>
            {renderPages()}
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
            {/* User Icon/Avatar */}
            {userAccess && (
              <Tooltip title='User Options'>
                <IconButton
                  onClick={handleOpenUserMenu}
                  sx={{
                    p: 0,
                    height: 52,
                    width: 52,
                    marginLeft: !languagesEnabled ? 'auto' : 0,
                  }}
                >
                  <UserAvatar />
                </IconButton>
              </Tooltip>
            )}
            {/* User Options Menu */}
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
                generateUserOptions().map((page, index) => (
                  <Link
                    key={index}
                    style={{ textDecoration: 'none' }}
                    href={page.route}
                    onClick={handleCloseUserMenu}
                  >
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Typography color='text.secondary' textAlign='center'>
                        {t(page.name)}
                      </Typography>
                    </MenuItem>
                  </Link>
                ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );

  function handleOpenNavMenu(event) {
    setAnchorElNav(event.currentTarget);
  }

  function handleCloseNavMenu() {
    setAnchorElNav(null);
  }

  function renderPages() {
    return appConfig.pages.map((page, index) => (
      <PageLink route={page.route} pageName={page.name} key={index} />
    ));
  }

  function renderPagesMenu() {
    return appConfig.pages.map((page, index) => (
      <MenuItem key={index} onClick={handleCloseNavMenu}>
        <PageLink secondary route={page.route} pageName={page.name} />
      </MenuItem>
    ));
  }

  function generateUserOptions() {
    if (localStorage.getItem('accessToken')) {
      return appConfig.userOptionsMenuLoggedIn;
    } else {
      return appConfig.usersOptionsMenu;
    }
  }
}
