import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch } from 'react-redux';
import { toggleModal } from '../../../../../redux/modal/slice.js';
import * as Yup from 'yup';
import styles from './WaterForm.module.css';

const validationSchema = Yup.object({
  date: Yup.string()
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Time must be in HH:mm format (00:00 - 23:59)')
    .required('Incorrect time'),
  amount: Yup.number()
    .min(50, 'Min Value - 50 ml')
    .max(1500, 'Max value - 1500 ml')
    .required('This field is required'),
});

const WaterForm = ({ type, initialData }) => {
  const dispatch = useDispatch();
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    setCurrentTime(`${hours}:${minutes}`);
  }, []);

  const defaultValues = {
    date: type === 'add' ? currentTime : initialData?.date || '07:00',
    amount: initialData?.amount || 50,
  };

  const handleSubmit = values => {
    console.log('Data form:', values);
    dispatch(toggleModal());
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
          <label>
            <p className={styles.p}>Amount of water:</p>
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
              <span className={styles.fixedValue}>{values.amount} ml</span>
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
            <p className={styles.p}>Recording time:</p>
            <Field type="text" name="date" className={styles.inputlight1} />
            <ErrorMessage name="date" component="div" className={styles.error} />
          </label>
          <label>
            <h3>Enter the value of the water used:</h3>
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
            Save
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default WaterForm;
