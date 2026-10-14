import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Dock from "../components/Dock";
import { stripLangPrefix } from "../utils/i18n";

const PAGE_TITLE_KEYS = {
  "/": "pageTitle.home",
  "/about": "pageTitle.about",
  "/projects": "pageTitle.projects",
  "/fun": "pageTitle.fun",
  "/contact": "pageTitle.contact",
};

export default function PageLayout() {
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const barePath = stripLangPrefix(location.pathname);
  const isEn = barePath !== location.pathname;

  // 語言完全由網址決定：有 /en 前綴就是英文，否則中文，換頁時同步 i18n 狀態
  useEffect(() => {
    const lang = isEn ? "en" : "zh";
    if (i18n.language !== lang) i18n.changeLanguage(lang);
  }, [isEn, i18n]);

  useEffect(() => {
    const key = PAGE_TITLE_KEYS[barePath] || "pageTitle.home";
    document.title = `${t(key)} | Ching Yang`;
  }, [barePath, t, i18n.language]);

  // 換頁時捲回頂部；用 behavior: "instant" 是因為全站 html 有 scroll-behavior: smooth，
  // 不指定的話換頁會變成滑動捲回頂部而不是直接跳頂。有 hash（例如便利貼連到 /projects#id）
  // 代表要捲去指定卡片，不要覆蓋掉。
  useEffect(() => {
    if (location.hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [location.pathname, location.hash]);

  const isHome = barePath === "/";

  return (
    <div
      className={`relative w-full min-h-screen overflow-hidden ${isHome ? "" : "pb-32"}`}
      style={{
        backgroundColor: "#f3f4f6",
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)",
        backgroundSize: "24px 24px",
      }}
    >
      {/* 用不含語言前綴的路徑當 key：換頁時重新掛載觸發淡入；只改 hash（便利貼跳卡片）不會重播 */}
      <div key={barePath} className="page-fade">
        <Outlet />
      </div>
      <Dock />
    </div>
  );
}
