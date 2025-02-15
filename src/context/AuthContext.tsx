import React, { createContext, useContext, useEffect, useState } from 'react';
import { useWhoopAuth } from '../hooks/useWhoopAuth';

interface User {
  id: string;
  whoop_user_id: string;
  first_name: string | null;
  last_name: string | null;
  access_token: string;
  refresh_token: string;
  expires_at: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  user: User | null;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const auth = useWhoopAuth();

  const checkAuthStatus = async () => {
    try {
      const response = await fetch('/api/auth/status', {
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Cache-Control': 'no-cache'
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to check auth status: ${response.status}`);
      }

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Invalid response type');
      }

      const data = await response.json();
      console.log('Auth status response:', data);

      if (data.isAuthenticated && data.user) {
        setUser(data.user);
        auth.setAuthState(prev => ({ ...prev, isAuthenticated: true, error: null }));
      } else {
        setUser(null);
        auth.setAuthState(prev => ({ ...prev, isAuthenticated: false, error: null }));
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
      setUser(null);
      auth.setAuthState(prev => ({
        ...prev,
        isAuthenticated: false,
        error: 'Failed to check authentication status'
      }));
    }
  };

  useEffect(() => {
    checkAuthStatus();
    // Poll for auth status every minute
    const interval = setInterval(checkAuthStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  const value = {
    ...auth,
    user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}