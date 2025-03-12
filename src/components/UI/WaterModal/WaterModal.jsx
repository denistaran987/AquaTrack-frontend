import React from 'react';
import WaterForm from '../WaterForm/WaterForm.jsx';
import styles from './WaterModal.module.css';

const WaterModal = ({ type, onClose, initialData }) => {
  const title = type === 'add' ? 'Add water' : 'Edit the entered amount of water';
  const subtitle = type === 'add' ? 'Choose a value' : 'Correct entered data:';

  return (
    <div className={`${styles.waterModal}`}>
      <h2>{title}</h2>
      <h3>{subtitle}</h3>
      <WaterForm type={type} initialData={initialData} onClose={onClose} />
    </div>
  );
};

export default WaterModal;