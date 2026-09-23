import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

/*
  ============================================================
  內容集合設定（給 AI／非工程人員維護的說明）
  ============================================================
  這個檔案定義了「每一種內容檔案裡面必須要有哪些欄位」的規則（schema）。
  實際內容都是 Markdown 檔案，放在 src/content/ 底下對應的資料夾。

  維護方式：
  - 要新增一則新聞／行程 → 在 src/content/news/ 新增一個 .md 檔案，複製既有檔案的格式修改即可
  - 要新增一則政見 → 在 src/content/policies/ 新增一個 .md 檔案
  - 要新增一則彰化市長任內施政成果 → 在 src/content/achievements/ 新增一個 .md 檔案，
    每一筆都務必填 sourceUrl（可查證的新聞/官方來源連結），這個頁面的說服力建立在
    「每個數字都查得到出處」，請不要新增查不到來源的內容
  - 要新增一筆經歷 → 在 src/content/timeline/ 新增一個 .md 檔案
  - 要新增一則影音（YouTube影片／Podcast）→ 在 src/content/media/ 新增一個 .md 檔案。
    外部媒體報導請改放 src/content/news/，category 選「媒體報導」
  - 分區資料（regions）較少變動，如需調整轄下鄉鎮市，直接改對應檔案內容即可

  如果新增的檔案漏填必填欄位，或欄位型別填錯（例如日期格式錯誤），
  網站在建置（build）階段會直接報錯並告訴你是哪個檔案的哪個欄位有問題，
  不會讓錯誤的內容悄悄上線、也不會弄壞版面排版。
  ============================================================
*/

const news = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/news" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.coerce.date(),
      category: z.enum(["最新消息", "競選行程", "媒體報導"]),
      summary: z.string(),
      cover: image().optional(),
      externalUrl: z.string().url().optional(), // 媒體報導若是外部連結，填這欄，內頁會直接導去原始報導
      region: z.string().optional(), // 對應 regions collection 的 id，非必填
    }),
});

const policies = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/policies" }),
  schema: z.object({
    title: z.string(),
    order: z.number(), // 決定卡片排列順序，數字小的排前面
    icon: z.string().default("📋"), // 卡片上顯示的 emoji 圖示，直接換成別的 emoji 即可
    summary: z.string(), // 卡片上顯示的一段摘要
    highlights: z.array(z.string()).optional(), // 條列重點，會顯示成清單
  }),
});

const timeline = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/timeline" }),
  schema: z.object({
    year: z.string(), // 用字串而非數字，方便填「2018–2022」這種區間
    title: z.string(),
    order: z.number(), // 數字小的排最前面（通常代表較早的經歷）
    verified: z.boolean().default(false), // 是否已由競選團隊核實內容正確，未核實的會在畫面上標示待確認
  }),
});

const media = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/media" }),
  schema: z.object({
    title: z.string(),
    type: z.enum(["YouTube影片", "Podcast", "其他影音"]),
    source: z.string(), // 頻道/節目名稱，例如「邱建富YouTube頻道」「彰化好聲音Podcast」
    url: z.string().url(),
    date: z.coerce.date(),
  }),
});

const achievements = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/achievements" }),
  schema: z.object({
    year: z.string(), // 事件發生的年份，例如「2018」，用字串方便填「2010–2018」這種區間
    category: z.string(), // 分類標籤，例如「重大建設」「財政成果」「民調肯定」「市政治理」
    title: z.string(),
    summary: z.string(),
    metric: z.string().optional(), // 亮點數字，首頁摘要卡片會優先顯示這個，例如「387億元」
    order: z.number(), // 決定在里程碑頁面的排列順序（建議按時間先後）
    sourceLabel: z.string(), // 證據來源的顯示文字，例如「Yahoo新聞—就職成果發表會報導」
    sourceUrl: z.string().url(), // 證據來源連結，每一筆成果都應該附上可查證的來源
  }),
});

const regions = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/regions" }),
  schema: z.object({
    name: z.string(), // 例如「彰化分區」
    area: z.enum(["北彰化", "南彰化"]),
    townships: z.array(z.string()), // 轄下鄉鎮市列表
    order: z.number(),
  }),
});

export const collections = { news, policies, timeline, media, regions, achievements };
