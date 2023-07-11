import OutlinedForm from '@/components/outlined-form';
import MainLayout from '@/layouts/main-layout';
import onlyGuest from '@/utils/onlyGuest';
import { Alert, Box, Typography } from '@mui/material';
import { Inter } from '@next/font/google';
import Joi from 'joi';
import Link from 'next/link';
import { useState } from 'react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import api from '@/api';
import useHandle403 from '@/utils/handle-403';

const inter = Inter({ subsets: ['latin'] });
function Register() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({});
  const [alert, setAlert] = useState(null);

  const validators = {
    username: Joi.string().min(6),
    cname: Joi.string().min(3),
    email: Joi.string().email({ tlds: { allow: false } }),
    //cid: Joi.number(),
    password: Joi.string().min(9),
    cpassword: Joi.string(),
    websiteColor: Joi.any(),
    websiteLogo: Joi.any(),
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
              {t('Register')}
            </Typography>
            <Box>
              <Typography variant='body1'>
                {t('create_your_account')}
              </Typography>
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
            tooltip={{
              tip: t('tooltip_tip_username'),
            }}
            JOIValidator={validators.username}
          />
          <OutlinedForm.HelperText />
        </OutlinedForm.Control>

        <OutlinedForm.Control required label={t('CompanyName')} field='cname'>
          <OutlinedForm.Label />
          <OutlinedForm.Input
            tooltip={{
              tip: t('tooltip_tip_companyName'),
            }}
            JOIValidator={validators.cname}
          />
          <OutlinedForm.HelperText />
        </OutlinedForm.Control>

        <OutlinedForm.Control required label={t('EmailAddress')} field='email'>
          <OutlinedForm.Label />
          <OutlinedForm.Input
            JOIValidator={validators.email}
            tooltip={{
              tip: t('tooltip_tip_email'),
              example: 'example@example.com',
            }}
          />
          <OutlinedForm.HelperText />
        </OutlinedForm.Control>

        {/*
        <OutlinedForm.Control required label={t('companyID')} field='cid'>
          <OutlinedForm.Label />
          <OutlinedForm.Input
            JOIValidator={validators.cid}
            tooltip={{
              tip: t('tooltip_tip_companyID'),
              example: '000-000-000-000',
            }}
          />
          <OutlinedForm.HelperText />
        </OutlinedForm.Control>
        */}
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

        <OutlinedForm.Control
          required
          label={t('confirmpassword')}
          field='cpassword'
          matchesPassword={'password'}
        >
          <OutlinedForm.Label />
          <OutlinedForm.Input
            JOIValidator={validators.cpassword}
            tooltip={{
              tip: t('tooltip_tip_password'),
              example: 'VerySafeP4ssw0rd##',
            }}
            inputProps={{ type: 'password' }}
          />
          <OutlinedForm.HelperText />
        </OutlinedForm.Control>

        {/*
        <OutlinedForm.Control
          required
          label={t('websiteColor')}
          field='websiteColor'
        >
          <OutlinedForm.ColorPicker
            defaultColor={themeConfig.palette.primary.special1}
            tooltip={{
              tip: t('tooltip_tip_websiteColor'),
            }}
          />
        </OutlinedForm.Control>

        <OutlinedForm.Control
          required
          label={t('websiteLogo')}
          field='websiteLogo'
        >
          <OutlinedForm.ImageUploader
            backgroundSwitcher
            defaultImage={true}
            tooltip={{
              tip: t('tooltip_tip_websiteLogo'),
            }}
            description={
              <>
                {formData['websiteLogo'] &&
                  formData['websiteLogo']['value'] && (
                    <OutlinedForm.Text>
                      {t('register_if_image_white')}
                    </OutlinedForm.Text>
                  )}
              </>
            }
          />
          <OutlinedForm.HelperText />
        </OutlinedForm.Control>*/}

        <OutlinedForm.Submit
          title={t('submit')}
          validators={validators}
          onSubmit={async () => {
            await api
              .register({
                //id: Number(formData.cid.value),
                //companyIdentifier: formData.cname.value, // convert to number
                username: formData.username.value,
                email: formData.email.value,
                company_name: formData.cname.value,
                password: formData.password.value,
                //color: '#AAAA',
                //logoPath: 'Aaa',
              })
              .then((response) => {
                // Debug: console.log('RESPONSE', response);
              })
              .catch((err) => {
                handle403(err, true);
              });

            //router.push('/');
          }}
          onError={(error, setStatus) => {
            // Debug:
            // console.log('ERR', error);
            if (error?.code === 'ERR_NETWORK') {
              setStatus(t('NETWORK_ERROR_DESCRIPTION'));
              return;
            }

            if (error?.response?.status) {
              const error_code = error?.response?.status;
              const error_data = error?.response?.data;

              // HANDLE ERROR CODES HERE
              if (error_code === 400) {
                const error_description = error_data?.errors?.[0];
                //if (error_description === 'usernameOrPassword') {
                setAlert(t('login_wrongcredentials_error'));
                return;
                //}
              }

              if (error_code === 409) {
                const error_description = error_data?.errors?.[0];
                if (error_description) {
                  setAlert(t(error_description));
                  return;
                } else {
                  setAlert(t('e_client_useroremailalreadyexists'));
                  return;
                }
              }
            }
            // Show unhandled error screen in case the function didn't return yet (error wasn't handled)
            setStatus(false);
          }}
          onSuccess={(_, setFormStatus) => setFormStatus(true)}
        />

        <OutlinedForm.Footer>
          <Box style={{ display: 'flex', justifyContent: 'center' }}>
            <Link
              href='/login'
              style={{
                textDecoration: 'none',
                paddingTop: 12,
              }}
            >
              <Typography sx={{ color: '#0072e5' }} component='span'>
                {t('account_already')}
              </Typography>
            </Link>
          </Box>
        </OutlinedForm.Footer>
      </OutlinedForm.Form>
    </Box>
  );
}

Register.getLayout = function getLayout(page) {
  return <MainLayout title='Register'>{page}</MainLayout>;
};

export default onlyGuest(Register);

export async function getStaticProps({ locale }) {
  return {
    props: {
      // not compatible with getInitialProps
      ...(await serverSideTranslations(locale, ['common', 'footer'])),
      // Will be passed to the page component as props
    },
  };
}
