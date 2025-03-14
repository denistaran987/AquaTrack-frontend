import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ResetPasswordModal from '../../components/UI/Modal/Components/ResetPasswordModal/ResetPasswordModal';

const ResetPasswordPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const token = new URLSearchParams(location.search).get('token');

  const [isModalOpen, setIsModalOpen] = useState(true);

  const handleClose = () => {
    setIsModalOpen(false);
    navigate('/signin');
  };

  return isModalOpen ? <ResetPasswordModal token={token} onClose={handleClose} /> : null;
};

export default ResetPasswordPage;