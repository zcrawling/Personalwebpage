import { useState } from "react";
import { motion } from "motion/react";
import { Lock } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export function AdminLogin({ onSuccess }: { onSuccess: (token: string) => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { theme } = useTheme();
  const isLight = theme === "light";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        setError("비밀번호가 틀렸습니다");
        return;
      }
      const data = await res.json();
      localStorage.setItem("admin_token", data.token);
      onSuccess(data.token);
    } catch {
      setError("서버 연결 실패");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-16 min-h-screen flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm p-8 rounded-2xl"
        style={{
          backgroundColor: "var(--site-bg-card)",
          border: "1px solid var(--site-border)",
        }}
      >
        <div className="flex items-center gap-3 mb-8">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: "var(--site-accent-bg)", border: "1px solid var(--site-accent-border)" }}
          >
            <Lock className="w-5 h-5" style={{ color: "var(--site-accent-text)" }} />
          </div>
          <div>
            <h1 className="font-semibold" style={{ color: "var(--site-text)" }}>관리자 로그인</h1>
            <p className="text-xs" style={{ color: "var(--site-text-muted)" }}>Admin Access</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none"
            style={{
              backgroundColor: "var(--site-bg-subtle)",
              border: `1px solid ${error ? (isLight ? "#ef4444" : "#f87171") : "var(--site-border)"}`,
              color: "var(--site-text)",
            }}
          />
          {error && (
            <p className="text-sm" style={{ color: isLight ? "#ef4444" : "#f87171" }}>{error}</p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl text-sm font-medium text-white transition-all hover:opacity-90 disabled:opacity-50"
            style={{ backgroundColor: "var(--site-accent-btn)" }}
          >
            {loading ? "확인 중..." : "로그인"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}