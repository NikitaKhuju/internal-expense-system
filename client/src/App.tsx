import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./views/Login";

const App = () => {
  const isAuthenticated = Boolean(localStorage.getItem("token"));

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <Navigate to="/expenses" /> : <Login />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
