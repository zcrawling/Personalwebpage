import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  BookOpen,
  Pin,
  Calendar,
  Search,
  ChevronLeft,
  X,
  Tag,
  ExternalLink,
  CheckCircle2,
  Circle,
} from "lucide-react";
import { learningEntries, LearningEntry } from "../data/mockData";
import { useTheme } from "../context/ThemeContext";

export function Learning() {
  const [search, setSearch] = useState("");
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [selected, setSelected] = useState<LearningEntry | null>(null);
  const { theme } = useTheme();
  const isLight = theme === "light";

  const allTopics = Array.from(new Set(learningEntries.map((e) => e.topic)));

  const filtered = learningEntries.filter((entry) => {
    const matchSearch =
      search === "" ||
      entry.title.toLowerCase().includes(search.toLowerCase()) ||
      entry.summary.toLowerCase().includes(search.toLowerCase()) ||
      entry.topic.toLowerCase().includes(search.toLowerCase());
    const matchTopic = selectedTopic === null || entry.topic === selectedTopic;
    return matchSearch && matchTopic;
  });

  const avgProgress = Math.round(
    learningEntries.reduce((sum, e) => sum + e.progress, 0) / learningEntries.length
  );

  const accentBlue = isLight ? "#2563eb" : "#60a5fa";
  const accentBlueBg = isLight ? "#eff6ff" : "rgba(96,165,250,0.1)";
  const accentBlueBorder = isLight ? "#bfdbfe" : "rgba(96,165,250,0.25)";

  const getTopicStyle = (topic: string) => {
    const lightMap: Record<string, { color: string; bg: string; border: string }> = {
      "CS 기초": { color: "#7c3aed", bg: "#f5f3ff", border: "#ddd6fe" },
      알고리즘: { color: "#d97706", bg: "#fffbeb", border: "#fde68a" },
      네트워크: { color: "#0891b2", bg: "#ecfeff", border: "#a5f3fc" },
      React: { color: "#2563eb", bg: "#eff6ff", border: "#bfdbfe" },
      자료구조: { color: "#ea580c", bg: "#fff7ed", border: "#fed7aa" },
    };
    const darkMap: Record<string, { color: string; bg: string; border: string }> = {
      "CS 기초": { color: "#a78bfa", bg: "rgba(167,139,250,0.1)", border: "rgba(167,139,250,0.2)" },
      알고리즘: { color: "#fbbf24", bg: "rgba(251,191,36,0.1)", border: "rgba(251,191,36,0.2)" },
      네트워크: { color: "#22d3ee", bg: "rgba(34,211,238,0.1)", border: "rgba(34,211,238,0.2)" },
      React: { color: "#60a5fa", bg: "rgba(96,165,250,0.1)", border: "rgba(96,165,250,0.2)" },
      자료구조: { color: "#fb923c", bg: "rgba(251,146,60,0.1)", border: "rgba(251,146,60,0.2)" },
    };
    const map = isLight ? lightMap : darkMap;
    return (
      map[topic] || {
        color: "var(--site-text-muted)",
        bg: "var(--site-bg-subtle)",
        border: "var(--site-border)",
      }
    );
  };

  if (selected) {
    return <LearningDetail entry={selected} onBack={() => setSelected(null)} />;
  }

  return (
    <div className="pt-16 min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-16">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <div className="flex items-center gap-2 mb-3">
            <BookOpen className="w-5 h-5" style={{ color: accentBlue }} />
            <span className="text-sm font-mono" style={{ color: accentBlue }}>learning</span>
          </div>
          <h1 className="text-4xl mb-3" style={{ fontWeight: 700, color: "var(--site-text)" }}>학습내역</h1>
          <p style={{ color: "var(--site-text-muted)" }}>
            꾸준히 공부한 내용을 정리합니다.
            총 <span className="font-mono" style={{ color: "var(--site-text)" }}>{learningEntries.length}</span>개의 기록이 있습니다.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10"
        >
          {[
            { label: "전체 기록", value: learningEntries.length, unit: "개", color: "var(--site-text)" },
            {
              label: "완료",
              value: learningEntries.filter((e) => e.progress === 100).length,
              unit: "개",
              color: isLight ? "#059669" : "#34d399",
            },
            {
              label: "진행중",
              value: learningEntries.filter((e) => e.progress < 100).length,
              unit: "개",
              color: isLight ? "#d97706" : "#fbbf24",
            },
            { label: "평균 진도", value: avgProgress, unit: "%", color: accentBlue },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl p-4 text-center"
              style={{
                backgroundColor: "var(--site-bg-card)",
                border: "1px solid var(--site-border)",
              }}
            >
              <div
                className="text-2xl font-bold font-mono mb-1"
                style={{ color: stat.color }}
              >
                {stat.value}
                <span className="text-sm">{stat.unit}</span>
              </div>
              <div className="text-xs" style={{ color: "var(--site-text-muted)" }}>
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "var(--site-text-muted)" }} />
          <input
            type="text"
            placeholder="학습 내역 검색..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none transition-colors"
            style={{
              backgroundColor: "var(--site-bg-card)",
              border: "1px solid var(--site-border)",
              color: "var(--site-text)",
            }}
            onFocus={(e) => (e.currentTarget.style.borderColor = accentBlue)}
            onBlur={(e) => (e.currentTarget.style.borderColor = "var(--site-border)")}
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 transition-colors"
              style={{ color: "var(--site-text-muted)" }}
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Topic filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setSelectedTopic(null)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg border transition-all font-mono"
            style={
              selectedTopic === null
                ? { color: accentBlue, backgroundColor: accentBlueBg, borderColor: accentBlueBorder }
                : { backgroundColor: "var(--site-bg-card)", color: "var(--site-text-muted)", borderColor: "var(--site-border)" }
            }
          >
            <Tag className="w-3 h-3" />
            전체
          </button>
          {allTopics.map((topic) => {
            const s = getTopicStyle(topic);
            const isSelected = selectedTopic === topic;
            return (
              <button
                key={topic}
                onClick={() => setSelectedTopic(topic === selectedTopic ? null : topic)}
                className="px-3 py-1.5 text-xs rounded-lg border transition-all font-mono"
                style={
                  isSelected
                    ? { color: s.color, backgroundColor: s.bg, borderColor: s.border }
                    : { backgroundColor: "var(--site-bg-card)", color: "var(--site-text-muted)", borderColor: "var(--site-border)" }
                }
              >
                {topic}
              </button>
            );
          })}
        </div>

        {/* Entries */}
        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {filtered.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
                style={{ color: "var(--site-text-muted)" }}
              >
                <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-30" />
                <p>검색 결과가 없습니다.</p>
              </motion.div>
            ) : (
              filtered.map((entry, i) => {
                const s = getTopicStyle(entry.topic);
                const isDone = entry.progress === 100;
                const doneColor = isLight ? "#059669" : "#34d399";
                return (
                  <motion.article
                    key={entry.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                    className="group rounded-xl p-6 transition-all cursor-pointer"
                    style={{
                      backgroundColor: "var(--site-bg-card)",
                      border: "1px solid var(--site-border)",
                    }}
                    onClick={() => setSelected(entry)}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = accentBlueBorder;
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = "var(--site-border)";
                    }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 mt-1">
                        {isDone ? (
                          <CheckCircle2 className="w-5 h-5" style={{ color: doneColor }} />
                        ) : (
                          <Circle className="w-5 h-5" style={{ color: "var(--site-text-muted)" }} />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                          <span
                            className="px-2 py-0.5 text-xs rounded border font-mono"
                            style={{ color: s.color, backgroundColor: s.bg, borderColor: s.border }}
                          >
                            {entry.topic}
                          </span>
                          {entry.pinned && (
                            <span
                              className="flex items-center gap-1 px-2 py-0.5 text-xs rounded border font-mono"
                              style={{ color: accentBlue, backgroundColor: accentBlueBg, borderColor: accentBlueBorder }}
                            >
                              <Pin className="w-2.5 h-2.5" />
                              pinned
                            </span>
                          )}
                        </div>
                        <h2 className="font-semibold mb-1.5 transition-colors" style={{ color: "var(--site-text)" }}>
                          {entry.title}
                        </h2>
                        <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--site-text-muted)" }}>
                          {entry.summary}
                        </p>
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {entry.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-0.5 text-xs rounded font-mono"
                              style={{ backgroundColor: "var(--site-bg-subtle)", color: "var(--site-text-muted)" }}
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                        <div className="space-y-1.5">
                          <div className="flex justify-between text-xs" style={{ color: "var(--site-text-muted)" }}>
                            <span>학습 진도</span>
                            <span className="font-mono" style={{ color: isDone ? doneColor : accentBlue }}>
                              {entry.progress}%
                            </span>
                          </div>
                          <div
                            className="h-1.5 rounded-full overflow-hidden"
                            style={{ backgroundColor: "var(--site-bg-subtle)" }}
                          >
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${entry.progress}%` }}
                              transition={{ duration: 0.8, delay: i * 0.05 + 0.3 }}
                              className="h-full rounded-full"
                              style={{
                                background: isDone
                                  ? doneColor
                                  : `linear-gradient(to right, var(--site-gradient-from), var(--site-gradient-to))`,
                              }}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-1.5 flex-shrink-0 text-xs" style={{ color: "var(--site-text-muted)" }}>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span className="font-mono">{entry.date}</span>
                        </div>
                      </div>
                    </div>
                  </motion.article>
                );
              })
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function LearningDetail({ entry, onBack }: { entry: LearningEntry; onBack: () => void }) {
  const { theme } = useTheme();
  const isLight = theme === "light";
  const accentBlue = isLight ? "#2563eb" : "#60a5fa";
  const accentBlueBg = isLight ? "#eff6ff" : "rgba(96,165,250,0.1)";
  const accentBlueBorder = isLight ? "#bfdbfe" : "rgba(96,165,250,0.25)";
  const isDone = entry.progress === 100;
  const doneColor = isLight ? "#059669" : "#34d399";

  return (
    <div className="pt-16 min-h-screen">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <button
            onClick={onBack}
            className="flex items-center gap-2 transition-colors mb-8 group"
            style={{ color: "var(--site-text-muted)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--site-text)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--site-text-muted)")}
          >
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            <span className="text-sm">학습 목록</span>
          </button>

          <div className="flex flex-wrap items-center gap-3 mb-6">
            {entry.pinned && (
              <span
                className="flex items-center gap-1 px-2.5 py-1 text-xs rounded-full border font-mono"
                style={{ color: accentBlue, backgroundColor: accentBlueBg, borderColor: accentBlueBorder }}
              >
                <Pin className="w-3 h-3" />
                pinned
              </span>
            )}
            <div className="flex items-center gap-1 text-sm" style={{ color: "var(--site-text-muted)" }}>
              <Calendar className="w-3.5 h-3.5" />
              <span>{entry.date}</span>
            </div>
          </div>

          <h1 className="text-3xl mb-4" style={{ fontWeight: 700, color: "var(--site-text)" }}>
            {entry.title}
          </h1>
          <p
            className="text-lg leading-relaxed mb-6 pl-4"
            style={{ color: "var(--site-text-muted)", borderLeft: `2px solid ${accentBlue}` }}
          >
            {entry.summary}
          </p>

          {/* Progress */}
          <div
            className="rounded-xl p-4 mb-6"
            style={{
              backgroundColor: "var(--site-bg-card)",
              border: "1px solid var(--site-border)",
            }}
          >
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium" style={{ color: "var(--site-text)" }}>학습 진도</span>
              <span className="font-mono text-sm" style={{ color: isDone ? doneColor : accentBlue }}>
                {entry.progress}%
              </span>
            </div>
            <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: "var(--site-bg-subtle)" }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${entry.progress}%` }}
                transition={{ duration: 1, delay: 0.3 }}
                className="h-full rounded-full"
                style={{
                  background: isDone
                    ? doneColor
                    : `linear-gradient(to right, var(--site-gradient-from), var(--site-gradient-to))`,
                }}
              />
            </div>
            {entry.source && (
              <p className="text-xs mt-2 flex items-center gap-1" style={{ color: "var(--site-text-muted)" }}>
                <ExternalLink className="w-3 h-3" />
                출처: {entry.source}
              </p>
            )}
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            {entry.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-sm rounded-lg font-mono"
                style={{
                  backgroundColor: "var(--site-bg-subtle)",
                  color: "var(--site-text-muted)",
                  border: "1px solid var(--site-border)",
                }}
              >
                #{tag}
              </span>
            ))}
          </div>

          <div
            className="rounded-2xl p-8"
            style={{
              backgroundColor: "var(--site-bg-card)",
              border: "1px solid var(--site-border)",
            }}
          >
            {entry.content.split("\n\n").map((paragraph, i) => {
              if (paragraph.startsWith("## ")) {
                return (
                  <h2 key={i} className="text-xl font-semibold mt-8 mb-4 first:mt-0" style={{ color: "var(--site-text)" }}>
                    {paragraph.replace("## ", "")}
                  </h2>
                );
              }
              if (paragraph.startsWith("### ")) {
                return (
                  <h3 key={i} className="text-lg font-medium mt-6 mb-3" style={{ color: "var(--site-text)" }}>
                    {paragraph.replace("### ", "")}
                  </h3>
                );
              }
              return (
                <p key={i} className="leading-relaxed mb-4" style={{ color: "var(--site-text-muted)" }}>
                  {paragraph.split("`").map((part, j) =>
                    j % 2 === 1 ? (
                      <code
                        key={j}
                        className="px-1.5 py-0.5 text-sm rounded font-mono"
                        style={{
                          backgroundColor: "var(--site-bg-subtle)",
                          color: accentBlue,
                          border: `1px solid ${accentBlueBorder}`,
                        }}
                      >
                        {part}
                      </code>
                    ) : (
                      part
                    )
                  )}
                </p>
              );
            })}
            <div
              className="mt-8 pt-8 text-center text-sm"
              style={{ borderTop: "1px solid var(--site-border)", color: "var(--site-text-muted)" }}
            >
              <span className="font-mono">// 이 학습 기록은 계속 업데이트됩니다.</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
