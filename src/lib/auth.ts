import { IAccountType } from '@/types/cookies';
import { UtilAuth } from '@/utils/UtilAuth';

export const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
  try {
    // Here you would typically make an API call to your backend
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    const data = await response.json();
    UtilAuth.setJwtToken(data.token);
    
    return { success: true };
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Login failed' 
    };
  }
};

export const logout = () => {
  UtilAuth.onLogout();
};

export const getCurrentUser = () => {
  const cookies = UtilAuth.getCookiesParsed();
  return cookies.user;
};

export const checkRole = (requiredRole: IAccountType): boolean => {
  const user = getCurrentUser();
  if (!user) return false;
  
  return user.account_type === requiredRole;
};

export const isAuthenticated = (): boolean => {
  return UtilAuth.isAuthed();
};
