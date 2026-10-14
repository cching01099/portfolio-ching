import astraLogo from "../assets/logos/astra-logo.webp";
import ndLogo from "../assets/logos/nd-logo.webp";
import caratLogo from "../assets/logos/carat-logo.webp";
import ogilvyLogo from "../assets/logos/ogilvy-logo.webp";
import ageinLogo from "../assets/logos/agein-logo.webp";

import reactIcon from "../assets/tech-icons/react.webp";
import typescriptIcon from "../assets/tech-icons/typescript.webp";
import javascriptIcon from "../assets/tech-icons/javascript.webp";
import nextjsIcon from "../assets/tech-icons/nextjs.webp";
import tailwindIcon from "../assets/tech-icons/tailwind-css.webp";
import scssIcon from "../assets/tech-icons/scss.svg";
import bootstrapIcon from "../assets/tech-icons/bootstrap.webp";
import echartsIcon from "../assets/tech-icons/echarts.webp";
import nivoIcon from "../assets/tech-icons/nivo.webp";
import gitIcon from "../assets/tech-icons/git.webp";
import jiraIcon from "../assets/tech-icons/jira.webp";
import figmaIcon from "../assets/tech-icons/figma.webp";
import googleAnalyticsIcon from "../assets/tech-icons/google-analytics.webp";
import htmlIcon from "../assets/tech-icons/html.webp";
import cssIcon from "../assets/tech-icons/css.webp";
import vercelIcon from "../assets/tech-icons/vercel.webp";
import dataStudioIcon from "../assets/tech-icons/data-studio.webp";
import n8nIcon from "../assets/tech-icons/n8n.webp";
import supabaseIcon from "../assets/tech-icons/supabase.webp";

export const RESUME_URL =
  "https://acrobat.adobe.com/id/urn:aaid:sc:AP:8b0c3b9e-0285-4cdf-8cf2-20d92b60ed3d";

export const BIO = [
  {
    zh: "我是前端工程師 Ching，同時也是一位曾經在廣告媒體業打滾過的行銷人。",
    en: "I'm Ching, a frontend engineer who also spent years working in advertising and media marketing.",
  },
  {
    zh: "喜歡把資料變成一眼就懂的畫面，也喜歡把重複性的工作交給自動化去做。",
    en: "I love turning data into visuals that click at a glance, and handing repetitive work off to automation.",
  },
  {
    zh: "目前持續在前端與資料視覺化的領域鑽研，也保持對新工具、新技術的好奇心。",
    en: "I keep digging into frontend development and data visualization, and stay curious about new tools and technologies.",
  },
];

export const TOOL_CATEGORIES = [
  {
    title: { zh: "Front-end", en: "Front-end" },
    items: [
      { label: "React", icon: reactIcon },
      { label: "Next.js", icon: nextjsIcon },
      { label: "TypeScript", icon: typescriptIcon },
      { label: "JavaScript", icon: javascriptIcon },
      { label: "Tailwind CSS", icon: tailwindIcon },
      { label: "HTML5", icon: htmlIcon },
      { label: "CSS3", icon: cssIcon },
      { label: "SCSS", icon: scssIcon },
      { label: "Bootstrap 5", icon: bootstrapIcon },
    ],
  },
  {
    title: { zh: "Tools", en: "Tools" },
    items: [
      { label: "Git", icon: gitIcon },
      { label: "GitHub", iconNode: "github" },
      { label: "Vercel", icon: vercelIcon },
      { label: "Supabase", icon: supabaseIcon },
      { label: "Figma", icon: figmaIcon },
      { label: "n8n", icon: n8nIcon },
      { label: "Jira", icon: jiraIcon },
    ],
  },
  {
    title: { zh: "資料視覺化", en: "Data Visualization" },
    items: [
      { label: "ECharts", icon: echartsIcon },
      { label: "Nivo", icon: nivoIcon },
    ],
  },
  {
    title: { zh: "行銷／分析", en: "Marketing / Analytics" },
    items: [
      { label: "GA4", icon: googleAnalyticsIcon },
      { label: "Data Studio", icon: dataStudioIcon },
    ],
  },
];

export const CREDENTIAL = { zh: "TOEIC 金色證書（875/990）", en: "TOEIC Gold Certificate (875/990)" };

export const EDUCATION = [
  {
    desc: {
      zh: "ALPHA Camp - 軟體工程師培訓班",
      en: "ALPHA Camp - Software Engineer Bootcamp",
    },
    period: "2022/08 - 2023/03",
  },
  {
    desc: {
      zh: "東吳大學 - 國際經營與貿易學系",
      en: "Soochow University - Dept. of International Business",
    },
    period: "2015/09 - 2019/06",
  },
];

export const WORK_HISTORY = [
  {
    period: "2024/11 - Now",
    company: { zh: "盛星科技股份有限公司", en: "Astra Cloud Co., Ltd." },
    position: { zh: "前端工程師", en: "Frontend Engineer" },
    desc: { zh: [], en: [] },
    logo: astraLogo,
  },
  {
    period: "2023/08 - 2024/08",
    company: { zh: "聯齊科技股份有限公司", en: "NextDrive Co., Ltd." },
    position: { zh: "前端工程師", en: "Frontend Engineer" },
    desc: {
      zh: [
        "主要使用 React + Tailwind 開發網站",
        "使用 Nivo、ECharts 進行資料視覺化",
        "實現多國語言支援（react-i18next）",
        "實現 Server-sent Events，顯示即時資料",
        "與後端合作討論資料格式，串接 RESTful API",
        "使用 Storybook 獨立開發 UI 介面元件",
        "主要專案：能源管理系統、負載集成調度商平台",
      ],
      en: [
        "Built websites primarily with React + Tailwind",
        "Used Nivo and ECharts for data visualization",
        "Implemented multi-language support (react-i18next)",
        "Implemented Server-Sent Events for real-time data display",
        "Collaborated with backend on data formats, integrated RESTful APIs",
        "Developed UI components independently using Storybook",
        "Main projects: Energy Management System, Load Aggregator Dispatch Platform",
      ],
    },
    logo: ndLogo,
  },
  {
    period: "2022/01 - 2022/08",
    company: { zh: "凱絡媒體服務股份有限公司", en: "Carat Media Services" },
    position: { zh: "資深企劃", en: "Senior Planner" },
    desc: {
      zh: ["品牌 APP 之成效型媒體規劃與預算控管", "成效優化建議之 APP 介面及使用者體驗分析"],
      en: [
        "Performance-based media planning and budget control for brand apps",
        "App interface and UX analysis for performance optimization recommendations",
      ],
    },
    logo: caratLogo,
  },
  {
    period: "2021/08 - 2022/01",
    company: { zh: "奧美廣告股份有限公司", en: "Ogilvy & Mather Advertising" },
    position: { zh: "資深業務執行", en: "Senior Account Executive" },
    desc: {
      zh: ["品牌社群平台之創意內容經營", "主導數位產品專案－客製化品牌專屬 AR 濾鏡"],
      en: [
        "Managed creative content for brand social media platforms",
        "Led a digital product project — custom branded AR filters",
      ],
    },
    logo: ogilvyLogo,
  },
  {
    period: "2020/05 - 2021/08",
    company: { zh: "康瑞行銷顧問股份有限公司", en: "Agein Marketing Consultant Co., Ltd." },
    position: { zh: "媒體企劃", en: "Media Planner" },
    desc: {
      zh: ["品牌全年度媒體規劃", "策劃品牌周年活動之活動網站與創意版位的製作"],
      en: [
        "Annual media planning for brands",
        "Planned brand anniversary campaign websites and creative placements",
      ],
    },
    logo: ageinLogo,
  },
];
