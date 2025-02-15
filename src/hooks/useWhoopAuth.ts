import { useState, useCallback } from 'react';

interface WhoopAuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export function useWhoopAuth() {
  const [authState, setAuthState] = useState<WhoopAuthState>({
    isAuthenticated: false,
    isLoading: false,
    error: null,
  });

  const login = useCallback(() => {
    try {
      console.log('Starting WHOOP authentication...');
      setAuthState(prev => ({ ...prev, isLoading: true }));
      window.location.href = '/api/auth/whoop';
    } catch (error) {
      console.error('Login error:', error);
      setAuthState(prev => ({ 
        ...prev, 
        isLoading: false, 
        error: 'Failed to start authentication' 
      }));
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true }));
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Logout failed');
      }

      const data = await response.json();
      if (data.success) {
        setAuthState({ isAuthenticated: false, isLoading: false, error: null });
        window.location.href = '/';
      } else {
        throw new Error('Logout failed');
      }
    } catch (error) {
      console.error('Logout error:', error);
      setAuthState(prev => ({ 
        ...prev, 
        isLoading: false, 
        error: 'Failed to logout' 
      }));
    }
  }, []);

  return {
    ...authState,
    setAuthState,
    login,
    logout,
  };
}