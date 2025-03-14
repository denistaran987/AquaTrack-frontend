import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { resetPassword } from '../../../../../redux/auth/operations';
import toast from 'react-hot-toast';
import styles from './ResetPasswordModal.module.css';

const ResetPasswordSchema = Yup.object().shape({
  password: Yup.string().min(6, 'Password is too short!').required('Required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Required'),
});

const ResetPasswordModal = ({ onClose, token }) => {
  console.log('onClose prop:', onClose);

  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword((prev) => !prev);

  const handleClose = () => {
    if (typeof onClose === 'function') {
      onClose();
    } else {
      console.error('onClose is not a function:', onClose);
    }
  };

  const handleSubmit = async (values, { resetForm }) => {
    setIsSubmitting(true);
    try {
      await dispatch(resetPassword({ token, password: values.password })).unwrap();
      toast.success('Password reset successfully!');
      resetForm();

      handleClose();
    } catch (error) {
      toast.error(error.message || 'Failed to reset password');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={(e) => e.target === e.currentTarget && handleClose()}>
      <div className={styles.modalContent}>
        <h2 className={styles.modalHeader}>Reset Password</h2>
        <Formik
          initialValues={{ password: '', confirmPassword: '' }}
          validationSchema={ResetPasswordSchema}
          onSubmit={handleSubmit}
        >
          {({ touched, errors, setFieldTouched }) => (
            <Form className={styles.form}>
              <div className={styles.passwordWrapper}>
                <Field
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="New password"
                  className={`${styles.inputField} ${touched.password && errors.password ? styles.errorInput : ''}`}
                  onBlur={() => setFieldTouched('password', true)}
                />
                <button type="button" onClick={togglePasswordVisibility} className={styles.togglePassword}>
                  <svg className={styles.icon} width="24" height="24">
                    <use xlinkHref={`/images/icons.svg#${showPassword ? 'icon-eye' : 'icon-eye-off'}`} />
                  </svg>
                </button>
              </div>
              <ErrorMessage name="password" component="div" className={styles.error} />

              <div className={styles.passwordWrapper}>
                <Field
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirm password"
                  className={`${styles.inputField} ${touched.confirmPassword && errors.confirmPassword ? styles.errorInput : ''}`}
                  onBlur={() => setFieldTouched('confirmPassword', true)}
                />
                <button type="button" onClick={toggleConfirmPasswordVisibility} className={styles.togglePassword}>
                  <svg className={styles.icon} width="24" height="24">
                    <use xlinkHref={`/images/icons.svg#${showConfirmPassword ? 'icon-eye' : 'icon-eye-off'}`} />
                  </svg>
                </button>
              </div>
              <ErrorMessage name="confirmPassword" component="div" className={styles.error} />

              <div className={styles.buttonContainer}>
                <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
                  Reset Password
                </button>
                <button type="button" className={styles.closeButton} onClick={handleClose}>
                  Close
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ResetPasswordModal;