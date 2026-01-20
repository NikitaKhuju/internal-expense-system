import React, { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  type ExpenseCategory,
  type ExpenseFlag,
  type ExpenseStatus,
} from "@/models/expense.model";
import { useExpenseViewModel } from "@/viewmodels/useExpenseViewModel";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const statusColor: Record<ExpenseStatus, string> = {
  Approved: "bg-green-100 text-green-700",
  Pending: "bg-yellow-100 text-yellow-700",
  Rejected: "bg-red-100 text-red-700",
};

const flagColor: Record<ExpenseFlag, string> = {
  Low: "bg-green-100 text-green-700",
  Medium: "bg-yellow-100 text-yellow-700",
  High: "bg-red-100 text-red-700",
};

export default function Expenses() {
  const { expenses, loading, error, fetchExpenses } = useExpenseViewModel();

  const [purposeSearch, setPurposeSearch] = useState("");
  const [submitterSearch, setSubmitterSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<ExpenseCategory | "all">(
    "all"
  );
  const [flagFilter, setFlagFilter] = useState<ExpenseFlag | "all">("all");

  useEffect(() => {
    fetchExpenses();
  }, []);

  const filteredExpenses = useMemo(() => {
    return expenses
      .filter((e) =>
        purposeSearch === ""
          ? true
          : e.purpose.toLowerCase().includes(purposeSearch.toLowerCase())
      )
      .filter((e) =>
        submitterSearch === ""
          ? true
          : e.submitter.name
              .toLowerCase()
              .includes(submitterSearch.toLowerCase())
      )
      .filter((e) =>
        categoryFilter === "all" ? true : e.category === categoryFilter
      )
      .filter((e) => (flagFilter === "all" ? true : e.flag === flagFilter))
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [expenses, purposeSearch, submitterSearch, categoryFilter, flagFilter]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Expenses</h1>

      {loading && <p className="text-gray-500 mb-4">Loading expenses...</p>}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="grid md:grid-cols-4 gap-4 mb-6">
        {(["Pending", "Approved", "Rejected"] as ExpenseStatus[]).map(
          (status) => (
            <Card key={status}>
              <CardContent className="p-4">
                <p className="text-sm text-gray-500">{status}</p>
                <p className="text-xl font-bold">
                  {expenses.filter((e) => e.status === status).length}
                </p>
              </CardContent>
            </Card>
          )
        )}
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-500">Total Requests</p>
            <p className="text-xl font-bold">{expenses.length}</p>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-6">
        <CardContent className="p-4 flex flex-wrap items-center gap-4">
          <Input
            placeholder="Search by purpose..."
            className="w-64"
            value={purposeSearch}
            onChange={(e) => setPurposeSearch(e.target.value)}
          />

          <Input
            placeholder="Search by submitter..."
            className="w-64"
            value={submitterSearch}
            onChange={(e) => setSubmitterSearch(e.target.value)}
          />

          <Select
            value={categoryFilter}
            onValueChange={(v) =>
              setCategoryFilter(v as ExpenseCategory | "all")
            }
          >
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="Office Supplies">Office Supplies</SelectItem>
              <SelectItem value="IT / Software">IT / Software</SelectItem>
              <SelectItem value="Travel">Travel</SelectItem>
              <SelectItem value="Food & Beverages">Food & Beverages</SelectItem>
              <SelectItem value="Utilities">Utilities</SelectItem>
              <SelectItem value="Marketing & Advertising">
                Marketing & Advertising
              </SelectItem>
              <SelectItem value="Training & Development">
                Training & Development
              </SelectItem>
              <SelectItem value="Maintenance & Repairs">
                Maintenance & Repairs
              </SelectItem>
              <SelectItem value="Employee Benefits">
                Employee Benefits
              </SelectItem>
              <SelectItem value="Miscellaneous">Miscellaneous</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={flagFilter}
            onValueChange={(v) => setFlagFilter(v as ExpenseFlag | "all")}
          >
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter by flag" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Flags</SelectItem>
              <SelectItem value="Low">Low</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="High">High</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Expenses({filteredExpenses.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-gray-500">Loading expenses...</p>
          ) : filteredExpenses.length === 0 ? (
            <p className="text-center text-gray-500 py-6">No expenses found</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Purpose</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Submitter</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Flag</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {filteredExpenses.map((e) => (
                  <TableRow key={e.id}>
                    <TableCell>{e.purpose}</TableCell>
                    <TableCell>{e.category}</TableCell>
                    <TableCell>{e.submitter.name}</TableCell>
                    <TableCell>Rs. {e.amount}</TableCell>
                    <TableCell>{e.date.split("T")[0]}</TableCell>
                    <TableCell>
                      <Badge className={statusColor[e.status]}>
                        {e.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={flagColor[e.flag]}>{e.flag}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
