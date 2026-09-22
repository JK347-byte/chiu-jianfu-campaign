/*
  網址路徑小工具。

  這個網站部署在 GitHub Pages 時，網址會是
  https://<帳號>.github.io/<repo名稱>/ 這種「子路徑」形式，不是網域根目錄。
  以後如果換成獨立網域（例如 https://chiu-jianfu.tw/），子路徑就會變成空字串，
  下面這個 withBase() 函式會自動處理這個差異——全站的連結、圖片路徑
  都要透過這個函式組出來，不要在元件裡直接手寫 "/news" 這種絕對路徑，
  否則換網域或還在 GitHub Pages 子路徑時，連結會失效。

  子路徑的值本身設定在 astro.config.mjs 的 `base` 選項。
*/
export function withBase(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${base}${cleanPath}`;
}
