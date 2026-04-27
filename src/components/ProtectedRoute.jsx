import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '../utils/supabase';
import { isAdminUser } from '../authService';

const ProtectedRoute = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkFullAuth = async () => {
      // 1. Pehle session lein
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        setUser(session.user);
        // 2. Agar user hai, to foran admin check karein
        const adminStatus = await isAdminUser(session.user.id);
        setIsAdmin(adminStatus);
      } else {
        setUser(null);
        setIsAdmin(false);
      }
      
      // 3. Jab dono check ho jayein, tab loading khatam karein
      setLoading(false);
    };

    checkFullAuth();
  }, []);

  if (loading) return <div className="p-20 text-center">Checking permissions...</div>;

  // Agar user login hi nahi hai
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Agar user login hai lekin admin nahi hai
  if (!isAdmin) {
    // alert('Access Denied: You do not have permission to view this page.');
    return <Navigate to="*" replace />; // Ya koi "Unauthorized" page
  }

  return children;
};

export default ProtectedRoute;