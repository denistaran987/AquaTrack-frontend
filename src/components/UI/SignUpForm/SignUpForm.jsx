import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../Logo/Logo';
import styles from './SignUpForm.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../../redux/auth/operations';
import toast from 'react-hot-toast';
import Loader from '../../Utils/Loader/Loader';
import { selectIsLoading } from '../../../redux/auth/selectors';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import { useTranslation } from 'react-i18next';
import LanguageBtn from '../LanguageBtn/languageBtn';

const SignUpSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      'Invalid email format. Example: userexample@mail.com'
    )
    .required('Required'),
  password: Yup.string().min(6, 'Too short!').required('Required'),
  repeatPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Required'),
});

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState({
    password: false,
    repeatPassword: false,
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const { t } = useTranslation();

  const togglePasswordVisibility = field => {
    setShowPassword(prev => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleSubmit = (values, { resetForm }) => {
    const { repeatPassword, ...userData } = values;
    console.log('Repeat Password:', repeatPassword);

    dispatch(registerUser(userData))
      .unwrap()
      .then(() => {
        toast.success(`Registration successful! Welcome, User!`, {
          style: { backgroundColor: '#9be1a0', fontWeight: 'semibold' },
          iconTheme: { primary: 'white', secondary: 'black' },
        });

        resetForm();

        setTimeout(() => {
          navigate('/tracker');
        }, 2000);
      })
      .catch(error => {
        const errorMessages = {
          400: 'Bad request. Invalid input data.',
          401: 'Unauthorized. Session not found.',
          404: 'Resource not found.',
          409: 'A contact with this email already exists.',
          500: 'Something went wrong. Please try again later.',
        };

        if (typeof error === 'string') {
          toast.error(error);
          return;
        }

        const status = error?.status;
        const message = errorMessages[status] || t('validation.unknow');

        toast.error(message, {
          style: { backgroundColor: '#FFCCCC', fontWeight: 'semibold' },
          iconTheme: {
            primary: 'white',
            secondary: 'red',
          },
        });
      });
  };

  return (
    <section className={styles.section}>
      {isLoading && <Loader />}
      <Logo />
      <ThemeToggle />
      <LanguageBtn />
      <section className={styles.signupSection}>
        <h2 className={styles.title}>{t('common.sign_up')}</h2>
        <Formik
          initialValues={{ email: '', password: '', repeatPassword: '' }}
          validationSchema={SignUpSchema}
          onSubmit={handleSubmit}
          validateOnBlur={false}
          validateOnChange={false}
        >
          {({ errors, touched, handleSubmit, setFieldTouched }) => (
            <Form className={styles.signupForm} noValidate onSubmit={handleSubmit}>
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
                  type={showPassword.password ? 'text' : 'password'}
                  placeholder={t('notifications.password_placeholder')}
                  className={`${styles.input} ${
                    touched.password && errors.password ? styles.errorInput : ''
                  }`}
                  onBlur={() => setFieldTouched('password', true)}
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility('password')}
                  className={styles.togglePassword}
                >
                  <svg className={styles.icon} width="24" height="24">
                    <use
                      xlinkHref={`/images/icons.svg#${
                        showPassword.password ? 'icon-eye' : 'icon-eye-off'
                      }`}
                    />
                  </svg>
                </button>
              </div>
              <ErrorMessage name="password" component="div" className={styles.errorMessage} />

              <label className={styles.label}>{t('common.repeat_password')}</label>
              <div className={styles.passwordWrapper}>
                <Field
                  name="repeatPassword"
                  type={showPassword.repeatPassword ? 'text' : 'password'}
                  placeholder={t('notifications.repeat_password_placeholder')}
                  className={`${styles.input} ${
                    touched.repeatPassword && errors.repeatPassword ? styles.errorInput : ''
                  }`}
                  onBlur={() => setFieldTouched('repeatPassword', true)}
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility('repeatPassword')}
                  className={styles.togglePassword}
                >
                  <svg className={styles.icon} width="24" height="24">
                    <use
                      xlinkHref={`/images/icons.svg#${
                        showPassword.repeatPassword ? 'icon-eye' : 'icon-eye-off'
                      }`}
                    />
                  </svg>
                </button>
              </div>
              <ErrorMessage name="repeatPassword" component="div" className={styles.errorMessage} />

              <button type="submit" className={styles.signupBtn}>
                {t('common.sign_up')}
              </button>
            </Form>
          )}
        </Formik>
        <p className={styles.signinLink}>
          {t('signUpForm.have_account')}
          <Link to="/signin" className={styles.signinLinkText}>
            {t('common.sign_in')}
          </Link>
        </p>
      </section>
    </section>
  );
};

export default SignUpPage;
