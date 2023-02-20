import { useAuthContext } from '../context/AuthContext';
import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface RouteProps {
  children: ReactNode;
}

export default function AuthProtectedRoute({ children }: RouteProps) {
  const { ...contextData } = useAuthContext();
  const { user, loading } = contextData;
  const userData = user ?? null;

  if (loading) return null;
  if (userData) return <Navigate to="/" replace />;

  return <>{children}</>;
}
