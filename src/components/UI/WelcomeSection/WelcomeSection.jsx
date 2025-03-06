import { Link, NavLink } from 'react-router-dom';
import Logo from '../Logo/Logo';
import s from './WelcomeSection.module.css';
import clsx from 'clsx';

const WelcomeSection = () => {
  return (
    <section className={s.section}>
      <Logo />
      <div className={s['title-container']}>
        <p className={s.subtitle}>Record daily water intake and track</p>
        <h1 className={s.title}>Water consumption tracker</h1>
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
      </div>
    </section>
  );
};

export default WelcomeSection;
