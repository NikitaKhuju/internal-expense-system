// src/viewmodels/useExpenseViewModel.ts
import { useState } from "react";
import { ExpenseService } from "@/services/expense.service";
import { type Expense } from "@/models/expense.model";

export const useExpenseViewModel = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [expenses, setExpenses] = useState<Expense[]>([]);

  const fetchExpenses = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await ExpenseService.getAll();
      setExpenses(data);
      return data;
    } catch (err: any) {
      const errorMsg =
        err.response?.data?.message || "Failed to fetch expenses";
      setError(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const createExpense = async (expenseData: {
    purpose: string;
    amount: number;
    category: string;
    date: string;
    flag: string;
  }) => {
    try {
      setLoading(true);
      setError(null);
      const newExpense = await ExpenseService.create(expenseData);
      setExpenses((prev) => [...prev, newExpense]);
      return newExpense;
    } catch (err: any) {
      const errorMsg =
        err.response?.data?.message || "Failed to create expense";
      setError(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const approveExpense = async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      const updated = await ExpenseService.approve(id);
      setExpenses((prev) =>
        prev.map((exp) => (exp.id === id || exp._id === id ? updated : exp))
      );
      return updated;
    } catch (err: any) {
      const errorMsg =
        err.response?.data?.message || "Failed to approve expense";
      setError(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const rejectExpense = async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      const updated = await ExpenseService.reject(id);
      setExpenses((prev) =>
        prev.map((exp) => (exp.id === id || exp._id === id ? updated : exp))
      );
      return updated;
    } catch (err: any) {
      const errorMsg =
        err.response?.data?.message || "Failed to reject expense";
      setError(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteExpense = async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      await ExpenseService.delete(id);
      setExpenses((prev) =>
        prev.filter((exp) => exp.id !== id && exp._id !== id)
      );
    } catch (err: any) {
      const errorMsg =
        err.response?.data?.message || "Failed to delete expense";
      setError(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    expenses,
    loading,
    error,
    fetchExpenses,
    createExpense,
    approveExpense,
    rejectExpense,
    deleteExpense,
  };
};
