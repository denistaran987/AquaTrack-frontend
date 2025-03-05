import { Navigate } from 'react-router';

const RestrictedRoute = ({ children, redirectTo = '/' }) => {
  const isLoggedIn = false;

  return isLoggedIn ? <Navigate to={redirectTo} /> : children;
};

export default RestrictedRoute;
