import { Navigate, Outlet } from 'react-router-dom';

const AuthRoutes = () => {
  // Logic to determine if the user is authenticated
  const isAuthenticated = localStorage.getItem('token')

  return isAuthenticated && isAuthenticated !== 'null' ? <Navigate to="/dashboard" /> : <Outlet />;
};

export default AuthRoutes;