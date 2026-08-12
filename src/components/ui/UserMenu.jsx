import { UserCircle } from "lucide-react";
import LogoutButton from "./LogoutButton.jsx";

const UserMenu = ({ user }) => (
  <div className="flex items-center gap-3">
    <span className="flex items-center gap-1.5 font-medium text-slate-100">
      <UserCircle size={18} />
      {user.name}
    </span>
    <LogoutButton />
  </div>
);

export default UserMenu;
