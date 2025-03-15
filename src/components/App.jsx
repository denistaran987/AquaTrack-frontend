import { Route, Routes} from 'react-router-dom';
import './App.css';
import SharedLayout from './Utils/SharedLayout/SharedLayout';
import PrivateRoute from './Utils/PrivateRoute/PrivateRoute';
import RestrictedRoute from './Utils/RestrictedRoute/RestrictedRoute';
import { lazy, Suspense } from 'react';
import Loader from './Utils/Loader/Loader';

const HomePage = lazy(() => import('../pages/HomePage/HomePage'));
const SignUpPage = lazy(() => import('../pages/SignUpPage/SignUpPage'));
const SignInPage = lazy(() => import('../pages/SignInPage/SignInPage'));
const TrackerPage = lazy(() => import('../pages/TrackerPage/TrackerPage'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage/NotFoundPage'));
const ResetPasswordPage = lazy(() => import('../pages/ResetPasswordPage/ResetPasswordPage')
);

function App() {
  return (
    <>
      <Suspense fallback={<Loader />}>
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
                <PrivateRoute redirectTo="/">
                  <TrackerPage />
                </PrivateRoute>
              }
            />
            <Route
              path="signup"
              element={
                <RestrictedRoute redirectTo="/signup">
                  <SignUpPage />
                </RestrictedRoute>
              }
            />
            <Route
              path="signin"
              element={
                <RestrictedRoute redirectTo="/signin">
                  <SignInPage />
                </RestrictedRoute>
              }
            />
            <Route path="*" element={<NotFoundPage />} />
            <Route path="/reset-pwd" element={<ResetPasswordPage />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
