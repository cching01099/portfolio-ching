import { useRef } from "react";

// transitions.dev 17-tooltip：一組觸發元素共用同一個提示框。
// 提示框隱藏時直接把位置瞬移到目標上、只播出現動畫；已經顯示時改成用 transition 滑到下一個目標，
// 所以在相鄰圖示間滑動時是同一個泡泡跟著移動，不會一直閃。出現有短暫延遲，離開則立刻消失。
export default function useSharedTooltip() {
  const groupRef = useRef(null);
  const tipRef = useRef(null);
  const textRef = useRef(null);
  const hideTimerRef = useRef(null);

  const hide = () => {
    clearTimeout(hideTimerRef.current);
    const tip = tipRef.current;
    if (!tip) return;
    tip.setAttribute("data-show", "false");
    tip.setAttribute("aria-hidden", "true");
  };

  // 觸控沒有 hover，點一下之後讓提示框停留一段時間再收起
  const hideLater = (ms) => {
    clearTimeout(hideTimerRef.current);
    hideTimerRef.current = setTimeout(hide, ms);
  };

  const place = (trigger, label) => {
    clearTimeout(hideTimerRef.current);
    const group = groupRef.current;
    const tip = tipRef.current;
    const text = textRef.current;
    if (!group || !tip || !text || !trigger) return;

    const showing = tip.getAttribute("data-show") === "true";
    text.textContent = label;
    const cs = getComputedStyle(tip);
    const width = Math.ceil(
      text.scrollWidth + parseFloat(cs.paddingLeft) + parseFloat(cs.paddingRight)
    );
    const g = group.getBoundingClientRect();
    const r = trigger.getBoundingClientRect();
    const x = r.left - g.left + r.width / 2 - width / 2;
    // 原版只有水平移動；這裡多算垂直位移，讓會換行的群組（About 技能列）也能對到第二排，
    // Dock 圖示放大上浮時提示框也會跟著往上
    const y = r.top - g.top;

    if (!showing) {
      tip.style.transition = "none";
      tip.style.width = `${width}px`;
      tip.style.setProperty("--tt-x", `${x}px`);
      tip.style.setProperty("--tt-y", `${y}px`);
      void tip.offsetWidth;
      tip.style.transition = "";
    } else {
      tip.style.width = `${width}px`;
      tip.style.setProperty("--tt-x", `${x}px`);
      tip.style.setProperty("--tt-y", `${y}px`);
    }
    tip.setAttribute("data-show", "true");
    tip.setAttribute("aria-hidden", "false");
  };

  return { groupRef, tipRef, textRef, place, hide, hideLater };
}
