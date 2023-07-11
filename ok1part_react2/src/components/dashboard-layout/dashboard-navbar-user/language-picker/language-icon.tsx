import { Avatar } from '@mui/material';

export function LanguageIcon({ name, imgPath, small = false }: any) {
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
