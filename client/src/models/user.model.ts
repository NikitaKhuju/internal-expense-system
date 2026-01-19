export type UserRole = "admin" | "staff";

export type Department =
  | "Engineering"
  | "Marketing"
  | "Operations"
  | "HR"
  | "Finance";

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  department: Department;
  role: UserRole;
  createdAt: string;
}
