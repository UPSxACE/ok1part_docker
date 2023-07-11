import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import getDashboardLayout from '@/utils/get-dashboard-layout';
import { Alert, Box, Typography } from '@mui/material';
import TForm from '@/components/common/dashboard/TForm';
import useInitForm from '@/components/common/dashboard/form-renderer/use-init-form';
import { FieldsArray } from '@/components/common/dashboard/form-renderer';
import Link from 'next/link';
import { useContext, useState } from 'react';
import LoaderPrimary from '@/components/common/loader-primary';
import { AnimatePresence, motion } from 'framer-motion';
import api, { instance, removeAccessToken } from '@/api';
import { useRouter } from 'next/router';
import { AuthenticationContext } from '@/contexts/authentication-context';
import { useTranslation } from 'next-i18next';

export default function Login() {
  const { t } = useTranslation();

  const fieldsArray: FieldsArray = [];
  const {
    formData,
    errors,
    addError,
    validation,
    generateFieldProps,
    generateTextHelperProps,
    onSubmit,
    currentQuestion,
    nextQuestion,
    previousQuestion,
    updateField,
  } = useInitForm({ fieldsArray: fieldsArray });

  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<null | string>(null);
  const router = useRouter();
  const authContext = useContext(AuthenticationContext);

  return (
    <Box
      sx={{
        flex: 1,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        //padding: { xs: 2, sm: 8, md: 14 },
      }}
    >
      <Box
        sx={{
          border: '1px solid #dadce0',
          minWidth: { xs: 0, sm: 500, lg: 600 },
          maxWidth: 600,
          padding: { xs: 4, sm: 6 },
          paddingY: { xs: 3, sm: 4 },
          backgroundColor: 'white',
          borderRadius: 2,
          position: 'relative',
        }}
      >
        <AnimatePresence>
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{
                opacity: 0.82,
                transition: {
                  ease: [0.12, 0, 0.39, 0], //'easeOut',
                  duration: 0.25,
                },
              }}
              style={{
                zIndex: 99,
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'black',
                //opacity: '82%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 2,
                //backdropFilter: 'blur(6px)',
              }}
              exit={{ opacity: 0 }}
            >
              <LoaderPrimary sx={{ color: 'white' }} />
            </motion.div>
          )}
        </AnimatePresence>

        <TForm.Form
          onSubmit={() => {
            setLoading(true);
            instance
              .post(api.postLogin, formData)
              .then((res) => {
                const data = res.data;
                setTimeout(() => {
                  localStorage.setItem('username', formData.login as string);
                  localStorage.setItem('accessToken', data.accessToken);
                  if (data?.accessToken) {
                    instance
                      .get(api.getPermissions)
                      .then((res) => {
                        const perms = res.data;
                        if (typeof perms === 'number') {
                          if (authContext) {
                            authContext.setValue({
                              username: formData.login as string,
                              permissions: perms as number,
                              isDone: true,
                            });
                          }
                        }
                      })
                      .catch((err) => {
                        console.log('err auth', err);
                        removeAccessToken();
                        if (authContext) {
                          authContext.setValue({
                            username: null,
                            permissions: null,
                            isDone: true,
                          });
                        }
                      });
                  }
                  router.push('/');
                }, 400);
              })
              .catch((err) => {
                setTimeout(() => {
                  setLoading(false);
                  if (
                    err?.response?.status === 400 ||
                    err?.response?.status === 401
                  ) {
                    setAlert('login:alert_wrong_credentials');
                  } else {
                    setAlert('login:alert_unexpected_error');
                  }
                }, 400);
              });
          }}
        >
          <Box sx={{}}>
            <Typography
              sx={{ textAlign: 'center' }}
              variant='h3'
              component='h1'
            >
              {t('login:title_login')}
            </Typography>
          </Box>
          {alert && (
            <Alert severity='error' sx={{ my: 1 }}>
              {t(alert)}
            </Alert>
          )}
          <TForm.ShortAnswer
            sx={{ paddingTop: 1 }}
            name='login'
            label={t('common:Username')}
            mode='answer'
            errors={errors}
            propsFunction={generateFieldProps}
          />
          <TForm.ShortAnswer
            sx={{ paddingTop: 1 }}
            name='password'
            label={t('common:Password')}
            mode='answer'
            errors={errors}
            propsFunction={generateFieldProps}
            inputProps={{ type: 'password' }}
          />
          <TForm.Submit sx={{ mt: 1.5, width: '100%', height: 48 }} />
          <Box
            sx={{
              display: 'flex',
              marginTop: 1,
              flexWrap: 'wrap',
              justifyContent: 'space-between',
            }}
          >
            <Link
              href='/register'
              className='noPurple'
              style={{
                textDecoration: 'none',
              }}
            >
              <Typography
                component='span'
                variant='body1'
                sx={{ color: '#0072e5', fontSize: '1.1rem', pr: 4 }}
              >
                {t('login:link_register')}
              </Typography>
            </Link>
            <Link
              href='/register'
              className='noPurple'
              style={{
                textDecoration: 'none',
                //marginLeft: 'auto',
              }}
            >
              <Typography
                component='span'
                variant='body1'
                sx={{ color: '#0072e5', fontSize: '1.1rem' }}
              >
                {t('login:link_forgot_password')}
              </Typography>
            </Link>
          </Box>
        </TForm.Form>
      </Box>
    </Box>
  );
}

Login.getLayout = (page: any) => getDashboardLayout(page);

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      // not compatible with getInitialProps
      ...(await serverSideTranslations(locale, ['common', 'login'])),
      // Will be passed to the page component as props
    },
  };
}
