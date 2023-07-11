import api from '@/api';
import { useRouter } from 'next/router';
import useSWRImmutable from 'swr/immutable';

export default function useQueryImmutable(url: string) {
  const router = useRouter();
  const {
    data: response,
    isLoading,
    error,
    mutate,
    isValidating,
  } = useSWRImmutable([url], ([url]) =>
    api.fetcher(url).catch((err) => {
      console.log(err);
      if (err?.response?.status === 401) {
        router.push('/login');
      }
      throw err;
      // Debug: console.log(err);
    })
  );

  return {
    response,
    isLoading,
    error,
    mutate,
    isValidating,
  };
}
