import { CheckCircle, Dangerous, Error, Warning } from '@mui/icons-material';
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Modal,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

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
  outline: 'none',
  flexDirection: 'column',
};

export function WarningListModal({
  warningList,
  setWarningList,
  addWarning,
  addSuccess,
  updateWarnings,
  openWarnings,
  errorsCount,
  closeWarnings,
  visible,
}) {
  const { t } = useTranslation();

  return (
    <Modal open={errorsCount > 1 && visible}>
      <Box sx={modalStyle}>
        <Typography variant='h6' component='h1' sx={{ pb: 2 }}>
          {t('warning_list_modal_title')}
        </Typography>
        <List
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            pb: 3,
          }}
        >
          {warningList.map((warning, index) => {
            return (
              <ListItem
                key={index}
                disablePadding
                sx={{
                  minWidth: '0',
                  cursor: 'default!important',
                  flex: 1,
                }}
              >
                <ListItemButton
                  //disableGutters
                  disableTouchRipple
                  disableRipple
                  sx={{
                    borderBottom: '1px solid #0000001f',
                    cursor: 'default!important',
                    '& .MuiListItemIcon-root': {
                      minWidth: 0,
                    },
                  }}
                >
                  <ListItemIcon>
                    {warning.status === 'error' ? (
                      /*<Error color='error' />*/
                      <Warning color='warning' />
                    ) : (
                      <CheckCircle color='success' />
                    )}
                  </ListItemIcon>
                  <ListItemText
                    sx={{
                      paddingLeft: 2,
                      '& .MuiButtonBase-root': { padding: 0 },
                      '& .MuiTouchRipple-root': {
                        display: 'none',
                      },
                      '& .MuiButtonBase-root:hover': {
                        backgroundColor: 'transparent',
                        cursor: 'default!important',
                      },
                    }}
                    primary={warning.message}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
        <Button variant='contained' onClick={closeWarnings}>
          Confirm
        </Button>
      </Box>
    </Modal>
  );
}

export function useWarningListModal() {
  // warningList:
  // [{status: "success" || "error", message: string }, ...]
  const [warningList, setWarningList] = useState([]);
  const [visible, setVisible] = useState(false);
  const [errorsCount, setErrorsCount] = useState(0);

  function addWarning(newWarning) {
    setErrorsCount((count) => count + 1);
    if (Object.prototype.toString.call(newWarning) === '[object Array]') {
      setWarningList((warningList) => [
        ...warningList,
        ...newWarning.map((warning) => ({
          status: 'error',
          message: warning,
        })),
      ]);
      return;
    }
    setWarningList((warningList) => [
      ...warningList,
      { status: 'error', message: newWarning },
    ]);
  }

  function addSuccess(newSuccess) {
    if (Object.prototype.toString.call(newSuccess) === '[object Array]') {
      setWarningList((warningList) => [
        ...warningList,
        ...newSuccess.map((success) => ({
          status: 'success',
          message: success,
        })),
      ]);
      return;
    }
    setWarningList((warningList) => [
      ...warningList,
      { status: 'success', message: newSuccess },
    ]);
  }

  function closeWarnings() {
    setWarningList([]);
    setVisible(false);
    setErrorsCount(0);
  }

  function openWarnings() {
    // Debug: console.log('OPEN WARNINGS TRIGGERED');
    setVisible(true);
    // Debug: else {console.log("No warnings")}
  }

  return {
    warningList,
    setWarningList,
    addWarning,
    addSuccess,
    visible,
    openWarnings,
    closeWarnings,
    errorsCount,
  };
}
