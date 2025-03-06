import { useDispatch, useSelector } from 'react-redux';
import Modal from '../../components/UI/Modal/Modal';
import { closeModalLogout } from '../../redux/modal/slice';
import { selectIsOpenModalLogout } from '../../redux/modal/selector';

const HomePage = () => {
  const isOpenModal = useSelector(selectIsOpenModalLogout);
  const dispatch = useDispatch();
  const handleCloseModalLogout = () => {
    dispatch(closeModalLogout());
  };
  return (
    <>
      <h1>Welcome to Aquatracker</h1>
      <Modal onRequestClose={handleCloseModalLogout} isOpen={isOpenModal}>
        Hello
      </Modal>
    </>
  );
};

export default HomePage;
