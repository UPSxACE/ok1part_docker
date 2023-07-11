import { Box, Button, Modal, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: 400,

  bgcolor: 'white',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  borderRadius: 3,
};

export default function ConfirmModal({
  state,
  onConfirm = () => {},
  onCancel = () => {},
  customMessage,
}) {
  const { open, setOpen } = state;
  const { t } = useTranslation();

  return (
    <Modal
      open={open}
      onClose={() => {
        onCancel(), setOpen(false);
      }}
    >
      <Box sx={modalStyle}>
        <Box sx={{ paddingBottom: 4 }}>
          <Typography component={'h1'} variant='h6'>
            {t('confirm_action')}
          </Typography>
          <Typography component={'p'} variant='body' sx={{ pb: 1 }}>
            {customMessage ? customMessage : t('are_you_sure')}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', marginTop: 'auto' }}>
          <Button
            color='success'
            onClick={() => {
              onConfirm(), setOpen(false);
            }}
            variant='contained'
            sx={{ marginLeft: 'auto', mr: 1 }}
          >
            {t('confirm_button')}
          </Button>
          <Button
            color='error'
            onClick={() => {
              onCancel(), setOpen(false);
            }}
            variant='contained'
          >
            {t('cancel_button')}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
