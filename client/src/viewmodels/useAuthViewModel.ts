// src/viewmodels/useAuthViewModel.ts
import { useState } from "react";
import { AuthService } from "@/services/auth.service";

export const useAuthViewModel = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);

      const { token, user } = await AuthService.login(email, password);

      // Map _id to id for consistency
      const mappedUser = {
        ...user,
        id: user._id || user.id,
      };

      /* Persist auth */
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(mappedUser));

      return mappedUser;
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    AuthService.logout();
    window.location.href = "/login";
  };

  return {
    login,
    logout,
    loading,
    error,
  };
};
