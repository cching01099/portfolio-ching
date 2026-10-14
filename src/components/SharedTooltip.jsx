// 搭配 useSharedTooltip 使用：放在群組元素裡面，內容與位置都由 hook 直接寫進 DOM
export default function SharedTooltip({ tooltip, id, className = "" }) {
  return (
    <span
      ref={tooltip.tipRef}
      id={id}
      role="tooltip"
      aria-hidden="true"
      data-show="false"
      className={`t-tt rounded-lg px-2.5 py-1 text-[11px] font-medium text-neutral-700 ${className}`}
    >
      <span ref={tooltip.textRef} className="t-tt-text" />
    </span>
  );
}
