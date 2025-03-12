import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styles from './EditWaterModal.module.css';

// Схема валидации
const validationSchema = Yup.object({
  time: Yup.string().required('Incorrect time'),
  usedAmount: Yup.number()
    .min(50, 'Min Value - 50 ml')
    .max(1500, 'Max value - 1500 ml')
    .required('This field is required'),
});

const EditWaterModal = ({ onClose }) => {
  const initialValues = {
    time: '07:00',
    usedAmount: 250, 
  };

  const handleSubmit = (values) => {
    console.log('Data form:', values);
    onClose();
  };

  return (
    <div className={`${styles.editWaterModal}`}>
      <h2>Edit the entered amount <br /> of water</h2>
      <h3>Correct entered data:</h3>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, values }) => (
          <Form>
            
            <label>
              <p className={styles.p}>Amount of water:</p>
              <div className={styles.inputContainer}>
                <button
                  type="button"
                  onClick={() => {
                    const newValue = Math.max(50, values.usedAmount - 50); 
                    setFieldValue('usedAmount', newValue);
                  }}
                  className={styles.button}
                >
                  <svg className={styles.icon}>
                    <use href="/images/icons.svg#icon-minus-circle" />
                  </svg>
                </button>
                <span className={styles.fixedValue}>50 ml</span> 
                <button
                  type="button"
                  onClick={() => {
                    const newValue = Math.min(1500, values.usedAmount + 50); 
                    setFieldValue('usedAmount', newValue);
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
              <Field type="time" name="time" className={styles.inputlight1} />
              <ErrorMessage name="time" component="div" className={styles.error} />
            </label>

            
            <label>
              <h3>Enter the value of the water used:</h3>
              <Field
                type="number"
                name="usedAmount"
                className={styles.inputlight2}
                onChange={(e) => {
                  const value = e.target.value;
                  setFieldValue('usedAmount', value); 
                }}
              />
              <ErrorMessage name="usedAmount" component="div" className={styles.error} />
            </label>

         
            <button type="submit" className={styles.saveButton}>Save</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditWaterModal;