// components/ui/NavLinks.jsx
import { Link } from "react-router";

const navLinks = [{ to: "/", title: "Home" }];

const NavLinks = () => (
  <>
    {navLinks.map((link) => (
      <Link
        key={link.title}
        to={link.to}
        className="rounded px-3 py-1.5 font-medium text-slate-100 transition-colors hover:bg-purple-600/50"
      >
        {link.title}
      </Link>
    ))}
  </>
);

export default NavLinks;
