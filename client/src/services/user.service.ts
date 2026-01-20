// src/services/user.service.ts
import api from "./api";
import { type User, type Department, type UserRole } from "@/models/user.model";

// Interface for creating a staff (phone removed)
interface CreateStaffData {
  name: string;
  email: string;
  password: string;
  department: Department; // phone removed
}

export const UserService = {
  // Get all staff members (admin only)
  getAllStaff: async (): Promise<User[]> => {
    const { data } = await api.get("/users/staff");
    // Map MongoDB _id to id for frontend compatibility
    return data.map((user: any) => ({
      ...user,
      id: user._id,
    }));
  },

  // Create new staff member (admin only)
  createStaff: async (staffData: CreateStaffData): Promise<User> => {
    const { data } = await api.post("/auth/register", {
      ...staffData,
      role: "staff", // force role to staff
    });
    return {
      ...data,
      id: data._id,
    };
  },

  // Get current logged-in user info
  getCurrentUser: async (): Promise<User> => {
    const { data } = await api.get("/users/me");
    return {
      ...data,
      id: data._id,
    };
  },
};
