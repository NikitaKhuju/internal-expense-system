import React, { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  type Expense,
  type ExpenseCategory,
  type ExpenseFlag,
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
    status: "Pending",
    flag: "Medium",
  },
];

const flagColor: Record<ExpenseFlag, string> = {
  Low: "bg-green-100 text-green-700",
  Medium: "bg-yellow-100 text-yellow-700",
  High: "bg-red-100 text-red-700",
};

export default function Requests() {
  const [purposeSearch, setPurposeSearch] = useState("");
  const [submitterSearch, setSubmitterSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<ExpenseCategory | "all">(
    "all"
  );
  const [flagFilter, setFlagFilter] = useState<ExpenseFlag | "all">("all");

  //Filtering
  const pendingExpenses = useMemo(() => {
    return expenses
      .filter((e) => e.status === "Pending")
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
  }, [purposeSearch, submitterSearch, categoryFilter, flagFilter]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Pending Requests</h1>
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
              <SelectItem value="IT">IT</SelectItem>
              <SelectItem value="Food">Food</SelectItem>
              <SelectItem value="Stationery">Stationery</SelectItem>
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
      //Table
      <Card>
        <CardHeader>
          <CardTitle>Pending Expense Requests</CardTitle>
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
                <TableHead>Flag</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {pendingExpenses.map((e) => (
                <TableRow key={e.id}>
                  <TableCell>{e.purpose}</TableCell>
                  <TableCell>{e.category}</TableCell>
                  <TableCell>{e.submitter.name}</TableCell>
                  <TableCell>Rs. {e.amount}</TableCell>
                  <TableCell>{e.date}</TableCell>
                  <TableCell>
                    <Badge className={flagColor[e.flag]}>{e.flag}</Badge>
                  </TableCell>
                  <TableCell className="space-x-2">
                    <Button size="sm" variant="outline">
                      Approve
                    </Button>
                    <Button size="sm" variant="destructive">
                      Reject
                    </Button>
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
