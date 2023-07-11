import api from '@/api';
import { useRouter } from 'next/router';
import useSWR from 'swr';
export default function useQuery(url: string) {
  const router = useRouter();
  const {
    data: response,
    isLoading,
    error,
    mutate,
    isValidating,
  } = useSWR([url], ([url]) =>
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
