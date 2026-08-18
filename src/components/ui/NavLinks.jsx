import { Link } from "react-router";

const navLinks = [{ to: "/", title: "Home" }];

const NavLinks = () => (
  <>
    {navLinks.map((link) => (
      <Link
        key={link.title}
        to={link.to}
        className="rounded-lg px-3 py-2 text-sm font-medium text-slate-300 transition-colors hover:bg-slate-800 hover:text-white"
      >
        {link.title}
      </Link>
    ))}
  </>
);

export default NavLinks;
