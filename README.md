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
| `src/content/media/` | 影音專區（YouTube影片／Podcast），有獨立頁面 `/media`，未來團隊上傳影片/Podcast都新增在這裡 | 同上 |
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

## 部署方式

網站同時部署在**兩個地方**，每次 push 到 `main` 分支，`.github/workflows/deploy.yml` 會自動重新建置並更新**兩邊**，**不需要手動部署**，改完內容、commit、push 就好：

| 平台 | 網址 | 帳號歸屬 |
| --- | --- | --- |
| GitHub Pages | https://jk347-byte.github.io/chiu-jianfu-campaign/ | 掛在 `jk347-byte`（日和聯合診所帳號），方便開發階段快速預覽 |
| Cloudflare Pages | https://chiu-jianfu.pages.dev | 掛在**競選團隊自己的 Cloudflare 帳號**（透過 GitHub Secrets 裡的 `CLOUDFLARE_API_TOKEN`／`CLOUDFLARE_ACCOUNT_ID` 授權部署，團隊完全不需要接觸這個 GitHub repo） |

**技術細節（給以後接手的工程/AI參考）**：兩邊網址結構不同（GitHub Pages 是子路徑 `/chiu-jianfu-campaign/`，Cloudflare Pages 是網域根目錄），所以 CI 會用不同的 `DEPLOY_TARGET` 環境變數各自建置一次（`astro.config.mjs` 裡有判斷邏輯），分別輸出到 `dist-github/` 跟 `dist-cloudflare/`，兩邊都不會提交進 git（已加進 `.gitignore`）。

- 兩個網址目前都是**內部審閱用草稿**，還沒正式對外公布：`src/layouts/BaseLayout.astro` 加了 `noindex` 標籤、`public/robots.txt` 擋爬蟲，Google 不會收錄，但只要有網址連結，任何人都打得開
- 正式要公開上線、給 Google 收錄時，記得把這兩個地方的擋爬蟲設定拿掉
- 如果之後**只想留 Cloudflare、關掉 GitHub Pages**：把 `deploy.yml` 裡建置/部署 GitHub Pages 那幾個步驟刪掉即可，Cloudflare 那半邊不受影響
- 如果團隊要接手**程式碼本身**（不只是網站），用 GitHub 的「Transfer ownership」（repo 設定內）整包過戶即可，不用重建，這步不急，等真的有人要接手編輯內容再做
- 團隊如果之後要接自己的正式網域（例如確認要用的網域），到 Cloudflare Pages 專案設定裡的「Custom domains」直接加，不用改程式碼

## 尚待補齊事項（上線前請確認）

- [x] 候選人形象照（`public/images/`，見 `Hero.astro` 註解）
- [x] `src/content/timeline/` 完整經歷已依維基百科補齊：2002–2010縣議員、2010–2018彰化市長（首位民進黨籍）、2017–2022民進黨彰化縣黨部主委、2026年6月退出民進黨參選。**這段包含退黨參選的政治敏感歷程，詳見下方「⚠️需要團隊決定的事」**
- [x] `src/content/achievements/` 彰化市長八年施政成果里程碑（`/achievements` 頁面），共10筆，皆附可查證來源；如有更多政績報導，可依同樣格式繼續新增
- [x] `src/content/news/` 已換成2則真實新聞（退黨參選公告、完成候選人登記），皆附來源連結
- [x] 媒體報導改放進 `src/content/news/`（category「媒體報導」），`src/content/media/` 現在專門放影音（YouTube影片／Podcast），已獨立成 `/media` 頁面；**目前還是示範假資料，等團隊有真的影片/Podcast再新增**
- [x] `src/data/site.ts` 聯絡電話、Facebook連結、辦公室地址已從候選人官方FB粉專取得填入；**Email 仍待補**
- [ ] 捐款與志工報名表單目前**只有外觀，沒有串接任何後端**，按鈕不會真的送出資料，上線前務必決定要串接金流／表單服務，否則會誤導填表的民眾
- [ ] 地圖資料來源授權待確認：`src/data/changhua-map.json` 的鄉鎮市邊界，是由 [g0v/twgeojson](https://github.com/g0v/twgeojson)（`twTown1982.topo.json`）公開圖資處理而來，該資料源自政府公開圖資，但 g0v 原始 repo 沒有標示明確授權條款，正式上線前建議請團隊法務確認使用與標示方式是否需要調整

## ⚠️ 需要團隊決定的事：經歷頁面的退黨敘事

查維基百科補齊經歷時發現：邱建富不是單純「一路無黨籍」，而是**2002–2022年長期為民主進步黨籍**（縣議員、彰化市長、2017–2022年還擔任民進黨彰化縣黨部主任委員），**2026年6月才退黨、以無黨籍身分參選**。

進一步查新聞（聯合新聞網、信傳媒、華視等多家報導）證實：他先前**四度爭取民進黨彰化縣長提名未果**，退黨參選被部分報導描述為黨內路線衝突下的結果；他自己在受訪時也預告「將遭綠營抹黑抹黃抹紅」。他的官方 Facebook 貼文下方目前也看得到「背骨仔」之類的负面留言。

網站目前的處理方式：
- `/timeline`（經歷）：照維基百科事實原文中性列出全部四筆經歷，**沒有省略黨籍與黨職歷史**
- `/achievements`：只放彰化市長任內的施政數字，不涉及黨籍
- `/news`、`/media`：只選了「宣布退黨參選」「完成登記」這種中性事實類報導，**沒有收錄內鬨/勸退/預告抹黑等衝突性標題的報導**

**這是我能做的判斷底線**——不能因為政治敏感就隱瞞公開可查的經歷（那風險更大，對手或記者一查維基百科就會發現網站遺漏），但這段歷史要怎麼「講故事」（例如要不要加一句候選人自己對退黨原因的說法、要不要在關於頁面主動說明），是競選論述策略層級的決定，需要團隊（或候選人本人）定調後，我再依指示調整措辭。

## 技術棧

- [Astro](https://astro.build)（靜態網站產生器，內容用 Content Collections 管理）
- [Tailwind CSS v4](https://tailwindcss.com)（樣式，CSS-first 設定）
- 無資料庫、無後端，純靜態網站，可部署到 Vercel / Netlify / Cloudflare Pages / GitHub Pages 等任何靜態託管服務
