import { useState } from "react";

export default function Thumb({ src, alt, className = "", imgClassName = "" }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* 骨架層：常駐 DOM，用 opacity 淡出，避免條件渲染的硬切 */}
      <div
        className="absolute inset-0 pointer-events-none bg-neutral-200 animate-pulse"
        style={{ opacity: loaded ? 0 : 1, transition: "opacity 0.6s ease" }}
      />
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        className={`relative w-full h-full ${imgClassName}`}
        style={{ opacity: loaded ? 1 : 0, transition: "opacity 0.6s ease" }}
      />
    </div>
  );
}
