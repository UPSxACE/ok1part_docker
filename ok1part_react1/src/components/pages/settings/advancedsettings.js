import ConfirmModal from '@/components/confirm-modal';
import LoaderPrimary from '@/components/loader-primary';
import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material';
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'next-i18next';
import NewIpFormModal from './forms/newipformmodal';
import api from '@/api';
import useHandle403 from '@/utils/handle-403';

export default function AdvancedSettings({ ipState, defaultIp }) {
  const { t } = useTranslation();
  const [confirmModal, setConfirmModal] = useState(false);
  const [ipToDelete, setIpToDelete] = useState('');
  const { ipList, setIpList } = ipState;

  const handle403 = useHandle403();

  // New Ip Form
  const [open, setOpen] = useState(false);
  const [closeable, setCloseable] = useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  function deleteIp(newIpList) {
    // send request to delete IP
    // Debug: console.log('IP ' + ipToDelete + ' will be deleted!');

    setIpList(newIpList);
  }

  function addIp(newIpList) {
    setIpList(newIpList);
  }

  return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper', padding: '50px' }}>
      <NewIpFormModal
        open={open}
        handleClose={handleClose}
        closeable={closeable}
        setCloseable={setCloseable}
        addIp={addIp}
        defaultIp={defaultIp}
      />
      <ConfirmModal
        state={{ open: confirmModal, setOpen: setConfirmModal }}
        onConfirm={async () => {
          // Test endpoint
          await api
            .removeWhitelistedIp(ipToDelete)
            .then((response) => {
              //Debug: console.log(response);
              addIp(response?.data);
              //setAlert(t('company_settings_updated'));
            })
            .catch((err) => {
              handle403(err, true);
            });
        }}
      />
      <List>
        <ListItem sx={{ bgcolor: '#f0f0f0' }} disablePadding>
          <ListItemButton
            disableRipple
            sx={{
              borderBottom: '1px solid #0000001f',
              cursor: 'default',
            }}
          >
            <ListItemText primary={t('allowed_ips')} />
            <ListItemIcon>
              <AddCircleOutline
                sx={{ marginLeft: 'auto', cursor: 'pointer' }}
                color='success'
                onClick={() => {
                  handleOpen();
                }}
              />
            </ListItemIcon>
          </ListItemButton>
        </ListItem>
        {ipList === null && (
          <ListItem
            sx={{ display: 'flex', justifyContent: 'center' }}
            disablePadding
          >
            <ListItemButton
              sx={{
                borderBottom: '1px solid #0000001f',
                cursor: 'default',
                display: 'flex',
                justifyContent: 'center',
                paddingY: 1,
              }}
            >
              <LoaderPrimary size={30} />
            </ListItemButton>
          </ListItem>
        )}
        {ipList !== null &&
          ipList.map((ipObj, index) => {
            return (
              <ListItem key={index} disablePadding>
                <ListItemButton
                  sx={{
                    borderBottom: '1px solid #0000001f',
                    cursor: 'default',
                  }}
                >
                  <ListItemText primary={ipObj.ip} />
                  <ListItemIcon>
                    <RemoveCircleOutline
                      sx={{ marginLeft: 'auto', cursor: 'pointer' }}
                      color='error'
                      onClick={() => {
                        setIpToDelete(ipObj.ip); // add decent logic here
                        setConfirmModal(true);
                      }}
                    />
                  </ListItemIcon>
                </ListItemButton>
              </ListItem>
            );
          })}
      </List>
    </Box>
  );
}
