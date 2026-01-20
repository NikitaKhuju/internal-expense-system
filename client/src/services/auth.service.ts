// src/services/auth.service.ts
import api from "./api";
import { type User } from "@/models/user.model";

type LoginResponse = {
  token: string;
  user: User;
};

export const AuthService = {
  login: async (email: string, password: string): Promise<LoginResponse> => {
    const { data } = await api.post("/auth/login", {
      email,
      password,
    });

    // Map MongoDB _id to id for frontend compatibility
    const mappedUser = {
      ...data.user,
      id: data.user._id || data.user.id,
    };

    return {
      token: data.token,
      user: mappedUser,
    };
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },

  getCurrentUser: (): User | null => {
    const userData = localStorage.getItem("user");
    if (!userData) return null;
    return JSON.parse(userData);
  },
};
