// src/pages/AddExpense.tsx
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useExpenseViewModel } from "@/viewmodels/useExpenseViewModel";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/App";

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

export default function AddExpense() {
  const [purpose, setPurpose] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [flag, setFlag] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { createExpense, error } = useExpenseViewModel();
  const navigate = useNavigate();
  const { role } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
    if (!purpose || !category || !amount || !date || !flag) {
      alert("Please fill in all required fields");
      return;
    }

    try {
      setIsSubmitting(true);

      await createExpense({
        purpose,
        category,
        amount: parseFloat(amount),
        date,
        flag,
      });

      alert("Expense added successfully!");

      // Reset form
      setPurpose("");
      setCategory("");
      setAmount("");
      setDate("");
      setFlag("");

      // Navigate back based on role
      if (role === "admin") {
        navigate("/");
      } else {
        navigate("/staff");
      }
    } catch (err: any) {
      console.error("Error adding expense:", err);
      alert(
        err.response?.data?.message ||
          "Failed to add expense. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (role === "admin") {
      navigate("/");
    } else {
      navigate("/staff");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Add New Expense</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 max-w-lg mx-auto">
          {error}
        </div>
      )}

      <Card className="max-w-lg mx-auto">
        <CardHeader>
          <CardTitle>Expense Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="purpose">Purpose *</Label>
              <Input
                id="purpose"
                placeholder="Enter purpose"
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                required
                className="mt-2"
                disabled={isSubmitting}
              />
            </div>

            <div>
              <Label htmlFor="category">Category *</Label>
              <Select
                onValueChange={setCategory}
                value={category}
                disabled={isSubmitting}
              >
                <SelectTrigger id="category" className="w-full mt-2">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="amount">Amount (Rs.) *</Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                min="0"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
                className="mt-2"
                disabled={isSubmitting}
              />
            </div>

            <div>
              <Label htmlFor="date">Date *</Label>
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                className="mt-2"
                disabled={isSubmitting}
              />
            </div>

            <div>
              <Label htmlFor="flag">Priority Flag *</Label>
              <Select
                onValueChange={setFlag}
                value={flag}
                disabled={isSubmitting}
              >
                <SelectTrigger id="flag" className="w-full mt-2">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  {flags.map((f) => (
                    <SelectItem key={f} value={f}>
                      {f}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-3 mt-6">
              <Button type="submit" className="flex-1" disabled={isSubmitting}>
                {isSubmitting ? "Adding..." : "Add Expense"}
              </Button>
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={handleCancel}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
