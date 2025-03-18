import Logo from '../Logo/Logo';
import s from './WaterMainInfo.module.css';
import WaterDailyNorma from '../WaterDailyNorma/WaterDailyNorma';
import AddWaterBtn from '../AddWaterBtn/AddWaterBtn';
import WaterProgressBar from '../WaterProgressBar/WaterProgressBar';
import ThemeToggle from '../ThemeToggle/ThemeToggle.jsx';

const WaterMainInfo = () => {
  return (
    <section className={s.section}>
      <Logo />
      <ThemeToggle />
      <div className={s.bottle}></div>
      <WaterDailyNorma />
      <AddWaterBtn />
      <WaterProgressBar />
    </section>
  );
};

export default WaterMainInfo;
