import { Box, Modal } from '@mui/material';
import LoaderPrimary from '@/components/loader-primary';
import BootstrapForm from '@/components/bootstrap-form';
import { useState } from 'react';
import { useTranslation } from 'next-i18next';
import Joi from 'joi';
import api from '@/api';
import useHandle403 from '@/utils/handle-403';

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

export default function NewUserFormModal({
  open,
  handleClose = () => {},
  closeable,
  setCloseable,
  dataState,
  dataChangesState,
}) {
  const [formData, setFormData] = useState({});

  const { data, setData } = dataState;
  const { dataChanges, setDataChanges } = dataChangesState;

  const handle403 = useHandle403();

  /*
  Assigning role on new user disabled for now

  //const [roleOptions, setRoleOptions] = useState([]);

  useEffect(() => {
    const source = axios.CancelToken.source();

    const sendRequest = async () => {
      await api
        .getRolesData({
          cancelToken: source.token,
        })
        .then((response) => {
          const data = response?.data;
          if (data) {
            setRoleOptions(data);
          }
        })
        .catch((error) => {
          handle403(error);

          if (error?.response?.status === 404) {
            // No roles yet
          }
        });
    };

    sendRequest();

    return () => {
      source.cancel('Component Unmounted', { silent: 'true' }); // Component Unmounted
    };
  }, []);
  */

  const { t } = useTranslation();

  const defaultValues = {};

  const validators = {
    username: Joi.string(),
    email: Joi.string().email({ tlds: { allow: false } }),
    password: Joi.string().min(9),
    passwordConfirm: Joi.string(),
    //role: Joi.string(),
  };

  return (
    <Modal
      open={open}
      onClose={() => {
        if (closeable) handleClose();
      }}
    >
      <Box sx={modalStyle}>
        <BootstrapForm.Form
          resetOnSuccess
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
            label={t('Username')}
            field='username'
            required
          >
            <BootstrapForm.Label />
            <BootstrapForm.Input
              JOIValidator={validators.username}
              tooltip={{
                tip: t('adduserform_tooltip_tip_username'),
                example: t('adduserform_tooltip_example_username'),
              }}
            />
            <BootstrapForm.HelperText />
          </BootstrapForm.Control>
          <BootstrapForm.Control
            label={t('EmailAddress')}
            field='email'
            required
          >
            <BootstrapForm.Label />
            <BootstrapForm.Input
              JOIValidator={validators.email}
              tooltip={{
                tip: t('adduserform_tooltip_tip_email'),
                example: t('adduserform_tooltip_example_email'),
              }}
            />
            <BootstrapForm.HelperText />
          </BootstrapForm.Control>
          <BootstrapForm.Control
            label={t('password')}
            field='password'
            required
          >
            <BootstrapForm.Label />
            <BootstrapForm.Input
              tooltip={{
                tip: t('tooltip_tip_password'),
                example: 'VerySafeP4ssw0rd##',
              }}
              JOIValidator={validators.password}
              inputProps={{ type: 'password' }}
            />
            <BootstrapForm.HelperText />
          </BootstrapForm.Control>
          <BootstrapForm.Control
            label={t('confirmPassword')}
            field='passwordConfirm'
            matchesPassword={'password'}
            required
          >
            <BootstrapForm.Label />
            <BootstrapForm.Input
              JOIValidator={validators.passwordConfirm}
              inputProps={{ type: 'password' }}
              tooltip={{
                tip: t('adduserform_tooltip_tip_confirmpassword'),
                example: t('adduserform_tooltip_example_confirmpassword'),
              }}
            />
            <BootstrapForm.HelperText />
          </BootstrapForm.Control>

          {/* 
          <BootstrapForm.Control
            label={t('addroleform_label_username')}
            field='role'
            required
          >
            <BootstrapForm.Label />
            <BootstrapForm.Autocomplete
              nestedProperty={'username'}
              options={roleOptions}
              noOptionsText={'addroleform_no_autocomplete_option'}
              JOIValidator={validators.role}
              tooltip={{
                tip: t('adduserform_tooltip_tip_role'),
                example: t('adduserform_tooltip_example_role'),
              }}
              orderData
            />
            <BootstrapForm.HelperText />
          </BootstrapForm.Control>
          */}
          <BootstrapForm.Submit
            title={t('settings_accordionform_save')}
            validators={validators}
            onSubmit={async () => {
              setCloseable(false);
              console.log(formData.password.value);

              await api
                .createUser({
                  username: formData.username.value,
                  password: formData.password.value,
                  email: formData.email.value,
                })
                .then((response) => {
                  const response_data = response?.data;
                  if (response_data) {
                    setData((data) => {
                      const newData = [...data, response_data];
                      setDataChanges(newData);
                      return newData;
                    });
                  }
                })
                .catch((err) => {
                  handle403(err, true);
                });
            }}
            onSuccess={() => {
              setCloseable(true);
            }}
            onError={(err) => {
              // errors yet to be handled
              console.log(err);
              setCloseable(true);
            }}
          />
        </BootstrapForm.Form>
      </Box>
    </Modal>
  );
}
