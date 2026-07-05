import { NavLink } from "react-router-dom";
import { Sparkles } from "lucide-react";

function Header() {
  const navLinkColor = ({ isActive }) =>
    `px-4 py-2 rounded-full transition-all duration-300 font-medium ${
      isActive
        ? "bg-indigo-500/10 text-indigo-300"
        : "text-slate-300 hover:bg-white/5 hover:text-white"
    }`;

  return (
    <header className="fixed top-5 left-0 w-full flex justify-center z-50">
      {/* Permanent Glow */}
      <div className="absolute inset-0 flex justify-center pointer-events-none">
        <div className="absolute h-44 w-155 rounded-full bg-indigo-500/20 blur-[120px]" />

        <div className="absolute h-32 w-85 rounded-full bg-amber-400/10 blur-[90px]" />
      </div>

      {/* Navbar */}
      <nav className="relative rounded-full border border-white/5 bg-white/8 backdrop-blur-3xl shadow-[0_0_40px_rgba(99,102,241,0.12)] px-8 py-3">
        <div className="flex items-center gap-16">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer">
            <Sparkles className="h-7 w-7 text-amber-400" fill="currentColor" />

            <h1 className="text-[30px] font-semibold tracking-tight text-white">
              Lumos
            </h1>
          </div>

          {/* Navigation */}
          <ul className="flex items-center gap-2">
            <li>
              <NavLink to="/" className={navLinkColor}>
                Home
              </NavLink>
            </li>

            <li>
              <NavLink to="/about" className={navLinkColor}>
                About
              </NavLink>
            </li>

            <li>
              <NavLink to="/profile" className={navLinkColor}>
                Profile
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Header;
