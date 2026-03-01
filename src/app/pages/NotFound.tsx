import { Link } from "react-router";
import { motion } from "motion/react";
import { Home } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export function NotFound() {
  const { theme } = useTheme();
  const isLight = theme === "light";

  return (
    <div className="pt-16 min-h-screen flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center px-6"
      >
        <div className="text-sm mb-6 font-mono" style={{ color: "var(--site-text-muted)" }}>
          <span style={{ color: "var(--site-accent-text)" }}>404</span> | page not found
        </div>
        <h1 className="text-6xl mb-4" style={{ fontWeight: 700, color: "var(--site-text)" }}>
          404
        </h1>
        <p className="mb-8 max-w-sm mx-auto" style={{ color: "var(--site-text-muted)" }}>
          찾으시는 페이지가 없거나 이동된 것 같습니다.
        </p>
        <div
          className="rounded-xl p-4 font-mono text-sm text-left max-w-sm mx-auto mb-8"
          style={{
            backgroundColor: "var(--site-bg-card)",
            border: "1px solid var(--site-border)",
          }}
        >
          <span style={{ color: "var(--site-text-muted)" }}>$ </span>
          <span style={{ color: isLight ? "#059669" : "#34d399" }}>cd</span>
          <span style={{ color: "var(--site-text)" }}> /home</span>
          <br />
          <span style={{ color: isLight ? "#d97706" : "#fbbf24" }}>bash: </span>
          <span style={{ color: "var(--site-text-muted)" }}>no such file or directory</span>
        </div>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 text-white rounded-lg font-medium transition-all hover:opacity-90"
          style={{ backgroundColor: "var(--site-accent-btn)" }}
        >
          <Home className="w-4 h-4" />
          홈으로 돌아가기
        </Link>
      </motion.div>
    </div>
  );
}
