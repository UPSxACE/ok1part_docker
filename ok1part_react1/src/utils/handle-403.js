import { removeAccessToken } from '@/api';
import { isCancel } from 'axios';
import { useRouter } from 'next/router';

export default function useHandle403() {
  const router = useRouter();

  return (err, throwBool) => {
    if (err?.response?.status === 403 || err?.response?.status === 401) {
      removeAccessToken();
      router.push('/login');
      if (throwBool && !isCancel(err)) throw err; // experimental/dangerous change
    } else {
      if (throwBool && !isCancel(err)) throw err;
    }
  };
}
