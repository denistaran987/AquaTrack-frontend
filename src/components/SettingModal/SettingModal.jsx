import { useId } from 'react';
import css from './SettingModal.module.css';

const SettingModal = () => {
  const nameId = useId();
  const emailId = useId();
  const weightId = useId();
  const timeId = useId();
  return (
    <form className={css.modalBoby}>
      <div className={css.avatarBlock}>
        <h2 className={css.title}>Setting</h2>
        <div className={css.avatarWrapper}>
          <img src="../../../public/img/photo.jpeg" alt="avatar" />
        </div>
        <button type="button" className={css.uploadBtn}>
          <svg className={css.icon}>
            <use href="../../../public/img/symbol-defs.svg#icon-upload"></use>
          </svg>
          Upload a photo
        </button>
      </div>
      <div className={css.infoBlock}>
        <div className={css.leftBlock}>
          <div className={css.genderBlock}>
            <p className={css.title}>Your gender identity</p>
            <div className={css.radioBtns}>
              <label>
                <input type="radio" name="gender" value="woman" />
                <span className={css.customRadio}></span>
                Woman
              </label>
              <label>
                <input type="radio" name="gender" value="man" />
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
              <input type="text" name="name" id={nameId} />
            </div>
            <div className={css.block}>
              <label htmlFor={emailId} className={css.title}>
                Email
              </label>
              <input type="email" name="mail" id={emailId} />
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
                <span className={css.asterisk}>*</span> V is the volume of the water norm in liters
                per day, M is your body weight, T is the time of active sports, or another type of
                activity commensurate in terms of loads (in the absence of these, you must set 0)
              </p>
            </div>
            <p className={css.mainText}>
              <svg className={css.icon}>
                <use href="../../../public/img/symbol-defs.svg#icon-mark"></use>
              </svg>
              Active time in hours
            </p>
          </div>
        </div>
        <div className={css.rightBlock}>
          <div className={css.inputBlock}>
            <div className={css.block}>
              <label htmlFor={nameId}>Your weight in kilograms:</label>
              <input type="text" name="weight" id={weightId} />
            </div>
            <div className={css.block}>
              <label htmlFor={emailId}>The time of active participation in sports:</label>
              <input type="text" name="time" id={timeId} />
            </div>
          </div>
          <div className={css.inputBlock}>
            <div className={css.resultBlock}>
              <p>The required amount of water in liters per day:</p>
              <p className={css.result}>1.8 L</p>
            </div>
            <div className={css.block}>
              <label htmlFor={emailId} className={css.title}>
                Write down how much water you will drink:
              </label>
              <input type="text" name="time" id={timeId} />
            </div>
          </div>
        </div>
      </div>
      <button type="button" className={css.saveBtn}>
        Save
      </button>
    </form>
  );
};

export default SettingModal;
