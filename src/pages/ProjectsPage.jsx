import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { PROJECTS, PROJECT_CATEGORIES, SPOTLIGHTS, getTagColor } from "../data/projects";
import SectionHeading from "../components/SectionHeading";
import Thumb from "../components/Thumb";
import { GithubIcon, RssFeedIcon } from "../components/icons";
import { pick } from "../utils/i18n";

function ExternalLinkIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="13"
      height="13"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 17 17 7M9 7h8v8" />
    </svg>
  );
}

// 卡片底部的外部連結按鈕：共用尺寸、邊框與圖示大小，只有配色不同
// primary：灰褐實心（Demo）；accent：霧粉實心（社群迴響）；皆為白字；預設：外框
// 實心按鈕也保留透明邊框，換行單獨一列時高度才會跟外框按鈕一致；圖示統一縮成 16px
// 手機版（< sm）三顆用 grid 平均分滿一排、內距縮小；sm 以上固定 w-24（96px）等寬，以最寬的「社群迴響」為準
// 極窄螢幕（< 360px）放不下圖示＋文字，只留文字
const PROJECT_LINK_VARIANTS = {
  primary: "border-transparent bg-[#8d847d] text-white hover:bg-[#7d756f]",
  accent: "border-transparent bg-[#be699beb] text-white hover:bg-[#b05a8d]",
  default: "border-black/10 bg-white text-neutral-800 hover:bg-neutral-50",
};

function ProjectLink({ href, icon, variant = "default", children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex w-full sm:w-24 items-center justify-center gap-1.5 whitespace-nowrap text-xs font-semibold px-1.5 sm:px-3 py-1.5 rounded-full border transition-colors [&>svg]:w-4 [&>svg]:h-4 [&>svg]:shrink-0 max-[359px]:[&>svg]:hidden ${PROJECT_LINK_VARIANTS[variant]}`}
    >
      {icon}
      {children}
    </a>
  );
}

function categoryLabelOf(project, lang) {
  const label = PROJECT_CATEGORIES.find((c) => c.key === project.category)?.label;
  return label ? pick(label, lang) : "";
}

// 分類區的完整卡片；有 spotlight 文案的（Pourista）以標語＋重點條列取代 desc
function ProjectCard({ project, activeTag, onTagClick, highlighted }) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const tags = project.tags || [project.tag];
  const title = pick(project.title, lang);
  return (
    <div
      id={project.id}
      onTouchStart={() => {}}
      className={`group flex flex-col overflow-hidden rounded-2xl bg-white border shadow-sm hover:shadow-xl hover:-translate-y-1 active:shadow-xl active:-translate-y-1 transition-all duration-300 ${
        highlighted ? "border-blue-400 ring-2 ring-blue-300" : "border-black/5"
      }`}
    >
      {project.image && (
        <Thumb
          src={project.image}
          alt={title}
          className="aspect-video w-full bg-neutral-100"
          imgClassName="object-cover transition-transform duration-700 ease-out group-hover:scale-105 group-active:scale-105"
        />
      )}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-base font-semibold mb-2">{title}</h3>
        <div className="flex flex-wrap gap-1.5 mb-2">
          {tags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => onTagClick(tag)}
              className={`text-[11px] font-medium px-2 py-0.5 rounded-full cursor-pointer transition-colors ${
                activeTag === tag ? "bg-blue-600 text-white" : `${getTagColor(tag)} hover:opacity-75`
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
        {project.spotlight ? (
          <div className="flex-1">
            <p className="text-sm font-semibold text-neutral-800 mb-2">
              {pick(project.spotlight.tagline, lang)}
            </p>
            <ul className="space-y-1.5">
              {pick(project.spotlight.highlights, lang).map((line) => (
                <li key={line} className="flex gap-2 text-sm leading-relaxed text-neutral-600">
                  <span className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-[#be699beb]" />
                  {line}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="text-sm leading-relaxed text-neutral-600 flex-1 whitespace-pre-line">
            {pick(project.desc, lang)}
          </p>
        )}
        {project.internal ? (
          <p className="mt-3 text-xs text-neutral-400">{t("projects.internalNote")}</p>
        ) : (
          (project.demo || project.repo || project.social) && (
            <div className="mt-3 grid grid-cols-3 gap-1.5 sm:flex sm:flex-wrap sm:gap-2">
              {project.demo && (
                <ProjectLink href={project.demo} icon={<ExternalLinkIcon />} variant="primary">
                  {t("projects.liveDemo")}
                </ProjectLink>
              )}
              {project.repo && (
                <ProjectLink href={project.repo} icon={<GithubIcon />}>
                  {t("projects.viewCode")}
                </ProjectLink>
              )}
              {project.social && (
                <ProjectLink href={project.social} icon={<RssFeedIcon />} variant="accent">
                  {t("projects.social")}
                </ProjectLink>
              )}
            </div>
          )
        )}
      </div>
    </div>
  );
}

// 精選區的目錄小卡：縮圖＋分類＋名稱＋一句話亮點，點擊後捲到分類區的完整卡片並發亮
function SpotlightTile({ project, line, thumbClassName = "", onSelect }) {
  const { i18n } = useTranslation();
  const lang = i18n.language;
  const title = pick(project.title, lang);
  return (
    <a
      href={`#${project.id}`}
      onClick={(e) => {
        e.preventDefault();
        onSelect(project.id);
      }}
      className="group flex items-center gap-3 rounded-xl bg-white border border-black/5 p-2.5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
    >
      {project.image && (
        <Thumb
          src={project.image}
          alt=""
          className="aspect-video w-24 shrink-0 rounded-lg bg-neutral-100"
          imgClassName={`object-cover ${thumbClassName}`}
        />
      )}
      <div className="min-w-0 flex-1">
        <p className="text-[11px] font-medium text-neutral-400">{categoryLabelOf(project, lang)}</p>
        <p className="text-sm font-semibold text-neutral-900 truncate">{title}</p>
        <p className="text-xs leading-snug text-neutral-600 line-clamp-2">{pick(line, lang)}</p>
      </div>
      <span
        aria-hidden="true"
        className="shrink-0 text-neutral-300 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:text-neutral-500"
      >
        →
      </span>
    </a>
  );
}

export default function ProjectsPage() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const [activeTag, setActiveTag] = useState(null);
  const [highlightId, setHighlightId] = useState(null);
  const highlightTimerRef = useRef(null);
  const location = useLocation();

  const visibleProjects = PROJECTS.filter(
    (p) => !activeTag || (p.tags || [p.tag]).includes(activeTag)
  );

  const handleTagClick = (tag) => {
    setActiveTag((prev) => (prev === tag ? null : tag));
  };

  // 捲到指定卡片並短暫發亮提示（首頁便利貼跳轉、精選小卡點擊共用）
  const focusProject = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "center" });
    setHighlightId(id);
    clearTimeout(highlightTimerRef.current);
    highlightTimerRef.current = setTimeout(() => setHighlightId(null), 2000);
  };

  // 從首頁便利貼牆點過來時（網址帶 #id），滾動到對應卡片
  useEffect(() => {
    const id = location.hash.replace("#", "");
    if (id) focusProject(id);
    return () => clearTimeout(highlightTimerRef.current);
  }, [location.hash]);

  return (
    <div className="relative w-full min-h-screen pt-10 md:pt-16 px-6 pb-16">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 md:mb-10">
          <SectionHeading>{t("projects.heading")}</SectionHeading>
          <p className="mt-2 text-sm text-neutral-600">
            <span className="inline-block rounded-md bg-gray-50/25 backdrop-blur-md px-2 py-1 -mx-2">
              {t("projects.subtitle")}
            </span>
          </p>
          {activeTag && (
            <button
              type="button"
              onClick={() => setActiveTag(null)}
              className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            >
              {t("projects.filtering", { tag: activeTag })}
            </button>
          )}
        </div>

        <div className="space-y-10">
          {/* 精選區：目錄式小卡，篩選標籤時隱藏（被篩掉的卡片點了也捲不到） */}
          {!activeTag && (
            <section>
              <SectionHeading size="sm" className="mb-4">
                {t("projects.spotlightHeading")}
              </SectionHeading>
              <div className="grid gap-3 md:grid-cols-3">
                {SPOTLIGHTS.map(({ id, line, thumbClassName }) => {
                  const project = PROJECTS.find((p) => p.id === id);
                  if (!project) return null;
                  return (
                    <SpotlightTile
                      key={id}
                      project={project}
                      line={line}
                      thumbClassName={thumbClassName}
                      onSelect={focusProject}
                    />
                  );
                })}
              </div>
            </section>
          )}
          {PROJECT_CATEGORIES.map((cat) => {
            const items = visibleProjects.filter((p) => p.category === cat.key);
            if (items.length === 0) return null;
            return (
              <section key={cat.key}>
                <SectionHeading size="sm" className="mb-4">
                  {pick(cat.label, lang)}
                </SectionHeading>
                <div className="grid gap-5 sm:grid-cols-2">
                  {items.map((project) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      activeTag={activeTag}
                      onTagClick={handleTagClick}
                      highlighted={highlightId === project.id}
                    />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}
