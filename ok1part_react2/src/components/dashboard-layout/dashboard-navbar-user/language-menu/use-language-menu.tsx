import { useState } from 'react';

export default function useLanguageMenu() {
  const [anchorElLanguage, setAnchorElLanguage] = useState(null);
  //const { currentLanguage, setLanguage } = useContext(LanguageContext);
  //const languagesEnabled = Boolean(Object.keys(appConfig.languages).length > 1);

  function handleOpenLanguageMenu(event: any) {
    setAnchorElLanguage(event.currentTarget);
  }

  function handleCloseLanguageMenu() {
    setAnchorElLanguage(null);
  }

  return {
    anchorElLanguage,
    setAnchorElLanguage,
    //currentLanguage,
    //setLanguage,
    //languagesEnabled,
    handleOpenLanguageMenu,
    handleCloseLanguageMenu,
  };
}
