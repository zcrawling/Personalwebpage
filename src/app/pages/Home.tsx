import { useEffect, useState } from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import {
  ArrowRight,
  Pin,
  Calendar,
  Clock,
  BookOpen,
  Layers,
  Terminal,
  ChevronRight,
  Sparkles,
  GitBranch,
  Zap,
} from "lucide-react";
import { fetchProjects, fetchDevLogs, fetchLearning } from "../data/api";
import type { Project } from "../data/mockData";
import type { DevLogEntry } from "../data/mockData";
import type { LearningEntry } from "../data/mockData";
import { useTheme } from "../context/ThemeContext";

const TYPING_TEXT = "배우고, 개발하고, 성장합니다.";

export function Home() {
  const [typed, setTyped] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const { theme } = useTheme();
  const isLight = theme === "light";
  const [projects, setProjects] = useState<Project[]>([]);
  const [devLogs, setDevLogs] = useState<DevLogEntry[]>([]);
  const [learningEntries, setLearningEntries] = useState<LearningEntry[]>([]);

useEffect(() => {
  fetchProjects().then(setProjects);
  fetchDevLogs().then(setDevLogs);
  fetchLearning().then(setLearningEntries);
}, []);


  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i <= TYPING_TEXT.length) {
        setTyped(TYPING_TEXT.slice(0, i));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 60);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setShowCursor((v) => !v), 500);
    return () => clearInterval(interval);
  }, []);

  const pinnedProjects = projects.filter((p) => p.pinned);
  const recentLogs = devLogs.slice(0, 3);
  const pinnedLearning = learningEntries.filter((l) => l.pinned);

  const statusColors = isLight
    ? {
        진행중: "text-emerald-600 bg-emerald-50 border-emerald-200",
        완료: "text-blue-600 bg-blue-50 border-blue-200",
        계획중: "text-amber-600 bg-amber-50 border-amber-200",
      }
    : {
        진행중: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
        완료: "text-blue-400 bg-blue-400/10 border-blue-400/20",
        계획중: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
      };

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background grid */}
        <div
          className="absolute inset-0 opacity-100"
          style={{
            backgroundImage: `linear-gradient(var(--site-grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--site-grid-line) 1px, transparent 1px)`,
            backgroundSize: "48px 48px",
          }}
        />
        {/* Gradient orbs */}
        <div
          className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full blur-3xl"
          style={{ backgroundColor: "var(--site-glow-1)" }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl"
          style={{ backgroundColor: "var(--site-glow-2)" }}
        />

        <div className="max-w-6xl mx-auto px-6 py-24 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            {/* Badge */}
            <div
              style={{
                backgroundColor: "var(--site-accent-bg)",
                border: "1px solid var(--site-accent-border)",
                color: "var(--site-accent-text)",
              }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm mb-8"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span className="font-mono">
                현재 프로젝트 {projects.filter((p) => p.status === "진행중").length}개 진행 중
              </span>
            </div>

            {/* Name & Greeting */}
            <h1
              className="text-5xl md:text-7xl mb-4"
              style={{
                fontWeight: 700,
                color: "var(--site-text)",
                fontFamily: "'Pretendard Variable', sans-serif",
              }}
            >
              안녕하세요<br />
              <span
                style={{
                  background: `linear-gradient(135deg, var(--site-gradient-from), var(--site-gradient-to))`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                개발자 이성빈
              </span>
              입니다.
            </h1>

            {/* Typing */}
            <div
              className="text-xl md:text-2xl mb-8 h-8 font-mono"
              style={{ color: "var(--site-text-muted)" }}
            >
              <span>{typed}</span>
              <span
                className="ml-0.5 transition-opacity"
                style={{ opacity: showCursor ? 1 : 0, color: "var(--site-accent-text)" }}
              >
                │
              </span>
            </div>

            {/* Brief bio */}
            <p
              className="text-lg leading-relaxed mb-10 max-w-xl"
              style={{ color: "var(--site-text-muted)" }}
            >
                주로 C++, Python을 사용하여 컴퓨터비젼, 센서제어, 임베디드 통신을 
                공부하고 있습니다. 주제와 난이도를 가리지않고 더 나은 개발자가 되기 위해
                꾸준히 성장하고 있습니다.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-3">
              <Link
                to="/about"
                style={{
                  backgroundColor: "var(--site-accent-btn)",
                }}
                className="inline-flex items-center gap-2 px-6 py-3 text-white rounded-lg font-medium transition-all hover:opacity-90"
              >
                자세한 소개 보기
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/projects"
                style={{
                  backgroundColor: "var(--site-bg-subtle)",
                  border: "1px solid var(--site-border)",
                  color: "var(--site-text)",
                }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all hover:opacity-80"
              >
                프로젝트 둘러보기
              </Link>
            </div>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-20 flex flex-wrap gap-8"
          >
            {[
              { icon: <GitBranch className="w-4 h-4" />, value: `${projects.length}`, label: "진행 프로젝트" },
              { icon: <Terminal className="w-4 h-4" />, value: `${devLogs.length}`, label: "개발 일지" },
              { icon: <BookOpen className="w-4 h-4" />, value: `${learningEntries.length}`, label: "학습 기록" },
              { icon: <Zap className="w-4 h-4" />, value: "2026", label: "활동 중" },
            ].map((stat) => (
              <div key={stat.label} className="flex items-center gap-3">
                <div style={{ color: "var(--site-accent-text)" }}>{stat.icon}</div>
                <div>
                  <div style={{ color: "var(--site-text)" }} className="font-semibold font-mono">{stat.value}</div>
                  <div style={{ color: "var(--site-text-muted)" }} className="text-xs">{stat.label}</div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          style={{ color: "var(--site-text-muted)" }}
        >
          <span className="text-xs font-mono">scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-px h-8"
            style={{ background: `linear-gradient(to bottom, var(--site-text-muted), transparent)` }}
          />
        </motion.div>
      </section>

      <div className="max-w-6xl mx-auto px-6 pb-24 space-y-20">

        {/* Pinned Projects */}
        <Section
          icon={<Layers className="w-5 h-5" style={{ color: "var(--site-accent-text)" }} />}
          title="진행 중인 프로젝트"
          subtitle="현재 집중하고 있는 프로젝트들"
          linkTo="/projects"
          linkLabel="모든 프로젝트"
        >
          <div className="grid md:grid-cols-2 gap-4">
            {pinnedProjects.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group relative rounded-xl p-6 transition-all"
                style={{
                  backgroundColor: "var(--site-bg-card)",
                  border: "1px solid var(--site-border)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--site-accent-border)";
                  (e.currentTarget as HTMLElement).style.backgroundColor = "var(--site-bg-hover)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--site-border)";
                  (e.currentTarget as HTMLElement).style.backgroundColor = "var(--site-bg-card)";
                }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Pin className="w-3.5 h-3.5" style={{ color: "var(--site-accent-text)" }} />
                    <span className="text-xs font-mono" style={{ color: "var(--site-accent-text)" }}>pinned</span>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-xs border ${statusColors[project.status]}`}>
                    {project.status}
                  </span>
                </div>
                <h3
                  className="font-semibold mb-2 transition-colors"
                  style={{ color: "var(--site-text)" }}
                >
                  {project.title}
                </h3>
                <p className="text-sm mb-4 leading-relaxed" style={{ color: "var(--site-text-muted)" }}>
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {project.stack.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 text-xs rounded-md font-mono"
                      style={{
                        backgroundColor: "var(--site-bg-subtle)",
                        color: "var(--site-text-muted)",
                        border: "1px solid var(--site-border-soft)",
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                  {project.stack.length > 4 && (
                    <span
                      className="px-2 py-0.5 text-xs rounded-md font-mono"
                      style={{
                        backgroundColor: "var(--site-bg-subtle)",
                        color: "var(--site-text-muted)",
                      }}
                    >
                      +{project.stack.length - 4}
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* Recent Dev Logs */}
        <Section
          icon={<Terminal className="w-5 h-5 text-emerald-500" />}
          title="최근 개발일지"
          subtitle="개발하면서 배우고 느낀 것들을 기록합니다"
          linkTo="/devlog"
          linkLabel="모든 글 보기"
        >
          <div className="flex flex-col gap-3">
            {recentLogs.map((log, i) => (
              <motion.div
                key={log.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group rounded-xl p-5 transition-all cursor-pointer"
                style={{
                  backgroundColor: "var(--site-bg-card)",
                  border: "1px solid var(--site-border)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = isLight ? "#6ee7b7" : "rgba(52,211,153,0.3)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--site-border)";
                }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5">
                      {log.pinned && <Pin className="w-3 h-3 text-emerald-500 flex-shrink-0" />}
                      <h3
                        className="font-medium transition-colors truncate"
                        style={{ color: "var(--site-text)" }}
                      >
                        {log.title}
                      </h3>
                    </div>
                    <p className="text-sm leading-relaxed line-clamp-2 mb-3" style={{ color: "var(--site-text-muted)" }}>
                      {log.summary}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {log.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 text-xs rounded-md font-mono"
                          style={{
                            backgroundColor: "var(--site-bg-subtle)",
                            color: "var(--site-text-muted)",
                          }}
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2 flex-shrink-0">
                    <div className="flex items-center gap-1 text-xs" style={{ color: "var(--site-text-muted)" }}>
                      <Calendar className="w-3 h-3" />
                      <span>{log.date}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs" style={{ color: "var(--site-text-muted)" }}>
                      <Clock className="w-3 h-3" />
                      <span>{log.readTime}분</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-emerald-500 mt-1" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* Pinned Learning */}
        <Section
          icon={<BookOpen className="w-5 h-5" style={{ color: isLight ? "#2563eb" : "#60a5fa" }} />}
          title="핀 학습내역"
          subtitle="중요하다고 생각해서 핀한 학습 기록들"
          linkTo="/learning"
          linkLabel="모든 학습 기록"
        >
          <div className="grid md:grid-cols-2 gap-4">
            {pinnedLearning.map((entry, i) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group rounded-xl p-5 transition-all"
                style={{
                  backgroundColor: "var(--site-bg-card)",
                  border: "1px solid var(--site-border)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = isLight ? "#bfdbfe" : "rgba(96,165,250,0.3)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--site-border)";
                }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Pin className="w-3.5 h-3.5" style={{ color: isLight ? "#2563eb" : "#60a5fa" }} />
                    <span
                      className="px-2 py-0.5 text-xs rounded-md border font-mono"
                      style={{
                        color: isLight ? "#2563eb" : "#60a5fa",
                        backgroundColor: isLight ? "#eff6ff" : "rgba(96,165,250,0.1)",
                        borderColor: isLight ? "#bfdbfe" : "rgba(96,165,250,0.2)",
                      }}
                    >
                      {entry.topic}
                    </span>
                  </div>
                  <span className="text-xs font-mono" style={{ color: "var(--site-text-muted)" }}>
                    {entry.date}
                  </span>
                </div>
                <h3
                  className="font-medium mb-2 transition-colors"
                  style={{ color: "var(--site-text)" }}
                >
                  {entry.title}
                </h3>
                <p className="text-sm mb-4 leading-relaxed line-clamp-2" style={{ color: "var(--site-text-muted)" }}>
                  {entry.summary}
                </p>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs" style={{ color: "var(--site-text-muted)" }}>
                    <span>학습 진도</span>
                    <span className="font-mono">{entry.progress}%</span>
                  </div>
                  <div
                    className="h-1.5 rounded-full overflow-hidden"
                    style={{ backgroundColor: "var(--site-bg-subtle)" }}
                  >
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${entry.progress}%` }}
                      transition={{ duration: 0.8, delay: i * 0.1 + 0.3 }}
                      viewport={{ once: true }}
                      className="h-full rounded-full"
                      style={{ background: `linear-gradient(to right, var(--site-gradient-from), var(--site-gradient-to))` }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Section>
      </div>
    </div>
  );
}

function Section({
  icon,
  title,
  subtitle,
  linkTo,
  linkLabel,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  linkTo: string;
  linkLabel: string;
  children: React.ReactNode;
}) {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, margin: "-80px" }}
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            {icon}
            <h2 className="font-semibold text-xl" style={{ color: "var(--site-text)" }}>{title}</h2>
          </div>
          <p className="text-sm" style={{ color: "var(--site-text-muted)" }}>{subtitle}</p>
        </div>
        <Link
          to={linkTo}
          className="flex items-center gap-1 text-sm transition-colors group"
          style={{ color: "var(--site-text-muted)" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--site-text)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--site-text-muted)")}
        >
          {linkLabel}
          <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
      {children}
    </motion.section>
  );
}
