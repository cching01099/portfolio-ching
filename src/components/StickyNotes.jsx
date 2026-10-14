import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { PROJECTS, STICKY_POSITIONS, MOBILE_STICKY_POSITIONS } from "../data/projects";
import { pick, localizedPath } from "../utils/i18n";

function StickyContent({ project }) {
  const { i18n } = useTranslation();
  const lang = i18n.language;
  return (
    <>
      {/* 拖拉把手圖示：暗示這張便利貼可以拖拉 */}
      <span className="absolute top-1.5 right-2 text-black/25 text-sm leading-none select-none pointer-events-none">
        ⠿
      </span>
      <h4 className="text-sm font-semibold mb-1.5 pr-4">{pick(project.title, lang)}</h4>
      <p className="text-xs leading-relaxed text-neutral-700">
        {pick(project.note, lang) || pick(project.desc, lang)}
      </p>
      <span className="inline-block mt-2 text-[10px] bg-black/10 px-2 py-0.5 rounded-full">
        {project.tag}
      </span>
    </>
  );
}

// desktopOnly 的便利貼（例如連到 Fun／Contact 頁的卡片）只出現在桌機版首頁，不佔手機版版位
const DESKTOP_FEATURED = PROJECTS.filter((p) => p.featured || p.desktopOnly);
const MOBILE_FEATURED = PROJECTS.filter((p) => p.featured);

// 從滑鼠或觸控事件取出座標，讓拖拉邏輯同時支援桌機滑鼠跟手機觸控
function getPoint(e) {
  if (e.touches && e.touches[0]) return { x: e.touches[0].clientX, y: e.touches[0].clientY };
  if (e.changedTouches && e.changedTouches[0]) {
    return { x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY };
  }
  return { x: e.clientX, y: e.clientY };
}

// 可拖拉的便利貼板：桌機版、手機版各自用一份獨立的 state，共用同一套拖拉／點擊判斷邏輯
function useDraggableBoard(initialPositions, featuredList) {
  const [positions, setPositions] = useState(initialPositions);
  const [rotations, setRotations] = useState(
    Object.fromEntries(featuredList.map((p) => [p.id, p.rotate]))
  );
  const [dragId, setDragId] = useState(null);
  const dragOffset = useRef({ x: 0, y: 0 });
  const startPoint = useRef({ x: 0, y: 0 });
  const canvasRef = useRef(null);
  const navigate = useNavigate();
  const { i18n } = useTranslation();

  const handleStart = (e, id) => {
    const point = getPoint(e);
    const cardRect = e.currentTarget.getBoundingClientRect();
    dragOffset.current = { x: point.x - cardRect.left, y: point.y - cardRect.top };
    startPoint.current = point;
    setDragId(id);
    setRotations((prev) => ({ ...prev, [id]: "rotate-0" }));
  };

  useEffect(() => {
    if (!dragId) return;

    const handleMove = (e) => {
      if (e.cancelable) e.preventDefault(); // 拖拉時避免手機頁面跟著滑動
      const point = getPoint(e);
      const canvasRect = canvasRef.current.getBoundingClientRect();
      const x = point.x - canvasRect.left - dragOffset.current.x;
      const y = point.y - canvasRect.top - dragOffset.current.y;

      setPositions((prev) => ({
        ...prev,
        [dragId]: {
          top: `${(y / canvasRect.height) * 100}%`,
          left: `${(x / canvasRect.width) * 100}%`,
        },
      }));
    };

    // 幾乎沒移動的放開視為「點擊」，而非拖拉 → 導到對應的作品
    const handleEnd = (e) => {
      const point = getPoint(e);
      const moved = Math.hypot(point.x - startPoint.current.x, point.y - startPoint.current.y);
      const clickedId = dragId;
      setDragId(null);
      if (moved < 6) {
        const project = featuredList.find((p) => p.id === clickedId);
        const targetPath =
          project?.stickyLink ?? (project?.category ? `/projects#${project.id}` : null);
        if (targetPath) navigate(localizedPath(targetPath, i18n.language));
      }
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", handleEnd);
    window.addEventListener("touchmove", handleMove, { passive: false });
    window.addEventListener("touchend", handleEnd);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleEnd);
      window.removeEventListener("touchmove", handleMove);
      window.removeEventListener("touchend", handleEnd);
    };
  }, [dragId, navigate]);

  return { positions, rotations, dragId, canvasRef, handleStart };
}

// 手機版便利貼板：疊在 Hero 內容上方（絕對定位相對於外層帶 relative 的 Hero 容器），圍繞頭像／文字散落擺放
export function MobileStickyBoard() {
  const mobile = useDraggableBoard(MOBILE_STICKY_POSITIONS, MOBILE_FEATURED);

  return (
    <div ref={mobile.canvasRef} className="md:hidden absolute inset-0 z-0 pointer-events-none">
      {MOBILE_FEATURED.map((project) => (
        <div
          key={project.id}
          onMouseDown={(e) => mobile.handleStart(e, project.id)}
          onTouchStart={(e) => mobile.handleStart(e, project.id)}
          className={`group absolute w-[145px] p-3 rounded-sm shadow-lg select-none touch-none pointer-events-auto ${
            project.color
          } ${mobile.rotations[project.id]} ${
            mobile.dragId === project.id ? "z-50 shadow-2xl" : "z-20"
          }`}
          style={{
            top: mobile.positions[project.id].top,
            left: mobile.positions[project.id].left,
            // 初始位置可能是 right；拖拉後 handleMove 只寫 top/left，right 會自動變成 undefined
            right: mobile.positions[project.id].right,
          }}
        >
          <StickyContent project={project} />
        </div>
      ))}
    </div>
  );
}

export default function StickyNotes() {
  const { t } = useTranslation();
  const desktop = useDraggableBoard(STICKY_POSITIONS, DESKTOP_FEATURED);

  return (
    <div
      ref={desktop.canvasRef}
      className="hidden md:block absolute inset-0 z-20 pointer-events-none"
    >
      {/* ---------- 手繪塗鴉 ---------- */}
      <svg
        className="absolute pointer-events-none z-0"
        style={{ top: "24%", left: "27%" }}
        width="120"
        height="80"
        viewBox="0 0 120 80"
      >
        <path
          d="M10 60 Q 50 10, 100 20"
          stroke="#8899aa"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeDasharray="4 5"
        />
        <path
          d="M92 12 L100 20 L90 26"
          stroke="#8899aa"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
      <div
        className="absolute pointer-events-none z-0 rounded-md bg-gray-50/25 backdrop-blur-md px-2 py-1 text-sm text-neutral-600"
        style={{ top: "27%", left: "15%" }}
      >
        {t("index.stickyDoodle")}
      </div>

      {DESKTOP_FEATURED.map((project) => (
        <div
          key={project.id}
          onMouseDown={(e) => desktop.handleStart(e, project.id)}
          className={`group absolute w-[190px] p-4 rounded-sm shadow-lg cursor-grab select-none pointer-events-auto transition-[transform,box-shadow] duration-300 ${
            project.category || project.stickyLink ? "hover:shadow-2xl hover:-translate-y-1" : ""
          } ${project.color} ${desktop.rotations[project.id]} ${
            desktop.dragId === project.id ? "z-50 cursor-grabbing shadow-2xl" : "z-20"
          }`}
          style={{
            top: desktop.positions[project.id].top,
            left: desktop.positions[project.id].left,
          }}
        >
          <StickyContent project={project} />
        </div>
      ))}
    </div>
  );
}
