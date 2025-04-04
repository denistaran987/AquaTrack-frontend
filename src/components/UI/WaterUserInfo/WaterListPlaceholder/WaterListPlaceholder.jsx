import { useTranslation } from 'react-i18next';
import css from './WaterListPlaceholder.module.css';

const WaterPlaceholder = () => {
  const { t } = useTranslation();
  return (
    <div className={css.placeholderContainer}>
      <h2 className={css.title}>{t('waterUserInfo.list')}</h2>
      <p className={css.text}>{t('waterUserInfo.text')}</p>
    </div>
  );
};

export default WaterPlaceholder;
