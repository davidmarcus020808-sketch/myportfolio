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
      animate={{ y: hidden ? -110 : 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 25 }}
      className="fixed top-0 left-0 w-full z-50 
                 bg-slate-900/80 backdrop-blur-2xl 
                 border-b border-white/10 
                 shadow-lg shadow-black/20"
    >
      <nav className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 flex items-center justify-between gap-3 sm:gap-6">

        {/* Logo */}
        <NavLink
          to="/"
          className="text-lg sm:text-xl font-semibold text-white tracking-tight"
        >
          David
          <span className="text-sky-400 animate-pulse">.</span>
        </NavLink>

        {/* Nav Links */}
        <div className="flex flex-nowrap items-center gap-3 sm:gap-6 justify-end w-full sm:w-auto text-xs sm:text-sm">
          {links.map((link) => {
            const isActive = location.pathname === link.path;

            return (
              <NavLink
                key={link.path}
                to={link.path}
                className="relative px-2 py-1 text-slate-300 hover:text-white transition-colors duration-200"
              >
                {link.name}

                {isActive && (
                  <motion.span
                    layoutId="activeLink"
                    className="absolute -bottom-1 left-0 h-[3px] w-full 
                               bg-gradient-to-r from-sky-400 to-cyan-300 
                               rounded-full"
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  />
                )}
              </NavLink>
            );
          })}

          {/* Contact Button */}
          <NavLink
            to="/contact"
            className="px-3 py-1.5 rounded-lg 
                       bg-gradient-to-r from-sky-400 to-cyan-400 
                       text-[#0F172A] font-medium 
                       hover:scale-105 active:scale-95 
                       transition-all duration-200 
                       text-xs sm:text-sm"
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
