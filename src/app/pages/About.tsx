import { motion } from "motion/react";
import {
  MapPin,
  Mail,
  Github,
  Code2,
  Cpu,
  BookOpen,
  Coffee,
  Heart,
  Zap,
  Award,
  Calendar,
  ExternalLink,
} from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useTheme } from "../context/ThemeContext";

const skills = {
  "프론트엔드": ["React", "TypeScript", "Next.js", "Tailwind CSS", "Vite", "HTML/CSS"],
  "백엔드 / 기타": ["Node.js", "Express", "Git/GitHub", "REST API", "Linux 기초"],
  "학습 중": ["알고리즘", "CS 기초", "데이터베이스", "Docker"],
};

const timeline = [
  {
    year: "2026",
    title: "개인 포트폴리오 & 블로그 제작",
    description: "기록의 중요성을 깨닫고 개발일지와 학습내역을 체계적으로 관리하기 시작",
    icon: <Code2 className="w-4 h-4" />,
    color: "accent",
  },
  {
    year: "2025",
    title: "오픈소스 기여 시작",
    description: "작은 버그 픽스부터 시작해 오픈소스 프로젝트에 꾸준히 기여 중",
    icon: <Github className="w-4 h-4" />,
    color: "emerald",
  },
  {
    year: "2025",
    title: "첫 사이드 프로젝트 완성",
    description: "CLI 스캐폴딩 도구를 처음으로 완성하고 npm에 배포",
    icon: <Zap className="w-4 h-4" />,
    color: "blue",
  },
  {
    year: "2024",
    title: "개발 공부 시작",
    description: "프로그래밍의 재미를 발견하고 본격적으로 웹 개발 공부를 시작",
    icon: <BookOpen className="w-4 h-4" />,
    color: "yellow",
  },
];

export function About() {
  const { theme } = useTheme();
  const isLight = theme === "light";

  const getTimelineStyle = (color: string) => {
    if (color === "accent")
      return {
        color: "var(--site-accent-text)",
        backgroundColor: "var(--site-accent-bg)",
        borderColor: "var(--site-accent-border)",
      };
    const map: Record<string, { color: string; bg: string; border: string }> = {
      emerald: {
        color: isLight ? "#059669" : "#34d399",
        bg: isLight ? "#ecfdf5" : "rgba(52,211,153,0.1)",
        border: isLight ? "#6ee7b7" : "rgba(52,211,153,0.2)",
      },
      blue: {
        color: isLight ? "#2563eb" : "#60a5fa",
        bg: isLight ? "#eff6ff" : "rgba(96,165,250,0.1)",
        border: isLight ? "#bfdbfe" : "rgba(96,165,250,0.2)",
      },
      yellow: {
        color: isLight ? "#d97706" : "#fbbf24",
        bg: isLight ? "#fffbeb" : "rgba(251,191,36,0.1)",
        border: isLight ? "#fde68a" : "rgba(251,191,36,0.2)",
      },
    };
    const c = map[color] || map.blue;
    return { color: c.color, backgroundColor: c.bg, borderColor: c.border };
  };

  return (
    <div className="pt-16 min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-16 space-y-16">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row gap-8 items-start"
        >
          {/* Avatar */}
          <div className="relative flex-shrink-0">
            <div
              className="w-32 h-32 rounded-2xl overflow-hidden"
              style={{ border: "2px solid var(--site-border)" }}
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1719400471588-575b23e27bd7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=256"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div
              className="absolute -bottom-2 -right-2 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center"
              style={{ border: `2px solid var(--site-bg)` }}
            >
              <div className="w-2.5 h-2.5 bg-white rounded-full" />
            </div>
          </div>

          {/* Info */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <h1 className="text-3xl" style={{ fontWeight: 700, color: "var(--site-text)" }}>
                개발자 OOO
              </h1>
              <span
                className="px-2.5 py-0.5 text-sm rounded-full border font-mono"
                style={{
                  color: "var(--site-accent-text)",
                  backgroundColor: "var(--site-accent-bg)",
                  borderColor: "var(--site-accent-border)",
                }}
              >
                @devlog
              </span>
            </div>
            <p className="mb-4" style={{ color: "var(--site-text-muted)" }}>
              Frontend Developer & Learner
            </p>

            <div className="flex flex-wrap gap-4 text-sm mb-5" style={{ color: "var(--site-text-muted)" }}>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4" /> 서울, 대한민국
              </span>
              <a
                href="mailto:dev@example.com"
                className="flex items-center gap-1.5 transition-colors"
                style={{ color: "var(--site-text-muted)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--site-text)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--site-text-muted)")}
              >
                <Mail className="w-4 h-4" /> dev@example.com
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 transition-colors"
                style={{ color: "var(--site-text-muted)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--site-text)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--site-text-muted)")}
              >
                <Github className="w-4 h-4" /> github.com/devlog
              </a>
            </div>

            <p className="leading-relaxed" style={{ color: "var(--site-text-muted)" }}>
              안녕하세요! 프론트엔드 개발을 공부하고 있는 개발자입니다.
              코드를 작성하는 것만큼{" "}
              <strong style={{ color: "var(--site-text)" }}>배운 것을 기록하고 정리하는 것</strong>을 중요하게 생각합니다.
              이 사이트는 제가 공부하고 만든 것들을 모아두는 저만의 공간입니다.
            </p>
          </div>
        </motion.div>

        {/* Introduction */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <SectionTitle
            icon={<Heart className="w-5 h-5" style={{ color: isLight ? "#e11d48" : "#fb7185" }} />}
            title="저를 소개합니다"
          />
          <div
            className="rounded-xl p-6 space-y-4 leading-relaxed"
            style={{
              backgroundColor: "var(--site-bg-card)",
              border: "1px solid var(--site-border)",
              color: "var(--site-text-muted)",
            }}
          >
            <p>
              웹의 매력에 빠져 개발을 시작했습니다.
              처음에는 HTML/CSS로 단순한 페이지를 만드는 것이 전부였지만,
              점점 더 복잡한 인터랙션과 데이터를 다루고 싶어지면서 React와 TypeScript를 배우게 되었습니다.
            </p>
            <p>
              지금은{" "}
              <span style={{ color: "var(--site-text)", fontWeight: 600 }}>사용자 경험을 개선하는 프론트엔드 개발</span>에 특히 관심이 많습니다.
              성능 최적화, 접근성, 그리고 깔끔한 컴포넌트 설계를 고민하는 것을 즐깁니다.
            </p>
            <p>
              개발 외에는 알고리즘 문제 풀기, CS 기초 다지기, 그리고 좋은 코드베이스를 탐구하는 것을 좋아합니다.
              언젠가는 개발 커뮤니티에 의미 있는 기여를 하고 싶습니다.
            </p>
          </div>
        </motion.section>

        {/* Skills */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <SectionTitle
            icon={<Cpu className="w-5 h-5" style={{ color: isLight ? "#2563eb" : "#60a5fa" }} />}
            title="기술 스택"
          />
          <div className="grid md:grid-cols-3 gap-4">
            {Object.entries(skills).map(([category, items], i) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="rounded-xl p-5"
                style={{
                  backgroundColor: "var(--site-bg-card)",
                  border: "1px solid var(--site-border)",
                }}
              >
                <h3 className="text-sm font-medium mb-3" style={{ color: "var(--site-text)" }}>
                  {category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {items.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 text-xs rounded-lg font-mono transition-colors"
                      style={{
                        backgroundColor: "var(--site-bg-subtle)",
                        color: "var(--site-text-muted)",
                        border: "1px solid var(--site-border-soft)",
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Timeline */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <SectionTitle
            icon={<Calendar className="w-5 h-5" style={{ color: isLight ? "#d97706" : "#fbbf24" }} />}
            title="개발 여정"
          />
          <div className="relative">
            <div
              className="absolute left-[19px] top-0 bottom-0 w-px"
              style={{ backgroundColor: "var(--site-border)" }}
            />
            <div className="space-y-6">
              {timeline.map((item, i) => {
                const s = getTimelineStyle(item.color);
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className="flex gap-4 pl-2"
                  >
                    <div
                      className="w-10 h-10 rounded-xl border flex-shrink-0 flex items-center justify-center z-10"
                      style={{
                        color: s.color,
                        backgroundColor: s.backgroundColor,
                        borderColor: s.borderColor,
                      }}
                    >
                      {item.icon}
                    </div>
                    <div className="pt-1.5 pb-4">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-mono" style={{ color: "var(--site-text-muted)" }}>
                          {item.year}
                        </span>
                        <h3 className="font-medium" style={{ color: "var(--site-text)" }}>
                          {item.title}
                        </h3>
                      </div>
                      <p className="text-sm leading-relaxed" style={{ color: "var(--site-text-muted)" }}>
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.section>

        {/* Interests */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <SectionTitle
            icon={<Coffee className="w-5 h-5" style={{ color: isLight ? "#92400e" : "#fb923c" }} />}
            title="관심사 & 취미"
          />
          <div className="flex flex-wrap gap-3">
            {[
              "☕ 카페에서 코딩",
              "🎮 게임 개발 관심",
              "📚 기술 서적 읽기",
              "🎵 음악 들으며 집중",
              "🔍 알고리즘 문제 풀기",
              "🌐 오픈소스 탐구",
              "✍️ 기술 블로그 쓰기",
              "🚀 새로운 기술 실험",
            ].map((interest) => (
              <span
                key={interest}
                className="px-4 py-2 text-sm rounded-xl transition-all cursor-default"
                style={{
                  backgroundColor: "var(--site-bg-card)",
                  border: "1px solid var(--site-border)",
                  color: "var(--site-text-muted)",
                }}
              >
                {interest}
              </span>
            ))}
          </div>
        </motion.section>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="rounded-2xl p-8 text-center"
          style={{
            background: `linear-gradient(135deg, var(--site-accent-bg), var(--site-bg-subtle))`,
            border: "1px solid var(--site-accent-border)",
          }}
        >
          <Award className="w-8 h-8 mx-auto mb-4" style={{ color: "var(--site-accent-text)" }} />
          <h2 className="text-xl font-semibold mb-2" style={{ color: "var(--site-text)" }}>
            함께 이야기해요!
          </h2>
          <p className="mb-6" style={{ color: "var(--site-text-muted)" }}>
            프로젝트 협업, 피드백, 또는 그냥 안부 인사도 환영합니다.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a
              href="mailto:dev@example.com"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-white rounded-lg text-sm font-medium transition-all hover:opacity-90"
              style={{ backgroundColor: "var(--site-accent-btn)" }}
            >
              <Mail className="w-4 h-4" />
              이메일 보내기
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all"
              style={{
                backgroundColor: "var(--site-bg-card)",
                border: "1px solid var(--site-border)",
                color: "var(--site-text)",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--site-bg-hover)")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "var(--site-bg-card)")}
            >
              <Github className="w-4 h-4" />
              GitHub
              <ExternalLink className="w-3 h-3" />
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
