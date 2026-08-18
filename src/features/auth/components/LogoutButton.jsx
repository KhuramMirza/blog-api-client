import { useState } from "react";
import { useNavigate, useRevalidator } from "react-router";
import { LogOut, Loader2 } from "lucide-react";

import { logoutUser } from "../api/logoutApi.js";

const LogoutButton = () => {
  const navigate = useNavigate();
  const revalidator = useRevalidator();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logoutUser();
      navigate("/login", { replace: true });
      await revalidator.revalidate();
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <button
      onClick={handleLogout}
      disabled={isLoggingOut}
      className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-400 transition-colors hover:bg-slate-800 hover:text-red-400 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {isLoggingOut ? (
        <Loader2 size={16} className="animate-spin" />
      ) : (
        <LogOut size={16} />
      )}
      {isLoggingOut ? "Logging out..." : "Logout"}
    </button>
  );
};

export default LogoutButton;
