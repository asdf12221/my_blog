# 个人博客（Next.js + Sanity）

这个项目已经是一个可联网部署的博客：
- 前台：Next.js
- 内容后台：Sanity Studio（可视化发布）
- 可自动部署到 GitHub Pages（`github.io`）

## 1) 本地启动

```bash
npm install
npm run dev
```

打开 [http://localhost:3000](http://localhost:3000)。

## 2) 注册账号（首次）

你只需要各注册一次：
- [Vercel](https://vercel.com/signup)
- [Sanity](https://www.sanity.io/get-started)

## 3) 配置环境变量

复制模板：

```powershell
Copy-Item .env.local.example .env.local
```

然后编辑 `.env.local`：
- `NEXT_PUBLIC_SITE_URL`: 你的线上地址（先填 `https://your-blog.vercel.app`，上线后改成真实地址）
- `NEXT_PUBLIC_SANITY_PROJECT_ID`: Sanity 项目 ID
- `NEXT_PUBLIC_SANITY_DATASET`: 通常用 `production`
- `NEXT_PUBLIC_SANITY_API_VERSION`: 默认 `2025-01-01`

## 4) 创建 Sanity 项目并登录

在项目根目录执行：

```bash
npx sanity@latest login
npx sanity@latest init --create-project "my-vlog-blog" --dataset production
```

初始化时，记录控制台输出的 `projectId`，填入 `.env.local`。

## 5) 使用可视化后台发文（Sanity Studio）

在项目根目录启动 Studio：

```bash
npm run sanity dev
```

终端会输出一个本地 Studio 地址（通常是 `http://localhost:3333`）。  
在 Studio 中新建 `Post` 并发布，前台会自动读取并展示。

## 6) 部署到公网（GitHub Pages）

这个仓库已内置 GitHub Actions 工作流：`.github/workflows/deploy-github-pages.yml`

### 一次性仓库设置

1. 把代码推到 GitHub 仓库（建议分支名 `main`）
2. 进入仓库 `Settings -> Pages`
3. `Source` 选择 `GitHub Actions`

### 触发部署

- 每次 push 到 `main` 会自动部署
- 或者在 `Actions` 页面手动运行 `Deploy to GitHub Pages`

### 访问地址

- 若仓库名是 `username.github.io`：`https://username.github.io`
- 若仓库名是其他（如 `my_vlog`）：`https://username.github.io/my_vlog`

工作流会自动设置 `NEXT_PUBLIC_SITE_URL`，用于生成正确的 SEO、sitemap 和 robots 链接。

## 已包含功能

- 首页、文章列表页、文章详情页
- Sanity 可视化后台（通过 `sanity dev` 独立运行）
- SEO 基础 metadata
- `sitemap.xml` 与 `robots.txt`
