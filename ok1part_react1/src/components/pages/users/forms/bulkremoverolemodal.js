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

export default function BulkRemoveRoleModal({
  open,
  handleClose = () => {},
  closeable,
  setCloseable,
  dataState,
  dataChangesState,
  selectedRows,
  addWarning,
  addSuccess,
  openWarnings,
}) {
  const [formData, setFormData] = useState({});

  const { t } = useTranslation();

  const [roleOptions, setRoleOptions] = useState([
    { id: 'canForms', label: t('canForms') },
    { id: 'canApprovation', label: t('canApprovation') },
    { id: 'canManagement', label: t('canManagement') },
  ]);

  const { data, setData } = dataState;
  const { dataChanges, setDataChanges } = dataChangesState;

  const handle403 = useHandle403();

  // Get role options
  /* FIXME - possibly deprecated concept
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

  const defaultValues = {};

  const validators = {
    roles: Joi.any(),
  };

  // Debug: console.log(formData);

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
            label={t('bulkaddroleform_label_roles')}
            field='roles'
            required
          >
            <BootstrapForm.Label />
            <BootstrapForm.AutocompleteCheckbox
              //nestedProperty={'name'}
              options={roleOptions}
              //noOptionsText={'addroleform_no_autocomplete_option'}
              JOIValidator={validators.roles}
              tooltip={{
                tip: t('bulkaddroleform_tooltip_tip_roles'),
                example: t('bulkaddroleform_tooltip_example_roles'),
              }}
              orderData
            />
            <BootstrapForm.HelperText />
          </BootstrapForm.Control>

          <BootstrapForm.Submit
            title={t('settings_accordionform_save')}
            validators={validators}
            onSubmit={async () => {
              setCloseable(false);

              // Will store the IDs of all the roles to add to the user
              const rolesToRemove = [];

              formData.roles.value.forEach((role) => {
                const roleObj = roleOptions.find(
                  (roleObject) => roleObject.id === role.id
                );
                const roleId = roleObj.id;
                rolesToRemove.push(roleId);
              });

              // Will store the IDs of all the users that will have the role removed
              const usersToRemoveRole = [];
              const usersToRemoveRoleId = {};

              Object.keys(selectedRows).forEach((rowIndex) => {
                if (selectedRows[rowIndex] === true) {
                  usersToRemoveRole.push(data[rowIndex].username);
                  usersToRemoveRoleId[data[rowIndex].username] =
                    data[rowIndex].id;
                }
              });

              const newArr = [...dataState.data];

              for (const roleId of rolesToRemove) {
                for await (const userId of usersToRemoveRole) {
                  await api
                    .deleteRoleFromUser(usersToRemoveRoleId[userId], roleId)
                    .then((response) => {
                      const response_data = response?.data;
                      if (response_data) {
                        addSuccess(
                          `Removed role ${roleId} from user ${userId} successfully.`
                        );

                        const target = newArr.findIndex(
                          (user) => user.id === response_data.id
                        );
                        newArr[target]['permissions'][roleId] = false;

                        /*
                        setData((data) => {
                          const newData = [...data, response_data];
                          setDataChanges(newData);
                          return newData;
                        });
                        */
                      }
                    })
                    .catch((err) => {
                      if (err?.response?.status === 400) {
                        const error_data = err?.response?.data;
                        const error_message = error_data?.errors?.[0]
                          ? `Error removing permission ${roleId} from user ${userId} successfully: ${error_data?.errors?.[0]}`
                          : `Error removing permission ${roleId} from user ${userId} successfully.`;
                        addWarning(error_message);
                        console.log('CATCH', err);
                      } else {
                        const error_message = `Error removing permission ${roleId} from user ${userId}`;
                        addWarning(error_message);
                        handle403(err);
                      }
                    });
                }
              }

              dataState.setData(newArr);

              openWarnings();
            }}
            onSuccess={() => {
              setCloseable(true);
              handleClose();
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
