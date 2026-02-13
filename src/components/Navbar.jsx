import { NavLink, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const links = [
  { name: "Home", path: "/" },
  { name: "Projects", path: "/projects" },
  { name: "Services", path: "/services" },
  { name: "About", path: "/about" },
];

const Navbar = () => {
  const [hidden, setHidden] = useState(false);
  const location = useLocation();

  useEffect(() => {
    let lastScroll = window.scrollY;
    const handleScroll = () => {
      const current = window.scrollY;
      setHidden(current > lastScroll && current > 80);
      lastScroll = current;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: 0 }}
      animate={{ y: hidden ? -100 : 0 }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="fixed top-0 left-0 w-full z-50 bg-slate-900 backdrop-blur-xl border-b border-white/10"
    >
      <nav className="max-w-7xl mx-auto px-2 sm:px-4 py-2 flex items-center justify-between gap-2 sm:gap-4">

        {/* Logo */}
        <NavLink to="/" className="text-lg sm:text-xl font-semibold text-white">
          David<span className="text-sky-400">.</span>
        </NavLink>

        {/* Nav Links */}
        <div className="flex flex-nowrap items-center gap-2 sm:gap-4 justify-end w-full sm:w-auto text-xs sm:text-sm">
          {links.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <NavLink
                key={link.path}
                to={link.path}
                className="relative px-1 sm:px-2 py-1 text-slate-300 hover:text-white transition"
              >
                {link.name}
                {isActive && (
                  <motion.span
                    layoutId="activeLink"
                    className="absolute -bottom-1 left-0 h-[2px] w-full bg-sky-400 rounded-full"
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  />
                )}
              </NavLink>
            );
          })}

          <NavLink
            to="/contact"
            className="px-2 py-1 rounded-md bg-sky-400 text-[#0F172A] hover:bg-sky-300 text-xs sm:text-sm transition"
          >
            Contact
          </NavLink>
        </div>
      </nav>

      {/* Force one-line small screen */}
      <style>
        {`
          @media (max-width: 640px) {
            nav {
              padding-left: 6px !important;
              padding-right: 6px !important;
            }
            nav > div {
              flex-wrap: nowrap !important;
            }
            nav a {
              padding-left: 4px !important;
              padding-right: 4px !important;
              font-size: 12px !important;
            }
          }
        `}
      </style>
    </motion.header>
  );
};

export default Navbar;
