import { useId } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import css from './SettingsModal.module.css';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { updateUserInfo, updateUserAvatar } from '../../../../../redux/user/operations';
import {
  selectDailyNorm,
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
import { ClipLoader } from 'react-spinners';
import { setDailySportTime, setGender, setWeight } from '../../../../../redux/user/slice';
import { useTranslation } from 'react-i18next';

const SettingsModal = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const successStyle = { backgroundColor: '#9be1a0', fontWeight: 'medium' };
  const errorStyle = { backgroundColor: '#FFCCCC', fontWeight: 'medium' };
  const successIconTheme = { primary: 'white', secondary: 'black' };
  const errorIconTheme = { primary: 'white', secondary: 'red' };

  const userId = useSelector(selectUserId);
  const userAvatar = useSelector(selectUserAvatarUrl);
  const userName = useSelector(selectUserName);
  const userEmail = useSelector(selectUserEmail);
  const userWeight = useSelector(selectUserWeight);
  const userDailySportTime = useSelector(selectUserDailySportTime);
  const userGender = useSelector(selectUserGender);
  const userDailyNorm = useSelector(selectUserDailyNorm);
  const isLoading = useSelector(selectUserIsLoading);
  const recommendedDailyUserNorm = useSelector(selectDailyNorm);

  const handleChangeWeight = (e, setFieldValue) => {
    const value = e.target.value === '' ? '' : +e.target.value;
    setFieldValue('weight', value);
    console.log(value);
    dispatch(setWeight(value));
  };

  const handleChangeDailySportTime = (e, setFieldValue) => {
    const value = e.target.value === '' ? '' : +e.target.value;
    setFieldValue('dailySportTime', value);
    console.log(value);
    dispatch(setDailySportTime(value));
  };

  const handleGenderChange = (e, setFieldValue) => {
    const value = e.target.value;
    setFieldValue('gender', value);
    dispatch(setGender(value));
  };

  const nameId = useId();
  const emailId = useId();
  const weightId = useId();
  const timeId = useId();
  const waterIntakeId = useId();

  const SettingSchema = Yup.object().shape({
    name: Yup.string().max(20).required(t('validation.required')),
    email: Yup.string().email(t('validation.valid_email')).required(t('validation.required')),
    weight: Yup.number()
      .min(0, t('validation.negative'))
      .max(500, t('validation.weight_realistic')),
    dailySportTime: Yup.number()
      .min(0, t('validation.negative'))
      .max(24, t('validation.max_hours')),
    dailyNorm: Yup.number()
      .min(0.5, t('validation.min_daily_norm'))
      .max(5, t('validation.max_daily_norm')),
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
          ([_, value]) =>
            value !== '' && value !== ' ' && value !== 0 && value !== null && value !== undefined
        )
      );

      await dispatch(updateUserInfo(filteredValues)).unwrap();
      toast.success(t('notifications.successfully_updated'), {
        style: successStyle,
        iconTheme: successIconTheme,
      });
      dispatch(toggleModal());
    } catch (error) {
      toast.error(error, {
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
        toast.success(t('notifications.avatar'), {
          style: successStyle,
          iconTheme: successIconTheme,
        });
      } catch (error) {
        toast.error(error, {
          style: errorStyle,
          iconTheme: errorIconTheme,
        });
      }
    }
  };

  return (
    <Formik
      initialValues={{
        name: userName,
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
      {({ errors, touched, setFieldTouched, setFieldValue }) => (
        <Form className={css.modalBody}>
          <div className={css.avatarBlock}>
            <h2 className={css.title}>{t('common.setting')}</h2>
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
                {t('settingModal.photo')}
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
                <p className={css.title}>{t('settingModal.gender')}</p>
                <div className={css.radioBtns}>
                  <label>
                    <Field
                      type="radio"
                      name="gender"
                      value="female"
                      checked={userGender === 'female'}
                      onChange={e => handleGenderChange(e, setFieldValue)}
                    />
                    <span className={css.customRadio}></span>
                    {t('settingModal.woman')}
                  </label>
                  <label>
                    <Field
                      type="radio"
                      name="gender"
                      value="male"
                      checked={userGender === 'male'}
                      onChange={e => handleGenderChange(e, setFieldValue)}
                    />
                    <span className={css.customRadio}></span>
                    {t('settingModal.man')}
                  </label>
                </div>
              </div>
              <div className={css.inputBlock}>
                <div className={css.block}>
                  <label htmlFor={nameId} className={css.title}>
                    {t('settingModal.name')}
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
                    {t('settingModal.email')}
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
                <p className={css.title}>{t('settingModal.daily_norma')}</p>
                <div className={css.formulaBlock}>
                  <div className={css.formulaWrapper}>
                    <p>{t('settingModal.for_woman')}</p>
                    <p className={css.formula}>V=(M*0,03) + (T*0,4)</p>
                  </div>
                  <div className={css.formulaWrapper}>
                    <p>{t('settingModal.for_woman')}</p>
                    <p className={css.formula}>V=(M*0,04) + (T*0,6)</p>
                  </div>
                </div>
                <div className={css.formulaInfo}>
                  <p className={css.text}>
                    <span className={css.asterisk}>*</span>
                    {t('settingModal.text')}
                  </p>
                </div>
                <p className={css.mainText}>
                  <svg className={css.icon}>
                    <use href="./images/icons.svg#icon-exclamation-mark"></use>
                  </svg>
                  {t('settingModal.active_time')}
                </p>
              </div>
            </div>
            <div className={css.rightBlock}>
              <div className={css.inputBlock}>
                <div className={css.block}>
                  <label htmlFor={weightId}>{t('settingModal.your_weight')}</label>
                  <Field
                    type="number"
                    name="weight"
                    id={weightId}
                    className={`${touched.weight && errors.weight ? css.errorInput : ''}`}
                    onBlur={() => setFieldTouched('weight', true)}
                    value={userWeight}
                    // onChange={handleChangeWeight}
                    onChange={e => handleChangeWeight(e, setFieldValue)}
                  />
                  <ErrorMessage className={css.errorMessage} name="weight" component="div" />
                </div>
                <div className={css.block}>
                  <label htmlFor={timeId}>{t('settingModal.sport_time')}</label>
                  <Field
                    type="number"
                    name="dailySportTime"
                    id={timeId}
                    className={`${touched.time && errors.time ? css.errorInput : ''}`}
                    onBlur={() => setFieldTouched('dailySportTime', true)}
                    value={userDailySportTime}
                    // onChange={handleChangeDailySportTime}
                    onChange={e => handleChangeDailySportTime(e, setFieldValue)}
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
                    {t('settingModal.recommend_water_intake')}{' '}
                    <span className={css.result}>{recommendedDailyUserNorm}</span>
                  </p>
                </div>
                <div className={css.block}>
                  <label htmlFor={waterIntakeId} className={css.title}>
                    {t('settingModal.how_much_will_drink')}
                  </label>
                  <Field type="number" name="dailyNorm" id={waterIntakeId} />
                  <ErrorMessage className={css.errorMessage} name="dailyNorm" component="div" />
                </div>
              </div>
            </div>
          </div>
          <button type="submit" className={css.saveBtn}>
            {t('common.save')}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default SettingsModal;
