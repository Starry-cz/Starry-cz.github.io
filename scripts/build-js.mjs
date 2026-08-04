import { readFile, writeFile } from "node:fs/promises";
import { minify } from "terser";

/*
 * 按固定顺序生成主题脚本：先加载 jQuery，再加载依赖它的主题插件。
 * 修改 assets/js/_main.js 或 plugins 后，运行 npm run build:js 更新 main.min.js。
 */
const sourceFiles = [
  "node_modules/jquery/dist/jquery.js",
  "assets/js/plugins/jquery.fitvids.js",
  "assets/js/plugins/jquery.greedy-navigation.js",
  "assets/js/plugins/jquery.magnific-popup.js",
  "assets/js/plugins/stickyfill.min.js",
  "assets/js/_main.js",
];

const sources = await Promise.all(
  sourceFiles.map(async (file) => `/* Source: ${file} */\n${await readFile(file, "utf8")}`)
);

const result = await minify(sources.join("\n"), {
  compress: true,
  mangle: true,
  format: {
    comments: /^!|@license|@preserve/i,
  },
});

if (!result.code) {
  throw new Error("主题脚本构建失败：Terser 没有生成输出。\n");
}

await writeFile("assets/js/main.min.js", `${result.code}\n`, "utf8");
