# Macfox Bike Shopify Theme

这是 Macfox Bike 商店当前线上主题的本地开发仓库。

- Shopify 商店：`macfoxebike.myshopify.com`
- 下载基线：`Macfox (返校季阶段二) 的购物车优化Klama二次调整`
- 线上主题 ID：`192175309165`
- 独立开发主题：`macfox-bike-local`（ID：`192302088557`）
- 开发主题预览：<https://macfoxebike.myshopify.com?preview_theme_id=192302088557>
- 下载日期：`2026-08-10`

## 已配置环境

- Node.js 22（最低支持 Node.js 20.10，项目包含 `.nvmrc`）
- Shopify CLI 4.6.0
- Git

## 开始开发

```bash
cd /Users/tianchuang/Documents/Codex/2026-08-10/wo/outputs/macfox-bike
npm run dev
```

`npm run dev` 会创建或复用 Shopify development theme，并输出本地预览地址。修改 Liquid、JSON、CSS 或 JavaScript 文件后会自动同步到开发主题，不会发布到线上。

## 常用命令

```bash
# 检查 Liquid 与主题规范
npm run check

# 查看远程主题列表
npm run list

# 重新拉取当前线上主题（会覆盖同名本地文件，执行前先提交）
npm run pull:live

# 手动同步到已配置的独立开发主题
npm run push:dev

# 上传为新的未发布主题（不会替换线上主题）
npm run push:new
```

## 推荐工作流

1. 开始前运行 `git pull`，再运行 `npm run pull:live` 获取最新线上变更。
2. 新建功能分支并运行 `npm run dev` 开发、预览。
3. 运行 `npm run check`，提交并推送分支。
4. 合并代码后，用 `npm run push:new` 上传为未发布主题，在 Shopify 后台验收后再人工发布。

> 请勿把 `.env`、访问令牌或密码提交到 Git。仓库中的 `.gitignore` 已忽略这些文件。
