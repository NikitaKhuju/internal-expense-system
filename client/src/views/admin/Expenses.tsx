import React, { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  type Expense,
  type ExpenseFlag,
  type ExpenseStatus,
} from "@/models/expense.model";

const expenses: Expense[] = [
  {
    id: 1,
    purpose: "Office Supplies",
    category: "Stationery",
    submitter: { id: "u1", name: "John Doe" },
    amount: 5000,
    date: "2026-01-18",
    status: "Pending",
    flag: "Low",
  },
  {
    id: 2,
    purpose: "Software License",
    category: "IT",
    submitter: { id: "u2", name: "Mary Smith" },
    amount: 30000,
    date: "2026-01-16",
    status: "Approved",
    flag: "High",
  },
  {
    id: 3,
    purpose: "Client Meeting",
    category: "Food",
    submitter: { id: "u3", name: "Alice Brown" },
    amount: 8000,
    date: "2026-01-15",
    status: "Rejected",
    flag: "Medium",
  },
];

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
  const filteredExpenses = useMemo(() => {
    return [...expenses].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Expenses</h1>

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

      <Card>
        <CardHeader>
          <CardTitle>Expense Requests</CardTitle>
        </CardHeader>
        <CardContent>
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
                  <TableCell>{e.date}</TableCell>
                  <TableCell>
                    <Badge className={statusColor[e.status]}>{e.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={flagColor[e.flag]}>{e.flag}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
