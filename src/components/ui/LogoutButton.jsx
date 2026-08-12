import { useState } from "react";
import { useNavigate, useRevalidator } from "react-router";
import { LogOut, Loader2 } from "lucide-react";

import { logoutUser } from "../../api/logoutApi.js";

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
      className="flex items-center gap-1.5 rounded px-3 py-1.5 font-medium text-slate-100 transition-colors hover:bg-purple-600/50 disabled:cursor-not-allowed disabled:opacity-50"
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
