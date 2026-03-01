import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Plus, Pencil, Trash2, LogOut, Layers, Terminal, BookOpen, User } from "lucide-react";
import {
  fetchProjects, fetchDevLogs, fetchLearning, fetchAbout, updateAbout,
  createProject, updateProject, deleteProject,
  createDevLog, updateDevLog, deleteDevLog,
  createLearning, updateLearning, deleteLearning,
} from "../data/api";
import type { Project, DevLogEntry, LearningEntry } from "../data/mockData";
import { useTheme } from "../context/ThemeContext";

type Tab = "projects" | "devlog" | "learning" | "about";

export function AdminDashboard({ token, onLogout }: { token: string; onLogout: () => void }) {
  const [tab, setTab] = useState<Tab>("projects");
  const [projects, setProjects] = useState<Project[]>([]);
  const [devLogs, setDevLogs] = useState<DevLogEntry[]>([]);
  const [learning, setLearning] = useState<LearningEntry[]>([]);
  const [aboutData, setAboutData] = useState<unknown>(null);
  const [editTarget, setEditTarget] = useState<unknown>(null);
  const [showForm, setShowForm] = useState(false);
  const { theme } = useTheme();
  const isLight = theme === "light";

  useEffect(() => {
    fetchProjects().then(setProjects);
    fetchDevLogs().then(setDevLogs);
    fetchLearning().then(setLearning);
    fetchAbout().then(setAboutData);
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("삭제할까요?")) return;
    if (tab === "projects") {
      await deleteProject(id);
      setProjects((p) => p.filter((x) => x.id !== id));
    } else if (tab === "devlog") {
      await deleteDevLog(id);
      setDevLogs((p) => p.filter((x) => x.id !== id));
    } else {
      await deleteLearning(id);
      setLearning((p) => p.filter((x) => x.id !== id));
    }
  };

  const currentList = tab === "projects" ? projects : tab === "devlog" ? devLogs : learning;

  return (
    <div className="pt-16 min-h-screen">
      <div className="max-w-5xl mx-auto px-6 py-12">

        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-2xl font-bold" style={{ color: "var(--site-text)" }}>관리자 대시보드</h1>
          <button
            onClick={onLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all"
            style={{ backgroundColor: "var(--site-bg-card)", border: "1px solid var(--site-border)", color: "var(--site-text-muted)" }}
          >
            <LogOut className="w-4 h-4" /> 로그아웃
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 flex-wrap">
          {([
            { key: "projects", label: "프로젝트", icon: <Layers className="w-4 h-4" /> },
            { key: "devlog",   label: "개발일지", icon: <Terminal className="w-4 h-4" /> },
            { key: "learning", label: "학습일지", icon: <BookOpen className="w-4 h-4" /> },
            { key: "about",    label: "소개 페이지", icon: <User className="w-4 h-4" /> },
          ] as const).map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-mono transition-all"
              style={
                tab === t.key
                  ? { backgroundColor: "var(--site-accent-bg)", color: "var(--site-accent-text)", border: "1px solid var(--site-accent-border)" }
                  : { backgroundColor: "var(--site-bg-card)", color: "var(--site-text-muted)", border: "1px solid var(--site-border)" }
              }
            >
              {t.icon} {t.label}
            </button>
          ))}
        </div>

        {/* About 탭 */}
        {tab === "about" ? (
          aboutData ? (
            <AboutEditor
              data={aboutData}
              token={token}
              onSaved={(updated) => setAboutData(updated)}
            />
          ) : (
            <p style={{ color: "var(--site-text-muted)" }}>로딩 중...</p>
          )
        ) : (
          <>
            {/* Add Button */}
            <div className="flex justify-end mb-4">
              <button
                onClick={() => { setEditTarget(null); setShowForm(true); }}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-white transition-all hover:opacity-90"
                style={{ backgroundColor: "var(--site-accent-btn)" }}
              >
                <Plus className="w-4 h-4" /> 새 글 작성
              </button>
            </div>

            {/* List */}
            <div className="space-y-3">
              {(currentList as Array<{ id: string; title: string; date?: string; pinned?: boolean }>).map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center justify-between p-5 rounded-xl"
                  style={{ backgroundColor: "var(--site-bg-card)", border: "1px solid var(--site-border)" }}
                >
                  <div>
                    <p className="font-medium" style={{ color: "var(--site-text)" }}>{item.title}</p>
                    <p className="text-xs mt-1 font-mono" style={{ color: "var(--site-text-muted)" }}>
                      {item.date} {item.pinned ? "· 📌 pinned" : ""}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => { setEditTarget(item); setShowForm(true); }}
                      className="p-2 rounded-lg transition-all"
                      style={{ color: "var(--site-text-muted)", border: "1px solid var(--site-border)" }}
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-2 rounded-lg transition-all"
                      style={{ color: isLight ? "#ef4444" : "#f87171", border: "1px solid var(--site-border)" }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}

        {/* Form Modal */}
        {showForm && tab !== "about" && (
          <AdminForm
            tab={tab}
            initial={editTarget}
            token={token}
            onClose={() => setShowForm(false)}
            onSaved={() => {
              fetchProjects().then(setProjects);
              fetchDevLogs().then(setDevLogs);
              fetchLearning().then(setLearning);
              setShowForm(false);
            }}
          />
        )}
      </div>
    </div>
  );
}

// ─── About Editor ────────────────────────────────────────────────────────────

function AboutEditor({
  data, token, onSaved,
}: {
  data: unknown;
  token: string;
  onSaved: (d: unknown) => void;
}) {
  const d = data as Record<string, unknown>;
  const [form, setForm] = useState({
    name:         (d.name as string)         ?? "",
    handle:       (d.handle as string)       ?? "",
    title:        (d.title as string)        ?? "",
    location:     (d.location as string)     ?? "",
    email:        (d.email as string)        ?? "",
    github:       (d.github as string)       ?? "",
    githubLabel:  (d.githubLabel as string)  ?? "",
    bio:          (d.bio as string)          ?? "",
    intro:        Array.isArray(d.intro) ? (d.intro as string[]).join("\n\n") : "",
    skills:       JSON.stringify(d.skills   ?? {}, null, 2),
    timeline:     JSON.stringify(d.timeline ?? [], null, 2),
    interests:    Array.isArray(d.interests) ? (d.interests as string[]).join(", ") : "",
    contactTitle: (d.contactTitle as string) ?? "",
    contactDesc:  (d.contactDesc as string)  ?? "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let skills, timeline;
    try { skills = JSON.parse(form.skills); } catch { alert("스킬 JSON 오류"); return; }
    try { timeline = JSON.parse(form.timeline); } catch { alert("타임라인 JSON 오류"); return; }

    const payload = {
      ...d,
      name:         form.name,
      handle:       form.handle,
      title:        form.title,
      location:     form.location,
      email:        form.email,
      github:       form.github,
      githubLabel:  form.githubLabel,
      bio:          form.bio,
      intro:        form.intro.split("\n\n").map((s) => s.trim()).filter(Boolean),
      skills,
      timeline,
      interests:    form.interests.split(",").map((s) => s.trim()).filter(Boolean),
      contactTitle: form.contactTitle,
      contactDesc:  form.contactDesc,
    };
    const updated = await updateAbout(payload);
    onSaved(updated);
    alert("저장 완료!");
  };

  const f = (label: string, key: keyof typeof form, rows = 1) => (
    <div>
      <label className="block text-xs mb-1" style={{ color: "var(--site-text-muted)" }}>{label}</label>
      {rows > 1 ? (
        <textarea
          rows={rows}
          value={form[key] as string}
          onChange={(e) => setForm({ ...form, [key]: e.target.value })}
          className="w-full px-3 py-2 rounded-lg text-sm focus:outline-none font-mono"
          style={{ backgroundColor: "var(--site-bg-subtle)", border: "1px solid var(--site-border)", color: "var(--site-text)" }}
        />
      ) : (
        <input
          type="text"
          value={form[key] as string}
          onChange={(e) => setForm({ ...form, [key]: e.target.value })}
          className="w-full px-3 py-2 rounded-lg text-sm focus:outline-none"
          style={{ backgroundColor: "var(--site-bg-subtle)", border: "1px solid var(--site-border)", color: "var(--site-text)" }}
        />
      )}
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
      {f("이름", "name")}
      {f("핸들 (@devlog)", "handle")}
      {f("직함", "title")}
      {f("위치", "location")}
      {f("이메일", "email")}
      {f("GitHub URL", "github")}
      {f("GitHub 표시명", "githubLabel")}
      {f("한줄 소개 (bio)", "bio", 3)}
      {f("자기소개 본문 (단락 사이 빈줄 2개)", "intro", 6)}
      {f("스킬 (JSON)", "skills", 6)}
      {f("타임라인 (JSON)", "timeline", 8)}
      {f("관심사 (쉼표 구분)", "interests")}
      {f("연락 섹션 제목", "contactTitle")}
      {f("연락 섹션 설명", "contactDesc", 2)}
      <button
        type="submit"
        className="px-6 py-2.5 rounded-lg text-sm font-medium text-white hover:opacity-90"
        style={{ backgroundColor: "var(--site-accent-btn)" }}
      >
        저장
      </button>
    </form>
  );
}

// ─── Admin Form Modal ─────────────────────────────────────────────────────────

function AdminForm({
  tab, initial, token, onClose, onSaved,
}: {
  tab: Tab;
  initial: unknown;
  token: string;
  onClose: () => void;
  onSaved: () => void;
}) {
  const isEdit = !!initial;
  const base = (initial as Record<string, unknown>) ?? {};

  const [form, setForm] = useState({
    id:              (base.id as string)              ?? `${tab}-${Date.now()}`,
    title:           (base.title as string)           ?? "",
    description:     (base.description as string)     ?? "",
    longDescription: (base.longDescription as string) ?? "",
    summary:         (base.summary as string)         ?? "",
    content:         (base.content as string)         ?? "",
    stack:           Array.isArray(base.stack)  ? (base.stack as string[]).join(", ")  : "",
    tags:            Array.isArray(base.tags)   ? (base.tags as string[]).join(", ")   : "",
    status:          (base.status as string)          ?? "진행중",
    category:        (base.category as string)        ?? "",
    date:            (base.date as string)            ?? new Date().toISOString().slice(0, 10),
    pinned:          (base.pinned as boolean)         ?? false,
    github:          (base.github as string)          ?? "",
    link:            (base.link as string)            ?? "",
    topic:           (base.topic as string)           ?? "",
    source:          (base.source as string)          ?? "",
    progress:        (base.progress as number)        ?? 0,
    readTime:        (base.readTime as number)        ?? 5,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (tab === "projects") {
      const payload = {
        id: form.id, title: form.title, description: form.description,
        longDescription: form.longDescription,
        stack: form.stack.split(",").map((s) => s.trim()).filter(Boolean),
        status: form.status, category: form.category, date: form.date,
        pinned: form.pinned, github: form.github || null, link: form.link || null,
      };
      isEdit ? await updateProject(form.id, payload) : await createProject(payload);
    } else if (tab === "devlog") {
      const payload = {
        id: form.id, title: form.title, summary: form.summary, content: form.content,
        tags: form.tags.split(",").map((s) => s.trim()).filter(Boolean),
        date: form.date, pinned: form.pinned, readTime: Number(form.readTime),
      };
      isEdit ? await updateDevLog(form.id, payload) : await createDevLog(payload);
    } else {
      const payload = {
        id: form.id, title: form.title, topic: form.topic, summary: form.summary,
        content: form.content,
        tags: form.tags.split(",").map((s) => s.trim()).filter(Boolean),
        date: form.date, pinned: form.pinned, source: form.source || null,
        progress: Number(form.progress),
      };
      isEdit ? await updateLearning(form.id, payload) : await createLearning(payload);
    }
    onSaved();
  };

  const field = (label: string, key: keyof typeof form, type = "text") => (
    <div>
      <label className="block text-xs mb-1" style={{ color: "var(--site-text-muted)" }}>{label}</label>
      {type === "textarea" ? (
        <textarea
          rows={6}
          value={form[key] as string}
          onChange={(e) => setForm({ ...form, [key]: e.target.value })}
          className="w-full px-3 py-2 rounded-lg text-sm focus:outline-none font-mono"
          style={{ backgroundColor: "var(--site-bg-subtle)", border: "1px solid var(--site-border)", color: "var(--site-text)" }}
        />
      ) : (
        <input
          type={type}
          value={form[key] as string | number}
          onChange={(e) => setForm({ ...form, [key]: e.target.value })}
          className="w-full px-3 py-2 rounded-lg text-sm focus:outline-none"
          style={{ backgroundColor: "var(--site-bg-subtle)", border: "1px solid var(--site-border)", color: "var(--site-text)" }}
        />
      )}
    </div>
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl p-8"
        style={{ backgroundColor: "var(--site-bg-card)", border: "1px solid var(--site-border)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-semibold mb-6" style={{ color: "var(--site-text)" }}>
          {isEdit ? "수정" : "새 글 작성"} — {tab}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {field("제목", "title")}
          {tab === "projects" && (
            <>
              {field("설명 (짧은)", "description")}
              {field("설명 (긴)", "longDescription", "textarea")}
              {field("스택 (쉼표 구분)", "stack")}
              {field("카테고리", "category")}
              {field("상태 (진행중/완료/계획중)", "status")}
              {field("GitHub URL", "github")}
              {field("사이트 URL", "link")}
            </>
          )}
          {(tab === "devlog" || tab === "learning") && (
            <>
              {field("요약", "summary")}
              {field("본문 (마크다운)", "content", "textarea")}
              {field("태그 (쉼표 구분)", "tags")}
            </>
          )}
          {tab === "devlog" && field("읽기 시간 (분)", "readTime", "number")}
          {tab === "learning" && (
            <>
              {field("주제 (topic)", "topic")}
              {field("출처 (source)", "source")}
              {field("진도 (0-100)", "progress", "number")}
            </>
          )}
          {field("날짜 (YYYY-MM-DD)", "date")}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="pinned"
              checked={form.pinned}
              onChange={(e) => setForm({ ...form, pinned: e.target.checked })}
            />
            <label htmlFor="pinned" className="text-sm" style={{ color: "var(--site-text-muted)" }}>📌 핀 고정</label>
          </div>
          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              className="flex-1 py-2.5 rounded-lg text-sm font-medium text-white hover:opacity-90"
              style={{ backgroundColor: "var(--site-accent-btn)" }}
            >
              {isEdit ? "수정 완료" : "저장"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 rounded-lg text-sm"
              style={{ backgroundColor: "var(--site-bg-subtle)", border: "1px solid var(--site-border)", color: "var(--site-text-muted)" }}
            >
              취소
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
