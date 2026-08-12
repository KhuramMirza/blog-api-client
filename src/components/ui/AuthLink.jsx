import { Link } from "react-router";

const AuthLinks = () => (
  <div className="flex items-center gap-2">
    <Link
      to="/login"
      className="rounded px-3 py-1.5 font-medium text-slate-100 transition-colors hover:bg-purple-600/50"
    >
      Login
    </Link>
    <Link
      to="/register"
      className="rounded bg-slate-900 px-3 py-1.5 font-semibold text-white transition-colors hover:bg-slate-800"
    >
      Register
    </Link>
  </div>
);

export default AuthLinks;
