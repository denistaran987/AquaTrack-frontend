import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../../../redux/theme/slice.js';

const ThemeToggle = () => {
  const dispatch = useDispatch();
  const theme = useSelector(state => state.theme.theme);

  return (
    <button onClick={() => dispatch(toggleTheme())}>
      {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
    </button>
  );
};

export default ThemeToggle;
