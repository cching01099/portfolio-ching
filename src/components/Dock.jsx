import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  TerminalGlyph,
  PersonIcon,
  CodeGlyph,
  InterestsIcon,
  MailIcon,
} from "./icons";
import { localizedPath, stripLangPrefix } from "../utils/i18n";
import useSharedTooltip from "../hooks/useSharedTooltip";
import SharedTooltip from "./SharedTooltip";

const MAX_DISTANCE = 64;
const MAX_BOOST = 0.32;
const ACTIVE_THRESHOLD = 1.1;
const TOUCH_TOOLTIP_DURATION = 1500;

export default function Dock() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const lang = i18n.language;
  const bare = stripLangPrefix(location.pathname);
  const itemRefs = useRef({});
  const [scales, setScales] = useState({});
  const [hoveredKey, setHoveredKey] = useState(null);
  const rafRef = useRef(null);
  const latestX = useRef(null);
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);
  const tooltip = useSharedTooltip();
  const barRef = tooltip.groupRef;
  const hoveredKeyRef = useRef(null);
  const dotRef = useRef(null);
  const dotPlacedRef = useRef(false);
  const activeKeyRef = useRef(null);

  const navItems = [
    { key: "index", type: "route", to: localizedPath("/", lang), end: true, icon: <TerminalGlyph />, label: t("nav.root") },
    { key: "about", type: "route", to: localizedPath("/about", lang), icon: <PersonIcon />, label: t("nav.about") },
    { key: "projects", type: "route", to: localizedPath("/projects", lang), icon: <CodeGlyph />, label: t("nav.projects") },
    { key: "fun", type: "route", to: localizedPath("/fun", lang), icon: <InterestsIcon />, label: t("nav.fun") },
    { key: "contact", type: "route", to: localizedPath("/contact", lang), icon: <MailIcon />, label: t("nav.contact") },
    { key: "divider-1", type: "divider" },
    {
      key: "lang",
      type: "action",
      icon: (
        <span className="font-mono font-bold text-[13px] tracking-tight select-none">
          {lang === "zh" ? "EN" : "中"}
        </span>
      ),
      label: t("nav.language"),
      onClick: () => navigate(localizedPath(bare, lang === "zh" ? "en" : "zh")),
    },
  ];

  const activeKey = navItems.find(
    (item) => item.type === "route" && stripLangPrefix(item.to) === bare
  )?.key;

  // 目前頁面的小藍點（transitions.dev 16-tabs-sliding）：量出 active 圖示的水平中心寫到 dot 上，
  // 換頁時由 CSS transition 滑過去；animate 為 false 時暫停 transition 直接定位（首次繪製、resize）。
  // active 一律從 ref 讀：hover 跟隨迴圈是在滑鼠移動當下建立的，若在迴圈期間點了別的圖示，
  // 用閉包裡的舊 activeKey 會每一幀把點點拉回舊圖示，造成換頁時點點卡住不動
  const moveDot = (animate) => {
    const bar = barRef.current;
    const dot = dotRef.current;
    const el = itemRefs.current[activeKeyRef.current];
    if (!bar || !dot) return;
    if (!el) {
      dot.style.opacity = "0";
      return;
    }
    const barRect = bar.getBoundingClientRect();
    const rect = el.getBoundingClientRect();
    const x = rect.left + rect.width / 2 - barRect.left - bar.clientLeft - dot.offsetWidth / 2;
    dot.style.opacity = "1";
    if (!animate) {
      const prev = dot.style.transition;
      dot.style.transition = "none";
      dot.style.transform = `translateX(${x}px)`;
      void dot.offsetWidth;
      dot.style.transition = prev;
    } else {
      dot.style.transform = `translateX(${x}px)`;
    }
  };

  useLayoutEffect(() => {
    activeKeyRef.current = activeKey;
    moveDot(dotPlacedRef.current);
    dotPlacedRef.current = true;
  }, [activeKey]);

  useEffect(() => {
    const handleResize = () => moveDot(false);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Dock 提示框（transitions.dev 17-tooltip）：顯示哪一個由放大效果算出的 hoveredKey 決定
  const placeTooltip = () => {
    const key = hoveredKeyRef.current;
    const item = navItems.find((i) => i.key === key);
    if (!item) return;
    tooltip.place(itemRefs.current[key], item.label);
  };

  useLayoutEffect(() => {
    hoveredKeyRef.current = hoveredKey;
    if (hoveredKey) placeTooltip();
    else tooltip.hide();
  }, [hoveredKey]);

  // hover 放大時圖示的 margin 會用 150ms 往兩側推開、圖示也會上浮，
  // 這段期間每一幀重新瞄準，讓小藍點跟著 active 圖示、提示框跟著 hover 的圖示走
  useEffect(() => {
    let raf;
    const start = performance.now();
    const follow = () => {
      moveDot(true);
      if (hoveredKeyRef.current) placeTooltip();
      if (performance.now() - start < 200) raf = requestAnimationFrame(follow);
    };
    raf = requestAnimationFrame(follow);
    return () => cancelAnimationFrame(raf);
  }, [scales]);

  // 觸控裝置沒有 mouseleave，tooltip 點了之後不會自動消失，所以額外補一個定時關閉
  useEffect(() => {
    if (!hoveredKey) return;
    if (!window.matchMedia("(hover: none)").matches) return;
    const timer = setTimeout(() => setHoveredKey(null), TOUCH_TOOLTIP_DURATION);
    return () => clearTimeout(timer);
  }, [hoveredKey]);

  // 手機版：往下滑暫時收起 Dock，往上滑再出現；桌機版（>=768px）永遠不收起
  useEffect(() => {
    lastScrollY.current = window.scrollY;
    const handleScroll = () => {
      if (window.innerWidth >= 768) {
        setHidden(false);
        return;
      }
      const currentY = window.scrollY;
      const delta = currentY - lastScrollY.current;
      if (Math.abs(delta) < 8) return;
      if (currentY < 60) {
        setHidden(false);
      } else {
        setHidden(delta > 0);
      }
      lastScrollY.current = currentY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const computeScales = (clientX) => {
    const next = {};
    let topKey = null;
    let topScale = 1;
    navItems.forEach((item) => {
      if (item.type === "divider") return;
      const el = itemRefs.current[item.key];
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const center = rect.left + rect.width / 2;
      const distance = Math.abs(clientX - center);
      const scale =
        distance >= MAX_DISTANCE
          ? 1
          : 1 + MAX_BOOST * Math.cos((distance / MAX_DISTANCE) * (Math.PI / 2));
      next[item.key] = scale;
      if (scale > topScale) {
        topScale = scale;
        topKey = item.key;
      }
    });
    setScales(next);
    setHoveredKey(topScale > ACTIVE_THRESHOLD ? topKey : null);
  };

  const handleMouseMove = (e) => {
    latestX.current = e.clientX;
    if (rafRef.current) return;
    rafRef.current = requestAnimationFrame(() => {
      computeScales(latestX.current);
      rafRef.current = null;
    });
  };

  const handleMouseLeave = () => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    setScales({});
    setHoveredKey(null);
  };

  return (
    <div
      className={`fixed left-1/2 -translate-x-1/2 bottom-4 md:bottom-5 z-[60] transition-transform duration-300 ${
        hidden ? "translate-y-24 pointer-events-none" : ""
      }`}
    >
      <div
        ref={barRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="t-tt-group relative flex items-end gap-1.5 md:gap-2.5 bg-white/85 backdrop-blur-md border border-white/90 rounded-2xl px-2 md:px-3.5 py-1.5 md:py-2.5 shadow-xl"
      >
        {navItems.map((item) => {
          if (item.type === "divider") {
            return (
              <span
                key={item.key}
                className="w-px h-6 md:h-7 bg-black/10 self-center mx-0.5 md:mx-1"
              />
            );
          }

          const scale = scales[item.key] || 1;
          const lift = (scale - 1) * 14;
          const roundedClass = item.shape === "square" ? "rounded-[11px]" : "rounded-full";

          // 讓放大的圖示往左右推開鄰居，避免互相重疊
          const baseWidth = itemRefs.current[item.key]?.offsetWidth || 40;
          const spread = (scale - 1) * baseWidth * 0.5;

          const iconStyle = {
            transform: `translateY(${-lift}px) scale(${scale})`,
            transformOrigin: "bottom center",
            transition: "transform 150ms cubic-bezier(0.34, 1.56, 0.64, 1)",
            boxShadow:
              scale > 1.02
                ? `0 ${6 + lift}px ${12 + lift}px -6px rgba(15,23,42,${Math.min(0.3, (scale - 1) * 0.5)})`
                : "none",
          };
          const wrapperStyle = {
            marginLeft: spread,
            marginRight: spread,
            transition: "margin 150ms cubic-bezier(0.34, 1.56, 0.64, 1)",
          };
          const baseClassName = `relative w-9 h-9 md:w-11 md:h-11 flex items-center justify-center flex-shrink-0 ${roundedClass}`;
          // 鍵盤 Tab 聚焦時也顯示提示框；圖示本身沒有文字，所以補上 aria-label
          const triggerProps = {
            "aria-label": item.label,
            "aria-describedby": "dock-tooltip",
            onFocus: (e) => tooltip.place(e.currentTarget, item.label),
            onBlur: tooltip.hide,
          };
          if (item.type === "route") {
            return (
              <div key={item.key} className="relative flex-shrink-0" style={wrapperStyle}>
                <NavLink
                  to={item.to}
                  end={item.end}
                  {...triggerProps}
                  ref={(el) => (itemRefs.current[item.key] = el)}
                  style={iconStyle}
                  className={({ isActive }) =>
                    `${baseClassName} ${
                      isActive
                        ? "bg-blue-100 text-blue-700"
                        : "bg-white/60 text-neutral-800 hover:bg-blue-50"
                    }`
                  }
                >
                  {item.icon}
                </NavLink>
              </div>
            );
          }

          const itemClassName = `${baseClassName} cursor-pointer ${
            item.dark
              ? "bg-neutral-900 text-white hover:bg-neutral-700"
              : "bg-white/60 text-neutral-800 hover:bg-blue-50"
          }`;

          if (item.href) {
            return (
              <div key={item.key} className="relative flex-shrink-0" style={wrapperStyle}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  {...triggerProps}
                  ref={(el) => (itemRefs.current[item.key] = el)}
                  style={iconStyle}
                  className={itemClassName}
                >
                  {item.icon}
                </a>
              </div>
            );
          }

          return (
            <div key={item.key} className="relative flex-shrink-0" style={wrapperStyle}>
              <button
                type="button"
                onClick={item.onClick}
                {...triggerProps}
                ref={(el) => (itemRefs.current[item.key] = el)}
                style={iconStyle}
                className={itemClassName}
              >
                {item.icon}
              </button>
            </div>
          );
        })}
        <span
          ref={dotRef}
          aria-hidden="true"
          className="t-tabs-pill top-auto bottom-0 md:bottom-1 w-1 h-1 rounded-full bg-blue-600"
        />
        <SharedTooltip tooltip={tooltip} id="dock-tooltip" />
      </div>
    </div>
  );
}
