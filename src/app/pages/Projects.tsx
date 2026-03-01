// import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Github, ExternalLink, Pin, Filter, Layers } from "lucide-react";

import { useEffect, useState } from "react";
import { fetchProjects } from "../data/api";
import type { Project } from "../data/mockData";
import { useTheme } from "../context/ThemeContext";

const filterOptions = ["전체", "진행중", "완료", "계획중"];

export function Projects() {
  const [filter, setFilter] = useState("전체");
  const [selected, setSelected] = useState<Project | null>(null);
  const { theme } = useTheme();
  const isLight = theme === "light";
  
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    fetchProjects().then(setProjects);
  }, []);

  const getStatusStyle = (status: string) => {
    const map: Record<string, { color: string; bg: string; border: string }> = {
      진행중: {
        color: isLight ? "#059669" : "#34d399",
        bg: isLight ? "#ecfdf5" : "rgba(52,211,153,0.1)",
        border: isLight ? "#6ee7b7" : "rgba(52,211,153,0.25)",
      },
      완료: {
        color: isLight ? "#2563eb" : "#60a5fa",
        bg: isLight ? "#eff6ff" : "rgba(96,165,250,0.1)",
        border: isLight ? "#bfdbfe" : "rgba(96,165,250,0.25)",
      },
      계획중: {
        color: isLight ? "#d97706" : "#fbbf24",
        bg: isLight ? "#fffbeb" : "rgba(251,191,36,0.1)",
        border: isLight ? "#fde68a" : "rgba(251,191,36,0.25)",
      },
    };
    return map[status] || map["완료"];
  };

  const filtered = filter === "전체" ? projects : projects.filter((p) => p.status === filter);

  return (
    <div className="pt-16 min-h-screen">
      <div className="max-w-5xl mx-auto px-6 py-16">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="flex items-center gap-2 mb-3">
            <Layers className="w-5 h-5" style={{ color: "var(--site-accent-text)" }} />
            <span className="text-sm font-mono" style={{ color: "var(--site-accent-text)" }}>projects</span>
          </div>
          <h1 className="text-4xl mb-3" style={{ fontWeight: 700, color: "var(--site-text)" }}>프로젝트</h1>
          <p style={{ color: "var(--site-text-muted)" }}>
            아이디어를 코드로 구현한 것들을 모았습니다.
            총 <span className="font-mono" style={{ color: "var(--site-text)" }}>{projects.length}</span>개의 프로젝트가 있습니다.
          </p>
        </motion.div>

        {/* Filter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-2 mb-8 flex-wrap"
        >
          <Filter className="w-4 h-4" style={{ color: "var(--site-text-muted)" }} />
          {filterOptions.map((opt) => (
            <button
              key={opt}
              onClick={() => setFilter(opt)}
              className="px-3 py-1.5 text-sm rounded-lg transition-all font-mono"
              style={
                filter === opt
                  ? {
                      backgroundColor: "var(--site-accent-bg)",
                      color: "var(--site-accent-text)",
                      border: "1px solid var(--site-accent-border)",
                    }
                  : {
                      backgroundColor: "var(--site-bg-card)",
                      color: "var(--site-text-muted)",
                      border: "1px solid var(--site-border)",
                    }
              }
            >
              {opt}
            </button>
          ))}
          <span className="text-sm ml-2" style={{ color: "var(--site-text-muted)" }}>
            {filtered.length}개
          </span>
        </motion.div>

        {/* Project Grid */}
        <div className="grid md:grid-cols-2 gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => {
              const s = getStatusStyle(project.status);
              return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="group rounded-xl p-6 transition-all cursor-pointer"
                  style={{
                    backgroundColor: "var(--site-bg-card)",
                    border: "1px solid var(--site-border)",
                  }}
                  onClick={() => setSelected(project)}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "var(--site-accent-border)";
                    (e.currentTarget as HTMLElement).style.backgroundColor = "var(--site-bg-hover)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "var(--site-border)";
                    (e.currentTarget as HTMLElement).style.backgroundColor = "var(--site-bg-card)";
                  }}
                >
                  {/* Top row */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      {project.pinned && (
                        <Pin className="w-3.5 h-3.5" style={{ color: "var(--site-accent-text)" }} />
                      )}
                      <span className="text-xs font-mono" style={{ color: "var(--site-text-muted)" }}>
                        {project.category}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className="px-2 py-0.5 text-xs rounded-full border"
                        style={{ color: s.color, backgroundColor: s.bg, borderColor: s.border }}
                      >
                        {project.status}
                      </span>
                      <span className="text-xs font-mono" style={{ color: "var(--site-text-muted)" }}>
                        {project.date}
                      </span>
                    </div>
                  </div>

                  <h2 className="font-semibold mb-2 transition-colors" style={{ color: "var(--site-text)" }}>
                    {project.title}
                  </h2>
                  <p className="text-sm mb-4 leading-relaxed line-clamp-2" style={{ color: "var(--site-text-muted)" }}>
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 text-xs rounded font-mono"
                        style={{
                          backgroundColor: "var(--site-bg-subtle)",
                          color: "var(--site-text-muted)",
                          border: "1px solid var(--site-border-soft)",
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div
                    className="flex items-center gap-3 pt-3"
                    style={{ borderTop: "1px solid var(--site-border-soft)" }}
                  >
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1 text-sm transition-colors"
                        style={{ color: "var(--site-text-muted)" }}
                        onClick={(e) => e.stopPropagation()}
                        onMouseEnter={(e) => (e.currentTarget.style.color = "var(--site-text)")}
                        onMouseLeave={(e) => (e.currentTarget.style.color = "var(--site-text-muted)")}
                      >
                        <Github className="w-3.5 h-3.5" />
                        <span>소스코드</span>
                      </a>
                    )}
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1 text-sm transition-colors"
                        style={{ color: "var(--site-text-muted)" }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>사이트</span>
                      </a>
                    )}
                    <span
                      className="ml-auto text-xs group-hover:underline"
                      style={{ color: "var(--site-accent-text)" }}
                    >
                      자세히 보기 →
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Detail Modal */}
        <AnimatePresence>
          {selected && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              style={{ backgroundColor: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
              onClick={() => setSelected(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.25 }}
                className="rounded-2xl p-8 max-w-lg w-full max-h-[80vh] overflow-y-auto"
                style={{
                  backgroundColor: "var(--site-bg-card)",
                  border: "1px solid var(--site-border)",
                }}
                onClick={(e) => e.stopPropagation()}
              >
                {(() => {
                  const s = getStatusStyle(selected.status);
                  return (
                    <>
                      <div className="flex items-center justify-between mb-6">
                        <span
                          className="px-3 py-1 text-sm rounded-full border"
                          style={{ color: s.color, backgroundColor: s.bg, borderColor: s.border }}
                        >
                          {selected.status}
                        </span>
                        <button
                          onClick={() => setSelected(null)}
                          className="text-xl leading-none transition-colors"
                          style={{ color: "var(--site-text-muted)" }}
                          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--site-text)")}
                          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--site-text-muted)")}
                        >
                          ×
                        </button>
                      </div>

                      <h2 className="text-2xl mb-3" style={{ fontWeight: 700, color: "var(--site-text)" }}>
                        {selected.title}
                      </h2>
                      <p className="text-sm mb-5 font-mono" style={{ color: "var(--site-text-muted)" }}>
                        {selected.category} · {selected.date}
                      </p>
                      <p className="leading-relaxed mb-6" style={{ color: "var(--site-text-muted)" }}>
                        {selected.longDescription}
                      </p>

                      <div className="mb-6">
                        <h3 className="text-sm font-semibold mb-3" style={{ color: "var(--site-text)" }}>
                          기술 스택
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {selected.stack.map((tech) => (
                            <span
                              key={tech}
                              className="px-3 py-1 text-sm rounded-lg font-mono"
                              style={{
                                backgroundColor: "var(--site-bg-subtle)",
                                border: "1px solid var(--site-border)",
                                color: "var(--site-text-muted)",
                              }}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-3">
                        {selected.github && (
                          <a
                            href={selected.github}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all"
                            style={{
                              backgroundColor: "var(--site-bg-subtle)",
                              border: "1px solid var(--site-border)",
                              color: "var(--site-text)",
                            }}
                          >
                            <Github className="w-4 h-4" />
                            GitHub
                          </a>
                        )}
                        {selected.link && (
                          <a
                            href={selected.link}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-2 px-4 py-2 text-white rounded-lg text-sm transition-all hover:opacity-90"
                            style={{ backgroundColor: "var(--site-accent-btn)" }}
                          >
                            <ExternalLink className="w-4 h-4" />
                            사이트 방문
                          </a>
                        )}
                      </div>
                    </>
                  );
                })()}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
