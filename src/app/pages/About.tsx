import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { MapPin, Mail, Github, Code2, Cpu, BookOpen, Coffee, Heart, Zap, Award, Calendar, ExternalLink } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useTheme } from "../context/ThemeContext";
import { fetchAbout } from "../data/api";

type AboutData = {
  name: string;
  handle: string;
  title: string;
  location: string;
  email: string;
  github: string;
  githubLabel: string;
  bio: string;
  intro: string[];
  skills: Record<string, string[]>;
  timeline: { year: string; title: string; description: string; color: string }[];
  interests: string[];
  contactTitle: string;
  contactDesc: string;
};

export function About() {
  const { theme } = useTheme();
  const isLight = theme === "light";
  const [data, setData] = useState<AboutData | null>(null);

  useEffect(() => {
    fetchAbout().then(setData);
  }, []);

  const getTimelineStyle = (color: string) => {
    if (color === "accent") return { color: "var(--site-accent-text)", backgroundColor: "var(--site-accent-bg)", borderColor: "var(--site-accent-border)" };
    const map: Record<string, { color: string; bg: string; border: string }> = {
      emerald: { color: isLight ? "#059669" : "#34d399", bg: isLight ? "#ecfdf5" : "rgba(52,211,153,0.1)", border: isLight ? "#6ee7b7" : "rgba(52,211,153,0.2)" },
      blue: { color: isLight ? "#2563eb" : "#60a5fa", bg: isLight ? "#eff6ff" : "rgba(96,165,250,0.1)", border: isLight ? "#bfdbfe" : "rgba(96,165,250,0.2)" },
      yellow: { color: isLight ? "#d97706" : "#fbbf24", bg: isLight ? "#fffbeb" : "rgba(251,191,36,0.1)", border: isLight ? "#fde68a" : "rgba(251,191,36,0.2)" },
    };
    const c = map[color] || map.blue;
    return { color: c.color, backgroundColor: c.bg, borderColor: c.border };
  };

  const timelineIcons: Record<string, React.ReactNode> = {
    accent: <Code2 className="w-4 h-4" />,
    emerald: <Github className="w-4 h-4" />,
    blue: <Zap className="w-4 h-4" />,
    yellow: <BookOpen className="w-4 h-4" />,
  };

  if (!data) return (
    <div className="pt-16 min-h-screen flex items-center justify-center" style={{ color: "var(--site-text-muted)" }}>
      로딩 중...
    </div>
  );

  return (
    <div className="pt-16 min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-16 space-y-16">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="flex flex-col md:flex-row gap-8 items-start">
          <div className="relative flex-shrink-0">
            <div className="w-32 h-32 rounded-2xl overflow-hidden" style={{ border: "2px solid var(--site-border)" }}>
              <ImageWithFallback src="https://images.unsplash.com/photo-1719400471588-575b23e27bd7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=256" alt="Profile" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center" style={{ border: `2px solid var(--site-bg)` }}>
              <div className="w-2.5 h-2.5 bg-white rounded-full" />
            </div>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <h1 className="text-3xl" style={{ fontWeight: 700, color: "var(--site-text)" }}>{data.name}</h1>
              <span className="px-2.5 py-0.5 text-sm rounded-full border font-mono" style={{ color: "var(--site-accent-text)", backgroundColor: "var(--site-accent-bg)", borderColor: "var(--site-accent-border)" }}>
                {data.handle}
              </span>
            </div>
            <p className="mb-4" style={{ color: "var(--site-text-muted)" }}>{data.title}</p>
            <div className="flex flex-wrap gap-4 text-sm mb-5" style={{ color: "var(--site-text-muted)" }}>
              <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {data.location}</span>
              <a href={`mailto:${data.email}`} className="flex items-center gap-1.5 transition-colors" style={{ color: "var(--site-text-muted)" }} onMouseEnter={(e) => (e.currentTarget.style.color = "var(--site-text)")} onMouseLeave={(e) => (e.currentTarget.style.color = "var(--site-text-muted)")}>
                <Mail className="w-4 h-4" /> {data.email}
              </a>
              <a href={data.github} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 transition-colors" style={{ color: "var(--site-text-muted)" }} onMouseEnter={(e) => (e.currentTarget.style.color = "var(--site-text)")} onMouseLeave={(e) => (e.currentTarget.style.color = "var(--site-text-muted)")}>
                <Github className="w-4 h-4" /> {data.githubLabel}
              </a>
            </div>
            <p className="leading-relaxed" style={{ color: "var(--site-text-muted)" }}>{data.bio}</p>
          </div>
        </motion.div>

        {/* Introduction */}
        <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }}>
          <SectionTitle icon={<Heart className="w-5 h-5" style={{ color: isLight ? "#e11d48" : "#fb7185" }} />} title="저를 소개합니다" />
          <div className="rounded-xl p-6 space-y-4 leading-relaxed" style={{ backgroundColor: "var(--site-bg-card)", border: "1px solid var(--site-border)", color: "var(--site-text-muted)" }}>
            {data.intro.map((p, i) => <p key={i}>{p}</p>)}
          </div>
        </motion.section>

        {/* Skills */}
        <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }}>
          <SectionTitle icon={<Cpu className="w-5 h-5" style={{ color: isLight ? "#2563eb" : "#60a5fa" }} />} title="기술 스택" />
          <div className="grid md:grid-cols-3 gap-4">
            {Object.entries(data.skills).map(([category, items], i) => (
              <motion.div key={category} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.1 }} viewport={{ once: true }} className="rounded-xl p-5" style={{ backgroundColor: "var(--site-bg-card)", border: "1px solid var(--site-border)" }}>
                <h3 className="text-sm font-medium mb-3" style={{ color: "var(--site-text)" }}>{category}</h3>
                <div className="flex flex-wrap gap-2">
                  {items.map((skill) => (
                    <span key={skill} className="px-2.5 py-1 text-xs rounded-lg font-mono" style={{ backgroundColor: "var(--site-bg-subtle)", color: "var(--site-text-muted)", border: "1px solid var(--site-border-soft)" }}>{skill}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Timeline */}
        <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }}>
          <SectionTitle icon={<Calendar className="w-5 h-5" style={{ color: isLight ? "#d97706" : "#fbbf24" }} />} title="개발 여정" />
          <div className="relative">
            <div className="absolute left-[19px] top-0 bottom-0 w-px" style={{ backgroundColor: "var(--site-border)" }} />
            <div className="space-y-6">
              {data.timeline.map((item, i) => {
                const s = getTimelineStyle(item.color);
                return (
                  <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: i * 0.1 }} viewport={{ once: true }} className="flex gap-4 pl-2">
                    <div className="w-10 h-10 rounded-xl border flex-shrink-0 flex items-center justify-center z-10" style={{ color: s.color, backgroundColor: s.backgroundColor, borderColor: s.borderColor }}>
                      {timelineIcons[item.color] ?? <Code2 className="w-4 h-4" />}
                    </div>
                    <div className="pt-1.5 pb-4">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-mono" style={{ color: "var(--site-text-muted)" }}>{item.year}</span>
                        <h3 className="font-medium" style={{ color: "var(--site-text)" }}>{item.title}</h3>
                      </div>
                      <p className="text-sm leading-relaxed" style={{ color: "var(--site-text-muted)" }}>{item.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.section>

        {/* Interests */}
        <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }}>
          <SectionTitle icon={<Coffee className="w-5 h-5" style={{ color: isLight ? "#92400e" : "#fb923c" }} />} title="관심사 & 취미" />
          <div className="flex flex-wrap gap-3">
            {data.interests.map((interest) => (
              <span key={interest} className="px-4 py-2 text-sm rounded-xl" style={{ backgroundColor: "var(--site-bg-card)", border: "1px solid var(--site-border)", color: "var(--site-text-muted)" }}>{interest}</span>
            ))}
          </div>
        </motion.section>

        {/* Contact CTA */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }} className="rounded-2xl p-8 text-center" style={{ background: `linear-gradient(135deg, var(--site-accent-bg), var(--site-bg-subtle))`, border: "1px solid var(--site-accent-border)" }}>
          <Award className="w-8 h-8 mx-auto mb-4" style={{ color: "var(--site-accent-text)" }} />
          <h2 className="text-xl font-semibold mb-2" style={{ color: "var(--site-text)" }}>{data.contactTitle}</h2>
          <p className="mb-6" style={{ color: "var(--site-text-muted)" }}>{data.contactDesc}</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a href={`mailto:${data.email}`} className="inline-flex items-center gap-2 px-5 py-2.5 text-white rounded-lg text-sm font-medium hover:opacity-90" style={{ backgroundColor: "var(--site-accent-btn)" }}>
              <Mail className="w-4 h-4" /> 이메일 보내기
            </a>
            <a href={data.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all" style={{ backgroundColor: "var(--site-bg-card)", border: "1px solid var(--site-border)", color: "var(--site-text)" }} onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--site-bg-hover)")} onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "var(--site-bg-card)")}>
              <Github className="w-4 h-4" /> GitHub <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function SectionTitle({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="flex items-center gap-2 mb-5">
      {icon}
      <h2 className="font-semibold text-lg" style={{ color: "var(--site-text)" }}>{title}</h2>
    </div>
  );
}
