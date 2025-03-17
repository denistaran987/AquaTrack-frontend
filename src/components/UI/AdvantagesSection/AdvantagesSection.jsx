import clsx from 'clsx';
import s from './AdvantagesSection.module.css';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import { selectTotalUsers } from '../../../redux/auth/selectors.js';
import { getTotalUsers } from '../../../redux/auth/operations.js';
const AdvantagesSection = () => {
  const totalUsers = useSelector(selectTotalUsers);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTotalUsers());
  }, [dispatch]);

  return (
    <section className={s.section}>
      <picture>
        <source
          srcSet="/images/homepage.webp 1x, /images/homepage@2x.webp 2x"
          media="(min-width: 1440px)"
        />
        <source
          srcSet="/images/homepage-tab.webp 1x, /images/homepage-tab@2x.webp 2x"
          media="(min-width: 768px)"
        />
        <source
          srcSet="/images/homepage-mob.webp 1x, /images/homepage-mob@2x.webp 2x"
          media="(max-width: 767px)"
        />
        <img
          className={s.image}
          src="/images/homepage-mob.webp"
          alt="A girl is drinking water from a bottle"
        />
      </picture>
      <div className={s['grid-advantages']}>
        <div className={s['advantages-left-wrapper']}>
          <div className={s['advantages-left-content']}>
            <img
              className={s['advantages-img']}
              src="/images/avatar.jpg"
              alt=""
              loading="lazy"
              style={{ zIndex: 3 }}
            />
            <img
              className={s['advantages-img']}
              src="/images/avatar_1.jpg"
              alt=""
              loading="lazy"
              style={{ zIndex: 2 }}
            />
            <img
              className={s['advantages-img']}
              src="/images/avatar_2.jpg"
              alt=""
              loading="lazy"
              style={{ zIndex: 1 }}
            />
            <div className={s.totalUsers}>+{totalUsers}</div>
            <h2 className={s['advantages-title']}>
              Our <span className={s.accent}>happy</span> customers
            </h2>
          </div>
        </div>
        <div className={s['advantages-right-wrapper']}>
          <div className={clsx(s.item, s.dark)}>
            <span className={s.circle}></span>
            Habit drive
          </div>
          <div className={clsx(s.item, s.green)}>View statistics</div>
          <div className={clsx(s.item, s.white)}>Personal rate setting</div>
        </div>
      </div>
    </section>
  );
};

export default AdvantagesSection;
