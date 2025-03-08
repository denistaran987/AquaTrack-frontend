import { Navigate } from 'react-router';

const PrivateRoute = ({ children, redirectTo = '/' }) => {
  const isLoggedIn = true;
  return isLoggedIn ? children : <Navigate to={redirectTo} />;
};
export default PrivateRoute;
