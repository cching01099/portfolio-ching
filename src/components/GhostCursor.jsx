export default function GhostCursor({ label, color, style }) {
  return (
    <div
      className="hidden md:block absolute pointer-events-none z-40"
      style={{
        ...style,
        transition: "left 2.2s ease-in-out, top 2.2s ease-in-out",
      }}
    >
      <svg width="18" height="18" viewBox="0 0 18 18" fill={color} className="drop-shadow">
        <path d="M1 1 L1 15 L5 11 L8 17 L11 15.5 L8 9.5 L14 9.5 Z" />
      </svg>
      <div
        className="mt-0.5 ml-3.5 text-[10px] font-semibold text-white px-2 py-0.5 rounded-md whitespace-nowrap"
        style={{ backgroundColor: color }}
      >
        {label}
      </div>
    </div>
  );
}
