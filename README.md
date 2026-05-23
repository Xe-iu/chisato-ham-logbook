# BG7ORX Website

感谢茶栗chariri开源，我在原项目上做了点修改以适配我的需求。

------

以下是原README的内容。

# Chisato HAM Logbook

因为先前的 Chihiro HAM Logbook 有点过于简陋，因此写了一个新的。

用 GPT-5.4 + codex vibecoding 出来的，但还是有大量人工修改，至少让代码看上去不那么丑。

## 构建

本项目使用 Astro + TailwindCSS。`pnpm i` 后直接 `pnpm dev` 和 `pnpm build` 应该就能出产物。

## 通联日志数据

通联日志放在 `public/logdata.json`，同时每次需要运行 `pnpm run logbook:index` 更新 `public` 里面的 `logdata.callsign-3gram-index.json` 索引用于快速搜索呼号。放好了之后再重新 `pnpm build` 即可。
