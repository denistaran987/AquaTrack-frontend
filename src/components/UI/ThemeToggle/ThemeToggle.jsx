import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../../../redux/theme/slice.js';
import { useEffect } from 'react';
import css from './ThemeToggle.module.css';

const ThemeToggle = () => {
  const dispatch = useDispatch();
  const theme = useSelector(state => state.theme.theme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      dispatch(toggleTheme(savedTheme));
      document.documentElement.setAttribute('data-theme', savedTheme);
    }
  }, [dispatch]);

  return (
    <button onClick={() => dispatch(toggleTheme())} className={css.toggleButton}>
      <div className={`${css.circle} ${theme === 'dark' ? css.dark : ''}`}></div>{' '}
    </button>
  );
};

export default ThemeToggle;
