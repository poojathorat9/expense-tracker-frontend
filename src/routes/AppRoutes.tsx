import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "../pages/login-page";
import SignupPage from "../pages/signup-page";
import Dashboard from "../pages/dashboard";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;