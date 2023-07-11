import appConfig from '@/app-config';
import { useContext, useState } from 'react';

export default function useUserOptions() {
  const [anchorElUser, setAnchorElUser] = useState(null);

  function handleOpenUserMenu(event) {
    setAnchorElUser(event.currentTarget);
  }

  function handleCloseUserMenu() {
    setAnchorElUser(null);
  }

  const userAccess = appConfig.userAccess;

  return {
    userAccess,
    anchorElUser,
    setAnchorElUser,
    handleOpenUserMenu,
    handleCloseUserMenu,
  };
}
