import { useState, useEffect } from "react";
import { User } from "@/lib/mock-db";

const API_BASE_URL = "/api/auth";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on mount
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch(API_BASE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ action: "getCurrentUser" }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Response was not JSON");
      }

      const data = await response.json();
      setUser(data.user);
    } catch (error) {
      console.error("Auth check failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch(API_BASE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          action: "login",
          email,
          password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return { success: false, error: errorData.error || "Login failed" };
      }

      const data = await response.json();
      setUser(data.user);
      return { success: true };
    } catch (error) {
      console.error("Login failed:", error);
      return { success: false, error: "Login failed" };
    }
  };

  const register = async (
    userData: Omit<User, "id" | "createdAt" | "updatedAt">
  ) => {
    try {
      const response = await fetch(API_BASE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          action: "register",
          ...userData,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return {
          success: false,
          error: errorData.error || "Registration failed",
        };
      }

      const data = await response.json();
      setUser(data.user);
      return { success: true };
    } catch (error) {
      console.error("Registration failed:", error);
      return { success: false, error: "Registration failed" };
    }
  };

  const logout = async () => {
    try {
      const response = await fetch(API_BASE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ action: "logout" }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return { success: false, error: errorData.error || "Logout failed" };
      }

      setUser(null);
      return { success: true };
    } catch (error) {
      console.error("Logout failed:", error);
      return { success: false, error: "Logout failed" };
    }
  };

  const updateProfile = async (profileData: Partial<User["profile"]>) => {
    if (!user) return { success: false, error: "Not authenticated" };

    try {
      const response = await fetch(API_BASE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          action: "updateProfile",
          userId: user.id,
          profileData,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return {
          success: false,
          error: errorData.error || "Profile update failed",
        };
      }

      const data = await response.json();
      setUser(data.user);
      return { success: true };
    } catch (error) {
      console.error("Profile update failed:", error);
      return { success: false, error: "Profile update failed" };
    }
  };

  const updateRoles = async (roles: string[]) => {
    if (!user) return { success: false, error: "Not authenticated" };

    try {
      const response = await fetch(API_BASE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          action: "updateRoles",
          userId: user.id,
          roles,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return {
          success: false,
          error: errorData.error || "Role update failed",
        };
      }

      const data = await response.json();
      setUser(data.user);
      return { success: true };
    } catch (error) {
      console.error("Role update failed:", error);
      return { success: false, error: "Role update failed" };
    }
  };

  return {
    user,
    loading,
    login,
    register,
    logout,
    updateProfile,
    updateRoles,
  };
}
