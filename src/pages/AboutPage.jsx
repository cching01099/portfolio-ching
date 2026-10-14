import { useTranslation } from "react-i18next";
import AVATAR_SRC from "../assets/avatar.webp";
import SectionHeading from "../components/SectionHeading";
import SharedTooltip from "../components/SharedTooltip";
import useSharedTooltip from "../hooks/useSharedTooltip";
import { GithubIcon } from "../components/icons";
import { pick } from "../utils/i18n";
import {
  RESUME_URL,
  BIO,
  TOOL_CATEGORIES,
  EDUCATION,
  WORK_HISTORY,
} from "../data/about";

const ICON_NODES = {
  github: <GithubIcon />,
};

const TOUCH_TOOLTIP_DURATION = 1500;

function TechTile({ item, onEnter }) {
  return (
    <div className="relative" onPointerEnter={(e) => onEnter(e.currentTarget, item.label)}>
      <div className="w-10 h-10 rounded-xl flex items-center justify-center border border-black/5 shadow-sm bg-white text-neutral-800">
        {item.icon ? (
          <img src={item.icon} alt={item.label} className="w-7 h-7 object-contain" />
        ) : item.iconNode ? (
          ICON_NODES[item.iconNode]
        ) : (
          <span className={`text-sm font-bold ${item.text}`}>{item.glyph}</span>
        )}
      </div>
    </div>
  );
}

// 每個技能分類一列，整列共用一個提示框（transitions.dev 17-tooltip），在圖示間滑動時提示框會跟著移過去
function ToolCategory({ cat, lang }) {
  const tooltip = useSharedTooltip();
  return (
    <div>
      <p className="inline-block text-xs font-semibold text-neutral-400 border-l-2 border-blue-300 bg-gray-50/25 backdrop-blur-md pl-2 pr-2 py-0.5 rounded-r-md mb-2">
        {pick(cat.title, lang)}
      </p>
      <div
        ref={tooltip.groupRef}
        // 滑鼠離開整列就收起；觸控沒有 hover，放開手指後停留一下再收起，捲動被取消時則立刻收起
        onPointerLeave={(e) => e.pointerType !== "touch" && tooltip.hide()}
        onPointerUp={(e) => e.pointerType === "touch" && tooltip.hideLater(TOUCH_TOOLTIP_DURATION)}
        onPointerCancel={tooltip.hide}
        className="t-tt-group flex flex-wrap gap-2.5"
      >
        {cat.items.map((item) => (
          <TechTile key={item.label} item={item} onEnter={tooltip.place} />
        ))}
        <SharedTooltip tooltip={tooltip} />
      </div>
    </div>
  );
}

export default function AboutPage() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  return (
    <div className="relative w-full min-h-screen pt-10 md:pt-16 px-6 pb-16">
      <div className="max-w-4xl mx-auto">
        {/* ---------- 標題 ---------- */}
        <div className="mb-8 md:mb-10">
          <SectionHeading>{t("about.heading")}</SectionHeading>
        </div>

        {/* ---------- 左右兩欄：左為頭貼＋履歷，右為自介＋技能 ---------- */}
        <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 mb-12">
          {/* 左側 */}
          <div className="flex flex-col gap-4 flex-shrink-0 w-40 mx-auto sm:mx-0">
            <div className="w-full aspect-[3/4] rounded-2xl overflow-hidden border-[3px] border-white shadow-lg bg-blue-200">
              <img src={AVATAR_SRC} alt="頭像" className="w-full h-full object-cover" />
            </div>
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-10 flex items-center justify-center text-sm font-semibold px-6 py-1 rounded-[11px] bg-gray-50/50 backdrop-blur-sm ring-1 ring-black/10 hover:bg-blue-50/70 transition-colors"
            >
              {t("about.downloadCV")}
            </a>
          </div>

          {/* 右側 */}
          <div className="flex-1">
            <p className="inline-block rounded-md bg-gray-50/25 backdrop-blur-md px-2 py-0.5 -mx-2 text-base font-semibold mb-2">
              Hi there, I'm Ching 👋
            </p>
            <div className="space-y-1.5 mb-8">
              {BIO.map((line) => (
                <p key={line.zh} className="text-sm leading-relaxed text-neutral-600">
                  {pick(line, lang)}
                </p>
              ))}
            </div>

            {/* ---------- 技能 ---------- */}
            <h3 className="inline-block rounded-md bg-gray-50/25 backdrop-blur-md px-2 py-0.5 -mx-2 text-sm font-bold text-neutral-500 tracking-wide mb-4">
              {t("about.toolsHeading")}
            </h3>
            <div className="grid gap-5 sm:grid-cols-2">
              {TOOL_CATEGORIES.map((cat) => (
                <ToolCategory key={cat.title.zh} cat={cat} lang={lang} />
              ))}
            </div>
          </div>
        </div>

        {/* ---------- 工作經歷 ---------- */}
        <section className="mb-12">
          <SectionHeading>{t("about.experienceHeading")}</SectionHeading>
          <div className="mt-6">
            {WORK_HISTORY.map((work, i) => (
              <div
                key={work.company.zh}
                className={`relative pl-7 ${i === WORK_HISTORY.length - 1 ? "" : "pb-5"}`}
              >
                {i === 0 && (
                  <span className="absolute left-[9px] -top-3 h-5 w-0.5 bg-neutral-300" />
                )}
                <span className="absolute left-[9px] top-2 bottom-0 w-0.5 bg-neutral-300" />
                <span className="absolute left-1 top-1.5 z-10">
                  {i === 0 && (
                    <span className="absolute inset-0 rounded-full bg-blue-400 animate-ping" />
                  )}
                  <span className="relative block w-2.5 h-2.5 rounded-full bg-blue-600 ring-4 ring-blue-100" />
                </span>
                <div onTouchStart={() => {}}
                  className="flex gap-3 rounded-xl bg-white border border-black/5 shadow-sm hover:shadow-xl hover:-translate-y-1 active:shadow-xl active:-translate-y-1 transition-all duration-300 p-4">
                  <img
                    src={work.logo}
                    alt={pick(work.company, lang)}
                    className="w-10 h-10 rounded-lg object-cover flex-shrink-0 border border-black/5"
                  />
                  <div className="flex-1">
                    <div className="flex items-baseline justify-between gap-2">
                      <p className="text-sm font-semibold">
                        {pick(work.position, lang)}
                        <span className="hidden sm:inline sm:ml-1.5 text-neutral-500 font-normal">
                          · {pick(work.company, lang)}
                        </span>
                      </p>
                      <span className="text-xs text-neutral-400 whitespace-nowrap">
                        {work.period}
                      </span>
                    </div>
                    <p className="sm:hidden mt-1 text-sm text-neutral-500">
                      {pick(work.company, lang)}
                    </p>
                    {pick(work.desc, lang).length > 0 && (
                      <ul className="mt-1.5 space-y-1 list-disc pl-4">
                        {pick(work.desc, lang).map((line) => (
                          <li key={line} className="text-xs text-neutral-600 leading-relaxed">
                            {line}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ---------- 學歷 ---------- */}
        <section>
          <SectionHeading>{t("about.educationHeading")}</SectionHeading>
          <div className="mt-6">
            {EDUCATION.map((edu, i) => (
              <div
                key={edu.desc.zh}
                className={`relative pl-7 ${i === EDUCATION.length - 1 ? "" : "pb-5"}`}
              >
                {i === 0 && (
                  <span className="absolute left-[9px] -top-3 h-5 w-0.5 bg-neutral-300" />
                )}
                <span className="absolute left-[9px] top-2 bottom-0 w-0.5 bg-neutral-300" />
                <span className="absolute left-1 top-1.5 w-2.5 h-2.5 rounded-full bg-blue-600 ring-4 ring-blue-100 z-10" />
                <div onTouchStart={() => {}}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 rounded-xl bg-white border border-black/5 shadow-sm hover:shadow-xl hover:-translate-y-1 active:shadow-xl active:-translate-y-1 transition-all duration-300 p-4">
                  <p className="text-sm text-neutral-700">{pick(edu.desc, lang)}</p>
                  <span className="text-xs text-neutral-400">{edu.period}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
