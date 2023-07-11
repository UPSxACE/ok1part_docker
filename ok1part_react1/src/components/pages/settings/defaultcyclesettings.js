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
import { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import api from '@/api';
import axios from 'axios';
import useHandle403 from '@/utils/handle-403';
import NewUserFormModal from './forms/newuserformmodal';

export default function DefaultCycleSettings() {
  const { t } = useTranslation();
  const [confirmModal, setConfirmModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState('');
  const [userList, setUserList] = useState(null);

  const [open, setOpen] = useState(false);
  const [closeable, setCloseable] = useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handle403 = useHandle403();

  useEffect(() => {
    const source = axios.CancelToken.source();

    const sendRequest = async () => {
      await api
        .getDefaultCycle({
          cancelToken: source.token,
        })
        .then((response) => {
          const data = response?.data;
          if (data) {
            setUserList(
              data.map((user) => ({
                id: user.fkoperator.id,
                username: user.fkoperator.username,
                canApprovation: user.fkoperator.permissions.canApprovation, //FIXME - Later on, based on this property being false show a warning
              }))
            );
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

  function deleteUser(index) {
    api
      .removeFromDefaultCycle({ operatorUsername: userList[index].username })
      .then(() => {
        setUserList((userList) => {
          const newUserList = [...userList];
          newUserList.splice(index, 1);
          return newUserList;
        });
      })
      .catch((error) => {
        handle403(error);
      });
  }

  async function addUser(username) {
    if (!username) {
      return null;
    }
    await api
      .addToDefaultCycle({
        operatorUsername: username,
      })
      .then((response) => {
        const data = response?.data;
        if (data) {
          setUserList((userList) => [
            ...userList,
            {
              id: data.fkoperator.id,
              username: data.fkoperator.username,
              canApprovation: data.fkoperator.permissions.canApprovation,
            },
          ]);
        }
      })
      .catch((error) => {
        handle403(error);

        if (error?.response?.status === 404) {
          setUserList([]);
        }
      });
  }

  /*
  if (userList === null) {
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
  */

  return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper', padding: '50px' }}>
      <NewUserFormModal
        key={userList?.length}
        open={open}
        handleClose={handleClose}
        closeable={closeable}
        setCloseable={setCloseable}
        addUser={addUser}
      />

      <ConfirmModal
        state={{ open: confirmModal, setOpen: setConfirmModal }}
        onConfirm={() => {
          deleteUser(userToDelete);
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
            <ListItemText primary={t('default_cycle')} />
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
        {userList === null && (
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
        {userList !== null &&
          userList.map((user, index) => {
            return (
              <ListItem key={index} disablePadding>
                <ListItemButton
                  sx={{
                    borderBottom: '1px solid #0000001f',
                    cursor: 'default',
                  }}
                >
                  <ListItemText primary={user.username} />
                  <ListItemIcon>
                    <RemoveCircleOutline
                      sx={{ marginLeft: 'auto', cursor: 'pointer' }}
                      color='error'
                      onClick={() => {
                        setUserToDelete(index); // add decent logic here
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
