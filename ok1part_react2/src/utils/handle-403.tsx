import { removeAccessToken } from '@/api';
import { AxiosError, isCancel } from 'axios';
import { useRouter } from 'next/router';

export default function useHandle403() {
  const router = useRouter();

  return (err: AxiosError, throwBool?: boolean) => {
    if (err?.response?.status === 403) {
      removeAccessToken();
      router.push('/login');
      if (throwBool && !isCancel(err)) throw err; // experimental/dangerous change
    } else {
      if (throwBool && !isCancel(err)) throw err;
    }
  };
}
