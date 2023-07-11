import { Avatar } from '@mui/material';

export default function UserAvatar({ dark }) {
  return (
    <Avatar
      sx={{ color: 'text.primary' }}
      alt='User Avatar'
      src={dark ? '/user.png' : '/user_white.png'}
    />
  );
}
