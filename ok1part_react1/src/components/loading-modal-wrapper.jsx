import { Modal, Box } from '@mui/material';
import LoaderPrimary from './loader-primary';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 150,
  height: 150,
  bgcolor: 'white',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 3,
};

export default function LoadingModalWrapper({ children, open, handleClose }) {
  // the handle open and handle close are controlled from outside!
  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          <LoaderPrimary />
        </Box>
      </Modal>
      {children}
    </>
  );
}
