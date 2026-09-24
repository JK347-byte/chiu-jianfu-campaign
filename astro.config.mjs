// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

/*
  這個網站同時部署在兩個地方，兩邊的網址結構不一樣：
  - GitHub Pages：網址是 jk347-byte.github.io/chiu-jianfu-campaign/（子路徑）
  - Cloudflare Pages：網址是網域根目錄（正式網域 chiuchienfu.tw，備援網址 chiu-jianfu.pages.dev）

  DEPLOY_TARGET 這個環境變數決定要用哪一種路徑設定建置，
  只有 .github/workflows/deploy.yml 在 CI 裡會設定它，本機開發
  （npm run dev）不用管這個，預設走 GitHub Pages 的子路徑設定。
*/
const isCloudflare = process.env.DEPLOY_TARGET === 'cloudflare';

// https://astro.build/config
export default defineConfig({
  site: isCloudflare ? 'https://chiuchienfu.tw' : 'https://jk347-byte.github.io',
  base: isCloudflare ? '/' : '/chiu-jianfu-campaign',
  vite: {
    plugins: [tailwindcss()]
  }
});
