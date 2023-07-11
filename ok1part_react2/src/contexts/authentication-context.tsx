import api, { instance, removeAccessToken } from '@/api';
import { Dispatch, createContext, useEffect, useState } from 'react';

interface IUserData {
  username: string | null;
  permissions: number | null;
  isDone: Boolean;
}

export const AuthenticationContext = createContext<null | {
  value: IUserData | null;
  setValue: Dispatch<IUserData>;
}>(null);

export const AuthenticationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [value, setValue] = useState<null | IUserData>(null);

  useEffect(() => {
    if (value === null && localStorage.getItem('accessToken') != null) {
      const username = localStorage.getItem('username');
      if (username) {
        instance
          .get(api.getPermissions)
          .then((res) => {
            const data = res.data;
            if (typeof data === 'number') {
              setValue((value) => ({
                username: username,
                permissions: data,
                isDone: true,
              }));
            }
          })
          .catch((err) => {
            // Debug: console.log('err auth', err);
            removeAccessToken();
            setValue({ username: null, permissions: null, isDone: true });
          });
      }
    } else {
      if (!value?.isDone) {
        setValue((value) => {
          if (value === null) {
            return { username: null, permissions: null, isDone: true };
          }

          return { ...value, isDone: true };
        });
      }
    }

    /*
    if (window && process?.env?.NODE_ENV)
      (window as any).setFakeToken = (token: string) => {
        if (value) setValue({ ...value, username: token });
      };
    if (window && process?.env?.NODE_ENV)
      (window as any).setRole = (role: number) => {
        if (value) setValue({ ...value, role });
      };
    */
  }, [value, setValue]);

  //console.log('updated');
  /*if (window && process?.env?.NODE_ENV)
    (window as any).setFakeToken = (token: string) => {
      if (value) setValue({ ...value, username: token, fakeToken: token });
    };*/

  return (
    <AuthenticationContext.Provider value={{ value, setValue }}>
      {children}
    </AuthenticationContext.Provider>
  );
};
