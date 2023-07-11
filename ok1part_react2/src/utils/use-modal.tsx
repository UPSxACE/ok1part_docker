import { useState } from 'react';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  minWidth: { xs: '90%', sm: 540 },
  transform: 'translate(-50%, -50%)',
  bgcolor: 'white',
  boxShadow: 24,
  p: { xs: 2.5, sm: 4 },
  pt: { xs: 0, sm: 2 },
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 3,
};

export default function useModal() {
  const [visible, setVisible] = useState(false);

  const openModal = () => setVisible(true);
  const closeModal = () => setVisible(false);

  return { visible, setVisible, openModal, closeModal, modalStyle };
}
