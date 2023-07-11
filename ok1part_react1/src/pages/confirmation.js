import OutlinedForm from '@/components/outlined-form';
import MainLayout from '@/layouts/main-layout';
import onlyGuest from '@/utils/onlyGuest';
import { Box, Typography } from '@mui/material';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import Joi from 'joi';
import LoaderPrimary from '@/components/loader-primary';
import axios from 'axios';

function Confirmation() {
  const [formData, setFormData] = useState({});
  const [formData2, setFormData2] = useState({});
  const { query, isReady } = useRouter();
  const { token } = query;
  const [ready, setReady] = useState(false);
  const [tokenConfirmed, setTokenConfirmed] = useState(null); // false or string with the confirmed token

  const { t } = useTranslation();

  const defaultValues = {
    cToken: token,
  };

  const validators = {
    cToken: Joi.string(),
  };

  const validators2 = {
    newPassword: Joi.string().min(9),
    newPasswordConfirm: Joi.string(),
  };

  useEffect(() => {
    if (isReady) {
      setReady(true);
    }
  }, [isReady]);

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
      {ready && tokenConfirmed === null ? (
        <OutlinedForm.Form
          defaultValues={defaultValues}
          formDataState={{ formData, setFormData }}
        >
          <OutlinedForm.Header>
            <Box sx={{ mb: 2 }}>
              <Typography
                sx={{ textAlign: 'center', mb: 2 }}
                variant='h3'
                component='h1'
              >
                {t('Confirmation_title')}
              </Typography>
              <Box>
                <Typography variant='body1'>
                  {t('Confirmation_insert_token_text')}
                </Typography>
              </Box>
            </Box>
          </OutlinedForm.Header>
          <OutlinedForm.Control
            required
            label={t('Confirmation_token_input')}
            field='cToken'
          >
            <OutlinedForm.Label />
            <OutlinedForm.Input JOIValidator={validators.cToken} />
            <OutlinedForm.HelperText />
          </OutlinedForm.Control>
          <OutlinedForm.Submit
            title='submit'
            validators={validators}
            onSubmit={async (formData) => {
              // Test endpoint
              await axios.post(
                'http://localhost:9000/test/formdata',
                formData,
                {
                  headers: { 'Content-Type': 'multipart/form-data' },
                }
              );
            }}
            onSuccess={async (result) => {
              setTokenConfirmed(true);
            }}
            onError={async (error, setStatus) => {
              setStatus(error);
            }}
          />
        </OutlinedForm.Form>
      ) : (
        tokenConfirmed === null && <LoaderPrimary />
      )}
      {(tokenConfirmed === true || tokenConfirmed === false) && (
        <OutlinedForm.Form
          formDataState={{ formData: formData2, setFormData: setFormData2 }}
          autoFinalize
        >
          <OutlinedForm.Header>
            <Box sx={{ mb: 2 }}>
              <Typography
                sx={{ textAlign: 'center', mb: 2 }}
                variant='h3'
                component='h1'
              >
                {t('Confirmation_newPass')}
              </Typography>
              <Box>
                <Typography variant='body1'>
                  {t('Confirmation_newPass_text')}
                </Typography>
              </Box>
            </Box>
          </OutlinedForm.Header>
          <OutlinedForm.Control
            required
            label={t('Confirmation_newPass_input')}
            field='newPassword'
          >
            <OutlinedForm.Label />
            <OutlinedForm.Input
              JOIValidator={validators2.newPassword}
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
            label={t('Confirmation_confirmNewPass_input')}
            field='newPasswordConfirm'
            matchesPassword={'newPassword'}
          >
            <OutlinedForm.Label />
            <OutlinedForm.Input
              JOIValidator={validators2.newPasswordConfirm}
              inputProps={{ type: 'password' }}
            />
            <OutlinedForm.HelperText />
          </OutlinedForm.Control>
          <OutlinedForm.Submit
            title='submit'
            validators={validators2}
            onSubmit={async (formData) => {
              // Test endpoint
              await axios.post(
                'http://localhost:9000/test/formdata',
                formData,
                {
                  headers: { 'Content-Type': 'multipart/form-data' },
                }
              );
            }}
            onError={async (error, setStatus) => {
              setStatus(error);
            }}
          />
        </OutlinedForm.Form>
      )}
    </Box>
  );
}

Confirmation.getLayout = function getLayout(page) {
  return <MainLayout title='Email Confirmation'>{page}</MainLayout>;
};

export default onlyGuest(Confirmation);

export async function getStaticProps({ locale }) {
  return {
    props: {
      // not compatible with getInitialProps
      ...(await serverSideTranslations(locale, ['common', 'footer'])),
      // Will be passed to the page component as props
    },
  };
}
