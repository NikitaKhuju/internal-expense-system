// src/pages/AddStaff.tsx
import React, { useState, useEffect } from "react";
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

// Departments for dropdown
const departments = [
  "Engineering",
  "Marketing",
  "Operations",
  "HR",
  "Finance",
  "Sales",
];

export default function AddStaff() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [password, setPassword] = useState("");

  // Generate random password on component load
  useEffect(() => {
    const generatePassword = () => {
      const chars =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      let pwd = "";
      for (let i = 0; i < 6; i++) {
        pwd += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return pwd;
    };
    setPassword(generatePassword());
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (!name || !email || !department || !password) {
      alert("Please fill all required fields.");
      return;
    }

    const staffData = { name, email, department, password };

    try {
      // Call backend route
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(staffData),
      });

      const data = await res.json();

      if (res.ok) {
        alert(`Staff added successfully!\nGenerated password: ${password}`);

        // Reset form
        setName("");
        setEmail("");
        setDepartment("");

        // Generate new password for next staff
        const chars =
          "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        let newPwd = "";
        for (let i = 0; i < 12; i++) {
          newPwd += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        setPassword(newPwd);
      } else {
        alert(data.message || "Error adding staff.");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Add New Staff</h1>
      <Card className="max-w-lg mx-auto">
        <CardHeader>
          <CardTitle>Staff Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Enter full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="mt-2"
              />
            </div>

            <div className="flex flex-col">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-2"
              />
            </div>

            <div className="flex flex-col">
              <Label htmlFor="department">Department</Label>
              <Select onValueChange={setDepartment} value={department}>
                <SelectTrigger id="department" className="mt-2 w-full">
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map((dep) => (
                    <SelectItem key={dep} value={dep}>
                      {dep}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col">
              <Label htmlFor="password">Auto-Generated Password</Label>
              <Input
                id="password"
                type="text"
                value={password}
                readOnly
                className="mt-2 bg-gray-100 cursor-not-allowed"
              />
            </div>

            <Button type="submit" className="w-full mt-4">
              Add Staff
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
