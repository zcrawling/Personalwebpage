import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router";
import { Menu, X, Terminal, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useTheme } from "../../context/ThemeContext";

const navItems = [
  { path: "/", label: "홈", exact: true },
  { path: "/about", label: "소개" },
  { path: "/projects", label: "프로젝트" },
  { path: "/devlog", label: "개발일지" },
  { path: "/learning", label: "학습내역" },
];

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const isLight = theme === "light";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  return (
    <header
      style={{
        backgroundColor: scrolled ? "var(--site-navbar-bg)" : "transparent",
        borderBottom: scrolled ? "1px solid var(--site-border)" : "1px solid transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        transition: "all 0.3s",
      }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-2 group">
          <div
            style={{ background: "var(--site-accent)" }}
            className="w-8 h-8 rounded-md flex items-center justify-center transition-all"
          >
            <Terminal className="w-4 h-4 text-white" />
          </div>
          <span
            style={{ color: "var(--site-text)" }}
            className="font-mono font-semibold tracking-tight transition-colors"
          >
            dev<span style={{ color: "var(--site-accent-text)" }}>.</span>log
          </span>
        </NavLink>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.exact}
              className="relative px-4 py-2 text-sm font-medium transition-colors rounded-lg"
              style={({ isActive }) => ({
                color: isActive ? "var(--site-accent-text)" : "var(--site-text-muted)",
              })}
            >
              {({ isActive }) => (
                <>
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      style={{
                        backgroundColor: "var(--site-accent-bg)",
                        border: "1px solid var(--site-accent-border)",
                      }}
                      className="absolute inset-0 rounded-lg"
                      transition={{ type: "spring", duration: 0.4 }}
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}

          {/* Theme Toggle — Desktop */}
          <ThemeToggleButton isLight={isLight} toggleTheme={toggleTheme} />
        </div>

        {/* Mobile right group */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggleButton isLight={isLight} toggleTheme={toggleTheme} />
          <button
            style={{ color: "var(--site-text-muted)" }}
            className="transition-colors p-2 hover:opacity-80"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="메뉴 열기"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              backgroundColor: "var(--site-navbar-bg)",
              borderBottom: "1px solid var(--site-border)",
              backdropFilter: "blur(12px)",
            }}
            className="md:hidden overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.exact}
                  className="px-4 py-3 text-sm font-medium rounded-lg transition-colors"
                  style={({ isActive }) => ({
                    color: isActive ? "var(--site-accent-text)" : "var(--site-text-muted)",
                    backgroundColor: isActive ? "var(--site-accent-bg)" : "transparent",
                  })}
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function ThemeToggleButton({
  isLight,
  toggleTheme,
}: {
  isLight: boolean;
  toggleTheme: () => void;
}) {
  return (
    <motion.button
      onClick={toggleTheme}
      whileTap={{ scale: 0.9 }}
      aria-label={isLight ? "다크 모드로 전환" : "라이트 모드로 전환"}
      style={{
        backgroundColor: "var(--site-bg-subtle)",
        border: "1px solid var(--site-border)",
        color: "var(--site-text-muted)",
      }}
      className="relative w-9 h-9 rounded-lg flex items-center justify-center transition-all hover:opacity-80 ml-1"
    >
      <AnimatePresence mode="wait">
        {isLight ? (
          <motion.div
            key="moon"
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.18 }}
          >
            <Moon className="w-4 h-4" />
          </motion.div>
        ) : (
          <motion.div
            key="sun"
            initial={{ rotate: 90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: -90, opacity: 0 }}
            transition={{ duration: 0.18 }}
          >
            <Sun className="w-4 h-4" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
