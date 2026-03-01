import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Terminal, Pin, Calendar, Clock, Tag, Search, ChevronLeft, X } from "lucide-react";
import { devLogs, DevLogEntry } from "../data/mockData";
import { useTheme } from "../context/ThemeContext";

export function DevLog() {
  const [search, setSearch] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [selected, setSelected] = useState<DevLogEntry | null>(null);
  const { theme } = useTheme();
  const isLight = theme === "light";

  const allTags = Array.from(new Set(devLogs.flatMap((l) => l.tags)));

  const filtered = devLogs.filter((log) => {
    const matchSearch =
      search === "" ||
      log.title.toLowerCase().includes(search.toLowerCase()) ||
      log.summary.toLowerCase().includes(search.toLowerCase());
    const matchTag = selectedTag === null || log.tags.includes(selectedTag);
    return matchSearch && matchTag;
  });

  const emeraldColor = isLight ? "#059669" : "#34d399";
  const emeraldBg = isLight ? "#ecfdf5" : "rgba(52,211,153,0.1)";
  const emeraldBorder = isLight ? "#6ee7b7" : "rgba(52,211,153,0.25)";

  if (selected) {
    return <PostDetail post={selected} onBack={() => setSelected(null)} />;
  }

  return (
    <div className="pt-16 min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-16">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="flex items-center gap-2 mb-3">
            <Terminal className="w-5 h-5" style={{ color: emeraldColor }} />
            <span className="text-sm font-mono" style={{ color: emeraldColor }}>dev.log</span>
          </div>
          <h1 className="text-4xl mb-3" style={{ fontWeight: 700, color: "var(--site-text)" }}>개발일지</h1>
          <p style={{ color: "var(--site-text-muted)" }}>
            개발하면서 배우고 느낀 것들을 기록합니다.
            총 <span className="font-mono" style={{ color: "var(--site-text)" }}>{devLogs.length}</span>개의 글이 있습니다.
          </p>
        </motion.div>

        {/* Search */}
        <div className="relative mb-5">
          <Search
            className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4"
            style={{ color: "var(--site-text-muted)" }}
          />
          <input
            type="text"
            placeholder="글 검색..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none transition-colors"
            style={{
              backgroundColor: "var(--site-bg-card)",
              border: `1px solid var(--site-border)`,
              color: "var(--site-text)",
            }}
            onFocus={(e) => (e.currentTarget.style.borderColor = emeraldColor)}
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

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setSelectedTag(null)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg border transition-all font-mono"
            style={
              selectedTag === null
                ? { color: emeraldColor, backgroundColor: emeraldBg, borderColor: emeraldBorder }
                : {
                    backgroundColor: "var(--site-bg-card)",
                    color: "var(--site-text-muted)",
                    borderColor: "var(--site-border)",
                  }
            }
          >
            <Tag className="w-3 h-3" />
            전체
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
              className="px-3 py-1.5 text-xs rounded-lg border transition-all font-mono"
              style={
                selectedTag === tag
                  ? { color: emeraldColor, backgroundColor: emeraldBg, borderColor: emeraldBorder }
                  : {
                      backgroundColor: "var(--site-bg-card)",
                      color: "var(--site-text-muted)",
                      borderColor: "var(--site-border)",
                    }
              }
            >
              #{tag}
            </button>
          ))}
        </div>

        {/* Posts */}
        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {filtered.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
                style={{ color: "var(--site-text-muted)" }}
              >
                <Terminal className="w-12 h-12 mx-auto mb-4 opacity-30" />
                <p>검색 결과가 없습니다.</p>
              </motion.div>
            ) : (
              filtered.map((log, i) => (
                <motion.article
                  key={log.id}
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
                  onClick={() => setSelected(log)}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = emeraldBorder;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "var(--site-border)";
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        {log.pinned && (
                          <span
                            className="flex items-center gap-1 px-2 py-0.5 text-xs rounded-md border font-mono"
                            style={{ color: emeraldColor, backgroundColor: emeraldBg, borderColor: emeraldBorder }}
                          >
                            <Pin className="w-2.5 h-2.5" />
                            pinned
                          </span>
                        )}
                      </div>
                      <h2 className="font-semibold mb-2 transition-colors text-lg" style={{ color: "var(--site-text)" }}>
                        {log.title}
                      </h2>
                      <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--site-text-muted)" }}>
                        {log.summary}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {log.tags.map((tag) => (
                          <button
                            key={tag}
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedTag(tag === selectedTag ? null : tag);
                            }}
                            className="px-2 py-0.5 text-xs rounded font-mono transition-colors"
                            style={
                              selectedTag === tag
                                ? { backgroundColor: emeraldBg, color: emeraldColor }
                                : { backgroundColor: "var(--site-bg-subtle)", color: "var(--site-text-muted)" }
                            }
                          >
                            #{tag}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2 flex-shrink-0 text-xs" style={{ color: "var(--site-text-muted)" }}>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span className="font-mono">{log.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{log.readTime}분 읽기</span>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function PostDetail({ post, onBack }: { post: DevLogEntry; onBack: () => void }) {
  const { theme } = useTheme();
  const isLight = theme === "light";
  const emeraldColor = isLight ? "#059669" : "#34d399";
  const emeraldBg = isLight ? "#ecfdf5" : "rgba(52,211,153,0.1)";
  const emeraldBorder = isLight ? "#6ee7b7" : "rgba(52,211,153,0.25)";

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
            <span className="text-sm">개발일지 목록</span>
          </button>

          <div className="flex flex-wrap items-center gap-3 mb-6">
            {post.pinned && (
              <span
                className="flex items-center gap-1 px-2.5 py-1 text-xs rounded-full border font-mono"
                style={{ color: emeraldColor, backgroundColor: emeraldBg, borderColor: emeraldBorder }}
              >
                <Pin className="w-3 h-3" />
                pinned
              </span>
            )}
            <div className="flex items-center gap-1 text-sm" style={{ color: "var(--site-text-muted)" }}>
              <Calendar className="w-3.5 h-3.5" />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center gap-1 text-sm" style={{ color: "var(--site-text-muted)" }}>
              <Clock className="w-3.5 h-3.5" />
              <span>{post.readTime}분 읽기</span>
            </div>
          </div>

          <h1 className="text-3xl mb-4" style={{ fontWeight: 700, color: "var(--site-text)" }}>{post.title}</h1>
          <p
            className="text-lg leading-relaxed mb-6 pl-4"
            style={{
              color: "var(--site-text-muted)",
              borderLeft: `2px solid ${emeraldColor}`,
            }}
          >
            {post.summary}
          </p>

          <div className="flex flex-wrap gap-2 mb-10">
            {post.tags.map((tag) => (
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
            <div className="max-w-none">
              {post.content.split("\n\n").map((paragraph, i) => {
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
                            color: emeraldColor,
                            border: `1px solid ${emeraldBorder}`,
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
            </div>
            <div
              className="mt-8 pt-8 text-center text-sm"
              style={{
                borderTop: "1px solid var(--site-border)",
                color: "var(--site-text-muted)",
              }}
            >
              <span className="font-mono">// 이 글은 계속 업데이트될 수 있습니다.</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
