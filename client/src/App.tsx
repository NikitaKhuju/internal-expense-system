import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useState, createContext, useContext, useEffect } from "react";

import Login from "./views/auth/Login";
import Dashboard from "./views/admin/Dashboard";
import AddExpense from "./views/AddExpense";
import AddStaff from "./views/admin/AddStaff";
import StaffDashboard from "./views/staff/StaffDashboard";
import Expenses from "./views/admin/Expenses";
import Requests from "./views/admin/Requests";
import Staffs from "./views/admin/Staffs";
import { Sidebar } from "./components/Sidebar";

// Auth Context Interface
interface AuthContextType {
  role: string | null;
  setRole: (role: string | null) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  role: null,
  setRole: () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

// Protected Route Component
function ProtectedRoute({
  children,
  allowedRoles,
}: {
  children: React.ReactNode;
  allowedRoles: string[];
}) {
  const { role } = useAuth();

  if (!role) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(role)) {
    return <Navigate to={role === "admin" ? "/" : "/staff"} replace />;
  }

  return <>{children}</>;
}

// Admin Layout with Sidebar
function AdminLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(true);

  return (
    <div className="flex h-screen">
      <Sidebar open={open} toggle={() => setOpen(!open)} />
      <div className="flex-1 overflow-auto">{children}</div>
    </div>
  );
}

// Staff Layout without Sidebar
function StaffLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
      <div className="flex-1 overflow-auto">{children}</div>
    </div>
  );
}

// Admin Routes Component
function AdminRoutes() {
  return (
    <AdminLayout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/expenses" element={<Expenses />} />
        <Route path="/requests" element={<Requests />} />
        <Route path="/addStaff" element={<AddStaff />} />
        <Route path="/staffs" element={<Staffs />} />
        <Route path="/addExpense" element={<AddExpense />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AdminLayout>
  );
}

// Staff Routes Component
function StaffRoutes() {
  return (
    <StaffLayout>
      <Routes>
        <Route path="/staff" element={<StaffDashboard />} />
        <Route path="/staff/addExpense" element={<AddExpense />} />
        <Route path="*" element={<Navigate to="/staff" replace />} />
      </Routes>
    </StaffLayout>
  );
}

// Main App Component
export default function App() {
  const [role, setRole] = useState<string | null>(() => {
    return sessionStorage.getItem("userRole");
  });
  const location = useLocation();

  useEffect(() => {
    if (role) {
      sessionStorage.setItem("userRole", role);
    } else {
      sessionStorage.removeItem("userRole");
    }
  }, [role]);

  const logout = () => {
    setRole(null);
    sessionStorage.removeItem("userRole");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  const isLoginPage = location.pathname === "/login";

  return (
    <AuthContext.Provider value={{ role, setRole, logout }}>
      {!isLoginPage && role ? (
        <>
          {role === "admin" ? (
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminRoutes />
            </ProtectedRoute>
          ) : (
            <ProtectedRoute allowedRoles={["staff"]}>
              <StaffRoutes />
            </ProtectedRoute>
          )}
        </>
      ) : (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      )}
    </AuthContext.Provider>
  );
}
