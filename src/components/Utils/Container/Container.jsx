import s from './Container.module.css';

const Container = ({ children }) => {
  return <div className={s.container}>{children}</div>;
};

export default Container;
