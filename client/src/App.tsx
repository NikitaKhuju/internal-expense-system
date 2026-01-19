import { Button } from "@/components/ui/button";
import { useState } from "react";
import Login from "./views/auth/Login";
import Dashboard from "./views/admin/Dashboard";
import AddExpense from "./views/AddExpense";
import AddStaff from "./views/admin/AddStaff";
import StaffDashboard from "./views/staff/StaffDashboard";
import Expenses from "./views/admin/Expenses";
import Requests from "./views/admin/Requests";

function App() {
  return (
    <div>
      <StaffDashboard />
    </div>
  );
}

export default App;
