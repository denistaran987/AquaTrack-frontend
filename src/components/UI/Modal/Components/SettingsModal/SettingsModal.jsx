import { useId } from 'react';
import * as Yup from 'yup';
import css from './SettingsModal.module.css';
import { ErrorMessage, Field, Form, Formik } from 'formik';

const SettingsModal = () => {
  const nameId = useId();
  const emailId = useId();
  const weightId = useId();
  const timeId = useId();
  const waterIntakeId = useId();

  const SettingSchema = Yup.object().shape({
    name: Yup.string().max(30),
    email: Yup.string().email('Invalid email'),
    weight: Yup.number()
      .min(30, 'Weight must be at least 30 kg')
      .max(500, 'Weight must be realistic'),
    time: Yup.number().min(0, 'Cannot be negative').max(24, 'Cannot exceed 24 hours'),
  });

  const handleSubmit = values => {
    console.log('submit:', values);
  };

  return (
    <Formik
      initialValues={{ name: '', email: '', weight: '', time: '' }}
      validationSchema={SettingSchema}
      onSubmit={handleSubmit}
      validateOnBlur={false}
      validateOnChange={false}
    >
      {({ errors, touched, setFieldTouched }) => (
        <Form className={css.modalBody}>
          <div className={css.avatarBlock}>
            <h2 className={css.title}>Setting</h2>
            <div className={css.avatarWrapper}>
              <img src="#" alt="avatar" />
            </div>
            <div className={css.uploadWrapper}>
              <label className={css.uploadLabel}>
                <svg className={css.uploadIcon}>
                  <use href="/images/icons.svg#icon-upload"></use>
                </svg>
                Upload a photo
                <Field type="file" className={css.uploadBtn} value="" />
              </label>
            </div>
          </div>
          <div className={css.infoBlock}>
            <div className={css.leftBlock}>
              <div className={css.genderBlock}>
                <p className={css.title}>Your gender identity</p>
                <div className={css.radioBtns}>
                  <label>
                    <Field type="radio" name="gender" value="woman" />
                    <span className={css.customRadio}></span>
                    Woman
                  </label>
                  <label>
                    <Field type="radio" name="gender" value="man" checked />
                    <span className={css.customRadio}></span>
                    Man
                  </label>
                </div>
              </div>
              <div className={css.inputBlock}>
                <div className={css.block}>
                  <label htmlFor={nameId} className={css.title}>
                    Your name
                  </label>
                  <Field
                    type="text"
                    name="name"
                    id={nameId}
                    className={`${touched.name && errors.name ? css.errorInput : ''}`}
                    onBlur={() => setFieldTouched('name', true)}
                  />
                  <ErrorMessage className={css.errorMessage} name="name" component="div" />
                </div>
                <div className={css.block}>
                  <label htmlFor={emailId} className={css.title}>
                    Email
                  </label>
                  <Field
                    type="text"
                    name="email"
                    id={emailId}
                    className={`${touched.email && errors.email ? css.errorInput : ''}`}
                    onBlur={() => setFieldTouched('email', true)}
                  />
                  <ErrorMessage className={css.errorMessage} name="email" component="div" />
                </div>
              </div>
              <div className={css.normaBlock}>
                <p className={css.title}>My daily norma</p>
                <div className={css.formulaBlock}>
                  <div className={css.formulaWrapper}>
                    <p>For woman:</p>
                    <p className={css.formula}>V=(M*0,03) + (T*0,4)</p>
                  </div>
                  <div className={css.formulaWrapper}>
                    <p>For man:</p>
                    <p className={css.formula}>V=(M*0,04) + (T*0,6)</p>
                  </div>
                </div>
                <div className={css.formulaInfo}>
                  <p className={css.text}>
                    <span className={css.asterisk}>*</span> V is the volume of the water norm in
                    liters per day, M is your body weight, T is the time of active sports, or
                    another type of activity commensurate in terms of loads (in the absence of
                    these, you must set 0)
                  </p>
                </div>
                <p className={css.mainText}>
                  <svg className={css.icon}>
                    <use href="./images/icons.svg#icon-exclamation-mark"></use>
                  </svg>
                  Active time in hours
                </p>
              </div>
            </div>
            <div className={css.rightBlock}>
              <div className={css.inputBlock}>
                <div className={css.block}>
                  <label htmlFor={weightId}>Your weight in kilograms:</label>
                  <Field
                    type="number"
                    name="weight"
                    id={weightId}
                    className={`${touched.weight && errors.weight ? css.errorInput : ''}`}
                    onBlur={() => setFieldTouched('weight', true)}
                  />
                  <ErrorMessage className={css.errorMessage} name="weight" component="div" />
                </div>
                <div className={css.block}>
                  <label htmlFor={timeId}>The time of active participation in sports:</label>
                  <Field
                    type="number"
                    name="time"
                    id={timeId}
                    className={`${touched.time && errors.time ? css.errorInput : ''}`}
                    onBlur={() => setFieldTouched('time', true)}
                  />
                  <ErrorMessage className={css.errorMessage} name="time" component="div" />
                </div>
              </div>
              <div className={css.inputBlock}>
                <div className={css.resultBlock}>
                  <p>The required amount of water in liters per day:</p>
                  <p className={css.result}>1.8 L</p>
                </div>
                <div className={css.block}>
                  <label htmlFor={waterIntakeId} className={css.title}>
                    Write down how much water you will drink:
                  </label>
                  <Field type="number" name="water" id={waterIntakeId} />
                </div>
              </div>
            </div>
          </div>
          <button type="submit" className={css.saveBtn}>
            Save
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default SettingsModal;
