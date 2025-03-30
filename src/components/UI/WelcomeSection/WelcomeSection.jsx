import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';
import s from './WelcomeSection.module.css';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../../redux/auth/selectors';
import { setPosition, toggleModal } from '../../../redux/modal/slice';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import LanguageBtn from '../LanguageBtn/languageBtn';
import { useTranslation } from 'react-i18next';

const WelcomeSection = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { t } = useTranslation();
  return (
    <section className={s.section}>
      <Logo />
      <ThemeToggle />
      <LanguageBtn />
      <p className={s.subtitle}>{t('welcomeSection.second_title')}</p>
      <h1 className={s.title}>{t('welcomeSection.main_title')}</h1>
      {!isLoggedIn ? (
        <nav className={s.nav}>
          <ul className={s.list}>
            <li>
              <Link className={clsx(s.link, s.first)} to="/signup">
                {t('common.try_tracker')}
              </Link>
            </li>
            <li>
              <Link className={clsx(s.link, s.second)} to="/signin">
                {t('common.sign_in')}
              </Link>
            </li>
          </ul>
        </nav>
      ) : (
        <div className={s['button-container']}>
          <Link className={clsx(s.link, s.first)} to="/tracker">
            {t('common.try_tracker')}
          </Link>
          <button
            className={s.confirmBtn}
            onClick={() => dispatch(toggleModal('Logout'), dispatch(setPosition('null')))}
          >
            {t('common.log_out')}
          </button>
        </div>
      )}
    </section>
  );
};

export default WelcomeSection;
