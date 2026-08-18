import { Link } from "react-router";

const AuthLinks = () => (
  <div className="flex items-center gap-3">
    <Link
      to="/login"
      className="rounded-lg px-4 py-2 text-sm font-medium text-slate-300 transition-colors hover:bg-slate-800 hover:text-white"
    >
      Login
    </Link>
    <Link
      to="/register"
      className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-indigo-700"
    >
      Register
    </Link>
  </div>
);

export default AuthLinks;
