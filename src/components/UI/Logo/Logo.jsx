import { Link } from 'react-router-dom';
import s from './Logo.module.css';

const Logo = () => {
  return (
    <>
      <Link className={s.logo} to={'/'}>
        AquaTrack
      </Link>
    </>
  );
};

export default Logo;
