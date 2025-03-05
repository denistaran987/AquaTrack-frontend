import { Route, Routes } from 'react-router-dom';
import './App.css';
import SharedLayout from './Utils/SharedLayout/SharedLayout';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';
import HomePage from '../pages/HomePage/HomePage';
import PrivateRoute from './Utils/PrivateRoute/PrivateRoute';
import RestrictedRoute from './Utils/RestrictedRoute/RestrictedRoute';
import SignUpPage from '../pages/SignUpPage/SignUpPage';
import SignInPage from '../pages/SignInPage/SignInPage';
import TrackerPage from '../pages/TrackerPage/TrackerPage';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route
            index
            element={
              <RestrictedRoute redirectTo="/">
                <HomePage />
              </RestrictedRoute>
            }
          />
          <Route
            path="tracker"
            element={
              <PrivateRoute redirectTo="/signin">
                <TrackerPage />
              </PrivateRoute>
            }
          />
          <Route
            path="signup"
            element={
              <RestrictedRoute redirectTo="/tracker">
                <SignUpPage />
              </RestrictedRoute>
            }
          />
          <Route
            path="signin"
            element={
              <RestrictedRoute redirectTo="/tracker">
                <SignInPage />
              </RestrictedRoute>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
