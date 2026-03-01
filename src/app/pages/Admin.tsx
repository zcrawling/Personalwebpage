import { useState } from "react";
import { AdminLogin } from "./AdminLogin";
import { AdminDashboard } from "./AdminDashboard";

export function Admin() {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("admin_token")
  );

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    setToken(null);
  };

  if (!token) return <AdminLogin onSuccess={setToken} />;
  return <AdminDashboard token={token} onLogout={handleLogout} />;
}
