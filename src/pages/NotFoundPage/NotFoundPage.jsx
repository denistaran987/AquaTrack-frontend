import { Link } from 'react-router';
import s from './NotFoundPage.module.css';
import { FaArrowLeftLong } from 'react-icons/fa6';

const NotFoundPage = () => {
  return (
    <div className={s.container}>
      <Link className={s.link} to="/">
        <FaArrowLeftLong />
        HomePage
      </Link>
      <h2 className={s.title}>Oops... Page is not found</h2>
    </div>
  );
};
export default NotFoundPage;
