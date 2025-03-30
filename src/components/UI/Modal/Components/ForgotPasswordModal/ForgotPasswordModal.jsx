import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { sendResetEmail } from '../../../../../redux/auth/operations';
import toast from 'react-hot-toast';
import { toggleModal } from '../../../../../redux/modal/slice';
import styles from './ForgotPasswordModal.module.css';
import { useTranslation } from 'react-i18next';

const ForgotPasswordModal = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const ForgotPasswordSchema = Yup.object().shape({
    email: Yup.string().email(t('validation.invalid_email')).required(t('validation.required')),
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (values, { resetForm }) => {
    setIsSubmitting(true);
    try {
      await dispatch(sendResetEmail(values.email)).unwrap();
      toast.success(t('notifications.reset_link'), {
        style: { backgroundColor: '#9be1a0', fontWeight: 'medium' },
        iconTheme: { primary: 'white', secondary: 'black' },
      });
      resetForm();
      dispatch(toggleModal());
    } catch (error) {
      toast.error(error.message || t('notifications.failed_reset_link'), {
        style: { backgroundColor: '#FFCCCC', fontWeight: 'medium' },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.modalContent}>
      <h2 className={styles.modalHeader}>{t('ForgotPasswordModal.title')}</h2>
      <p className={styles.modalText}>{t('ForgotPasswordModal.text')}</p>
      <Formik
        initialValues={{ email: '' }}
        validationSchema={ForgotPasswordSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, submitCount, setFieldTouched }) => (
          <Form>
            <Field
              name="email"
              type="email"
              placeholder={t('notifications.email_placeholder')}
              className={`${styles.inputField} ${
                submitCount > 0 && errors.email ? styles.errorInput : ''
              }`}
              onBlur={() => setFieldTouched('email', true)}
            />
            <ErrorMessage name="email" component="div" className={styles.error} />

            <button className={styles['button-send']} type="submit" disabled={isSubmitting}>
              {t('common.send_reset_link')}
            </button>
            <button
              className={styles['button-close']}
              type="button"
              onClick={() => dispatch(toggleModal())}
            >
              {t('common.close')}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ForgotPasswordModal;
