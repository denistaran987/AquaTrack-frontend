import { useDispatch } from 'react-redux';
import { signInWithGoogle } from '../../redux/auth/operations';
import { useNavigate } from 'react-router-dom';

const GoogleAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  try {
    const code = new URLSearchParams(location.search).get('code');

    dispatch(signInWithGoogle({ code: code }))
      .unwrap()
      .then(() => {
        setTimeout(() => navigate('/tracker'), 555);
      })
      .catch(error => {
        const errorMessages = {
          400: 'Bad request. Invalid input data.',
          401: 'Unauthorized. Session not found.',
          404: 'User not found.',
          409: 'A contact with this email already exists.',
          500: 'Something went wrong. Please try again later.',
        };

        const message = errorMessages[error?.status] || 'An unknown error occurred.';
        console.error(message);
      });
  } catch (error) {
    console.error(error);
  }
};

export default GoogleAuth;
