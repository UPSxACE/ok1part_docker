import { removeAccessToken } from '@/api';
import { useRouter } from 'next/router';

export default function Logout() {
  const router = useRouter();
  // Make sure we're in the browser
  if (typeof window !== 'undefined') {
    removeAccessToken();
    router.push('/');
  }
}
