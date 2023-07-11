import OutlinedForm from '@/components/outlined-form';
import authenticationContext from '@/contexts/authentication-context';
import MainLayout from '@/layouts/main-layout';
import onlyGuest from '@/utils/onlyGuest';
import { Alert, Box, Typography } from '@mui/material';
import { Inter } from '@next/font/google';
import Joi from 'joi';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import api from '@/api';
import useHandle403 from '@/utils/handle-403';

const inter = Inter({ subsets: ['latin'] });

function Login() {
  const [formData, setFormData] = useState({});
  const { t } = useTranslation();
  const router = useRouter();
  const { auth, setAuth } = useContext(authenticationContext);
  const [alert, setAlert] = useState(null);

  const validators = {
    username: Joi.string(),
    password: Joi.string(),
  };

  const handle403 = useHandle403();

  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 68px)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: { xs: 2, sm: 8, md: 14 },
      }}
    >
      <OutlinedForm.Form formDataState={{ formData, setFormData }}>
        <OutlinedForm.Header>
          <Box sx={{ mb: 2 }}>
            <Typography
              sx={{ textAlign: 'center', mb: 2 }}
              variant='h3'
              component='h1'
            >
              {t('Login')}
            </Typography>
            <Box>
              <Typography variant='body1'>{t('login_with_account')}</Typography>
            </Box>
          </Box>
          {alert && (
            <Alert severity='error' sx={{ marginBottom: 2 }}>
              {alert}
            </Alert>
          )}
        </OutlinedForm.Header>

        <OutlinedForm.Control required label={t('Username')} field='username'>
          <OutlinedForm.Label />
          <OutlinedForm.Input
            JOIValidator={validators.username}
            tooltip={{
              tip: t('tooltip_tip_username'),
              example: t('tooltip_example_username'),
            }}
          />
          <OutlinedForm.HelperText />
        </OutlinedForm.Control>

        <OutlinedForm.Control required label={t('password')} field='password'>
          <OutlinedForm.Label />
          <OutlinedForm.Input
            JOIValidator={validators.password}
            tooltip={{
              tip: t('tooltip_tip_password'),
              example: 'VerySafeP4ssw0rd##',
            }}
            inputProps={{ type: 'password' }}
          />
          <OutlinedForm.HelperText />
        </OutlinedForm.Control>

        <OutlinedForm.Submit
          title='submit'
          validators={validators}
          onSubmit={async () => {
            await api
              .login({
                login: formData.username.value,
                password: formData.password.value,
              })
              .then((response) => {
                const accessToken = response?.data?.accessToken;
                localStorage.setItem('accessToken', accessToken);
                router.push('/');
                //setAuth({ ...auth, authenticated: true });
              })
              .catch((err) => {
                handle403(err, true);
              });

            //router.push('/');
          }}
          onError={(error, setStatus) => {
            // Debug: console.log('ERR', error);
            if (error?.code === 'ERR_NETWORK') {
              setStatus(t('NETWORK_ERROR_DESCRIPTION'));
              return;
            }

            if (error?.response?.status) {
              const error_code = error?.response?.status;
              const error_data = error?.response?.data;

              // HANDLE ERROR CODES HERE
              if (error_code === 401) {
                const error_description = error_data?.errors?.[0];
                if (error_description) {
                  setAlert(t(error_description));
                  return;
                } else {
                  setAlert(t('e_client_usernameorpassword'));
                  return;
                }
              }
            }

            // Show unhandled error screen in case the function didn't return yet (error wasn't handled)
            setStatus(false);
          }}
        />

        <OutlinedForm.Footer>
          <Box sx={{ display: 'flex', justifyContent: 'center', pt: 1 }}>
            <Link
              className='noPurple'
              href='/register'
              style={{
                textDecoration: 'none',
                paddingRight: 12,
              }}
            >
              <Typography
                sx={{ color: 'primary.links' }}
                component='span'
                variant='body1'
              >
                {t('no_account_yet')}
              </Typography>
            </Link>

            <Link
              href='/register'
              className='noPurple'
              style={{
                textDecoration: 'none',
                marginLeft: 'auto',
                paddingLeft: 12,
              }}
            >
              <Typography
                sx={{ color: 'primary.links' }}
                component='span'
                variant='body1'
              >
                {t('forgot_password')}
              </Typography>
            </Link>
          </Box>
        </OutlinedForm.Footer>
      </OutlinedForm.Form>
    </Box>
  );
}

Login.getLayout = function getLayout(page) {
  return <MainLayout title='Login'>{page}</MainLayout>;
};

export default onlyGuest(Login);

export async function getStaticProps({ locale }) {
  return {
    props: {
      // not compatible with getInitialProps
      ...(await serverSideTranslations(locale, ['common', 'footer'])),
      // Will be passed to the page component as props
    },
  };
}
