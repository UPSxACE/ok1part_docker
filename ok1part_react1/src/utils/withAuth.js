import RedirectLogin from '@/utils/redirect-login';
import authenticationContext from '@/contexts/authentication-context';
import Home from '@/pages';
import { redirect } from 'next/dist/server/api-utils';
import { useRouter } from 'next/router';
import { useContext } from 'react';

const withAuth = (Component) => {
  const Auth = (props) => {
    const router = useRouter();
    // Login data added to props via redux-store (or use react context for example)
    const { auth } = useContext(authenticationContext);

    // If user is not logged in, return login component
    if (!auth.authenticated) {
      return <RedirectLogin />;
    }

    const getLayout = Component.getLayout || ((page) => page);

    // If user is logged in, return original component
    return <>{getLayout(<Component {...props} />)}</>;
  };

  // Copy getInitial props so it will run as well
  if (Component.getInitialProps) {
    Auth.getInitialProps = Component.getInitialProps;
  }

  return Auth;
};

export default withAuth;
