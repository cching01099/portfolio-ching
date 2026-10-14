import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import SectionHeading from "../components/SectionHeading";
import { GithubIcon, LinkedinIcon } from "../components/icons";

const SOCIALS = [
  { label: "GitHub", href: "https://github.com/cching01099", icon: <GithubIcon /> },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/ching-yang-b1549923a/",
    icon: <LinkedinIcon />,
  },
  { label: "Medium", href: "https://medium.com/@cching01099", icon: null },
];

const GOOGLE_SHEET_ENDPOINT =
  "https://script.google.com/macros/s/AKfycbxYw7ml7JRe9ivyGI3n5t8TnuVsD1ISWl-VkN42dkaIp7lLfJ9KqOm0RHhZSJXkVVOU-g/exec";

const EMPTY_FORM = { email: "", message: "", company: "" };

function MessageStickyNote() {
  const { t } = useTranslation();
  const [form, setForm] = useState(EMPTY_FORM);
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  // 送出成功幾秒後自動變回空白便利貼，讓使用者不用手動點擊就能再留言
  useEffect(() => {
    if (status !== "success") return;
    const timer = setTimeout(() => setStatus("idle"), 5000);
    return () => clearTimeout(timer);
  }, [status]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email.trim() || !form.message.trim()) return;

    // Honeypot：一般使用者看不到、不會填這個欄位，機器人常會自動填滿所有欄位
    // 有值就當作是機器人，假裝送出成功但實際上不打 API，也不留下任何痕跡讓機器人知道被擋
    if (form.company) {
      setStatus("success");
      setForm(EMPTY_FORM);
      return;
    }

    setStatus("sending");
    try {
      // Google Apps Script Web App 用 text/plain 送出可以避開 CORS preflight（OPTIONS）失敗的問題
      // no-cors 模式下讀不到回應內容，只要 fetch 沒有丟出網路錯誤就視為送出成功
      await fetch(GOOGLE_SHEET_ENDPOINT, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify({ email: form.email, message: form.message }),
      });
      setStatus("success");
      setForm(EMPTY_FORM);
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="rotate-1 rounded-sm bg-orange-100 shadow-lg p-5">
      <h3 className="text-sm font-bold text-neutral-700 mb-3">
        {t("contact.messageHeading")}
      </h3>
      {status === "success" ? (
        <p className="text-sm text-neutral-700 leading-relaxed">
          {t("contact.messageSuccess")}
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-2.5">
          {/* Honeypot 陷阱欄位：畫面上看不到，一般使用者不會填，只有機器人會 */}
          <input
            type="text"
            name="company"
            tabIndex={-1}
            autoComplete="off"
            value={form.company}
            onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
            className="hidden"
            aria-hidden="true"
          />
          <input
            type="email"
            required
            placeholder={t("contact.emailPlaceholder")}
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            className="w-full text-sm bg-white/70 rounded-md px-3 py-2 border border-black/5 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <textarea
            required
            placeholder={t("contact.messagePlaceholder")}
            value={form.message}
            onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
            rows={3}
            maxLength={1000}
            className="w-full text-sm bg-white/70 rounded-md px-3 py-2 border border-black/5 focus:outline-none focus:ring-2 focus:ring-blue-300 resize-none"
          />
          <button
            type="submit"
            disabled={status === "sending"}
            className="w-full text-sm font-semibold px-4 py-2 rounded-lg bg-orange-300 text-orange-950 hover:bg-orange-400 transition-colors disabled:opacity-50"
          >
            {status === "sending" ? t("contact.submitting") : t("contact.submit")}
          </button>
          {status === "error" && (
            <p className="text-xs text-red-500">
              {t("contact.submitError")}
            </p>
          )}
        </form>
      )}
    </div>
  );
}

export default function ContactPage() {
  const { t } = useTranslation();
  return (
    <div className="relative w-full min-h-screen pt-10 md:pt-16 px-6 pb-16">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 md:mb-10">
          <SectionHeading>{t("contact.heading")}</SectionHeading>
        </div>

        <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start">
          <div className="w-full md:flex-1 rounded-2xl bg-white border border-black/5 shadow-sm divide-y divide-black/5 overflow-hidden">
            <div className="p-5">
              <h3 className="text-sm font-bold text-neutral-500 tracking-wide mb-3">
                {t("contact.contactMe")}
              </h3>
              <a
                href="mailto:cching01099@gmail.com"
                className="block text-sm text-neutral-800 hover:text-blue-600"
              >
                cching01099@gmail.com
              </a>
              <a
                href="tel:+886989976965"
                className="block mt-1.5 text-sm text-neutral-800 hover:text-blue-600"
              >
                +886 989 976 965
              </a>
            </div>

            <div className="p-5">
              <h3 className="text-sm font-bold text-neutral-500 tracking-wide mb-3">
                {t("contact.socials")}
              </h3>
              <div className="flex gap-3">
                {SOCIALS.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full bg-neutral-100 text-neutral-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                  >
                    {social.icon && <span className="w-4 h-4">{social.icon}</span>}
                    {social.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="w-full md:flex-1">
            <MessageStickyNote />
          </div>
        </div>
      </div>
    </div>
  );
}
