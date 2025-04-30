import { JSX } from 'react';
import { Navigate } from 'react-router-dom';

export const RoleGuard = ({ role, children }: { role: string; children: JSX.Element }) => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  return user?.role === role ? children : <Navigate to="/" />;
};