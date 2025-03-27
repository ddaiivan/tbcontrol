import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext'; // Import the useAuth hook

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { session, loading } = useAuth();

  // While checking the session status, don't render anything (or show a loader)
  if (loading) {
    return null; // Or return a loading spinner component
  }

  // If there's no session (user is not logged in), redirect to the login page
  if (!session) {
    return <Navigate to="/login" replace />; // 'replace' prevents adding login to history
  }

  // If there is a session (user is logged in), render the requested component
  return <>{children}</>;
};

export default ProtectedRoute;
