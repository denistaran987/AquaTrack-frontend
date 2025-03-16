import { useState, useEffect } from 'react';
import clsx from 'clsx';
import SignInForm from '../../components/UI/SignInForm/SignInForm';
import AdvantagesSection from '../../components/UI/AdvantagesSection/AdvantagesSection';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsOpenModal } from '../../redux/modal/selector';
import ForgotPasswordModal from '../../components/UI/Modal/Components/ForgotPasswordModal/ForgotPasswordModal';
import s from './SignInPage.module.css';
import Modal from '../../components/UI/Modal/Modal';
import { toggleModal } from '../../redux/modal/slice';

const SignInPage = () => {
  const dispatch = useDispatch();
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1440);
  const isOpen = useSelector(selectIsOpenModal);
  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1440);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section className="section">
      <div className={clsx('container', s['signinpage-wrapper'])}>
        <SignInForm />
        {isLargeScreen && <AdvantagesSection />}
        {isOpen && (
          <Modal isOpen={isOpen} toggleModal={() => dispatch(toggleModal())}>
            {isOpen === 'forgotPassword' && <ForgotPasswordModal />}
          </Modal>
        )}
      </div>
    </section>
  );
};

export default SignInPage;
