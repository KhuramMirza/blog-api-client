import { Link, useRouteLoaderData } from "react-router";

import NavLinks from "./NavLinks.jsx";
import UserMenu from "./UserMenu.jsx";
import AuthLinks from "./AuthLink.jsx";

const Navbar = () => {
  const user = useRouteLoaderData("root");

  return (
    <nav className="flex h-[7%] w-full items-center justify-between bg-purple-500 px-6 py-2 shadow-md">
      <Link to="/" className="text-lg font-bold text-white">
        My Blog
      </Link>

      <div className="flex items-center gap-2">
        <NavLinks />
        {user ? <UserMenu user={user} /> : <AuthLinks />}
      </div>
    </nav>
  );
};

export default Navbar;
