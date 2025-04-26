import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { toggleModal } from '../../../../../redux/modal/slice.js';
import * as Yup from 'yup';
import styles from './WaterForm.module.css';
import { addWaterEntry, editWaterEntry } from '../../../../../redux/water/operations.js';
import toast from 'react-hot-toast';
import {
  selectWaterCurrentDate,
  selectWaterId,
  selectWaterItemInfo,
} from '../../../../../redux/water/selectors.js';
import { useTranslation } from 'react-i18next';
import { addTotalDayWater, editTotalDayWater } from '../../../../../redux/water/slice.js';

const WaterForm = ({ type, initialData }) => {
  const WaterId = useSelector(selectWaterId);
  const waterItem = useSelector(state => selectWaterItemInfo(state, WaterId));
  const currentDate = useSelector(selectWaterCurrentDate);
  const dispatch = useDispatch();
  const [currentTime, setCurrentTime] = useState('');
  const { t } = useTranslation();

  const validationSchema = Yup.object({
    date: Yup.string()
      .matches(/^([01]\d|2[0-3]):([0-5]\d)$/, t('validation.wrong_time'))
      .required(t('validation.incorrect_time')),
    amount: Yup.number()
      .min(50, t('validation.min_value_ml', { value: 50 }))
      .max(1500, t('validation.max_value_ml', { value: 1500 }))
      .required(t('validation.required')),
  });

  useEffect(() => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    setCurrentTime(`${hours}:${minutes}`);
  }, []);

  const defaultValues = {
    date:
      type === 'add'
        ? currentTime
        : initialData?.date?.slice(11, 16) || waterItem.date.slice(11, 16),
    amount: type === 'add' ? 50 : initialData?.amount || waterItem.amount,
  };

  const handleSubmit = values => {
    const formattedDate = currentDate.slice(0, 10) + `T${values.date}:00.000Z`;

    const payload = {
      ...values,
      date: formattedDate,
    };

    if (type === 'add') {
      dispatch(addTotalDayWater(payload))
      dispatch(addWaterEntry(payload))
      
        .unwrap()
        .then(() => {
          toast.success(t('notifications.water_added'), {
            style: { backgroundColor: '#9be1a0', fontWeight: 'medium' },
            iconTheme: { primary: 'white', secondary: 'black' },
          });
          dispatch(toggleModal());
        })
        .catch(() => {
          toast.error(t('notifications.wrong_message'), {
            style: { backgroundColor: '#FFCCCC', fontWeight: 'medium' },
          });
        });
    }

    if (type === 'edit') {
      dispatch(editTotalDayWater({_id: WaterId, amount: payload.amount, date:payload.date}))
      dispatch(editWaterEntry({ entryId: WaterId, entryData: payload }))
        .unwrap()
        .then(() => {
          toast.success(t('notifications.water_updated'), {
            style: { backgroundColor: '#9be1a0', fontWeight: 'medium' },
            iconTheme: { primary: 'white', secondary: 'black' },
          });
          dispatch(toggleModal());
        })
        .catch(() => {
          toast.error(t('notifications.wrong_update'), {
            style: { backgroundColor: '#FFCCCC', fontWeight: 'medium' },
          });
        });
    }
  };

  return (
    <Formik
      initialValues={defaultValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({ setFieldValue, values }) => (
        <Form>
          <label className={styles.label}>
            <p className={styles.p}>{t('waterModal.water_amount')}</p>
            <div className={styles.inputContainer}>
              <button
                type="button"
                onClick={() => {
                  const newValue = Math.max(50, Number(values.amount) - 50);
                  setFieldValue('amount', newValue);
                }}
                className={styles.button}
              >
                <svg className={styles.icon}>
                  <use href="/images/icons.svg#icon-minus-circle" />
                </svg>
              </button>
              <span className={styles.fixedValue}>
                {values.amount} {t('waterUserInfo.ml')}
              </span>
              <button
                type="button"
                onClick={() => {
                  const newValue = Math.min(1500, Number(values.amount) + 50);
                  setFieldValue('amount', newValue);
                }}
                className={styles.button}
              >
                <svg className={styles.icon}>
                  <use href="/images/icons.svg#icon-plus-circle" />
                </svg>
              </button>
            </div>
          </label>
          <label>
            <p className={styles.p}>{t('waterModal.record_time')}</p>
            <Field type="text" name="date" className={styles.inputlight1} />
            <ErrorMessage name="date" component="div" className={styles.error} />
          </label>
          <label>
            <h3>{t('waterModal.enter_water_value')}</h3>
            <Field
              type="number"
              name="amount"
              className={styles.inputlight2}
              onChange={e => {
                const value = e.target.value;
                if (value === '') {
                  setFieldValue('amount', '');
                } else {
                  setFieldValue('amount', Number(value));
                }
              }}
              onBlur={e => {
                if (e.target.value === '') {
                  setFieldValue('amount', 50);
                }
              }}
            />
            <ErrorMessage name="amount" component="div" className={styles.error} />
          </label>

          <button type="submit" className={styles.saveButton}>
            {t('common.save')}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default WaterForm;
