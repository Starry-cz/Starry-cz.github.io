import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, resolve, sep } from "node:path";

const root = resolve("_site");
const port = 4173;
const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

/* 仅供 Playwright 读取 Jekyll 的 _site 构建产物，不参与正式网站运行。 */
createServer(async (request, response) => {
  const pathname = decodeURIComponent(new URL(request.url, `http://${request.headers.host}`).pathname);
  let filePath = resolve(root, `.${pathname}`);

  if (filePath !== root && !filePath.startsWith(`${root}${sep}`)) {
    response.writeHead(403).end("Forbidden");
    return;
  }

  try {
    if ((await stat(filePath)).isDirectory()) filePath = resolve(filePath, "index.html");
    const body = await readFile(filePath);
    response.writeHead(200, {
      "Content-Type": contentTypes[extname(filePath).toLowerCase()] || "application/octet-stream",
      "Cache-Control": "no-store",
    });
    response.end(body);
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
    response.writeHead(404).end("Not Found");
  }
}).listen(port, "127.0.0.1", () => {
  console.log(`Playwright site server: http://127.0.0.1:${port}`);
});
