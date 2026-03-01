export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  stack: string[];
  status: "진행중" | "완료" | "계획중";
  pinned: boolean;
  link?: string;
  github?: string;
  date: string;
  category: string;
}

export interface DevLogEntry {
  id: string;
  title: string;
  summary: string;
  content: string;
  date: string;
  tags: string[];
  pinned: boolean;
  readTime: number;
}

export interface LearningEntry {
  id: string;
  title: string;
  topic: string;
  summary: string;
  content: string;
  date: string;
  tags: string[];
  pinned: boolean;
  source?: string;
  progress: number; // 0-100
}

export const projects: Project[] = [
  {
    id: "proj-1",
    title: "DevNote — 개발자 노트 앱",
    description: "마크다운 기반 개발 메모 & 코드 스니펫 관리 앱",
    longDescription:
      "개발 중 발생하는 아이디어, 코드 스니펫, 레퍼런스를 빠르게 기록하고 검색할 수 있는 앱입니다. 태그와 카테고리 기반 필터링, 마크다운 미리보기를 지원합니다.",
    stack: ["React", "TypeScript", "Vite", "Tailwind CSS", "IndexedDB"],
    status: "진행중",
    pinned: true,
    github: "https://github.com",
    date: "2026-02",
    category: "웹 앱",
  },
  {
    id: "proj-2",
    title: "CLI Tool — 프로젝트 스캐폴더",
    description: "나만의 프로젝트 초기 세팅을 자동화하는 CLI 도구",
    longDescription:
      "매번 반복되는 프로젝트 초기 설정(ESLint, Prettier, Git hooks 등)을 커맨드 하나로 처리할 수 있는 Node.js 기반 CLI 도구입니다.",
    stack: ["Node.js", "TypeScript", "Commander.js", "Inquirer.js"],
    status: "완료",
    pinned: true,
    github: "https://github.com",
    date: "2025-12",
    category: "CLI / 도구",
  },
  {
    id: "proj-3",
    title: "알고리즘 시각화 플레이그라운드",
    description: "정렬, 탐색 알고리즘을 시각적으로 이해하는 웹 도구",
    longDescription:
      "버블 정렬, 퀵 정렬, BFS/DFS 등 알고리즘의 동작 과정을 단계별 애니메이션으로 시각화합니다. 직접 데이터를 입력하고 속도를 조절할 수 있습니다.",
    stack: ["React", "TypeScript", "Canvas API", "Motion"],
    status: "진행중",
    pinned: false,
    github: "https://github.com",
    date: "2026-01",
    category: "학습 도구",
  },
  {
    id: "proj-4",
    title: "포트폴리오 웹사이트",
    description: "지금 보고 계신 개인 포트폴리오 & 블로그 사이트",
    longDescription:
      "React + TypeScript 기반의 개인 포트폴리오 사이트입니다. 개발일지, 학습 기록, 프로젝트를 한 곳에서 관리합니다.",
    stack: ["React", "TypeScript", "React Router", "Tailwind CSS"],
    status: "진행중",
    pinned: false,
    github: "https://github.com",
    date: "2026-03",
    category: "웹 앱",
  },
];

export const devLogs: DevLogEntry[] = [
  {
    id: "log-1",
    title: "React 18 Concurrent Features 실전 적용기",
    summary:
      "Suspense, useTransition, useDeferredValue를 프로덕션 앱에 도입하며 겪은 경험을 정리했습니다.",
    content: `## 들어가며\n\nReact 18이 정식 출시된 지 꽤 지났지만, 막상 Concurrent Features를 실무에 도입하려니 막막했습니다. 이번 포스트에서는 실제로 적용해 보면서 느낀 점들을 공유합니다.\n\n## useTransition 활용\n\n검색 필터를 구현할 때 \`useTransition\`을 사용하니 입력 UX가 눈에 띄게 개선되었습니다.`,
    date: "2026-02-28",
    tags: ["React", "성능", "Concurrent Mode"],
    pinned: true,
    readTime: 8,
  },
  {
    id: "log-2",
    title: "TypeScript 5.x 새 기능 정리",
    summary:
      "const type parameters, 데코레이터 표준화 등 5.x 버전의 주요 변경사항을 실습과 함께 정리합니다.",
    content: `## TypeScript 5.x 주요 변경사항\n\n### const Type Parameters\n\n제네릭 타입 추론이 더 정확해졌습니다. \`const\` 키워드를 타입 파라미터에 붙이면 리터럴 타입으로 추론됩니다.`,
    date: "2026-02-20",
    tags: ["TypeScript", "언어"],
    pinned: true,
    readTime: 6,
  },
  {
    id: "log-3",
    title: "Vite vs Webpack — 2026년 기준 비교",
    summary:
      "두 빌드 툴의 현재 상태, 생태계, 성능을 직접 벤치마크하며 비교한 내용을 담았습니다.",
    content: `## 왜 비교했나?\n\n팀 내에서 신규 프로젝트의 빌드 툴을 선정해야 했고, 직접 같은 조건에서 빌드 속도와 HMR 속도를 측정했습니다.`,
    date: "2026-02-10",
    tags: ["Vite", "Webpack", "빌드 도구"],
    pinned: false,
    readTime: 10,
  },
  {
    id: "log-4",
    title: "CSS Grid로 복잡한 레이아웃 정복하기",
    summary:
      "fr 단위, grid-template-areas, auto-fill vs auto-fit의 차이를 예제와 함께 완벽 정리.",
    content: `## CSS Grid의 진짜 힘\n\nFlexbox만으로는 부족한 2차원 레이아웃을 Grid로 깔끔하게 해결하는 방법을 살펴봅니다.`,
    date: "2026-01-30",
    tags: ["CSS", "레이아웃", "프론트엔드"],
    pinned: false,
    readTime: 7,
  },
  {
    id: "log-5",
    title: "IndexedDB 완전 정복 — 브라우저 로컬 DB 활용",
    summary:
      "오프라인 앱을 위해 IndexedDB를 도입하며 배운 것들, 그리고 Dexie.js 추천 이유.",
    content: `## 왜 IndexedDB인가?\n\nlocalStorage의 한계(5MB, 동기, 문자열만 저장)를 극복하기 위해 IndexedDB를 도입했습니다.`,
    date: "2026-01-15",
    tags: ["IndexedDB", "오프라인", "웹 API"],
    pinned: false,
    readTime: 9,
  },
];

export const learningEntries: LearningEntry[] = [
  {
    id: "learn-1",
    title: "운영체제 — 프로세스 & 스레드",
    topic: "CS 기초",
    summary:
      "프로세스 vs 스레드의 차이, 컨텍스트 스위칭, 멀티스레딩 모델을 정리했습니다.",
    content: `## 프로세스\n\n프로세스는 실행 중인 프로그램으로, 독립된 메모리 공간(코드, 데이터, 힙, 스택)을 가집니다.\n\n## 스레드\n\n스레드는 프로세스 내의 실행 단위로, 코드/데이터/힙을 공유하고 스택만 독립적으로 가집니다.`,
    date: "2026-02-25",
    tags: ["OS", "CS", "프로세스", "스레드"],
    pinned: true,
    source: "공룡책 (Operating System Concepts)",
    progress: 60,
  },
  {
    id: "learn-2",
    title: "알고리즘 — 동적 프로그래밍 (DP)",
    topic: "알고리즘",
    summary:
      "메모이제이션과 타뷸레이션 방식의 차이, 대표 문제(LCS, 배낭 문제) 풀이 전략.",
    content: `## 동적 프로그래밍이란?\n\n큰 문제를 작은 부분 문제로 나누고, 이미 계산한 결과를 저장하여 재사용하는 최적화 기법입니다.`,
    date: "2026-02-18",
    tags: ["알고리즘", "DP", "코딩테스트"],
    pinned: true,
    source: "프로그래머스 + 이코테 책",
    progress: 75,
  },
  {
    id: "learn-3",
    title: "네트워크 — HTTP/2 & HTTP/3",
    topic: "네트워크",
    summary:
      "HTTP/1.1의 HOL blocking 문제, HTTP/2의 멀티플렉싱, QUIC 기반 HTTP/3의 차이점.",
    content: `## HTTP 버전별 비교\n\n각 HTTP 버전이 어떤 문제를 해결하기 위해 등장했는지 이해하는 것이 중요합니다.`,
    date: "2026-02-05",
    tags: ["네트워크", "HTTP", "CS"],
    pinned: false,
    source: "그림으로 배우는 네트워크",
    progress: 90,
  },
  {
    id: "learn-4",
    title: "React 심화 — 커스텀 훅 설계 패턴",
    topic: "React",
    summary:
      "재사용 가능한 커스텀 훅 설계 원칙과 useLocalStorage, useFetch, useDebounce 직접 구현.",
    content: `## 커스텀 훅이란?\n\n로직을 재사용할 수 있도록 분리한 함수로, \`use\`로 시작하며 훅을 내부적으로 사용합니다.`,
    date: "2026-01-28",
    tags: ["React", "Custom Hook", "패턴"],
    pinned: false,
    source: "공식 문서 + 직접 실습",
    progress: 100,
  },
  {
    id: "learn-5",
    title: "자료구조 — 트리 & 그래프",
    topic: "자료구조",
    summary:
      "이진 탐색 트리(BST), AVL 트리, 그래프 표현 방식(인접 행렬 vs 리스트) 정리.",
    content: `## 트리\n\n트리는 사이클이 없는 연결 그래프로, 계층적 구조를 표현하는데 적합합니다.`,
    date: "2026-01-10",
    tags: ["자료구조", "트리", "그래프", "CS"],
    pinned: false,
    source: "이것이 자료구조+알고리즘이다",
    progress: 85,
  },
];
