import { useState, useEffect } from 'react';
import { AuthContext } from './context';
import { supabase } from './lib/supabase';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }

    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setUser({
          ...session.user,
          role: session.user.user_metadata?.role || 'user',
          name: session.user.user_metadata?.name || session.user.email?.split('@')[0]
        });
      }
      setLoading(false);
    };

    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session) {
        setUser({
          ...session.user,
          role: session.user.user_metadata?.role || 'user',
          name: session.user.user_metadata?.name || session.user.email?.split('@')[0]
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email, password) => {
    // MOCK LOGIN TEMPORAL (Saltando Supabase)
    const mockUser = { role: 'admin', name: 'Admin Local' };
    setUser(mockUser);
    return { user: mockUser };
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    setUser(null);
  };

  const mockLogin = () => {
    setUser({ role: 'admin', name: 'Admin Local' });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, mockLogin, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
