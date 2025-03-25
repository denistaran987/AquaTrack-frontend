import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../Logo/Logo';
import styles from './SignInForm.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { signInUser } from '../../../redux/auth/operations';
import toast from 'react-hot-toast';
import { selectIsLoading } from '../../../redux/auth/selectors';
import Loader from '../../Utils/Loader/Loader';

import { setPosition, toggleModal } from '../../../redux/modal/slice';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import LanguageBtn from '../LanguageBtn/languageBtn';
import { useTranslation } from 'react-i18next';

const SignInSchema = Yup.object().shape({
  email: Yup.string().email('Enter a valid email').required('Required'),
  password: Yup.string().min(6, 'Too short!').required('Required'),
});

const SignInPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const { t } = useTranslation();

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  const handleSubmit = (values, { resetForm }) => {
    dispatch(signInUser(values))
      .unwrap()
      .then(() => {
        toast.success(t(`notifications.welcome`), {
          style: { backgroundColor: '#9be1a0', fontWeight: 'medium' },
          iconTheme: { primary: 'white', secondary: 'black' },
        });

        resetForm();
        setTimeout(() => navigate('/tracker'), 2000);
      })
      .catch(error => {
        const errorMessages = {
          400: 'Bad request. Invalid input data.',
          401: 'Unauthorized. Session not found.',
          404: 'User not found.',
          409: 'A contact with this email already exists.',
          500: 'Something went wrong. Please try again later.',
        };

        const message = errorMessages[error?.status] || t('validation.unknow');
        toast.error(message, { style: { backgroundColor: '#FFCCCC', fontWeight: 'medium' } });
      });
  };

  return (
    <section className={styles.section}>
      {isLoading && <Loader />}
      <Logo />
      <ThemeToggle />
      <section className={styles.signinSection}>
        <LanguageBtn />
        <h2 className={styles.title}>{t('common.sign_in')}</h2>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={SignInSchema}
          onSubmit={handleSubmit}
          validateOnBlur={false}
          validateOnChange={false}
        >
          {({ errors, touched, handleSubmit, setFieldTouched }) => (
            <Form className={styles.signinForm} noValidate onSubmit={handleSubmit}>
              <label className={styles.label}>{t('common.email')}</label>
              <Field
                name="email"
                type="email"
                placeholder={t('notifications.email_placeholder')}
                className={`${styles.input} ${
                  touched.email && errors.email ? styles.errorInput : ''
                }`}
                onBlur={() => setFieldTouched('email', true)}
              />
              <ErrorMessage name="email" component="div" className={styles.errorMessage} />

              <label className={styles.label}>{t('common.password')}</label>
              <div className={styles.passwordWrapper}>
                <Field
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder={t('notifications.password_placeholder')}
                  className={`${styles.input} ${
                    touched.password && errors.password ? styles.errorInput : ''
                  }`}
                  onBlur={() => setFieldTouched('password', true)}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className={styles.togglePassword}
                >
                  <svg className={styles.icon} width="24" height="24">
                    <use
                      xlinkHref={`/images/icons.svg#${showPassword ? 'icon-eye' : 'icon-eye-off'}`}
                    />
                  </svg>
                </button>
              </div>
              <ErrorMessage name="password" component="div" className={styles.errorMessage} />

              <p className={styles.forgotPassword}>
                {t('signInForm.forgot_password')}{' '}
                <a
                  href="#"
                  onClick={e => {
                    e.preventDefault();
                    dispatch(toggleModal('forgotPassword'), dispatch(setPosition('null')));
                  }}
                  className={styles.forgotPasswordLink}
                >
                  {t('signInForm.click_here')}
                </a>{' '}
                {t('signInForm.reset_password')}
              </p>

              <button type="submit" className={styles.signinBtn}>
                {t('common.sign_in')}
              </button>
            </Form>
          )}
        </Formik>

        <p className={styles.signupLink}>
          {t('signInForm.have_account')}{' '}
          <Link to="/signup" className={styles.signupLinkText}>
            {t('common.sign_up')}
          </Link>
        </p>
      </section>
    </section>
  );
};

export default SignInPage;
