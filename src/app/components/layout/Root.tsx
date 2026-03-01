import { Outlet } from "react-router";
import { Navbar } from "./Navbar";
import { ThemeProvider, useTheme } from "../../context/ThemeContext";

function RootInner() {
  const { theme } = useTheme();

  return (
    <div
      className={theme === "light" ? "theme-light" : ""}
      style={{
        minHeight: "100vh",
        backgroundColor: "var(--site-bg)",
        color: "var(--site-text)",
        fontFamily: "'Pretendard Variable', 'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif",
        transition: "background-color 0.3s, color 0.3s",
      }}
    >
      <Navbar />
      <main>
        <Outlet />
      </main>
      <footer
        style={{ borderTop: "1px solid var(--site-border-soft)" }}
        className="py-8 mt-16"
      >
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p style={{ color: "var(--site-text-muted)" }} className="text-sm font-mono">
            © 2026 dev.log — built with React & TypeScript
          </p>
          <div
            style={{ color: "var(--site-text-muted)" }}
            className="flex items-center gap-4 text-sm"
          >
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              style={{ color: "var(--site-text-muted)" }}
              className="hover:opacity-100 transition-opacity"
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--site-text)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--site-text-muted)")}
            >
              GitHub
            </a>
            <span>·</span>
            <a
              href="mailto:dev@example.com"
              style={{ color: "var(--site-text-muted)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--site-text)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--site-text-muted)")}
            >
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export function Root() {
  return (
    <ThemeProvider>
      <RootInner />
    </ThemeProvider>
  );
}
