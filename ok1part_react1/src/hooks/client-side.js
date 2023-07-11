import { Fragment, useEffect, useState } from 'react';

export default function useClientSide() {
  const [serverIsDone, setServerIsDone] = useState(false);

  useEffect(() => {
    setServerIsDone(true);
  }, []);

  return { serverIsDone };
}
