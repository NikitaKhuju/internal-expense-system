export type ExpenseStatus = "Pending" | "Approved" | "Rejected";
export type ExpenseFlag = "Low" | "Medium" | "High";
export type ExpenseCategory =
  | "Office Supplies"
  | "Travel"
  | "Food & Beverages"
  | "IT / Software"
  | "Utilities"
  | "Training & Development"
  | "Marketing & Advertising"
  | "Maintenance & Repairs"
  | "Employee Benefits"
  | "Miscellaneous";

export interface Expense {
  _id?: string; // MongoDB ID
  id: string; // Use string instead of number
  purpose: string;
  category: string;
  submitter: {
    id: string; // Changed from number to string
    name: string;
  };
  amount: number;
  date: string;
  status: ExpenseStatus;
  flag: ExpenseFlag;
  createdAt?: string;
  updatedAt?: string;
}
