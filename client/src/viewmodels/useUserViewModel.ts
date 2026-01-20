// src/viewmodels/useUserViewModel.ts
import { useState } from "react";
import { UserService } from "@/services/user.service";
import { type User } from "@/models/user.model";

export const useUserViewModel = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [users, setUsers] = useState<User[]>([]);

  const fetchAllStaff = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await UserService.getAllStaff();
      setUsers(data);
      return data;
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || "Failed to fetch staff";
      setError(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const createStaff = async (staffData: {
    name: string;
    email: string;
    password: string;
    phone: string;
    department: string;
  }) => {
    try {
      setLoading(true);
      setError(null);
      const newUser = await UserService.createStaff(staffData);
      setUsers((prev) => [...prev, newUser]);
      return newUser;
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || "Failed to create staff";
      setError(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    users,
    loading,
    error,
    fetchAllStaff,
    createStaff,
  };
};
