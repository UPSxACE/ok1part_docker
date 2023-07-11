import { Box, Modal } from '@mui/material';
import LoaderPrimary from '@/components/loader-primary';
import BootstrapForm from '@/components/bootstrap-form';
import { useState } from 'react';
import { useTranslation } from 'next-i18next';
import Joi from 'joi';
import api from '@/api';
import useHandle403 from '@/utils/handle-403';
import { parse } from 'ipaddr.js';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '100%',
  maxWidth: 1000,
  minHeight: 400,
  bgcolor: 'white',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 3,
};

export default function NewIpFormModal({
  open,
  handleClose = () => {},
  closeable,
  setCloseable,
  addIp,
  defaultIp,
}) {
  const [formData, setFormData] = useState({});
  const { t } = useTranslation();

  const defaultValues = { newip: defaultIp };

  const validators = {
    newip: Joi.string(),
  };

  const handle403 = useHandle403();

  function tryParseIp() {
    try {
      return parse(formData?.newip?.value).toNormalizedString();
    } catch (err) {
      return null;
    }
  }

  const parsedIp = tryParseIp();

  return (
    <Modal
      open={open}
      onClose={() => {
        if (closeable) handleClose();
      }}
    >
      <Box sx={modalStyle}>
        <BootstrapForm.Form
          autoFinalize
          defaultValues={defaultValues}
          formDataState={{ formData, setFormData }}
          fullWidth
          style={{
            flex: 1,
            backgroundColor: 'white',
            borderRadius: 0,
            border: 0,
          }}
          renderLoading={<LoaderPrimary />}
          onErrorConfirm={() => {
            setCloseable(true);
          }}
        >
          <BootstrapForm.Control
            label={t('advancedsettings_newip_whitelist')}
            field='newip'
            required
          >
            <BootstrapForm.Label />
            <BootstrapForm.Input
              JOIValidator={validators.newip}
              tooltip={{
                tip: t('advancedsettings_tooltip_tip_newip_whitelist'),
                example: t('advancedsettings_tooltip_example_newip_whitelist'),
              }}
            />
            <BootstrapForm.HelperText />
          </BootstrapForm.Control>
          <BootstrapForm.Submit
            forceDisabled={parsedIp === null}
            title={t('settings_accordionform_save')}
            validators={validators}
            onSubmit={async () => {
              setCloseable(false);

              await api
                .whitelistIp(parsedIp)
                .then((response) => {
                  //Debug: console.log(response);
                  addIp(response?.data);
                  //setAlert(t('company_settings_updated'));
                })
                .catch((err) => {
                  handle403(err, true);
                });
            }}
            onSuccess={() => {
              setCloseable(true);
              handleClose();
            }}
            onError={(err) => {
              // errors yet to be handled
              setCloseable(true);
            }}
          />
        </BootstrapForm.Form>
      </Box>
    </Modal>
  );
}
