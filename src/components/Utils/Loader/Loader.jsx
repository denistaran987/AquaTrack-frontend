import { useEffect, useState } from 'react';
import s from './Loader.module.css';

const Loader = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(oldProgress => {
        if (oldProgress === 100) {
          return 0;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <>
      <div className={s.loader}>
        <span style={{ width: `${progress}%` }}></span>
      </div>
    </>
  );
};

export default Loader;
