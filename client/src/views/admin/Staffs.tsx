// src/pages/Staffs.tsx
import { useState, useMemo, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useUserViewModel } from "@/viewmodels/useUserViewModel";

export default function Staffs() {
  const { users, loading, error, fetchAllStaff } = useUserViewModel();
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllStaff();
  }, []);

  // Filter staff based on search
  const filteredStaffs = useMemo(
    () =>
      users.filter(
        (staff) =>
          staff.name.toLowerCase().includes(search.toLowerCase()) ||
          staff.email.toLowerCase().includes(search.toLowerCase()) ||
          (staff.department &&
            staff.department.toLowerCase().includes(search.toLowerCase()))
      ),
    [users, search]
  );

  if (loading && users.length === 0) {
    return (
      <div className="p-6 flex items-center justify-center h-screen">
        <p className="text-lg">Loading staff...</p>
      </div>
    );
  }

  return (
    <div className="p-4 flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Staffs</h1>
        <Button
          onClick={() => navigate("/addStaff")}
          variant="default"
          className="flex items-center gap-2"
        >
          <Plus size={16} /> Add Staff
        </Button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Search input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search staff by name, email, or department..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Table */}
      <div className="overflow-auto flex-1">
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Joined</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStaffs.length > 0 ? (
              filteredStaffs.map((staff) => (
                <TableRow key={staff.id}>
                  <TableCell>{staff.name}</TableCell>
                  <TableCell>{staff.email}</TableCell>
                  <TableCell>{staff.phone || "N/A"}</TableCell>
                  <TableCell>{staff.department || "N/A"}</TableCell>
                  <TableCell>
                    {staff.createdAt
                      ? new Date(staff.createdAt).toLocaleDateString()
                      : "N/A"}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  No staff found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
