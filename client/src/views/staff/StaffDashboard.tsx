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
import type { ExpenseStatus } from "@/models/expense.model";
import { useExpenseViewModel } from "@/viewmodels/useExpenseViewModel";
import { useAuth } from "@/App";
import { useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { Plus } from "lucide-react";

const COLORS = ["#22c55e", "#3b82f6", "#f59e0b", "#ef4444"];

const categories = [
  "Office Supplies",
  "Travel",
  "Food & Beverages",
  "IT / Software",
  "Utilities",
  "Training & Development",
  "Marketing & Advertising",
  "Maintenance & Repairs",
  "Employee Benefits",
  "Miscellaneous",
];

const flags = ["Low", "Medium", "High"];

export default function StaffDashboard() {
  const {
    expenses,
    loading,
    error,
    fetchExpenses,
    createExpense,
    deleteExpense,
  } = useExpenseViewModel();
  const { logout } = useAuth();
  const navigate = useNavigate();

  //Dialog states
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<any>(null);

  // Form states
  const [purpose, setPurpose] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [flag, setFlag] = useState("");

  // Get user from localStorage
  const user = useMemo(() => {
    const userData = localStorage.getItem("user");
    return userData ? JSON.parse(userData) : null;
  }, []);

  useEffect(() => {
    fetchExpenses();
  }, []);

  // Filter expenses for current user only
  const staffExpenses = useMemo(() => {
    if (!user) return [];
    return expenses.filter(
      (e) => e.submitter.id === user.id || e.submitter.id === user._id
    );
  }, [expenses, user]);

  // Filter by status
  const approved = useMemo(
    () => staffExpenses.filter((e) => e.status === "Approved"),
    [staffExpenses]
  );
  const pending = useMemo(
    () => staffExpenses.filter((e) => e.status === "Pending"),
    [staffExpenses]
  );
  const rejected = useMemo(
    () => staffExpenses.filter((e) => e.status === "Rejected"),
    [staffExpenses]
  );
  const totalApprovedAmount = useMemo(
    () => approved.reduce((sum, e) => sum + e.amount, 0),
    [approved]
  );

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
  const lineData = useMemo(() => {
    return staffExpenses.map((e) => ({
      date: new Date(e.date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      amount: e.amount,
    }));
  }, [staffExpenses]);

  // Sort expenses descending by date
  const sortedExpenses = useMemo(() => {
    return [...staffExpenses].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }, [staffExpenses]);

  // Badge styles
  const statusColor: Record<ExpenseStatus, string> = {
    Approved: "bg-green-100 text-green-700",
    Pending: "bg-yellow-100 text-yellow-700",
    Rejected: "bg-red-100 text-red-700",
  };

  const handleLogout = () => {
    logout();
  };

  const resetForm = () => {
    setPurpose("");
    setCategory("");
    setAmount("");
    setDate("");
    setFlag("");
  };

  const handleAddExpense = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!purpose || !category || !amount || !date || !flag) {
      alert("Please fill all required fields.");
      return;
    }

    try {
      await createExpense({
        purpose,
        category,
        amount: parseFloat(amount),
        date,
        flag,
      });

      alert("Expense added successfully!");
      resetForm();
      setIsAddDialogOpen(false);
      fetchExpenses();
    } catch (err) {
      console.error("Error adding expense:", err);
    }
  };

  const handleEditExpense = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement edit functionality
    alert("Edit functionality coming soon!");
    setIsEditDialogOpen(false);
  };

  const handleDeleteExpense = async () => {
    if (!selectedExpense) return;

    try {
      await deleteExpense(selectedExpense.id || selectedExpense._id);
      alert("Expense deleted successfully!");
      setIsDeleteDialogOpen(false);
      setSelectedExpense(null);
      fetchExpenses();
    } catch (err) {
      console.error("Error deleting expense:", err);
    }
  };

  const openEditDialog = (expense: any) => {
    setSelectedExpense(expense);
    setPurpose(expense.purpose);
    setCategory(expense.category);
    setAmount(expense.amount.toString());
    setDate(expense.date.split("T")[0]);
    setFlag(expense.flag);
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (expense: any) => {
    setSelectedExpense(expense);
    setIsDeleteDialogOpen(true);
  };

  if (loading && expenses.length === 0) {
    return (
      <div className="p-6 flex items-center justify-center h-screen">
        <p className="text-lg">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen">
      <div className="flex-1 p-6 bg-gray-50 overflow-auto">
        <div className="flex justify-between items-center py-3">
          <p className="font-semibold text-lg">Dashboard</p>
          <LogoutAlertDialog
            userName={user?.name || "Staff"}
            onLogout={handleLogout}
          />
        </div>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <div className="flex justify-between mb-6">
          <h1 className="text-2xl font-bold">Expense Dashboard Overview</h1>
          <Button
            onClick={() => navigate("/staff/addExpense")}
            variant="default"
            className="flex items-center gap-2"
          >
            <Plus size={16} /> Add Expense
          </Button>
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
              {lineData.length > 0 ? (
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
              ) : (
                <p className="text-center text-gray-500 py-12">
                  No expense data yet
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>My Expense Requests</CardTitle>
          </CardHeader>
          <CardContent>
            {sortedExpenses.length > 0 ? (
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
                      <TableCell>{e.date.split("T")[0]}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded ${
                            statusColor[e.status]
                          }`}
                        >
                          {e.status}
                        </span>
                      </TableCell>
                      <TableCell>{e.submitter.name}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <p className="text-center text-gray-500 py-8">
                You haven't submitted any expenses yet
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
