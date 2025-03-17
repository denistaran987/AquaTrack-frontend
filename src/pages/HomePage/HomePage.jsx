import clsx from 'clsx';
import s from './HomePage.module.css';
import WelcomeSection from '../../components/UI/WelcomeSection/WelcomeSection';
import AdvantagesSection from '../../components/UI/AdvantagesSection/AdvantagesSection';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsOpenModal } from '../../redux/modal/selector';
import Modal from '../../components/UI/Modal/Modal';
import { toggleModal } from '../../redux/modal/slice';
import LogOutModal from '../../components/UI/Modal/Components/LogOutModal/LogOutModal';

const HomePage = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector(selectIsOpenModal);
  return (
    <>
      <section className="section">
        <div className={clsx('container', s['homepage-wrapper'])}>
          <WelcomeSection />
          <AdvantagesSection />
        </div>
        {isOpen && (
          <Modal isOpen={isOpen} toggleModal={() => dispatch(toggleModal())}>
            {isOpen === 'Logout' && <LogOutModal />}
          </Modal>
        )}
      </section>
    </>
  );
};

export default HomePage;
