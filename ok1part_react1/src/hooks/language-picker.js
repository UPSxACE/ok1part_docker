import appConfig from '@/app-config';
import LanguageContext from '@/contexts/language-context';
import { useContext, useState } from 'react';

export default function useLanguagePicker() {
  const [anchorElLanguage, setAnchorElLanguage] = useState(null);
  const { currentLanguage, setLanguage } = useContext(LanguageContext);
  const languagesEnabled = Boolean(Object.keys(appConfig.languages).length > 1);

  function handleOpenLanguageMenu(event) {
    setAnchorElLanguage(event.currentTarget);
  }

  function handleCloseLanguageMenu() {
    setAnchorElLanguage(null);
  }

  return {
    anchorElLanguage,
    setAnchorElLanguage,
    currentLanguage,
    setLanguage,
    languagesEnabled,
    handleOpenLanguageMenu,
    handleCloseLanguageMenu,
  };
}
