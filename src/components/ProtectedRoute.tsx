
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

function getRoleHome(role: string): string {
  switch (role) {
    case 'admin': return '/admin';
    case 'mentor': return '/mentor';
    case 'hr': return '/hr/candidates';
    case 'manager': return '/dashboard';
    case 'employee': return '/dashboard';
    default: return '/dashboard';
  }
}

export default function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const navigate = useNavigate();
  const { currentUser } = useAppContext();

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
      return;
    }
    if (allowedRoles && !allowedRoles.includes(currentUser.role)) {
      navigate(getRoleHome(currentUser.role));
    }
  }, [currentUser, allowedRoles, navigate]);

  if (!currentUser) return null;
  if (allowedRoles && !allowedRoles.includes(currentUser.role)) return null;

  return <>{children}</>;
}
