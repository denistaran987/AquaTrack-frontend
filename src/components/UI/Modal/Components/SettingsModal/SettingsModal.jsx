import { useEffect, useId, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import css from './SettingsModal.module.css';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { updateUserInfo, updateUserAvatar } from '../../../../../redux/user/operations';
import {
  selectUserAvatarUrl,
  selectUserDailyNorm,
  selectUserDailySportTime,
  selectUserEmail,
  selectUserGender,
  selectUserId,
  selectUserIsLoading,
  selectUserName,
  selectUserWeight,
} from '../../../../../redux/user/selectors';
import { toggleModal } from '../../../../../redux/modal/slice';
import toast from 'react-hot-toast';
import { ClipLoader, ClockLoader } from 'react-spinners';

const SettingsModal = () => {
  const dispatch = useDispatch();

  const successStyle = { backgroundColor: '#9be1a0', fontWeight: 'medium' };
  const errorStyle = { backgroundColor: '#FFCCCC', fontWeight: 'medium' };
  const successIconTheme = { primary: 'white', secondary: 'black' };
  const errorIconTheme = { primary: 'white', secondary: 'red' };

  const userId = useSelector(selectUserId);
  const userAvatar = useSelector(selectUserAvatarUrl);
  const username = useSelector(selectUserName);
  const userEmail = useSelector(selectUserEmail);
  const userWeight = useSelector(selectUserWeight);
  const userDailySportTime = useSelector(selectUserDailySportTime);
  const userGender = useSelector(selectUserGender);
  const userDailyNorm = useSelector(selectUserDailyNorm);
  const isLoading = useSelector(selectUserIsLoading);

  console.log(userGender);

  const [weight, setWeight] = useState(0);
  const [dailySportTime, setDailySportTime] = useState(0);
  const [dailyNorm, setDailyNorm] = useState(0);
  const [gender, setGender] = useState(userGender);

  const handleChangeWeight = event => {
    setWeight(event.target.value);
  };

  const handleChangeDailySportTime = event => {
    setDailySportTime(event.target.value);
  };

  const handleGenderChange = event => {
    setGender(event.target.value);
  };

  useEffect(() => {
    if (gender === 'female') {
      setDailyNorm(weight * 0.03 + dailySportTime * 0.4);
      return;
    }
    setDailyNorm(weight * 0.04 + dailySportTime * 0.6);
  }, [weight, dailySportTime, dailyNorm, gender]);

  const nameId = useId();
  const emailId = useId();
  const weightId = useId();
  const timeId = useId();
  const waterIntakeId = useId();

  const SettingSchema = Yup.object().shape({
    name: Yup.string().max(10).required(),
    email: Yup.string().email('Invalid email').required(),
    weight: Yup.number().min(0, 'Can not be negative').max(500, 'Weight must be realistic'),
    dailySportTime: Yup.number().min(0, 'Can not be negative').max(24, 'Can not exceed 24 hours'),
    dailyNorm: Yup.number().min(0, 'Can not be negative').max(5, 'Can not be more than 5'),
  });

  const handleSubmit = async values => {
    try {
      const { avatar: _avatar, dailyNorm, ...valuesToSend } = values;

      const updatedValues = {
        ...valuesToSend,
        dailyNorm: dailyNorm * 1000,
      };

      /* eslint-disable no-unused-vars */
      const filteredValues = Object.fromEntries(
        Object.entries(updatedValues).filter(
          ([_, value]) => value !== '' && value !== null && value !== undefined
        )
      );

      if (Object.keys(filteredValues).length === 1) {
        toast.error('No changes detected. Please fill in at least one field.', {
          style: errorStyle,
          iconTheme: errorIconTheme,
        });
        return;
      }

      await dispatch(updateUserInfo(filteredValues)).unwrap();
      toast.success('Successfully updated!', {
        style: successStyle,
        iconTheme: successIconTheme,
      });
      dispatch(toggleModal());
    } catch (error) {
      toast.error(`${error}: Please check all the fields!`, {
        style: errorStyle,
        iconTheme: errorIconTheme,
      });
    }
  };

  const handleAvatarUpload = async event => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('id', userId);
      formData.append('avatarUrl', file);

      try {
        await dispatch(updateUserAvatar(formData)).unwrap();
        toast.success('Successfully updated avatar!', {
          style: successStyle,
          iconTheme: successIconTheme,
        });
      } catch (error) {
        toast.error(`${error}: Failed to update avatar`, {
          style: errorStyle,
          iconTheme: errorIconTheme,
        });
      }
    }
  };

  return (
    <Formik
      initialValues={{
        name: username,
        email: userEmail,
        weight: userWeight,
        dailySportTime: userDailySportTime,
        avatar: '',
        gender: userGender,
        dailyNorm: userDailyNorm / 1000,
      }}
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
              {isLoading ? (
                <ClipLoader size={50} color="#9BE1A0" />
              ) : (
                <img src={userAvatar} alt="avatar" />
              )}
            </div>
            <div className={css.uploadWrapper}>
              <label className={css.uploadLabel}>
                <svg className={css.uploadIcon}>
                  <use href="/images/icons.svg#icon-upload"></use>
                </svg>
                Upload a photo
                <Field
                  type="file"
                  className={css.uploadBtn}
                  onChange={handleAvatarUpload}
                  accept="image/*"
                  name="avatar"
                />
              </label>
            </div>
          </div>
          <div className={css.infoBlock}>
            <div className={css.leftBlock}>
              <div className={css.genderBlock}>
                <p className={css.title}>Your gender identity</p>
                <div className={css.radioBtns}>
                  <label>
                    <Field type="radio" name="gender" value="female" />
                    <span className={css.customRadio}></span>
                    Woman
                  </label>
                  <label>
                    <Field type="radio" name="gender" value="male" />
                    <span className={css.customRadio}></span>
                    Man
                  </label>
                </div>
              </div>
              <div className={css.uploadWrapper}>
                <label className={css.uploadLabel}>
                  <svg className={css.uploadIcon}>
                    <use href="/images/icons.svg#icon-upload"></use>
                  </svg>
                  Upload a photo
                  <Field
                    type="file"
                    className={css.uploadBtn}
                    onChange={handleAvatarUpload}
                    accept="image/*"
                    name="avatar"
                  />
                </label>
              </div>
            </div>
            <div className={css.infoBlock}>
              <div className={css.leftBlock}>
                <div className={css.genderBlock}>
                  <p className={css.title}>Your gender identity</p>
                  <div className={css.radioBtns}>
                    <label>
                      <Field
                        type="radio"
                        name="gender"
                        value="female"
                        checked={gender === 'female'}
                        onChange={handleGenderChange}
                      />
                      <span className={css.customRadio}></span>
                      Woman
                    </label>
                    <label>
                      <Field
                        type="radio"
                        name="gender"
                        value="male"
                        checked={gender === 'male'}
                        onChange={handleGenderChange}
                      />
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
                      value={weight}
                      onChange={handleChangeWeight}
                    />
                    <ErrorMessage className={css.errorMessage} name="weight" component="div" />
                  </div>
                  <div className={css.block}>
                    <label htmlFor={timeId}>The time of active participation in sports:</label>
                    <Field
                      type="number"
                      name="dailySportTime"
                      id={timeId}
                      className={`${touched.time && errors.time ? css.errorInput : ''}`}
                      onBlur={() => setFieldTouched('dailySportTime', true)}
                      value={dailySportTime}
                      onChange={handleChangeDailySportTime}
                    />
                    <ErrorMessage
                      className={css.errorMessage}
                      name="dailySportTime"
                      component="div"
                    />
                  </div>
                </div>
                <div className={css.inputBlock}>
                  <div className={css.resultBlock}>
                    <p>
                      The required amount of water in liters per day:{' '}
                      <span className={css.result}>{`${dailyNorm.toFixed(1)}L`}</span>
                    </p>
                  </div>
                  <div className={css.block}>
                    <label htmlFor={waterIntakeId} className={css.title}>
                      Write down how much water you will drink:
                    </label>
                    <Field type="number" name="dailyNorm" id={waterIntakeId} />
                    <ErrorMessage className={css.errorMessage} name="dailyNorm" component="div" />
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
    </div>
  );
};

export default SettingsModal;
