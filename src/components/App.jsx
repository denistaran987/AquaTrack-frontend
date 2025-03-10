import { Route, Routes } from 'react-router-dom';
import './App.css';
import SharedLayout from './Utils/SharedLayout/SharedLayout';
import PrivateRoute from './Utils/PrivateRoute/PrivateRoute';
import RestrictedRoute from './Utils/RestrictedRoute/RestrictedRoute';
import { lazy, Suspense } from 'react';
import Loader from './Utils/Loader/Loader';
import WaterTracker from './UI/WaterTracker.jsx';


const HomePage = lazy(() => import('../pages/HomePage/HomePage'));
const SignUpPage = lazy(() => import('../pages/SignUpPage/SignUpPage'));
const SignInPage = lazy(() => import('../pages/SignInPage/SignInPage'));
const TrackerPage = lazy(() => import('../pages/TrackerPage/TrackerPage'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage/NotFoundPage'));

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
                  <WaterTracker />
                  </RestrictedRoute>
              }
            />
            <Route
              path="tracker"
              element={
                <PrivateRoute redirectTo="/tracker">
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
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
