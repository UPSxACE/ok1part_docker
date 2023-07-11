import { useRouter } from 'next/router';

function RedirectLogin() {
  const router = useRouter();
  // Make sure we're in the browser
  if (typeof window !== 'undefined') {
    router.push('/login');
  }
}

export default RedirectLogin;
