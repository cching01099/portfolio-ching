import gofaceBotImg from "../assets/projects/goface-bot-demo.webp";
import ga4ReportImg from "../assets/projects/ga4-report-demo.webp";
import eatsyImg from "../assets/projects/eatsy.webp";
import acPlatformImg from "../assets/projects/ac-platform.webp";
import cemsErImg from "../assets/projects/cems-er.webp";
import arcadeGameImg from "../assets/projects/arcade-game.webp";
import imgGeneratorImg from "../assets/projects/img-generator.webp";
import portfolioV1Img from "../assets/projects/portfolio-v1.webp";
import coffeeDiaryImg from "../assets/projects/coffee-diary.webp";

// featured: true 的項目會出現在首頁便利貼牆（教學/預覽用）
// category 決定是否出現在 /projects 整理版列表、以及歸在哪一組；沒有 category 的項目（例如拉花）只留在首頁便利貼牆
export const PROJECTS = [
  {
    id: "goface-bot",
    color: "bg-yellow-100",
    rotate: "-rotate-3",
    title: "goface-bot",
    desc: {
      zh: "打造 Slack Bot + GPT-4o 的自然語言介面，讓行銷部能自行修改官網文字、生成部落格文章、產出 SEO 建議；自動開 PR 並觸發 GitHub Actions 建置，工程師只需 review merge。",
      en: "Built a Slack Bot + GPT-4o natural-language interface so marketing can edit website copy, generate blog posts, and get SEO suggestions themselves; it opens a PR automatically and triggers a GitHub Actions build — engineers just review and merge.",
    },
    note: {
      zh: "Slack Bot + GPT-4o，讓行銷部自己改網站文字。",
      en: "A Slack Bot + GPT-4o that lets marketing edit the website copy themselves.",
    },
    tag: "automation",
    tags: [
      "Vercel",
      "Slack",
      "OpenAI GPT-4o",
      "GitHub API",
      "Google Docs API",
      "Google Drive",
      "GitHub Actions",
    ],
    image: gofaceBotImg,
    repo: "https://github.com/astracloud/goface-bot",
    featured: true,
    category: "automation",
  },
  {
    id: "ga4-report",
    color: "bg-green-100",
    rotate: "-rotate-2",
    title: { zh: "GA4 週報自動化", en: "GA4 Weekly Report Automation" },
    desc: {
      zh: "使用 n8n 排程從 Gmail 抓取 GA4 週報 PDF，擷取內容交給 OpenAI 分析流量重點與優化建議，自動整理成報告發送到 Slack，取代人工看報表、寫分析摘要。",
      en: "Uses n8n on a schedule to pull the GA4 weekly report PDF from Gmail, sends the content to OpenAI for traffic insights and optimization suggestions, then auto-compiles a report and posts it to Slack — replacing manual report reading and summary writing.",
    },
    note: {
      zh: "n8n 自動抓 GA4 週報，交給 GPT 分析後發到 Slack。",
      en: "n8n auto-fetches the GA4 weekly report, has GPT analyze it, and posts to Slack.",
    },
    tag: "n8n",
    tags: ["n8n", "Slack", "GA4", "Google Drive", "OpenAI GPT-4o", "Data Studio"],
    image: ga4ReportImg,
    featured: true,
    // demo:"https://n8n-sg.astra.cloud/workflow/JpId7a0AzwKKZKgE",
    category: "automation",
  },
  {
    id: "booking-system",
    color: "bg-orange-100",
    rotate: "rotate-1",
    title: { zh: "訂位系統", en: "Booking System" },
    desc: {
      zh: "額外參與遠端團隊的前端開發，主要負責系統前台的訂位和訂金流程，並且支援系統後台的部分訂金收款功能。",
      en: "Joined a remote team's frontend development on the side, mainly responsible for the customer-facing booking and deposit flow, plus supporting some deposit-collection features on the admin side.",
    },
    tag: "Next.js",
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    image: eatsyImg,
    demo: "https://partners.eatsy.tech/smart-booking-system",
    category: "work",
  },
  {
    id: "ac-platform",
    color: "bg-indigo-100",
    rotate: "-rotate-1",
    title: { zh: "POC-負載集成調度商平台", en: "POC - Load Aggregator Dispatch Platform" },
    desc: {
      zh: "一完整平台系統，實現 CRUD 應用，開發相關技術：FullCalendar、react-i18next、API 串接。",
      en: "A complete platform system implementing full CRUD functionality, built with FullCalendar, react-i18next, and API integration.",
    },
    tag: "React",
    tags: ["React", "TypeScript", "react-i18next", "Tailwind CSS", "FullCalendar"],
    image: acPlatformImg,
    demo: "https://drive.google.com/file/d/1J3g9SqI_hpTEeCQ1w_MrdTCVMKN2QVNL/view",
    category: "work",
  },
  {
    id: "energy-dashboard",
    color: "bg-blue-100",
    rotate: "rotate-2",
    title: { zh: "能源管理系統－能源管理效益及儀表板", en: "Energy Management System - Benefits & Dashboard" },
    desc: {
      zh: "React + ECharts 打造即時視覺化儀表板，SSE 推播用電數據；並串接 API 呈現能源管理效益。",
      en: "Built a real-time visualization dashboard with React + ECharts, pushing power-usage data via SSE, and integrated APIs to display energy management benefits.",
    },
    note: {
      zh: "React + ECharts 打造的即時用電視覺化儀表板。",
      en: "A real-time power-usage visualization dashboard built with React + ECharts.",
    },
    tag: "React",
    tags: ["React", "TypeScript", "react-i18next", "Tailwind CSS", "ECharts"],
    image: cemsErImg,
    internal: true,
    featured: true,
    category: "work",
  },
  {
    id: "coffee-diary",
    color: "bg-amber-100",
    rotate: "rotate-2",
    title: "Pourista",
    desc: {
      zh: "使用 React + Supabase 打造的咖啡日記工具，記錄每日拉花練習與耗材採購成本；為了讓咖啡愛好者能互相切磋交流，再優化加上社群動態牆（按讚、留言、即時通知）。登入支援 Google，另外也自接一套 LINE OAuth 登入串進 Supabase 自訂 provider。",
      en: "A coffee diary built with React + Supabase to log daily latte-art practice and gear costs; later added a community feed (likes, comments, real-time notifications) so coffee lovers could connect and compare notes. Supports Google login, plus a self-built LINE OAuth login wired into a custom Supabase provider.",
    },
    tag: "React",
    tags: ["React", "Supabase", "Tailwind CSS", "LINE Login"],
    image: coffeeDiaryImg,
    demo: "https://pourista-ruddy.vercel.app/calendar",
    repo: "https://github.com/cching01099/coffee-diary",
    // 作品在社群（Threads）上的分享串，讓面試官直接看到社群反應與討論
    social: "https://www.threads.com/share/BAWA2_WQ1f/",
    category: "side",
    // spotlight：完整卡片以標語＋重點條列取代一般的 desc（是否列入精選區由 SPOTLIGHTS 決定）
    spotlight: {
      tagline: {
        zh: "從介面設計到資料庫部署上線，一個人完成的全端咖啡日記 App",
        en: "A full-stack coffee-diary app I built solo — from UI design to database and deployment",
      },
      // 前端在前、後端在後：先展現本職的前端能力，再帶出自己完成的後端
      highlights: {
        zh: [
          "月曆視圖與社群動態牆的互動介面，按讚、留言、即時通知體驗完整",
          "選用 Supabase 作為後端，完成資料表建置與前端串接：練習日誌、耗材成本、社群資料",
          "Google 登入，並自接 LINE OAuth 串進 Supabase 自訂 provider",
        ],
        en: [
          "Interactive calendar view and community feed with likes, comments and real-time notifications",
          "Chose Supabase as the back end, set up the tables and wired them into the UI: practice logs, gear costs, community data",
          "Google login plus a self-built LINE OAuth wired into a custom Supabase provider",
        ],
      },
    },
  },
  {
    id: "portfolio-v1",
    color: "bg-cyan-100",
    rotate: "-rotate-1",
    title: { zh: "個人網站第一版", en: "Portfolio v1" },
    desc: {
      zh: "第一版個人網站，使用 React + TypeScript 打造，透過 react-i18next 支援中英雙語切換，展示自我介紹、技能與作品集。",
      en: "My first personal website, built with React + TypeScript, supporting Chinese/English switching via react-i18next to showcase my intro, skills, and portfolio.",
    },
    tag: "React",
    tags: ["React", "TypeScript", "react-i18next", "SCSS"],
    image: portfolioV1Img,
    demo: "https://cching01099.github.io/myportfolio/",
    repo: "https://github.com/cching01099/myportfolio",
    category: "side",
  },
  {
    id: "image-generator",
    color: "bg-rose-100",
    rotate: "rotate-3",
    title: { zh: "圖庫產生器", en: "Image Library Generator" },
    desc: {
      zh: "串接三種公開免費的圖庫 API，統一於此網站作圖片的搜尋下載。",
      en: "Integrated three free public stock-photo APIs into one site for searching and downloading images.",
    },
    tag: "React",
    tags: ["React", "SCSS"],
    image: imgGeneratorImg,
    demo: "https://cching01099.github.io/ImageGenerator-React/",
    repo: "https://github.com/cching01099/ImageGenerator-React",
    category: "side",
  },
  {
    id: "arcade-game",
    color: "bg-purple-100",
    rotate: "-rotate-2",
    title: { zh: "遊戲廳", en: "Arcade" },
    desc: {
      zh: "集結過去使用原生 JavaScript 所開發的互動、有趣小遊戲，除了呈現練習的成果之外，也能 HAVE FUN！",
      en: "A collection of fun, interactive mini-games I built with vanilla JavaScript — a showcase of practice, and a chance to just have fun!",
    },
    tag: "JavaScript",
    tags: ["JavaScript", "SCSS"],
    image: arcadeGameImg,
    demo: "https://cching01099.github.io/ArcadeGame/",
    repo: "https://github.com/cching01099/ArcadeGame",
    category: "side",
  },
  {
    id: "latte-art",
    color: "bg-pink-100",
    rotate: "rotate-3",
    title: { zh: "☕ 拉花新手", en: "☕ Latte Art Beginner" },
    desc: {
      zh: "最近在練拉花，發現跟寫程式一樣，都需要練到動作變成直覺。",
      en: "I've been practicing latte art lately, and realized it's just like coding — you have to drill it until it becomes muscle memory.",
    },
    note: {
      zh: "最近在練拉花，跟寫程式一樣需要苦練成直覺。",
      en: "Practicing latte art lately — like coding, it takes drilling until it's instinct.",
    },
    tag: "side project",
    featured: true,
    stickyLink: "/projects#coffee-diary",
    // 沒有 category：只出現在首頁便利貼牆，不會出現在 /projects 整理版列表
  },
  {
    id: "fun-latte-art",
    color: "bg-amber-100",
    rotate: "-rotate-1",
    title: { zh: "拉花", en: "Latte Art" },
    note: {
      zh: "假日最愛做的事，拉花拉到手痠也甘願。",
      en: "My favorite weekend ritual — happy to keep pouring even when my wrist gives out.",
    },
    tag: "fun",
    desktopOnly: true,
    stickyLink: "/fun",
    // 連到 Fun 頁的興趣卡片，只在桌機版首頁便利貼牆出現
  },
  {
    id: "fun-sports",
    color: "bg-teal-100",
    rotate: "rotate-2",
    title: { zh: "運動", en: "Sports" },
    note: {
      zh: "喜歡運動紓壓，特別愛游泳，泳渡過日月潭。",
      en: "I love staying active — swimming especially, and I've done the Sun Moon Lake swim crossing.",
    },
    tag: "fun",
    desktopOnly: true,
    stickyLink: "/fun",
  },
  {
    id: "more-stories",
    color: "bg-violet-100",
    rotate: "-rotate-2",
    title: { zh: "更多故事", en: "More Stories" },
    note: {
      zh: "想聽更多？直接來問我吧！",
      en: "Want to hear more? Just come say hi.",
    },
    tag: "contact",
    desktopOnly: true,
    stickyLink: "/contact",
  },
];

// 作品頁最上方的精選區（目錄式小卡）：line 是小卡上的一句話亮點，
// 點擊小卡會捲到分類區的完整卡片（完整卡片仍留在各自分類裡）
// thumbClassName：只套在小卡縮圖的額外 class，例如截圖兩側留白太多時放大裁中間
export const SPOTLIGHTS = [
  {
    id: "coffee-diary",
    // Pourista 截圖的 App 畫面只佔中間一條，放大並從上緣對齊，縮圖才看得到月曆
    thumbClassName: "scale-[2.2] origin-top",
    line: {
      zh: "從介面到資料庫部署，一個人完成的全端 App",
      en: "Full-stack app built solo, UI to deployment",
    },
  },
  {
    id: "goface-bot",
    line: {
      zh: "Slack Bot + GPT-4o，讓行銷部自己改網站文字",
      en: "A Slack Bot + GPT-4o that lets marketing edit site copy",
    },
  },
  {
    id: "booking-system",
    line: {
      zh: "Next.js 訂位與訂金流程前台開發",
      en: "Built the Next.js booking and deposit flow",
    },
  },
];

export const PROJECT_CATEGORIES = [
  { key: "automation", label: { zh: "自動化工具", en: "Automation Tools" } },
  { key: "work", label: { zh: "工作作品", en: "Work Projects" } },
  { key: "side", label: { zh: "Side Project", en: "Side Project" } },
];

// 每個技術標籤固定一個顏色，同一技術在不同卡片上顏色一致，方便點擊篩選時辨識
const TAG_COLORS = {
  Vercel: "bg-neutral-900 text-white",
  Slack: "bg-purple-100 text-purple-700",
  "OpenAI GPT-4o": "bg-green-100 text-green-700",
  LLM: "bg-emerald-100 text-emerald-700",
  "GitHub API": "bg-slate-200 text-slate-700",
  "GitHub Actions": "bg-zinc-200 text-zinc-700",
  "Google Docs API": "bg-blue-100 text-blue-700",
  "Google Drive": "bg-lime-100 text-lime-700",
  n8n: "bg-red-100 text-red-700",
  GA4: "bg-orange-100 text-orange-700",
  "Data Studio": "bg-amber-100 text-amber-700",
  "Next.js": "bg-neutral-900 text-white",
  React: "bg-sky-100 text-sky-700",
  TypeScript: "bg-blue-200 text-blue-800",
  "react-i18next": "bg-violet-100 text-violet-700",
  "Tailwind CSS": "bg-cyan-100 text-cyan-700",
  FullCalendar: "bg-indigo-100 text-indigo-700",
  ECharts: "bg-teal-100 text-teal-700",
  JavaScript: "bg-yellow-100 text-yellow-800",
  SCSS: "bg-pink-100 text-pink-700",
  Supabase: "bg-emerald-200 text-emerald-800",
  "LINE Login": "bg-green-100 text-green-700",
};

const DEFAULT_TAG_COLOR = "bg-neutral-100 text-neutral-700";

export function getTagColor(tag) {
  return TAG_COLORS[tag] || DEFAULT_TAG_COLOR;
}

// 首頁便利貼牆的初始散落位置（百分比，相對整個首頁容器），圍繞在標題文字兩側
export const STICKY_POSITIONS = {
  "goface-bot": { top: "10%", left: "6%" },
  "energy-dashboard": { top: "8%", left: "74%" },
  "ga4-report": { top: "64%", left: "72%" },
  "latte-art": { top: "62%", left: "4%" },
  "fun-latte-art": { top: "40%", left: "2%" },
  "fun-sports": { top: "32%", left: "80%" },
  "more-stories": { top: "35%", left: "65%" },
};

// 手機版便利貼牆位置（百分比，相對於整個 Hero 容器）：Hero 上下特別留白，讓便利貼貼在頭像/文字的上緣與下緣，不會蓋住中間的文字
// 右側的便利貼用 right 定位、與左側鏡像：便利貼寬度固定，若右側也用 left 百分比，右邊留白會比左邊多，整體看起來偏左
export const MOBILE_STICKY_POSITIONS = {
  "goface-bot": { top: "1%", left: "3%" },
  "energy-dashboard": { top: "4%", right: "3%" },
  "ga4-report": { top: "70%", left: "4%" },
  "latte-art": { top: "72%", right: "4%" },
};
