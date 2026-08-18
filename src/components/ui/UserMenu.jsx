import { UserCircle } from "lucide-react";
import LogoutButton from "../../features/auth/components/LogoutButton.jsx";

const UserMenu = ({ user }) => (
  <div className="flex items-center gap-4">
    <span className="flex items-center gap-2 text-sm font-medium text-slate-200">
      <UserCircle size={20} className="text-slate-400" />
      {user.name}
    </span>
    <LogoutButton />
  </div>
);

export default UserMenu;
