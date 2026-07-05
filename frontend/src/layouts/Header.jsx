import { NavLink } from "react-router-dom";
import { Sparkles, Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

function Header() {
  const [open, setOpen] = useState(false);

  const navLinkColor = ({ isActive }) =>
    `block px-4 py-2 rounded-full transition-all duration-300 font-medium ${
      isActive
        ? "bg-indigo-500/10 text-indigo-300"
        : "text-slate-300 hover:bg-white/5 hover:text-white"
    }`;

  const navVariants = {
    hidden: {
      opacity: 0,
      y: -25,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const listVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: -10,
    },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <header className="fixed top-5 left-0 w-full flex justify-center z-50 px-4">
      {/* Glow */}
      <div className="absolute inset-0 flex justify-center pointer-events-none">
        <div className="absolute h-44 w-155 rounded-full bg-indigo-500/20 blur-[120px]" />
        <div className="absolute h-32 w-85 rounded-full bg-amber-400/10 blur-[90px]" />
      </div>

      <div className="relative w-full max-w-5xl">
        {/* Navbar */}
        <motion.nav
          variants={navVariants}
          initial="hidden"
          animate="visible"
          className="rounded-full border border-white/5 bg-white/8 backdrop-blur-3xl shadow-[0_0_40px_rgba(99,102,241,0.12)] px-5 md:px-8 py-3"
        >
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="flex items-center gap-2 cursor-pointer"
            >
              <Sparkles
                className="h-6 w-6 md:h-7 md:w-7 text-amber-400"
                fill="currentColor"
              />

              <h1 className="text-2xl md:text-[30px] font-semibold text-white">
                Lumos
              </h1>
            </motion.div>

            {/* Desktop Navigation */}
            <motion.ul
              variants={listVariants}
              initial="hidden"
              animate="visible"
              className="hidden md:flex items-center gap-2"
            >
              {[
                { name: "Home", path: "/" },
                { name: "Chat", path: "/chat" },
                { name: "About", path: "/about" },
                { name: "Profile", path: "/profile" },
              ].map((item) => (
                <motion.li
                  key={item.name}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <NavLink to={item.path} className={navLinkColor}>
                    {item.name}
                  </NavLink>
                </motion.li>
              ))}
            </motion.ul>

            {/* Mobile Button */}
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.9 }}
              animate={{ rotate: open ? 90 : 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setOpen(!open)}
              className="md:hidden text-white p-2 rounded-full hover:bg-white/10"
            >
              {open ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </motion.nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{
                opacity: 0,
                y: -20,
                scale: 0.96,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: -20,
                scale: 0.96,
              }}
              transition={{
                duration: 0.25,
              }}
              className="md:hidden mt-3"
            >
              <div className="rounded-3xl border border-white/5 bg-white/8 backdrop-blur-3xl p-3 shadow-[0_0_40px_rgba(99,102,241,0.12)]">
                {[
                  { name: "Home", path: "/" },
                  { name: "About", path: "/about" },
                  { name: "Profile", path: "/profile" },
                ].map((item) => (
                  <motion.div
                    key={item.name}
                    whileHover={{ x: 6 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <NavLink
                      to={item.path}
                      className={navLinkColor}
                      onClick={() => setOpen(false)}
                    >
                      {item.name}
                    </NavLink>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}

export default Header;
