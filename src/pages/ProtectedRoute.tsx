import { useAuthContext } from '../context/AuthContext';
import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface RouteProps {
  children: ReactNode;
  requireAdmin?: boolean;
}

export default function ProtectedRoute({ children, requireAdmin }: RouteProps) {
  const { ...contextData } = useAuthContext();
  const { user } = contextData;
  const userData = user ?? null;
  const isAdmin = userData ? 'isAdmin' in userData : null;

  if (!userData || (requireAdmin && !isAdmin)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
