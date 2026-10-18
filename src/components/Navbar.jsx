
import { useState } from "react";
import { NavLink, Link } from "react-router-dom";

const links = [
//   { label: "About", path: "/about" },
  { label: "Skills", path: "/skills" },
  { label: "Projects", path: "/projects" },
  { label: "Research", path: "/research" },
  { label: "Contact", path: "/contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  function closeMenu() {
    setMenuOpen(false);
  }

  const linkClass = ({ isActive }) =>
    `group relative w-fit py-2 text-sm font-medium transition duration-300 ${
      isActive
        ? "text-green-400"
        : "text-gray-300 hover:text-green-400"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-[#0b0d0f]/95 backdrop-blur-xl">
      <nav
        className="relative mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8"
        aria-label="Main navigation"
      >
        {/* Brand */}
        <Link
          to="/"
          onClick={closeMenu}
          className="group flex items-center gap-3 text-white"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-green-400/30 bg-green-400/10 text-lg font-bold text-green-400 transition duration-300 group-hover:bg-green-400 group-hover:text-gray-950">
            K.
          </span>

          <span className="text-xl font-bold tracking-tight">
            Kunal<span className="text-green-400">.</span>
          </span>
        </Link>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-2xl text-white transition hover:border-green-400 hover:text-green-400 md:hidden"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? "×" : "☰"}
        </button>

        {/* Navigation Links */}
        <div
          className={`${
            menuOpen ? "flex" : "hidden"
          } absolute left-0 right-0 top-full flex-col gap-2 border-b border-white/10 bg-[#0b0d0f] px-5 py-5 shadow-2xl md:static md:flex md:flex-row md:items-center md:gap-8 md:border-0 md:bg-transparent md:p-0 md:shadow-none`}
        >
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={closeMenu}
              className={linkClass}
            >
              {link.label}
              <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-green-400 transition-all duration-300 group-hover:w-full" />
            </NavLink>
          ))}

          <Link
            to="/contact"
            onClick={closeMenu}
            className="mt-2 inline-flex w-fit items-center gap-3 rounded-lg bg-green-400 px-5 py-2.5 text-sm font-semibold text-gray-950 transition duration-300 hover:-translate-y-0.5 hover:bg-green-300 md:mt-0"
          >
            Let's talk <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </nav>
    </header>
  );
}
