import DashboardWrapper from '@/components/dashboard-wrapper';
import DashboardLayout from '@/layouts/dashboard-layout';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import DashboardPageHeader from '@/components/dashboard-page-header';
import { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { Box } from '@mui/material';
import Joi from 'joi';
import AccordionForm from '@/components/accordion-form';
import CompanySettingsForm from '@/components/pages/settings/forms/companysettingsform';
import DefaultCycleSettings from '@/components/pages/settings/defaultcyclesettings';
import AdvancedSettings from '@/components/pages/settings/advancedsettings';
import requestIp from 'request-ip';
import { parse } from 'ipaddr.js';
import api from '@/api';
import axios from 'axios';
import useHandle403 from '@/utils/handle-403';

export default function Settings({ ip }) {
  const [formData, setFormData] = useState({});
  const { t } = useTranslation();

  const [ipList, setIpList] = useState(null); // please set to null initially (before data arrives)

  const handle403 = useHandle403();

  useEffect(() => {
    const source = axios.CancelToken.source();

    const sendRequest = async () => {
      await api
        .getWhitelistedIps({
          cancelToken: source.token,
        })
        .then((response) => {
          const data = response?.data;
          if (data) {
            setIpList(data);
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

  const defaultValues = {
    companyId: '000',
    companyName: 'Test',
    email: 'data_from@backend.com',
  };

  const validators = {
    email: Joi.string().email({ tlds: { allow: false } }),
    newPassword: Joi.string().min(9),
    newPasswordConfirm: Joi.string(),
  };

  return (
    <DashboardWrapper>
      <Box
        sx={{
          flex: 1,
          flexDirection: 'column',
          display: 'flex',
        }}
      >
        <DashboardPageHeader
          title={t('Settings')}
          rightText={`Dashboard / ${t('Settings')}`}
        />
        <Box
          sx={{
            flex: 1,
            backgroundColor: 'white',
            border: '1px solid #dadce0',
            borderRadius: 1,
            boxShadow:
              '0 0 5px 0 rgb(43 43 43 / 10%), 0 11px 6px -7px rgb(43 43 43 / 10%)',
            overflow: 'hidden',
            //padding: 5,
          }}
        >
          <AccordionForm.Form>
            <AccordionForm.Part title={t('CompanySettings')} id={1}>
              <CompanySettingsForm />
            </AccordionForm.Part>
            <AccordionForm.Part title={t('DefaultCycle')} id={6}>
              <DefaultCycleSettings />
            </AccordionForm.Part>
            {/*

            <AccordionForm.Part title={t('SettingsRoles')} id={3}>
              <RolesTable />
            </AccordionForm.Part>

            */}

            <AccordionForm.Part title={t('AdvancedSettings')} id={5}>
              <AdvancedSettings
                defaultIp={ip}
                ipState={{ ipList, setIpList }}
              />
            </AccordionForm.Part>
          </AccordionForm.Form>
        </Box>
      </Box>
    </DashboardWrapper>
  );
}

Settings.getLayout = function getLayout(page) {
  return <DashboardLayout title={'Settings'}>{page}</DashboardLayout>;
};

//export default withAuth(Settings);

export async function getServerSideProps({ req, locale }) {
  return {
    props: {
      ip: requestIp.getClientIp(req),
      ...(await serverSideTranslations(locale, ['common', 'footer'])),
    },
  };
}
