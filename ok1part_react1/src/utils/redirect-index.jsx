import { useRouter } from 'next/router';

function RedirectIndex() {
  const router = useRouter();
  // Make sure we're in the browser
  if (typeof window !== 'undefined') {
    router.push('/');
  }
}

export default RedirectIndex;
