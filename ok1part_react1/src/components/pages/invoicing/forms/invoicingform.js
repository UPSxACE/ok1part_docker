import BootstrapForm from '@/components/bootstrap-form';
import { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import themeConfig from '@/theme-config';
import axios from 'axios';
import Joi from 'joi';
import useHandle403 from '@/utils/handle-403';
import api from '@/api';
import { Alert, Box } from '@mui/material';
import LoaderPrimary from '@/components/loader-primary';

export default function InvoicingForm({ shadow }) {
  const [formData, setFormData] = useState({});
  const [alert, setAlert] = useState(null);
  const [countries, setCountries] = useState([]);
  const [selectInitialized, setSelectInitialized] = useState(false);

  const [defaultValues, setDefaultValues] = useState(false); // false means the data needed didn't arrive yet
  const handle403 = useHandle403();
  const [dataArrived, setDataArrived] = useState(false);

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
            setDefaultValues({ ...data });
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

  useEffect(() => {
    const source = axios.CancelToken.source();

    axios
      .get('https://restcountries.com/v3.1/all?fields=name', {
        cancelToken: source.token,
      })
      .then((response) => {
        setCountries(response.data);
        setSelectInitialized(true);
      })
      .catch((error) => {
        if (axios.isCancel(error)) {
          // Request was cancelled
        } else {
          // Handle error
        }
      });

    return () => {
      source.cancel('Component Unmounted', { silent: 'true' }); // Component Unmounted
    };
  }, []);

  const { t } = useTranslation();

  const validators = {
    companyNumber: Joi.number(),
    companyStreet: Joi.string(),
    companyStreet2: Joi.string(),
    companyCity: Joi.string(),
    companyRegion: Joi.string(),
    companyPostal: Joi.string(),
    companyCountry: Joi.string(),
  };

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
      //autoFinalize
      defaultValues={defaultValues}
      formDataState={{ formData, setFormData }}
      fullWidth
      style={{
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 0,
        border: 0,
        boxShadow: shadow
          ? themeConfig.palette.primary.dashboardShadow
          : 'none',
      }}
    >
      <BootstrapForm.Header>
        {alert && (
          <Alert severity='success' sx={{ marginBottom: 2 }}>
            {alert}
          </Alert>
        )}
      </BootstrapForm.Header>
      <BootstrapForm.Control label={t('VatNumber')} field='companyNumber'>
        <BootstrapForm.Label />
        <BootstrapForm.Input
          JOIValidator={validators.companyNumber}
          tooltip={{
            tip: t('invoicing_tooltip_tip_vatnumber'),
            example: t('invoicing_tooltip_example_vatnumber'),
          }}
        />
        <BootstrapForm.HelperText />
      </BootstrapForm.Control>

      <BootstrapForm.Control label={t('Street1')} field='companyStreet'>
        <BootstrapForm.Label />
        <BootstrapForm.Input
          JOIValidator={validators.companyStreet}
          tooltip={{
            tip: t('invoicing_tooltip_tip_street1'),
            example: t('invoicing_tooltip_example_street1'),
          }}
        />
        <BootstrapForm.HelperText />
      </BootstrapForm.Control>

      <BootstrapForm.Control label={t('Street2')} field='companyStreet2'>
        <BootstrapForm.Label />
        <BootstrapForm.Input
          JOIValidator={validators.companyStreet2}
          tooltip={{
            tip: t('invoicing_tooltip_tip_street2'),
            example: t('invoicing_tooltip_example_street2'),
          }}
        />
        <BootstrapForm.HelperText />
      </BootstrapForm.Control>

      <BootstrapForm.Control label={t('City')} field='companyCity'>
        <BootstrapForm.Label />
        <BootstrapForm.Input
          JOIValidator={validators.companyCity}
          tooltip={{
            tip: t('invoicing_tooltip_tip_city'),
            example: t('invoicing_tooltip_example_city'),
          }}
        />
        <BootstrapForm.HelperText />
      </BootstrapForm.Control>

      <BootstrapForm.Control label={t('Region')} field='companyRegion'>
        <BootstrapForm.Label />
        <BootstrapForm.Input
          JOIValidator={validators.companyRegion}
          tooltip={{
            tip: t('invoicing_tooltip_tip_region'),
            example: t('invoicing_tooltip_example_region'),
          }}
        />
        <BootstrapForm.HelperText />
      </BootstrapForm.Control>

      <BootstrapForm.Control label={t('PostalCode')} field='companyPostal'>
        <BootstrapForm.Label />
        <BootstrapForm.Input
          JOIValidator={validators.companyPostal}
          tooltip={{
            tip: t('invoicing_tooltip_tip_postalcode'),
            example: t('invoicing_tooltip_example_postalcode'),
          }}
        />
        <BootstrapForm.HelperText />
      </BootstrapForm.Control>

      <BootstrapForm.Control label={t('country')} field='companyCountry'>
        <BootstrapForm.Label />
        <BootstrapForm.Select
          JOIValidator={validators.companyCountry}
          tooltip={{
            tip: t('invoicing_tooltip_tip_country'),
            example: t('invoicing_tooltip_example_country'),
          }}
          nestedProperty={'name.common'}
          options={countries}
          initialized={selectInitialized}
          orderData
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
              companyNumber: formData.companyNumber.value,
              companyStreet: formData.companyStreet.value,
              companyStreet2: formData.companyStreet2.value,
              companyCity: formData.companyCity.value,
              companyRegion: formData.companyRegion.value,
              companyPostal: formData.companyPostal.value,
              companyCountry: formData.companyCountry.value,
            })
            .then((response) => {
              //Debug: console.log(response);
              setAlert(t('company_settings_updated'));
            })
            .catch((err) => {
              handle403(err, true);
            });
        }}
      />
    </BootstrapForm.Form>
  );
}
