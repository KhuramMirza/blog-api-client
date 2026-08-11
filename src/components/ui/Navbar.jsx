import { Link, useRouteLoaderData } from "react-router";

const navLinks = [
  {
    to: "/",
    title: "Home",
  },
];

const Navbar = () => {
  const user = useRouteLoaderData("root");

  return (
    <nav className="flex h-[7%] w-full items-center justify-center gap-2 bg-purple-500">
      {navLinks.map((link) => (
        <Link
          key={link.title}
          to={link.to}
          className="px-2 py-1 font-semibold text-slate-900"
        >
          {link.title}
        </Link>
      ))}

      {user ? (
        <span className="px-2 py-1 font-semibold text-slate-900">
          Welcome, {user.name}
        </span>
      ) : (
        <>
          <Link to="/login" className="px-2 py-1 font-semibold text-slate-900">
            Login
          </Link>
          <Link
            to="/register"
            className="px-2 py-1 font-semibold text-slate-900"
          >
            Register
          </Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
