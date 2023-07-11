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

interface ILoadingModalProps {
  //children: React.ReactNode;
  open: boolean;
  handleClose?: (event: {}, reason: 'backdropClick' | 'escapeKeyDown') => void;
}

export default function LoadingModal({
  //children,
  open,
  handleClose,
}: ILoadingModalProps) {
  // the handle open and handle close are controlled from outside!
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={modalStyle}>
        <LoaderPrimary />
      </Box>
    </Modal>
  );
}
