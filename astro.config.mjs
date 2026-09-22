// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
// 目前部署在 GitHub Pages 的專案子路徑，未來換成正式網域時，
// 把 site 改成正式網域、base 改回 '/' 即可，其餘程式碼不用動
// （因為連結都是透過 src/utils/url.ts 的 withBase() 組出來的）。
export default defineConfig({
  site: 'https://jk347-byte.github.io',
  base: '/chiu-jianfu-campaign',
  vite: {
    plugins: [tailwindcss()]
  }
});
