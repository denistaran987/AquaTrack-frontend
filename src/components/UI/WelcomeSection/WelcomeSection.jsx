import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';
import s from './WelcomeSection.module.css';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../../redux/auth/selectors';

const WelcomeSection = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
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
          </ul>
        </nav>
      ) : (
        <Link className={clsx(s.link, s.first)} to="/tracker">
          My tracker
        </Link>
      )}
    </section>
  );
};

export default WelcomeSection;
