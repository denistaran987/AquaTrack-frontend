import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';
import s from './WelcomeSection.module.css';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../../redux/auth/selectors';
import { setPosition, toggleModal } from '../../../redux/modal/slice';
import ThemeToggle from '../ThemeToggle/ThemeToggle';

const WelcomeSection = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <section className={s.section}>
      <Logo />
      <ThemeToggle />
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
