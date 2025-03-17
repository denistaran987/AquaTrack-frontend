import React from 'react';
import css from './ CustomTooltip.module.css';

const CustomTooltip = ({ payload, label, active }) => {
  if (!active || !payload || !payload.length) return null;

  return (
    <div className={css.customTooltip}>
      <p className={css.tooltipLabel}>{label}</p>
      <p className={css.tooltipValue}>{`${payload[0].value} ml`}</p>
    </div>
  );
};

export default CustomTooltip;
