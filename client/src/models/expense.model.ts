export type ExpenseStatus = "Pending" | "Approved" | "Rejected";
export type ExpenseFlag = "Low" | "Medium" | "High";
export type ExpenseCategory = "IT" | "Food" | "Stationery" | "Travel";

export interface Submitter {
  id: string;
  name: string;
}

export interface Expense {
  id: number;
  purpose: string;
  category: ExpenseCategory;
  amount: number;
  date: string; // ISO string
  status: ExpenseStatus; // Pending by default
  flag: ExpenseFlag;
  submitter: Submitter;
}
