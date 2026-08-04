# 程子凡的个人学术主页

在线访问：英文版 [https://starry-cz.github.io/](https://starry-cz.github.io/) ｜ 中文版 [https://starry-cz.github.io/zh/](https://starry-cz.github.io/zh/)

本项目基于 [AcadHomepage](https://github.com/RayeRen/acad-homepage.github.io) 定制，使用 Jekyll 生成静态网页，并由 GitHub Actions 自动发布到 GitHub Pages。

这份说明面向第一次接触 GitHub、Jekyll 和前端代码的同学。只想更新文字时，不需要理解全部代码，按照下面的“常用修改入口”操作即可。

## 一、先认识几个概念

- **Markdown**：一种简单的文本格式，例如 `**加粗文字**` 会显示为粗体。
- **YAML**：用于保存配置的格式，依靠缩进表示层级；本项目中的 `.yml` 文件都属于这种格式。
- **Jekyll**：把 Markdown、HTML 和配置文件组合成网页的工具。
- **GitHub Actions**：每次代码推送到 `main` 分支后，自动构建并发布网页。

## 二、常用修改入口

| 想修改什么 | 修改哪个文件 | 注意事项 |
| --- | --- | --- |
| 英文主页各板块的文字、项目和获奖信息 | [`_pages/about-en.md`](_pages/about-en.md) | 根地址 `/`，默认展示 |
| 中文主页各板块的文字、项目和获奖信息 | [`_pages/about.md`](_pages/about.md) | 中文地址 `/zh/` |
| 姓名、邮箱、头像路径和站点地址 | [`_config.yml`](_config.yml) | YAML 缩进不能随意改变 |
| 顶部导航的名称、顺序和链接 | [`_data/navigation.yml`](_data/navigation.yml) | 导航链接要与正文板块的 `id` 对应 |
| 头像下方的账号和院校信息 | [`_includes/author-profile.html`](_includes/author-profile.html) | 链接需保留完整的 `https://` |
| 颜色、间距、字号、阴影和移动端样式 | [`assets/css/custom.scss`](assets/css/custom.scss) | 修改后应同时检查电脑与手机宽度 |
| 导航高亮、移动端目录和鼠标交互 | [`assets/js/custom-home.js`](assets/js/custom-home.js) | 只改文字内容时无需修改 |
| 头像、项目图和图标 | [`images/`](images/) | 文件名区分大小写 |
| 自动发布流程 | [`.github/workflows/pages.yml`](.github/workflows/pages.yml) | 一般无需修改 |

> 不要直接修改 `_site/` 中的文件。该目录是构建结果，下次构建时会被重新生成。

## 三、最简单的更新方式：直接在 GitHub 修改

适合只更新一两段文字、不需要本地预览的情况。

1. 修改英文内容时打开 `_pages/about-en.md`；修改中文内容时打开 `_pages/about.md`。
2. 点击右上角的铅笔图标进入编辑界面。
3. 修改文字后，点击 **Commit changes**。
4. 提交到 `main` 分支。
5. 打开仓库的 **Actions** 页面，等待 `Build and deploy GitHub Pages` 显示绿色对勾。
6. 通常等待 1～5 分钟后刷新主页；浏览器有缓存时可按 `Ctrl + F5` 强制刷新。

## 四、在电脑上修改并预览

### 1. 第一次准备环境

需要安装：

- [Git](https://git-scm.com/downloads)
- [RubyInstaller with Devkit](https://rubyinstaller.org/downloads/)（本项目建议使用 Ruby 3.1 或 3.2 的 x64 Devkit 版本）
- [Visual Studio Code](https://code.visualstudio.com/)

打开 PowerShell，确认安装成功：

```powershell
git --version
ruby --version
```

进入项目目录并安装依赖：

```powershell
cd "C:\GitHub个人主页"
gem install bundler -v 2.2.19
bundle _2.2.19_ install
```

这里使用 `Gemfile.lock` 已记录的 Bundler 2.2.19，减少不同版本导致的安装差异。依赖安装只需在首次配置或依赖变化后运行；首次安装需要下载 Ruby 依赖，耗时会稍长。

### 2. 启动本地预览

```powershell
cd "C:\GitHub个人主页"
bundle exec jekyll serve
```

终端出现 `Server address` 后，访问：

```text
http://127.0.0.1:4000/
```

预览期间不要关闭这一个 PowerShell 窗口。修改文件并保存后，Jekyll 通常会自动重新构建；若没有更新，按 `Ctrl + C` 停止服务，再重新运行命令。

### 3. 提交并发布

确认本地效果后运行：

```powershell
git status
git add .
git commit -m "更新主页内容"
git push origin main
```

推送完成后，GitHub Actions 会自动构建和发布，无需手动上传 `_site/`。

## 五、如何修改主页内容

英文内容位于 `_pages/about-en.md`，中文内容位于 `_pages/about.md`。两个文件的板块结构保持一致，大致如下：

```html
<section id="education" data-nav-section markdown="1">

# 🎓 教育背景

这里填写板块内容。

</section>
```

- `id="education"` 是板块的唯一名称，顶部导航使用它定位。
- `data-nav-section` 让脚本能够在滚动时高亮当前导航。
- `markdown="1"` 允许在 `<section>` 内继续使用 Markdown。
- 如果只修改内容，不要删除这三个属性和结尾的 `</section>`。

常用 Markdown 写法：

```markdown
**粗体文字**
[链接文字](https://example.com/)
- 无序列表
1. 有序列表
```

添加新板块时，需要同时完成两步：

1. 分别在 `_pages/about-en.md` 和 `_pages/about.md` 添加新的 `<section id="唯一名称" ...>`。
2. 在 `_data/navigation.yml` 的 `en` 和 `zh` 列表中分别添加对应链接；英文使用 `/#唯一名称`，中文使用 `/zh/#唯一名称`。

## 六、如何修改头像、图片和链接

### 更换头像

1. 把新图片放入 `images/`。
2. 建议使用 WebP 或 JPEG，头像原图尽量清晰。
3. 在 `_config.yml` 中修改：

```yml
author:
  avatar: "images/你的头像.webp"
```

头像的圆形裁切、显示大小和位置由 `assets/css/custom.scss` 控制，不需要先把原图裁成圆形。

### 修改个人账号

在 `_config.yml` 的 `author:` 下修改邮箱、GitHub、Google Scholar 和 ORCID。尚未创建的账号建议暂时留空，或明确标注为占位链接，避免访问者误解。

### 替换项目图片

把图片放入 `images/`，再在对应语言的主页文件中引用：

```markdown
![图片说明](/images/图片文件名.webp)
```

图片说明应描述图片内容，方便图片加载失败或使用读屏软件的访问者理解。

## 七、如何修改样式

自定义样式集中在 `assets/css/custom.scss`，文件已按功能分区。建议先搜索目标关键词，再修改对应区域，例如：

- 搜索 `.masthead`：顶部导航。
- 搜索 `.author__avatar`：头像。
- 搜索 `.research-badge`：研究方向彩色标签。
- 搜索 `.section-heading`：各板块标题背景。
- 搜索 `.paper-box`：学术成果卡片。
- 搜索 `@media`：手机或特定屏幕宽度的样式。

修改颜色时通常会看到：

```scss
color: #123e6d;               // 文字颜色
background: rgba(121, 174, 233, 0.12); // 半透明背景
```

`#123e6d` 是十六进制颜色，`rgba()` 的最后一个数字是不透明度，范围为 `0` 到 `1`。不要一次大范围替换全部颜色；先改一处并同时检查电脑端和移动端效果。

## 八、自动发布是如何工作的

`.github/workflows/pages.yml` 定义了以下流程：

```text
推送到 main → 安装并运行 Jekyll → 生成 _site → 发布到 GitHub Pages
```

如果发布失败：

1. 打开仓库的 **Actions** 页面。
2. 点开失败的 `Build and deploy GitHub Pages` 任务。
3. 查看第一个红色步骤的错误信息。
4. 优先检查 YAML 缩进、未闭合的 HTML 标签、错误的图片路径和 Markdown 语法。

## 九、常见问题

### 修改后网页没有变化

- 先确认代码已经推送到 `main`。
- 确认 GitHub Actions 已完成且没有红色错误。
- 按 `Ctrl + F5` 清除当前页面缓存后刷新。
- 文件名大小写必须与代码中的路径完全一致。

### YAML 报错

YAML 对缩进敏感，请统一使用空格，不要使用 Tab。`author:` 下的字段需要保持相同层级：

```yml
author:
  name: "姓名"
  email: "邮箱"
```

### 导航点击后位置不对

检查 `_data/navigation.yml` 中 `#` 后面的名称，是否与对应语言页面中 section 的 `id` 完全相同。

### 可以在公开仓库中放隐私信息吗

不建议。公开网页和公开仓库中的内容都可能被搜索引擎收录。手机号、身份证号、家庭地址、未脱敏简历和账号密钥都不应提交到仓库。

## 十、项目结构

```text
.
├─ _config.yml                 # 站点和个人信息配置
├─ _data/navigation.yml        # 顶部导航配置
├─ _pages/about-en.md          # 英文主页正文（根地址，默认展示）
├─ _pages/about.md             # 中文主页正文（/zh/）
├─ _includes/                  # 可复用的页面组件
├─ _layouts/                   # 页面整体结构
├─ assets/css/custom.scss      # 自定义视觉样式
├─ assets/js/custom-home.js    # 自定义交互逻辑
├─ images/                     # 头像、项目图和图标
└─ .github/workflows/pages.yml # 自动构建与发布流程
```

## 致谢与许可

本项目基于 AcadHomepage 定制，原项目及本仓库均按照仓库中的 `LICENSE` 文件授权。复用代码时请保留相应的版权与许可说明。
