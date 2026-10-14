import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import AVATAR_SRC from "../assets/avatar.webp";
import GhostCursor from "../components/GhostCursor";
import StickyNotes, { MobileStickyBoard } from "../components/StickyNotes";
import { EyeIcon } from "../components/icons";

export default function IndexPage() {
  const { t } = useTranslation();
  const [ghost1Pos, setGhost1Pos] = useState({ top: "15%", left: "45%" });
  const [ghost2Pos, setGhost2Pos] = useState({ top: "45%", left: "55%" });
  const [viewerCount, setViewerCount] = useState(3);
  const heroRef = useRef(null);
  const [heroShown, setHeroShown] = useState(false);

  // 首頁大標題逐行浮現（transitions.dev 18-texts-reveal）：先以隱藏狀態繪製並強制 reflow，再加 is-shown
  useLayoutEffect(() => {
    void heroRef.current?.offsetHeight;
    setHeroShown(true);
  }, []);

  // 假的即時觀看人數，每隔幾秒隨機跳動一次，增加一點直播感
  useEffect(() => {
    let timer;
    const tick = () => {
      setViewerCount(1 + Math.floor(Math.random() * 8));
      timer = setTimeout(tick, 8000 + Math.random() * 7000);
    };
    timer = setTimeout(tick, 8000 + Math.random() * 7000);
    return () => clearTimeout(timer);
  }, []);

  // 幽靈游標隨機緩慢移動（只在桌面版視覺上可見，但邏輯跑著無妨）
  useEffect(() => {
    const interval1 = setInterval(() => {
      setGhost1Pos({
        top: `${10 + Math.random() * 70}%`,
        left: `${10 + Math.random() * 70}%`,
      });
    }, 2800 + Math.random() * 1000);
    const interval2 = setInterval(() => {
      setGhost2Pos({
        top: `${10 + Math.random() * 70}%`,
        left: `${10 + Math.random() * 70}%`,
      });
    }, 2800 + Math.random() * 1000);
    return () => {
      clearInterval(interval1);
      clearInterval(interval2);
    };
  }, []);

  return (
    <div className="relative w-full min-h-screen flex flex-col justify-center">
      {/* ---------- 即時觀看人數（浮動角標，直播感） ---------- */}
      <div className="fixed top-4 right-4 md:top-6 md:right-6 z-40 flex items-center gap-1.5 text-xs md:text-sm text-neutral-600 bg-gray-50/50 backdrop-blur-sm px-3 py-1.5 rounded-full ring-1 ring-black/10 shadow-sm">
        <EyeIcon />
        <span key={viewerCount} className="animate-[fadeIn_0.3s_ease]">
          {t("index.viewerCount", { count: viewerCount })}
        </span>
      </div>

      {/* ---------- Hero ---------- */}
      <div className="relative z-10 text-center px-8 md:px-6">
        {/* 手機版在頭像上方留白，讓便利貼可以貼在頭像/文字周圍而不會蓋住文字 */}
        <div className="md:hidden h-[120px]" />

        <div className="relative z-10 inline-block">
          <div className="w-20 h-20 md:w-32 md:h-32 rounded-full overflow-hidden border-[3px] border-white shadow-lg bg-blue-200">
            <img
              src={AVATAR_SRC}
              alt="頭像"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <h1
          ref={heroRef}
          className={`t-stagger mt-4 text-2xl md:text-4xl font-extrabold leading-snug ${
            heroShown ? "is-shown" : ""
          }`}
        >
          <span className="t-stagger-line t-stagger-line--1">{t("index.greeting")}</span>
          <span className="t-stagger-line t-stagger-line--2 text-blue-600">{t("index.role1")}</span>
          <span className="t-stagger-line t-stagger-line--3">
            {t("index.roleConnector")}
            <span className="text-blue-600">{t("index.role2")}</span>
            {t("index.roleEnd")}
          </span>
        </h1>

        {/* 手機版在標題下方留白，讓便利貼可以貼在下緣，不會蓋住文字 */}
        <div className="md:hidden h-[150px]" />

        {/* ---------- 手機版便利貼牆：疊在頭像／文字周圍散落擺放 ---------- */}
        <MobileStickyBoard />
      </div>

      {/* ---------- 幽靈游標（僅桌面版） ---------- */}
      <GhostCursor label={t("ghost.recruiter")} color="#ff6b6b" style={ghost1Pos} />
      <GhostCursor label={t("ghost.visitor")} color="#3b6fe0" style={ghost2Pos} />

      {/* ---------- 便利貼牆（桌面版） ---------- */}
      <StickyNotes />
    </div>
  );
}
