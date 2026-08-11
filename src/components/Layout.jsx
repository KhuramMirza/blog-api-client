import { Outlet } from "react-router";
import Navbar from "./ui/Navbar.jsx";

function Layout() {
  return (
    <div className="h-screen bg-slate-900 text-white">
      <Navbar />
      <main className="h-[80%]">
        <Outlet />
      </main>

      <footer className="h-[10%]">
        <p>© 2026 My Blog</p>
      </footer>
    </div>
  );
}

export default Layout;
