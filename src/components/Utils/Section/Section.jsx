import s from './Section.module.css';

const Section = ({ children }) => {
  return <section className={s.section}>{children}</section>;
};

export default Section;
