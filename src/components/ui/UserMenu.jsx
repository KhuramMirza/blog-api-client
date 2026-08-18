import { UserCircle } from "lucide-react";
import LogoutButton from "../../features/auth/components/LogoutButton.jsx";
import { Link } from "react-router";

const UserMenu = ({ user }) => (
  <div className="flex items-center gap-4">
    <Link
      to="/dashboard"
      className="rounded-lg px-3 py-2 text-sm font-medium text-slate-300 transition-colors hover:bg-slate-800 hover:text-white"
    >
      Dashboard
    </Link>
    <span className="flex items-center gap-2 text-sm font-medium text-slate-200">
      <UserCircle size={20} className="text-slate-400" />
      {user.name}
    </span>
    <LogoutButton />
  </div>
);

export default UserMenu;
