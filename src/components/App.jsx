import { Route, Routes } from 'react-router-dom';
import './App.css';
import SharedLayout from './Utils/SharedLayout/SharedLayout';
import PrivateRoute from './Utils/PrivateRoute/PrivateRoute';
import RestrictedRoute from './Utils/RestrictedRoute/RestrictedRoute';
import { lazy, Suspense, useEffect } from 'react';
import Loader from './Utils/Loader/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsisRefreshing } from '../redux/auth/selectors';
import { refreshUser } from '../redux/auth/operations';
import GooglePage from '../pages/GooglePage/GooglePage';

const HomePage = lazy(() => import('../pages/HomePage/HomePage'));
const SignUpPage = lazy(() => import('../pages/SignUpPage/SignUpPage'));
const SignInPage = lazy(() => import('../pages/SignInPage/SignInPage'));
const TrackerPage = lazy(() => import('../pages/TrackerPage/TrackerPage'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage/NotFoundPage'));
const ResetPasswordPage = lazy(() => import('../pages/ResetPasswordPage/ResetPasswordPage'));

function App() {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsisRefreshing);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return isRefreshing ? (
    <Loader />
  ) : (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<HomePage />} />
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
          <Route path="/reset-pwd" element={<ResetPasswordPage />} />
          <Route path="/confirm-google-auth" element={<GooglePage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
