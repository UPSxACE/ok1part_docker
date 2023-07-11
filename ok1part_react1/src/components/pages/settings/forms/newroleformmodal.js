import { Alert, Box, Modal } from '@mui/material';
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

export default function NewRoleFormModal({
  open,
  handleClose = () => {},
  closeable,
  setCloseable,
  dataState,
  dataChangesState,
}) {
  const [formData, setFormData] = useState({});
  const { t } = useTranslation();
  const [selectInitialized, setSelectInitialized] = useState(true); // Set false in case it needs to come from database, and then update it with true as data is ready
  const [permissions, setPermissions] = useState(['permission_caneditforms']); // Must be null while waiting for the backend, because of the Boostrap Form Checkbox List component loader

  const [alert, setAlert] = useState(null);

  const { data, setData } = dataState;
  const { dataChanges, setDataChanges } = dataChangesState;

  const handle403 = useHandle403();

  const positionapprovation_options = [1, 2, 3, 4, 5];

  const defaultValues = {};

  const validators = {
    name: Joi.string(),
    positionapprovation: Joi.number().min(1).max(5),
    //caneditforms: Joi.any(),
    permissions: Joi.any(),
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
          // autoFinalize
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
          resetOnSuccess
        >
          <BootstrapForm.Header>
            {alert && (
              <Alert severity='error' sx={{ marginBottom: 2 }}>
                {alert}
              </Alert>
            )}
          </BootstrapForm.Header>
          <BootstrapForm.Control
            label={t('addroleform_label_name')}
            field='name'
            required
          >
            <BootstrapForm.Label />
            <BootstrapForm.Input
              JOIValidator={validators.name}
              tooltip={{
                tip: t('addroleform_tooltip_tip_rolename'),
                example: t('addroleform_tooltip_example_rolename'),
              }}
            />
            <BootstrapForm.HelperText />
          </BootstrapForm.Control>

          <BootstrapForm.Control
            label={t('addroleform_label_positionapprovation')}
            field='positionapprovation'
            required
          >
            <BootstrapForm.Label />

            <BootstrapForm.Select
              JOIValidator={validators.positionapprovation}
              tooltip={{
                tip: t('addroleform_tooltip_tip_positionapprovation'),
                example: t('addroleform_tooltip_example_positionapprovation'),
              }}
              //nestedProperty={'name.common'}
              options={positionapprovation_options}
              initialized={selectInitialized}
              //orderData
            />
            <BootstrapForm.HelperText />
          </BootstrapForm.Control>

          <BootstrapForm.Control
            //label={t('addroleform_label_permissions')}
            field='permissions'
          >
            <BootstrapForm.Label />

            <BootstrapForm.CheckboxList
              title='addroleform_label_permissions'
              JOIValidator={validators.permissions}
              tooltip={{
                tip: t('addroleform_tooltip_tip_permissions'),
                example: t('addroleform_tooltip_example_permissions'),
              }}
              //nestedProperty={'name.common'}
              options={permissions}
              initialized={selectInitialized}
              //orderData
            />
            <BootstrapForm.HelperText />
          </BootstrapForm.Control>

          <BootstrapForm.Submit
            title={t('settings_accordionform_save')}
            validators={validators}
            onSubmit={async () => {
              setCloseable(false);

              const submitData = {
                name: formData.name.value,
                positionapprovation: formData.positionapprovation.value,
              };

              if (formData.permissions?.value) {
                Object.keys(formData.permissions.value).forEach(
                  (permission) => {
                    submitData[permission.replace('permission_', '')] = Boolean(
                      submitData[permission]
                    );
                  }
                );
              }

              await api
                .createRole({
                  ...submitData,
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

              //router.push('/');
            }}
            onSuccess={() => {
              // set alert if needed
              setCloseable(true);
              handleClose();
            }}
            onError={(err, setStatus) => {
              console.log(err);
              if (err?.response?.status) {
                const error_code = err?.response?.status;
                const error_data = err?.response?.data;

                // HANDLE ERROR CODES HERE
                if (error_code === 400) {
                  const error_description = error_data?.errors?.[0];
                  if (error_description) {
                    setAlert(t(error_description));
                    setCloseable(true);
                    return;
                  }
                }
              }

              // If an error was unhandled
              setStatus(false);
              setCloseable(true);
            }}
          />
        </BootstrapForm.Form>
      </Box>
    </Modal>
  );
}
