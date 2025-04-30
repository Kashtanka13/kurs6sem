import { JSX } from 'react';
import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  return user?.access_token ? children : <Navigate to="/login" />;
};