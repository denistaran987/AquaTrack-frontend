import clsx from 'clsx';
import s from './HomePage.module.css';
import WelcomeSection from '../../components/UI/WelcomeSection/WelcomeSection';
import AdvantagesSection from '../../components/UI/AdvantagesSection/AdvantagesSection';

const HomePage = () => {
  return (
    <>
      <section className="section">
        <div className={clsx('container', s['homepage-wrapper'])}>
          <WelcomeSection />
          <AdvantagesSection />
        </div>
      </section>
    </>
  );
};

export default HomePage;
