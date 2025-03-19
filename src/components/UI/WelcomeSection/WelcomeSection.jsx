import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';
import s from './WelcomeSection.module.css';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../../redux/auth/selectors';
import { setPosition, toggleModal } from '../../../redux/modal/slice';
import { FcGoogle } from 'react-icons/fc';
import { getGoogleUrl } from '../../../redux/auth/operations';
import toast from 'react-hot-toast';

const WelcomeSection = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const handleGoogleSignIn = () => {
    dispatch(getGoogleUrl())
      .unwrap()
      .then(res => {
        window.location.href = res?.data?.url;
      })
      .catch(error => {
        const errorMessages = {
          400: 'Bad request. Invalid input data.',
          500: 'Something went wrong. Please try again later.',
        };

        const message = errorMessages[error?.status] || 'An unknown error occurred.';
        toast.error(message, { style: { backgroundColor: '#FFCCCC', fontWeight: 'medium' } });
      });
  };

  return (
    <section className={s.section}>
      <Logo />
      <p className={s.subtitle}>Record daily water intake and track</p>
      <h1 className={s.title}>Water consumption tracker</h1>
      {!isLoggedIn ? (
        <nav className={s.nav}>
          <ul className={s.list}>
            <li>
              <Link className={clsx(s.link, s.first)} to="/signup">
                Try tracker
              </Link>
            </li>
            <li>
              <Link className={clsx(s.link, s.second)} to="/signin">
                Sign In
              </Link>
            </li>
            <li>
              <button className={clsx(s.link, s.third)} onClick={handleGoogleSignIn}>
                <FcGoogle />
              </button>
            </li>
          </ul>
        </nav>
      ) : (
        <div className={s['button-container']}>
          <Link className={clsx(s.link, s.first)} to="/tracker">
            My tracker
          </Link>
          <button
            className={s.confirmBtn}
            onClick={() => dispatch(toggleModal('Logout'), dispatch(setPosition('null')))}
          >
            Log out
          </button>
        </div>
      )}
    </section>
  );
};

export default WelcomeSection;
