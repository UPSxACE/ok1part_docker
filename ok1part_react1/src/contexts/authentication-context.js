import appConfig from '@/app-config';
import { createContext } from 'react';

const authenticationContext = createContext({
  authToken: null,
  authenticated: null,
  role: null, // admin, guest...?
  //setXYZ: (XYZ) => {},
});

/*

*/

export default authenticationContext;
