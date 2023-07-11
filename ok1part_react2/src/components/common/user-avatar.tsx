import { Avatar } from '@mui/material';

export default function UserAvatar({ dark }: { dark?: Boolean }) {
  return (
    <Avatar
      sx={{ color: 'text.primary' }}
      alt='User Avatar'
      src={dark ? '/user.png' : '/user_white.png'}
    />
  );
}
