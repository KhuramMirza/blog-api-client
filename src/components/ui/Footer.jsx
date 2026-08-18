const Footer = () => {
  return (
    <footer className="border-t border-slate-800 bg-slate-900 py-8 text-center text-sm text-slate-500">
      <p>© {new Date().getFullYear()} My Blog. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
