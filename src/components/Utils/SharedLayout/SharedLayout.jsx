import { Outlet } from 'react-router-dom';

const SharedLayout = ({ children }) => {
  return (
    <>
      {children}
      <Outlet />
    </>
  );
};

export default SharedLayout;
