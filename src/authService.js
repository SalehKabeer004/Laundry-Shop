import { supabase } from './utils/supabase';

export const handleLogin = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw error;
  return data;
};

export const handleSignUp = async (username, email, password) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    // Ye 'options' wala hissa sab se zaroori hai
    options: {
      data: {
        full_name: username, // Hum 'username' ko 'full_name' ke taur par save kar rahe hain
      }
    }
  });
  if (error) throw error;
  return data;
};

export const getCurrentUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error) return null;
  return user;
};

export const onAuthChange = (callback) => {
  const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
    callback(session?.user ?? null);
  });
  return subscription;
};

export const signOutUser = async () => {
  await supabase.auth.signOut();
};

export const sendPasswordResetEmail = async (email) => {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/set-new-password`,
  });
  if (error) throw error;
  return data;
};

export const updateNewPassword = async (newPassword) => {
  const { data, error } = await supabase.auth.updateUser({
    password: newPassword
  });
  if (error) throw error;
  return data;
};

export const isAdminUser = async (userId) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('is_admin')
    .eq('id', userId)
    .single();

  if (error) {
    alert('Error checking admin status:', error);
    return false;
  }

  return data?.is_admin || false;
};