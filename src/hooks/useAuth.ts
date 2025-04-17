import { useState, useEffect } from "react";
import { db } from "@/lib/db";

interface User {
  id: number;
  email: string;
  name: string;
  roles: string[];
  // Add other user properties as needed
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = db.getCurrentUser();
    setUser(currentUser);
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const user = await db.login(email, password);
      setUser(user);
      return user;
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await db.logout();
      setUser(null);
    } catch (error) {
      throw error;
    }
  };

  const register = async (data: any) => {
    try {
      const newUser = await db.register(data);
      setUser(newUser);
      return newUser;
    } catch (error) {
      throw error;
    }
  };

  const updateProfile = async (userId: number, profileData: any) => {
    try {
      const updatedUser = await db.updateProfile(userId, profileData);
      setUser(updatedUser);
      return updatedUser;
    } catch (error) {
      throw error;
    }
  };

  return {
    user,
    loading,
    login,
    logout,
    register,
    updateProfile,
  };
}
