import { useState, useEffect } from 'react';
import clsx from 'clsx';
import s from './SignUpPage.module.css';
import SignUpForm from '../../components/UI/SignUpForm/SignUpForm';
import AdvantagesSection from '../../components/UI/AdvantagesSection/AdvantagesSection';

const SignUpPage = () => {
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
      <div className={clsx('container', s['signuppage-wrapper'])}>
        <SignUpForm />
        {isLargeScreen && <AdvantagesSection />}
      </div>
    </section>
  );
};

export default SignUpPage;