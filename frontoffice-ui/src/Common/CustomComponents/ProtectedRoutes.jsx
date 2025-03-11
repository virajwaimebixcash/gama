import { useEffect } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import SessionManager from './SessionManager';
import { useDispatch } from 'react-redux';
import { handleLogout } from '../../utils/UtilityFunctions';

const ProtectedRoutes = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ip = localStorage.getItem('userIP');
  const isAuthenticated = localStorage.getItem('token') && localStorage.getItem('token') !== 'null';
  // useEffect(() => {
  //   // Register event listener for tab/window close
  //   const cleanupTabCloseLogout = handleLogoutOnTabClose(dispatch, navigate);

  //   // Cleanup event listener when the component is unmounted
  //   return () => {
  //     cleanupTabCloseLogout();
  //   };
  // }, [dispatch, navigate]);

  useEffect(() => {
    if(!sessionStorage.getItem("login")) {
      handleLogout(dispatch, ip, navigate, false)
    }
  }, [dispatch, ip, navigate]);

  return isAuthenticated && isAuthenticated !== 'null' ? (
    <>
      {/* <TabCloseLogout /> */}
      <Outlet />
      <SessionManager />
    </>
  ) : (
    <Navigate to="/" />
  );
};

export default ProtectedRoutes;

