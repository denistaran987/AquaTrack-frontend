import React from 'react';
import WaterForm from '../WaterForm/WaterForm.jsx';
import styles from './WaterModal.module.css';
import i18n from 'i18next';

const WaterModal = ({ type, initialData }) => {
  const title =
    type === 'add' ? i18n.t('common.add_water') : i18n.t('waterModal.edit_entered_amount');
  const subtitle =
    type === 'add' ? i18n.t('waterModal.entered_data') : i18n.t('waterModal.choose_value');

  return (
    <div className={`${styles.waterModal}`}>
      <h2>{title}</h2>
      <h3>{subtitle}</h3>
      <WaterForm type={type} initialData={initialData} />
    </div>
  );
};

export default WaterModal;
