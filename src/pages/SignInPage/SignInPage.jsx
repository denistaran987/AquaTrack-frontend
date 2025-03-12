import { useState, useEffect } from 'react';
import clsx from 'clsx';
import s from './SignInPage.module.css';
import SignInForm from '../../components/UI/SignInForm/SignInForm';
import AdvantagesSection from '../../components/UI/AdvantagesSection/AdvantagesSection';

const SignInPage = () => {
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1440);

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
      </div>
    </section>
  );
};

export default SignInPage;
