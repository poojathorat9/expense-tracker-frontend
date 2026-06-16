import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "../pages/login-page";
import SignupPage from "../pages/signup-page";
import Dashboard from "../pages/dashboard";
import ExpensePage from "../pages/expense";
import GoalsPage from "../pages/goals";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/expense" element={<ExpensePage />} />
        <Route path="/goals" element={<GoalsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;