# Portfolio Canvas

Figma 畫布風格的個人作品集首頁組件（React + Tailwind CSS v4 + Vite）。

## 功能

- 桌面版：便利貼卡片可自由拖拉，搭配幽靈游標動畫、手繪塗鴉標註
- 手機版：自動切換成橫向滑動卡片（scroll-snap），避免拖拉手勢跟頁面捲動衝突
- 底部懸浮 Dock 導覽列
- 響應式切換完全由 Tailwind `md:` breakpoint 控制，同一份程式碼

## 開始使用

```bash
npm install
npm run dev       # 本地開發，預設 http://localhost:5173
npm run build     # 建置正式版，輸出到 dist/
npm run preview   # 預覽建置後的結果
```

## 專案結構

```
src/
  App.jsx               # 路由設定（react-router-dom），對應 5 個頁面
  layouts/
    PageLayout.jsx      # 共用背景格線 + 固定 Dock，內含 <Outlet />
  pages/
    IndexPage.jsx       # 首頁（Hero、手繪塗鴉、幽靈游標、便利貼牆）
    AboutPage.jsx       # 關於我（概要、技能、學歷、工作經歷）
    ProjectsPage.jsx    # 作品整理版（含圖片、標籤、Demo/Repo 連結）
    FunPage.jsx         # 好玩的東西（骨架）
    ContactPage.jsx     # 聯絡方式（Email、電話、社群、履歷連結）
  components/
    Dock.jsx            # 底部懸浮導覽列（含 hover 流動凸起效果，GitHub/LinkedIn 為真實連結）
    GhostCursor.jsx      # 幽靈游標元件
    StickyNotes.jsx      # 首頁便利貼牆（桌面拖拉／手機滑動，只顯示 featured 專案）
    icons.jsx            # Dock／頁面共用的 icon 元件
  data/
    projects.js          # PROJECTS 陣列 + 便利貼初始位置，首頁與作品頁共用
    about.js             # About 頁的概要／技能／學歷／工作經歷資料
  assets/
    avatar.png          # 頭像圖片
    projects/            # 作品截圖（webp）
    logos/                # 工作經歷公司 logo
  index.css             # Tailwind 匯入
  main.jsx              # React root
vite.config.js          # Vite + Tailwind v4 plugin 設定
```

## 路由對應

Dock 上的五個主要圖示對應五個路由：`~/` → `/`、👤 → `/about`、`<>` → `/projects`、✏️ → `/fun`、✉️ → `/contact`。GitHub / LinkedIn 已連到真實社群連結，主題切換目前僅為視覺佔位。

## 客製化重點

- `PROJECTS` 陣列（`data/projects.js`）：修改專案卡片內容、顏色、標籤、圖片、Demo/Repo 連結；`featured: true` 的項目才會出現在首頁便利貼牆
- `STICKY_POSITIONS`：首頁便利貼牆初始散落位置
- `SUMMARY` / `SKILLS` / `EDUCATION` / `WORK_HISTORY`（`data/about.js`）：About 頁的內容
- 頭像圖片：替換 `src/assets/avatar.png`
- Hero 標語文字：直接在 `pages/IndexPage.jsx` 的 JSX 裡修改
- Fun 頁目前是空白骨架，之後可直接補上內容

## 部署

這是標準 Vite 專案，可以直接部署到 Vercel / Netlify：
1. push 到 GitHub repo
2. 連接 Vercel/Netlify，框架選擇 "Vite"，build command 為 `npm run build`，output directory 為 `dist`
