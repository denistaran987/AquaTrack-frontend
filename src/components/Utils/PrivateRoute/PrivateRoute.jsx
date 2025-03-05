import { Navigate } from 'react-router';

const PrivateRoute = ({ children, redirectTo = '/' }) => {
  const isLoggedIn = false;
  return isLoggedIn ? children : <Navigate to={redirectTo} />;
};
export default PrivateRoute;
