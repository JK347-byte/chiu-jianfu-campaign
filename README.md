# 邱建富競選官網

2026 彰化縣長候選人邱建富的官方競選網站。用 [Astro](https://astro.build) 建置，內容與程式碼完全分離，維護團隊不需要懂程式碼，用 AI 助理（Claude Code、Codex 等）或直接編輯文字檔案即可更新網站內容。

## 給維護團隊：怎麼更新內容

**完全不需要碰 `src/components/`、`src/layouts/`、`src/pages/` 底下的檔案**，只要改以下兩個地方：

### 1. 會重複很多筆的內容 → `src/content/`

| 資料夾 | 內容 | 新增方式 |
| --- | --- | --- |
| `src/content/news/` | 最新消息、競選行程、媒體報導 | 複製一個現有 `.md` 檔案，改內容存新檔名 |
| `src/content/policies/` | 核心政見卡片 | 同上 |
| `src/content/timeline/` | 候選人經歷 | 同上 |
| `src/content/media/` | 影音專區連結 | 同上 |
| `src/content/regions/` | 彰化八大生活圈分區資料 | 同上（不常變動） |

每個檔案最上面「`---` 包起來」的部分叫 frontmatter，是固定欄位（標題、日期、分類等），下面才是正文，可以用 Markdown 語法（`##` 是小標題、`-` 是條列）。

**如果請 AI 幫忙新增內容**，可以直接說：「照 `src/content/news/` 裡現有的格式，幫我新增一篇最新消息，標題是……內容是……」，AI 看得懂這個結構，不會破壞版面。

欄位填錯格式（例如日期沒填對）的話，執行 `npm run build` 或 `npm run dev` 時終端機會直接顯示是哪個檔案哪個欄位有問題，不會讓錯誤內容悄悄上線。

### 2. 只有一份的全站文字 → `src/data/site.ts`

候選人姓名、首頁標語、關於候選人段落、捐款／志工表單文字、聯絡資訊、社群連結，都在這一個檔案裡，用引號 `" "` 包住的文字修改即可。

### 3. 照片 → `public/images/`

把照片檔案放進這個資料夾，檔名對應到 `site.ts` 或各內容檔案裡寫的路徑。首頁候選人形象照目前是**示範用色塊**（還沒放真實照片），檔案位置與換圖步驟已寫在 `src/components/Hero.astro` 的註解裡。

## 色彩主題

全站顏色定義在 `src/styles/global.css` 最上面的 `@theme` 區塊，是 Tailwind CSS v4 的寫法。要換整站主色，只需要改這裡的色碼，不用逐一修改各個元件。目前採用候選人真實競選色（黃色），可依需求微調深淺。

## 開發指令

| 指令 | 用途 |
| --- | --- |
| `npm install` | 安裝套件（第一次使用或 clone 下來後執行） |
| `npm run dev` | 啟動本機開發伺服器（`localhost:4321`），改檔案會即時預覽 |
| `npm run build` | 產生正式上線用的靜態檔案到 `dist/` |
| `npm run preview` | 本機預覽 build 出來的正式版網站 |

## 尚待補齊事項（上線前請確認）

- [x] 候選人形象照（`public/images/`，見 `Hero.astro` 註解）
- [x] `src/content/timeline/` 主要經歷「2010–2018 彰化市長」已確認；第二筆仍是待補的示範項目，如有其他經歷請補上
- [x] `src/content/achievements/` 彰化市長八年施政成果里程碑（`/achievements` 頁面），共10筆，皆附可查證來源；如有更多政績報導，可依同樣格式繼續新增
- [ ] `src/content/news/` 目前是 2 篇【範例】示範檔案，請替換或刪除
- [ ] `src/content/media/` 目前是 2 篇【範例】示範檔案，請替換或刪除
- [ ] `src/data/site.ts` 裡所有標記「【待補】」的欄位（聯絡資訊、社群連結、捐款/志工表單的實際串接方式）
- [ ] 捐款與志工報名表單目前**只有外觀，沒有串接任何後端**，按鈕不會真的送出資料，上線前務必決定要串接金流／表單服務，否則會誤導填表的民眾
- [ ] 地圖資料來源授權待確認：`src/data/changhua-map.json` 的鄉鎮市邊界，是由 [g0v/twgeojson](https://github.com/g0v/twgeojson)（`twTown1982.topo.json`）公開圖資處理而來，該資料源自政府公開圖資，但 g0v 原始 repo 沒有標示明確授權條款，正式上線前建議請團隊法務確認使用與標示方式是否需要調整

## 技術棧

- [Astro](https://astro.build)（靜態網站產生器，內容用 Content Collections 管理）
- [Tailwind CSS v4](https://tailwindcss.com)（樣式，CSS-first 設定）
- 無資料庫、無後端，純靜態網站，可部署到 Vercel / Netlify / Cloudflare Pages / GitHub Pages 等任何靜態託管服務
