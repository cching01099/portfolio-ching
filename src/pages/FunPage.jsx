import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import SectionHeading from "../components/SectionHeading";
import { pick } from "../utils/i18n";
import { HOBBIES } from "../data/fun";

const PLACEHOLDER_PHOTO_SLOTS = 6;

function HobbyCard({ hobby, lang, onOpen }) {
  return (
    <button
      type="button"
      onClick={() => onOpen(hobby)}
      onTouchStart={() => {}}
      className={`group text-left rounded-sm p-4 shadow-lg hover:shadow-2xl hover:-translate-y-1 active:shadow-2xl active:-translate-y-1 transition-all duration-300 ${hobby.color} ${hobby.rotate}`}
    >
      <div className="aspect-[4/3] rounded-sm bg-black/5 flex items-center justify-center text-5xl mb-3">
        {hobby.emoji}
      </div>
      <h3 className="text-sm font-bold text-neutral-800 mb-1">{pick(hobby.title, lang)}</h3>
      <p className="text-xs text-neutral-600 leading-relaxed">{pick(hobby.blurb, lang)}</p>
    </button>
  );
}

function HobbyModal({ hobby, lang, onClose, t }) {
  const panelRef = useRef(null);
  // hobby 一變回 null 就會關閉，所以另外留住一份內容，等縮小淡出播完才真正卸載
  const [shown, setShown] = useState(null);
  const [phase, setPhase] = useState("closed"); // closed | entering | open | closing

  // 依 hobby 的變化在 render 階段直接推進狀態（React 官方建議的「依前次 props 調整 state」寫法）
  if (hobby && (hobby !== shown || phase === "closing")) {
    setShown(hobby);
    setPhase(hobby === shown ? "open" : "entering");
  } else if (!hobby && (phase === "entering" || phase === "open")) {
    setPhase("closing");
  }

  // 先以未開啟的樣式掛上去並強制 reflow，再加 is-open，transition 才會從 0.96 放大
  useLayoutEffect(() => {
    if (phase !== "entering") return;
    void panelRef.current?.offsetWidth;
    setPhase("open");
  }, [phase]);

  useEffect(() => {
    if (phase !== "closing") return;
    const closeMs =
      parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--modal-close-dur")) ||
      150;
    const timer = setTimeout(() => {
      setShown(null);
      setPhase("closed");
    }, closeMs);
    return () => clearTimeout(timer);
  }, [phase]);

  if (!shown) return null;

  const isOpen = phase === "open";
  const isClosing = phase === "closing";

  return (
    <div
      className={`fixed inset-0 z-[70] flex items-center justify-center p-4 ${
        isClosing ? "pointer-events-none" : ""
      }`}
    >
      <div
        className={`absolute inset-0 bg-black/50 transition-opacity ease-(--modal-ease) motion-reduce:transition-none ${
          isClosing ? "duration-(--modal-close-dur)" : "duration-(--modal-open-dur)"
        } ${isOpen ? "opacity-100" : "opacity-0"}`}
        onClick={onClose}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        className={`t-modal relative z-10 w-full max-w-lg max-h-[85vh] overflow-y-auto rounded-2xl bg-white shadow-2xl p-6 ${
          isOpen ? "is-open" : ""
        } ${isClosing ? "is-closing" : ""}`}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label={t("fun.close")}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-600"
        >
          ✕
        </button>

        <div className="text-4xl mb-3">{shown.emoji}</div>
        <h3 className="text-lg font-extrabold mb-3">{pick(shown.title, lang)}</h3>
        <div className="space-y-2 mb-5">
          {pick(shown.story, lang).map((paragraph) => (
            <p key={paragraph} className="text-sm text-neutral-600 leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-2">
          {(shown.photos.length > 0
            ? shown.photos
            : Array.from({ length: PLACEHOLDER_PHOTO_SLOTS })
          ).map((photo, i) =>
            photo ? (
              <img
                key={photo}
                src={photo}
                alt=""
                className="aspect-square w-full object-cover rounded-lg"
              />
            ) : (
              <div
                key={i}
                className="aspect-square rounded-lg border border-dashed border-neutral-300 flex items-center justify-center text-neutral-300 text-[10px] text-center px-1"
              >
                {t("fun.photoComingSoon")}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default function FunPage() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const [openHobby, setOpenHobby] = useState(null);

  // 打開便利貼時鎖住背景捲動、支援 Esc 關閉
  useEffect(() => {
    if (!openHobby) return;
    const handleKeyDown = (e) => e.key === "Escape" && setOpenHobby(null);
    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [openHobby]);

  return (
    <div className="relative w-full min-h-screen pt-10 md:pt-16 px-6 pb-16">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 md:mb-10">
          <SectionHeading>{t("fun.heading")}</SectionHeading>
          <p className="mt-2 text-sm text-neutral-600">
            <span className="inline-block rounded-md bg-gray-50/25 backdrop-blur-md px-2 py-1 -mx-2">
              {t("fun.subtitle")}
            </span>
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {HOBBIES.map((hobby) => (
            <HobbyCard key={hobby.id} hobby={hobby} lang={lang} onOpen={setOpenHobby} />
          ))}
        </div>
      </div>

      <HobbyModal hobby={openHobby} lang={lang} onClose={() => setOpenHobby(null)} t={t} />
    </div>
  );
}
