import { useState, useEffect, useCallback } from "react";
import { User } from "../lib/index.ts";

const AUTH_STORAGE_KEY = "palestine_marketplace_user";

/**
 * Authentication hook for user state management with localStorage persistence.
 * Designed to be used in components needing user context or auth actions.
 */
export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem(AUTH_STORAGE_KEY);
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse stored user:", error);
        localStorage.removeItem(AUTH_STORAGE_KEY);
      }
    }
    setIsLoading(false);
  }, []);

  /**
   * Simulate a login process
   * In production, this would call an API/Supabase
   */
  const login = useCallback(async (email: string, _password: string): Promise<void> => {
    setIsLoading(true);
    try {
      // Simulated network delay
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Mock user data for demonstration
      const mockUser: User = {
        id: "u_" + Math.random().toString(36).substr(2, 9),
        name: email.split("@")[0],
        email: email,
        phone: "+970 59-000-0000",
      };

      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(mockUser));
      setUser(mockUser);
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Simulate a registration process
   */
  const register = useCallback(async (name: string, email: string, phone: string, _password: string): Promise<void> => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const newUser: User = {
        id: "u_" + Math.random().toString(36).substr(2, 9),
        name,
        email,
        phone,
      };

      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(newUser));
      setUser(newUser);
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Log out the current user
   */
  const logout = useCallback(() => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    setUser(null);
  }, []);

  /**
   * Update user profile information
   */
  const updateProfile = useCallback((updates: Partial<User>) => {
    setUser((prev) => {
      if (!prev) return null;
      const updatedUser = { ...prev, ...updates };
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(updatedUser));
      return updatedUser;
    });
  }, []);

  return {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
    updateProfile,
  };
}
