import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '../utils/supabase';

const ProtectedRoute = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const session = supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });
  }, []);

  if (loading) return <div>Checking auth...</div>;

  // Agar user nahi hai to login par redirect kar do
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;