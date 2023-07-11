import BootstrapForm from '@/components/bootstrap-form';
import { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import themeConfig from '@/theme-config';
import axios from 'axios';
import Joi from 'joi';
import useClientSide from '@/hooks/client-side';
import { Alert, Box } from '@mui/material';
import api from '@/api';
import LoaderPrimary from '@/components/loader-primary';
import useHandle403 from '@/utils/handle-403';

export default function CompanySettingsForm() {
  const [formData, setFormData] = useState({});
  const [alert, setAlert] = useState(null);
  const { t } = useTranslation();
  const [defaultValues, setDefaultValues] = useState(false); // false means the data needed didn't arrive yet
  const [dataArrived, setDataArrived] = useState(false);

  // Debug: console.log(formData);

  const handle403 = useHandle403();

  useEffect(() => {
    const source = axios.CancelToken.source();

    const sendRequest = async () => {
      await api
        .getCompanySettings({
          cancelToken: source.token,
        })
        .then((response) => {
          const data = response?.data;
          if (data) {
            setDefaultValues({ ...data, companyLogo: '...' });
          }
        })
        .catch((error) => {
          handle403(error);
        });
    };

    sendRequest();

    return () => {
      source.cancel('Component Unmounted', { silent: 'true' }); // Component Unmounted
    };
  }, []);

  useEffect(() => {
    if (defaultValues !== false) {
      setDataArrived(true);
    }
  }, [defaultValues]);

  const validators = {
    companyEmail: Joi.string().email({ tlds: { allow: false } }),
    //password: Joi.string().min(9),
    //newPasswordConfirm: Joi.string(),
    subdomain: Joi.string().max(32),
    companyName: Joi.any(),
    companyColor: Joi.any(),
    companyLogo: Joi.any(),
  };

  const { serverIsDone } = useClientSide();

  if (!serverIsDone) {
    return;
  }

  // Debug: console.log(formData);

  if (!dataArrived) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          py: 2,
        }}
      >
        <LoaderPrimary />
      </Box>
    );
  }

  return (
    <BootstrapForm.Form
      key={dataArrived}
      defaultValues={defaultValues}
      formDataState={{ formData, setFormData }}
      fullWidth
      style={{
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 0,
        border: 0,
      }}
    >
      <BootstrapForm.Header>
        {alert && (
          <Alert severity='success' sx={{ marginBottom: 2 }}>
            {alert}
          </Alert>
        )}
      </BootstrapForm.Header>
      <BootstrapForm.Control label={t('CompanyName')} field='companyName'>
        <BootstrapForm.Label />
        <BootstrapForm.Input
          //readOnly
          JOIValidator={validators.companyName}
          tooltip={{
            tip: t('companysettings_tooltip_tip_companyname'),
            example: 'companysettings_tooltip_example_companyname',
          }}
        />
        <BootstrapForm.HelperText />
      </BootstrapForm.Control>
      {/*
      <BootstrapForm.Control label={t('CompanyID')} field='companyId'>
        <BootstrapForm.Label />
        <BootstrapForm.Input
          readOnly
          tooltip={{
            tip: t('companysettings_tooltip_tip_companyid'),
            example: 'companysettings_tooltip_example_companyid',
          }}
        />
        <BootstrapForm.HelperText />
      </BootstrapForm.Control> 
      */}
      <BootstrapForm.Control label={t('EmailAddress')} field='companyEmail'>
        <BootstrapForm.Label />
        <BootstrapForm.Input
          JOIValidator={validators.companyEmail}
          tooltip={{
            tip: t('companysettings_tooltip_tip_email'),
            example: 'companysettings_tooltip_example_email',
          }}
        />
        <BootstrapForm.HelperText />
      </BootstrapForm.Control>
      {/*
      <BootstrapForm.Control label={t('newPassword')} field='password'>
        <BootstrapForm.Label />
        <BootstrapForm.Input
          tooltip={{
            tip: t('tooltip_tip_newPassword'),
            example: t('tooltip_example_newPassword'),
          }}
          JOIValidator={validators.password}
          inputProps={{ type: 'password' }}
        />
        <BootstrapForm.HelperText />
      </BootstrapForm.Control>
      <BootstrapForm.Control
        label={t('confirmNewPassword')}
        field='newPasswordConfirm'
        matchesPassword={'password'}
      >
        <BootstrapForm.Label />
        <BootstrapForm.Input
          JOIValidator={validators.newPasswordConfirm}
          inputProps={{ type: 'password' }}
          tooltip={{
            tip: t('tooltip_tip_confirmNewPassword'),
            example: t('tooltip_example_confirmNewPassword'),
          }}
        />
        <BootstrapForm.HelperText />
      </BootstrapForm.Control>*/}

      <BootstrapForm.TwoHalfs fields={['companyColor', 'companyLogo']}>
        <BootstrapForm.Control
          half
          required
          label={t('websiteColor')}
          field='companyColor'
        >
          <BootstrapForm.ColorPicker
            defaultColor={themeConfig.palette.primary.special1}
            tooltip={{
              tip: t('companysettings_tooltip_tip_websiteColor'),
            }}
            containerStyle={{ paddingRight: 2 }}
          />
        </BootstrapForm.Control>

        <BootstrapForm.Control
          half
          required
          label={t('websiteLogo')}
          field='companyLogo'
        >
          <BootstrapForm.ImageUploader
            backgroundSwitcher
            defaultImage={true}
            tooltip={{
              tip: t('companysettings_tooltip_tip_websiteLogo'),
            }}
            description={
              <>
                {formData['logoPath'] && formData['logoPath']['value'] && (
                  <BootstrapForm.Text containerStyle={{ mt: 1 }}>
                    {t('register_if_image_white')}
                  </BootstrapForm.Text>
                )}
              </>
            }
            containerStyle={{ paddingLeft: 2 }}
          />
          <BootstrapForm.HelperText />
        </BootstrapForm.Control>
      </BootstrapForm.TwoHalfs>
      <BootstrapForm.Control label={t('Domain')} field='subdomain' required>
        <BootstrapForm.Label />
        <BootstrapForm.BootstrapFillInput
          text={'.ok1st.com'}
          JOIValidator={validators.subdomain}
          tooltip={{
            tip: t('companysettings_tooltip_tip_domain'),
            example: t('companysettings_tooltip_example_domain'),
          }}
        />
        <BootstrapForm.HelperText />
      </BootstrapForm.Control>
      <BootstrapForm.Submit
        alignRight
        title={t('settings_accordionform_save')}
        validators={validators}
        containerStyle={{ marginTop: 'auto' }}
        onSubmit={async () => {
          setAlert(null);
          await api
            .updateCompanySettings({
              companyName: formData.companyName.value,
              companyColor: formData.companyColor.value,
              companyEmail: formData.companyEmail.value,
              subdomain: formData.subdomain.value,
            })
            .then((response) => {
              setAlert(t('company_settings_updated'));
            })
            .catch((err) => {
              handle403(err, true);
            });
        }}
        onError={(err) => {
          console.log(err);
        }}
      />
    </BootstrapForm.Form>
  );
}
