// src/services/expense.service.ts
import api from "./api";
import { type Expense } from "@/models/expense.model";

interface CreateExpenseData {
  purpose: string;
  amount: number;
  category: string;
  date: string;
  flag: string;
}

interface UpdateExpenseData {
  purpose?: string;
  amount?: number;
  category?: string;
  date?: string;
  flag?: string;
  status?: string;
}

export const ExpenseService = {
  // Get all expenses (admin gets all, staff gets their own)
  getAll: async (): Promise<Expense[]> => {
    const { data } = await api.get("/expenses");
    // Map MongoDB _id to id for frontend compatibility
    return data.map((expense: any) => ({
      ...expense,
      id: expense._id,
    }));
  },

  // Create new expense
  create: async (expenseData: CreateExpenseData): Promise<Expense> => {
    const { data } = await api.post("/expenses", expenseData);
    // Map MongoDB _id to id for frontend compatibility
    return {
      ...data,
      id: data._id,
    };
  },

  // Update expense
  update: async (
    id: string,
    updateData: UpdateExpenseData
  ): Promise<Expense> => {
    const { data } = await api.put(`/expenses/${id}`, updateData);
    return {
      ...data,
      id: data._id,
    };
  },

  // Delete expense
  delete: async (id: string): Promise<void> => {
    await api.delete(`/expenses/${id}`);
  },

  // Approve expense (admin only)
  approve: async (id: string): Promise<Expense> => {
    const { data } = await api.put(`/expenses/${id}`, { status: "Approved" });
    return {
      ...data,
      id: data._id,
    };
  },

  // Reject expense (admin only)
  reject: async (id: string): Promise<Expense> => {
    const { data } = await api.put(`/expenses/${id}`, { status: "Rejected" });
    return {
      ...data,
      id: data._id,
    };
  },
};
