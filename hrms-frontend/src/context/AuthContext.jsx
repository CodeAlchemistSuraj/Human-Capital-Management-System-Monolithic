import { createContext, useContext, useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'http://172.16.2.3:8080';
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const isMounted = useRef(false);

  // Conditional logging for development
  const log = (message, ...args) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(message, ...args);
    }
  };

  // Log mount/unmount
  useEffect(() => {
    isMounted.current = true;
    log(`AuthProvider mounted at ${new Date().toISOString()}`);
    return () => {
      isMounted.current = false;
      log(`AuthProvider unmounted at ${new Date().toISOString()}`);
    };
  }, []);

  // Load user from localStorage
  const loadUser = useCallback(() => {
    setIsLoading(true);
    log("[AuthProvider] loadUser started.");
    const storedUser = localStorage.getItem('user');
    log(`[AuthProvider] Stored user found:`, storedUser);
    if (storedUser && storedUser !== 'undefined' && storedUser !== 'null') {
      try {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser?.role && parsedUser?.username) {
          setUser(parsedUser);
        } else {
          log(`[AuthProvider] Stored user is invalid or incomplete, clearing localStorage`);
          localStorage.clear();
          setUser(null);
          log("[AuthProvider] Navigating to login from loadUser (invalid user).");
          navigate('/login', { replace: true });
        }
      } catch (error) {
        console.error(`[AuthProvider] Error parsing stored user:`, error);
        localStorage.clear();
        setUser(null);
        log("[AuthProvider] Navigating to login from loadUser (parsing error).");
        navigate('/login', { replace: true });
      }
    } else {
      log(`[AuthProvider] No valid stored user found`);
      setUser(null);
    }
    setIsLoading(false);
  }, [navigate]);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  // Handle navigation based on user role
  useEffect(() => {
    if (isLoading || !user?.role || !isMounted.current) {
      console.log("[AuthProvider] Skipping user role navigation check:", { isLoading, userRole: user?.role, isMounted: isMounted.current });
      return;
    }
    const dashboardMap = {
      ADMIN: '/admin-dashboard',
      HR: '/hr-dashboard',
      EMPLOYEE: '/employee-dashboard',
      MANAGER: '/manager-dashboard',
      FINANCE: '/finance-dashboard',
    };
    const targetPath = dashboardMap[user.role] || '/login';
    const currentPath = location.pathname;

    const invalidRoutes = ['/login', '/'];
    if (invalidRoutes.includes(currentPath) && currentPath !== targetPath) {
      log(`[AuthProvider] Navigating to ${targetPath}`);
      console.log(`[AuthProvider] Redirecting based on user role to: ${targetPath}`);
      navigate(targetPath, { replace: true });
    } else if (currentPath === targetPath) {
      log(`[AuthProvider] Already at ${targetPath}, skipping navigation`);
    }
  }, [user, isLoading, navigate, location]);

  // Login function
  const login = useCallback(async (username, password) => {
    try {
      setIsLoading(true);
      log(`[AuthProvider] Attempting login for user: ${username}`);

      // FIX: Ensure username and password are sent in the request body as JSON
      const response = await axios.post(
        `${API_URL}/api/auth/login`,
        { username, password }, // THIS IS THE CRITICAL PART: Send the object here
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const userData = response.data;
      log(`[AuthProvider] Login response:`, userData);

      if (!userData.username || !userData.role) {
        throw new Error('Invalid login response: missing username or role');
      }
      const userToStore = { username: userData.username, role: userData.role };
      setUser(userToStore);
      localStorage.setItem('user', JSON.stringify(userToStore));
      localStorage.setItem('token', userData.token);
      return userToStore;

    } catch (error) {
      console.error(`[AuthProvider] Login failed:`, error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Logout function
  const logout = useCallback(() => {
    log(`[AuthProvider] Logging out user:`, user);
    setUser(null);
    localStorage.clear();
    navigate('/login', { replace: true });
  }, [navigate, user]);

  // Memoize context value
  const value = useMemo(
    () => ({ user, isLoading, login, logout }),
    [user, isLoading, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
}
