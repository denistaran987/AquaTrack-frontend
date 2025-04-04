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
import axios from 'axios';
import { FcGoogle } from 'react-icons/fc';

const SignInPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const { t } = useTranslation();

  const SignInSchema = Yup.object().shape({
    email: Yup.string().email(t('validation.valid_email')).required(t('validation.required')),
    password: Yup.string()
      .min(6, t('validation.password_min'))
      .max(20, t('validation.password_max'))
      .required(t('validation.required')),
  });

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  const handleSubmit = (values, { resetForm }) => {
    dispatch(signInUser(values))
      .unwrap()
      .then(() => {
        const username = values.email.split('@')[0];
        toast.success(t(`notifications.welcome`, { email: username }), {
          style: { backgroundColor: '#9be1a0', fontWeight: 'medium' },
          iconTheme: { primary: 'white', secondary: 'black' },
        });

        resetForm();
        setTimeout(() => navigate('/tracker'), 2000);
      })
      .catch(error => {
        const errorMessages = {
          400: t('notifications.400'),
          401: t('notifications.401'),
          404: t('notifications.404'),
          500: t('notifications.500'),
        };

        if (typeof error === 'string') {
          toast.error(error, {
            style: { backgroundColor: '#FFCCCC', fontWeight: 'semibold' },
            iconTheme: {
              primary: 'white',
              secondary: 'red',
            },
          });
          return;
        }

        const message = errorMessages[error?.status] || t('validation.unknown');
        toast.error(message, { style: { backgroundColor: '#FFCCCC', fontWeight: 'medium' } });
      });
  };

  const handleGoogleLogin = async () => {
    try {
      const response = await axios.get('/auth/get-oauth-url');
      let url = response.data.data.url;

      url = url.includes('prompt=')
        ? url.replace(/prompt=\w+/, 'prompt=select_account')
        : `${url}&prompt=select_account`;

      window.location.href = url;
    } catch (e) {
      console.log('Error during getting OAuth url:', e);
    }
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
        <button type="button" onClick={handleGoogleLogin} className={styles.googlelink}>
          <FcGoogle />
          {t('common.sing_up_google')}
        </button>
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
