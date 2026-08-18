import { Outlet } from "react-router";
import Navbar from "./ui/Navbar.jsx";
import Footer from "./ui/Footer.jsx";

function Layout() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-900 font-sans text-slate-100 selection:bg-indigo-500/30">
      <Navbar />

      <main className="flex-1 pb-12">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default Layout;
