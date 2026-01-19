import Login from "./views/auth/Login";
import Dashboard from "./views/admin/Dashboard";
import AddExpense from "./views/AddExpense";
import AddStaff from "./views/admin/AddStaff";
import StaffDashboard from "./views/staff/StaffDashboard";
import Expenses from "./views/admin/Expenses";
import Requests from "./views/admin/Requests";
import { Routes, Route } from "react-router-dom";
import { Sidebar } from "./components/Sidebar";
import { useState } from "react";
import Staffs from "./views/admin/Staffs";

function App() {
  const [open, setOpen] = useState<boolean>(true);
  return (
    <div className="flex flex-row h-screen">
      <Sidebar
        open={open}
        toggle={() => {
          setOpen(!open);
        }}
      />

      <div className="flex-1 overflow-auto">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/expenses" element={<Expenses />} />
          <Route path="/requests" element={<Requests />} />
          <Route path="/login" element={<Login />} />
          <Route path="/addExpense" element={<AddExpense />} />
          <Route path="/addStaff" element={<AddStaff />} />
          <Route path="/staffDashboard" element={<StaffDashboard />} />
          <Route path="/staffs" element={<Staffs />} />

          <Route path="*" element={<p>Page Not Found</p>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
