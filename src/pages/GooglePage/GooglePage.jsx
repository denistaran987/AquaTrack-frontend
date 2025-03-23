import { useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import { signInWithGoogle } from '../../redux/auth/operations.js';
import Loader from '../../components/Utils/Loader/Loader.jsx';

const GooglePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const fetch = async () => {
      try {
        const code = searchParams.get('code');
        if (!code) return navigate('/signup');

        const result = await dispatch(signInWithGoogle(code)).unwrap();

        if (result) {
          navigate('/tracker');
        }
      } catch (e) {
        console.log(e);
        navigate('/signup');
      }
    };
    fetch();
  }, [searchParams, dispatch, navigate]);

  return (
    <div>
      <Loader />
    </div>
  );
};

export default GooglePage;
