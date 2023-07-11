import { IconButton, Tooltip } from '@mui/material';
import { LanguageIcon } from './language-icon';
import appConfig from '@/app-config';
import { useContext } from 'react';
import { LanguageContext } from '@/contexts/language-context';

export default function LanguagePicker({
  iconButtonStyle = {},
  languageIconStyle = {},
  onClick = () => {},
  state,
}: any) {
  const languageContext = useContext(LanguageContext);
  const currentLanguageObj =
    appConfig.languages && languageContext?.language
      ? appConfig.languages?.[languageContext?.language]
      : null;

  if (currentLanguageObj === null) {
    return null;
  }

  return (
    <Tooltip title='Change Language'>
      <IconButton
        onClick={onClick}
        sx={{ p: 0, height: 52, width: 52, ...iconButtonStyle }}
      >
        <LanguageIcon
          name={currentLanguageObj.name}
          imgPath={currentLanguageObj.flagPath}
          sx={{ ...languageIconStyle }}
        />
      </IconButton>
    </Tooltip>
  );
}
