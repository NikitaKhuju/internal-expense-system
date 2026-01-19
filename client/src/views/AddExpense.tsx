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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const expense = { purpose, category, amount, date, status, flag };
    console.log("Expense submitted:", expense);
    alert("Expense added! ");
    // API callling
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Add New Expense</h1>
      <Card className="max-w-lg mx-auto">
        <CardHeader>
          <CardTitle>Expense Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="purpose">Purpose</Label>

              <Input
                id="purpose"
                placeholder="Enter purpose"
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                required
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="category">Category</Label>
              <Select onValueChange={setCategory} value={category}>
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
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="flag">Flag</Label>
              <Select onValueChange={setFlag} value={flag}>
                <SelectTrigger id="flag" className="w-full mt-2">
                  <SelectValue placeholder="Select flag" />
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

            <Button type="submit" className="w-full mt-4">
              Add Expense
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
