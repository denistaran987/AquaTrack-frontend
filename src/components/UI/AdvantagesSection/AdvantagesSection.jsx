import s from './AdvantagesSection.module.css';

const AdvantagesSection = () => {
  return (
    <section className={s.section}>
      <img className={s.image} src="/public/images/homepage-mob.webp" alt="" />
      <div className={s['grid-advantages']}>
        <div className={s['advantages-wrapper']}>
          <div className={s['advantages-left-content']}>
            <img className={s['advantages-img']} src="/images/avatar.jpg" alt="" />
            <img className={s['advantages-img']} src="/images/avatar_1.jpg" alt="" />
            <img className={s['advantages-img']} src="/images/avatar_2.jpg" alt="" />
            <h2 className={s['advantages-title']}>
              Our <span className={s.accent}>happy</span> customers
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdvantagesSection;
