import { Box, Modal } from '@mui/material';
import LoaderPrimary from '@/components/loader-primary';
import BootstrapForm from '@/components/bootstrap-form';
import { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import Joi from 'joi';
import axios from 'axios';
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

const modalStyleLoading = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: 1000,
  height: 120,
  width: 120,
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
  addUser,
}) {
  const [operatorList, setOperatorList] = useState(null);

  const handle403 = useHandle403();

  useEffect(() => {
    console.log('mount');
    const source = axios.CancelToken.source();

    const sendRequest = async () => {
      await api
        .getAvailableOperators({
          cancelToken: source.token,
        })
        .then((response) => {
          const data = response?.data;
          if (data) {
            setOperatorList(data.map((user) => user.username));
          }
        })
        .catch((error) => {
          handle403(error);

          if (error?.response?.status === 404) {
            setUserList([]);
          }
        });
    };

    sendRequest();

    return () => {
      source.cancel('Component Unmounted', { silent: 'true' }); // Component Unmounted
    };
  }, []);

  const [formData, setFormData] = useState({});
  const { t } = useTranslation();

  const defaultValues = {};

  const validators = {
    newtocycle: Joi.string(),
  };

  if (operatorList === null) {
    return (
      <Modal
        open={open}
        onClose={() => {
          if (closeable) handleClose();
        }}
      >
        <Box sx={modalStyleLoading}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              py: 2,
            }}
          >
            <LoaderPrimary sx={{ color: 'white' }} />
          </Box>
        </Box>
      </Modal>
    );
  }

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
            label={t('defaultcyclesettings_newtocycle')}
            field='newtocycle'
            required
          >
            <BootstrapForm.Label />
            <BootstrapForm.Select
              JOIValidator={validators.newtocycle}
              tooltip={{
                tip: t('defaultcyclesettings_newtocycle_tip'),
                example: t('defaultcyclesettings_newtocycle_example'),
              }}
              options={operatorList}
              initialized={operatorList !== null}
            />
            <BootstrapForm.HelperText />
          </BootstrapForm.Control>
          <BootstrapForm.Submit
            title={t('defaultcyclesettings_newtocycle_save')}
            validators={validators}
            onSubmit={async () => {
              try {
                setCloseable(false);
                await addUser(formData.newtocycle.value);
              } catch (err) {
                console.log(err);
              }
            }}
            onSuccess={() => {
              setCloseable(true);
              handleClose();
            }}
            onError={() => {
              // errors yet to be handled
              setCloseable(true);
            }}
          />
        </BootstrapForm.Form>
      </Box>
    </Modal>
  );
}
