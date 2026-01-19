import { useState, useMemo } from "react";
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

// Dummy staff data for now
const initialStaffs = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "Manager" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Staff" },
  { id: 3, name: "Alice Johnson", email: "alice@example.com", role: "Staff" },
];

export default function Staffs() {
  const [staffs, setStaffs] = useState(initialStaffs);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  // Filter staff based on search
  const filteredStaffs = useMemo(
    () =>
      staffs.filter(
        (staff) =>
          staff.name.toLowerCase().includes(search.toLowerCase()) ||
          staff.email.toLowerCase().includes(search.toLowerCase()) ||
          staff.role.toLowerCase().includes(search.toLowerCase())
      ),
    [staffs, search]
  );

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

      {/* Search input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search staff by name, email, or role..."
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
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStaffs.length > 0 ? (
              filteredStaffs.map((staff) => (
                <TableRow key={staff.id}>
                  <TableCell>{staff.id}</TableCell>
                  <TableCell>{staff.name}</TableCell>
                  <TableCell>{staff.email}</TableCell>
                  <TableCell>{staff.role}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
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
