import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import LogoutAlertDialog from "@/components/logout-alert-dialog";
import type {
  Expense,
  ExpenseStatus,
  ExpenseCategory,
  ExpenseFlag,
} from "@/models/expense.model";

// -------- Mock Data --------
const staffExpenses: Expense[] = [
  {
    id: 1,
    purpose: "Office Supplies",
    category: "Stationery",
    amount: 5000,
    date: "2026-01-10",
    status: "Approved",
    flag: "Low",
    submitter: { id: "u1", name: "John Doe" },
  },
  {
    id: 2,
    purpose: "Office Supplies",
    category: "Stationery",
    amount: 2000,
    date: "2026-01-10",
    status: "Rejected",
    flag: "Medium",
    submitter: { id: "u1", name: "John Doe" },
  },
  {
    id: 3,
    purpose: "Client Meeting",
    category: "Food",
    amount: 3000,
    date: "2026-01-12",
    status: "Pending",
    flag: "High",
    submitter: { id: "u1", name: "John Doe" },
  },
  {
    id: 4,
    purpose: "Software Tool",
    category: "IT",
    amount: 15000,
    date: "2026-01-15",
    status: "Approved",
    flag: "Medium",
    submitter: { id: "u1", name: "John Doe" },
  },
  {
    id: 5,
    purpose: "Travel Advance",
    category: "Travel",
    amount: 8000,
    date: "2026-01-16",
    status: "Rejected",
    flag: "High",
    submitter: { id: "u1", name: "John Doe" },
  },
];

const COLORS = ["#22c55e", "#3b82f6", "#f59e0b", "#ef4444"];

export default function StaffDashboard() {
  // Filter by status
  const approved = staffExpenses.filter((e) => e.status === "Approved");
  const pending = staffExpenses.filter((e) => e.status === "Pending");
  const rejected = staffExpenses.filter((e) => e.status === "Rejected");
  const totalApprovedAmount = approved.reduce((sum, e) => sum + e.amount, 0);

  // Pie chart data (Approved by category)
  const approvedByCategory = Object.values(
    approved.reduce<Record<string, { name: string; value: number }>>(
      (acc, curr) => {
        if (!acc[curr.category])
          acc[curr.category] = { name: curr.category, value: 0 };
        acc[curr.category].value += curr.amount;
        return acc;
      },
      {}
    )
  );

  // Line chart data (amount by date)
  const lineData = staffExpenses.map((e) => ({
    date: e.date,
    amount: e.amount,
  }));

  // Sort expenses descending by date
  const sortedExpenses = [...staffExpenses].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // Badge styles
  const statusColor: Record<ExpenseStatus, string> = {
    Approved: "bg-green-100 text-green-700",
    Pending: "bg-yellow-100 text-yellow-700",
    Rejected: "bg-red-100 text-red-700",
  };

  return (
    <div className="flex h-screen">
      <div className="flex-1 p-6 bg-gray-50 overflow-auto">
        <div className="flex justify-between items-center py-3">
          <p className="font-semibold text-lg">Dashboard</p>
          <LogoutAlertDialog
            userName="Nikita Khuju"
            onLogout={() => {
              localStorage.removeItem("token");
              window.location.href = "/login";
            }}
          />
        </div>

        <div className="flex justify-between mb-6">
          <h1 className="text-2xl font-bold">My Expense Dashboard</h1>
          <Button>+ New Expense</Button>
        </div>

        <div className="grid md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-gray-500">Approved Requests</p>
              <p className="text-2xl font-bold text-green-600">
                {approved.length}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-gray-500">Pending Requests</p>
              <p className="text-2xl font-bold text-yellow-500">
                {pending.length}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-gray-500">Rejected Requests</p>
              <p className="text-2xl font-bold text-red-500">
                {rejected.length}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-gray-500">Total Approved (Rs.)</p>
              <p className="text-2xl font-bold">Rs. {totalApprovedAmount}</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Approved Expenses by Category</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={approvedByCategory}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={90}
                    label
                  >
                    {approvedByCategory.map((_, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Expense Submission Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={lineData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="amount"
                    stroke="#3b82f6"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>My Expense Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Purpose</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Submitter</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedExpenses.map((e) => (
                  <TableRow key={e.id}>
                    <TableCell>{e.purpose}</TableCell>
                    <TableCell>{e.category}</TableCell>
                    <TableCell>Rs. {e.amount}</TableCell>
                    <TableCell>{e.date}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded ${statusColor[e.status]}`}
                      >
                        {e.status}
                      </span>
                    </TableCell>
                    <TableCell>{e.submitter.name}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
