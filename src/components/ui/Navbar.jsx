import { Link, useRouteLoaderData } from "react-router";

import NavLinks from "./NavLinks.jsx";
import UserMenu from "./UserMenu.jsx";
import AuthLinks from "./AuthLinks.jsx";

const Navbar = () => {
  const user = useRouteLoaderData("root");

  return (
    <nav className="sticky top-0 z-50 flex h-16 w-full items-center justify-between border-b border-slate-800 bg-slate-900/80 px-6 backdrop-blur-md">
      <Link
        to="/"
        className="text-xl font-bold tracking-tight text-white transition-colors hover:text-indigo-400"
      >
        My Blog
      </Link>

      <div className="flex items-center gap-4">
        <div className="mr-2 hidden gap-1 border-r border-slate-700 pr-4 md:flex">
          <NavLinks />
        </div>
        {user ? <UserMenu user={user} /> : <AuthLinks />}
      </div>
    </nav>
  );
};

export default Navbar;
