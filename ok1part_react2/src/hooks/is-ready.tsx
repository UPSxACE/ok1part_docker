import { useEffect, useState } from 'react';

export default function useIsReady(
  promise: (isReady: Function) => Promise<void>
) {
  const [ready, setReady] = useState(false);

  function isReady() {
    setReady(true);
  }

  useEffect(() => {
    promise(isReady);
  }, []);

  return {
    ready,
  };
}
