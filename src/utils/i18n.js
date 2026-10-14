// 從雙語欄位（{ zh, en }）挑出目前語言的內容；純字串欄位（例如技術標籤）直接原樣傳回
export function pick(field, lang) {
  return field?.[lang] ?? field?.zh ?? field;
}

const LANG_PREFIX = "/en";

// 把路徑（不管本來有沒有 /en 前綴）還原成不帶語言前綴的中文版路徑
export function stripLangPrefix(path) {
  if (path === LANG_PREFIX) return "/";
  if (path.startsWith(`${LANG_PREFIX}/`)) return path.slice(LANG_PREFIX.length);
  return path;
}

// 依照指定語言組出正確的路徑；path 可以是帶或不帶 /en 前綴的任意路徑（含 hash 也可以）
export function localizedPath(path, lang) {
  const bare = stripLangPrefix(path);
  if (lang !== "en") return bare;
  return bare === "/" ? LANG_PREFIX : `${LANG_PREFIX}${bare}`;
}
