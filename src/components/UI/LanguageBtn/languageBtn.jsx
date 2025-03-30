import i18next from 'i18next';
import s from './languageBtn.module.css';
import { LOCALS } from '../../../i18n/constants';
import { useEffect, useState } from 'react';

const LanguageBtn = () => {
  const [currentLang, setCurrentLang] = useState(i18next.language);

  useEffect(() => {
    const handleLanguageChange = lng => {
      setCurrentLang(lng);
    };

    i18next.on('languageChanged', handleLanguageChange);

    return () => {
      i18next.off('languageChanged', handleLanguageChange);
    };
  }, []);

  const onHandleChange = lng => i18next.changeLanguage(lng);

  return (
    <div className={s.language_wrapper}>
      <button
        disabled={currentLang === LOCALS.UK}
        className={s.btn}
        onClick={() => {
          onHandleChange(LOCALS.UK);
        }}
      >
        UA
      </button>
      <button
        disabled={currentLang === LOCALS.EN}
        className={s.btn}
        onClick={() => {
          onHandleChange(LOCALS.EN);
        }}
      >
        EN
      </button>
    </div>
  );
};

export default LanguageBtn;
