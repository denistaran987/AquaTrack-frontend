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
      <img className={s.image} src="/images/NotFound.png" alt="404 Not Found" />
    </div>
  );
};
export default NotFoundPage;
