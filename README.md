# 双语个人学术主页：零基础复现与修改指南

这是czf的中英文个人主页源码：

- 英文 Demo：[https://starry-cz.github.io/demo/](https://starry-cz.github.io/demo/)
- 中文 Demo：[https://starry-cz.github.io/demo/zh/](https://starry-cz.github.io/demo/zh/)

> Demo 使用虚构占位信息，用于展示框架、排版和修改方法；与正式个人主页内容独立。

![主页示例](docs/screenshot.png)

本项目基于 [AcadHomepage](https://github.com/RayeRen/acad-homepage.github.io) 定制，使用 Jekyll 生成静态网页，通过 GitHub Actions 自动测试并发布到 GitHub Pages。

这份 README 面向第一次接触 GitHub、Markdown、Jekyll 和前端代码的同学。你不需要先学会编程：如果只想替换个人资料，主要修改 `_config.yml`、`_pages/about-en.md`、`_pages/about.md` 和 `images/` 即可。

> [!IMPORTANT]
> 本项目同时维护中英文页面。修改个人经历、研究项目、获奖或联系方式时，请同步更新 `_pages/about-en.md` 和 `_pages/about.md`，避免两个版本内容不一致。

## 目录

- [一、先选一种使用方式](#一先选一种使用方式)
- [二、五分钟认识项目结构](#二五分钟认识项目结构)
- [三、第一次复制成自己的主页](#三第一次复制成自己的主页)
- [四、在电脑上预览](#四在电脑上预览)
- [五、必须先会的 Markdown 与 HTML](#五必须先会的-markdown-与-html)
- [六、修改网站名称、姓名、邮箱和账号](#六修改网站名称姓名邮箱和账号)
- [七、逐板块修改主页内容](#七逐板块修改主页内容)
- [八、修改导航或新增板块](#八修改导航或新增板块)
- [九、修改头像、学校、图标和图片](#九修改头像学校图标和图片)
- [十、修改学术成果卡片和论文链接](#十修改学术成果卡片和论文链接)
- [十一、修改颜色、字号和版式](#十一修改颜色字号和版式)
- [十二、修改 SEO 与分享预览](#十二修改-seo-与分享预览)
- [十三、测试、提交和发布](#十三测试提交和发布)
- [十四、常见问题](#十四常见问题)
- [十五、发布前检查清单](#十五发布前检查清单)

## 一、先选一种使用方式

### 方式 A：直接在 GitHub 网页修改

适合：只修改一两段文字、不需要先看本地效果。

1. 打开仓库中的文件，例如 `_pages/about.md`。
2. 点击文件右上角的铅笔图标。
3. 修改后点击 **Commit changes**。
4. 提交到 `main` 分支。
5. 打开仓库的 **Actions** 页面，等待任务显示绿色对勾。

案例：只增加一条中文新闻，可以在 `_pages/about.md` 的新闻列表中加入：

```markdown
- *2026.09：* 🎉 我加入了新的研究团队。
```

然后在 `_pages/about-en.md` 同一位置加入英文：

```markdown
- *2026.09:* 🎉 I joined a new research team.
```

### 方式 B：下载 ZIP 后修改

适合：离线备份或暂时不使用 Git。

1. 在仓库首页点击 **Code → Download ZIP**。
2. 解压后使用 Visual Studio Code 打开文件夹。
3. 修改文件并保存。

ZIP 不包含 Git 版本历史。后续如果需要持续更新和一键发布，建议改用方式 C。

### 方式 C：使用 Git 克隆（推荐）

适合：长期维护、需要保留历史并持续发布。

```powershell
git clone https://github.com/Starry-cz/Starry-cz.github.io.git
cd Starry-cz.github.io
code .
```

三行命令分别表示：下载仓库、进入项目文件夹、使用 VS Code 打开项目。

## 二、五分钟认识项目结构

最常用的文件如下：

| 想修改的内容 | 文件 | 示例 |
| --- | --- | --- |
| 英文主页正文 | `_pages/about-en.md` | About、Education、News、Projects |
| 中文主页正文 | `_pages/about.md` | 关于我、教育背景、新闻动态、研究课题 |
| 网站名称、姓名、邮箱、头像和账号 | `_config.yml` | `name: "你的姓名"` |
| 导航名称、顺序和锚点 | `_data/navigation.yml` | `title: "Publications"` |
| 头像下方学校信息 | `_includes/author-profile.html` | 本科院校与学校官网 |
| 颜色、间距、字号、头像和卡片样式 | `assets/css/custom.scss` | `.research-badge` |
| 导航高亮和移动端目录 | `assets/js/custom-home.js` | 一般不要修改 |
| 头像、项目图和图标 | `images/` | `avatar.webp` |
| 自动测试和发布 | `.github/workflows/pages.yml` | 一般不要修改 |

完整目录：

```text
.
├─ _config.yml                    # 网站和个人信息配置
├─ _data/navigation.yml           # 中英文顶部导航
├─ _pages/about-en.md             # 英文主页，默认地址 /
├─ _pages/about.md                # 中文主页，地址 /zh/
├─ _includes/author-profile.html  # 左侧个人资料区域
├─ _layouts/default.html          # 页面整体 HTML 结构
├─ assets/css/custom.scss         # 自定义视觉样式
├─ assets/js/custom-home.js       # 导航和页面交互
├─ images/                        # 头像、图标和项目图片
├─ tests/                         # Playwright 自动测试
└─ .github/workflows/pages.yml    # GitHub Pages 发布流程
```

> [!WARNING]
> 不要修改 `_site/`。它是 Jekyll 自动生成的网页结果，下次构建时会被覆盖。

## 三、第一次复制成自己的主页

### 3.1 准备账号和软件

至少需要：

- 一个 [GitHub](https://github.com/) 账号；
- [Git](https://git-scm.com/downloads)；
- [Visual Studio Code](https://code.visualstudio.com/)；
- 本地预览需要 [RubyInstaller with Devkit](https://rubyinstaller.org/downloads/)；
- 运行前端测试或修改主题脚本需要 [Node.js](https://nodejs.org/)。

安装后在 PowerShell 中检查：

```powershell
git --version
ruby --version
node --version
```

只在 GitHub 网页修改文字时，可以暂时不安装 Ruby 和 Node.js。

### 3.2 创建自己的 GitHub Pages 仓库

假设你的 GitHub 用户名是 `YOUR_USERNAME`：

1. 打开 GitHub，点击右上角 **+ → New repository**。
2. 仓库名填写 `YOUR_USERNAME.github.io`。
3. 推荐选择 **Public**。
4. 不要勾选自动创建 README、`.gitignore` 或 License，保持空仓库。
5. 点击 **Create repository**。

案例：用户名是 `alice-ai`，仓库名应为：

```text
alice-ai.github.io
```

最终主页地址将是：

```text
https://alice-ai.github.io/
```

### 3.3 克隆本项目并连接到你的仓库

```powershell
git clone https://github.com/Starry-cz/Starry-cz.github.io.git YOUR_USERNAME.github.io
cd YOUR_USERNAME.github.io
git remote set-url origin https://github.com/YOUR_USERNAME/YOUR_USERNAME.github.io.git
git push -u origin main
```

案例：用户名是 `alice-ai`：

```powershell
git clone https://github.com/Starry-cz/Starry-cz.github.io.git alice-ai.github.io
cd alice-ai.github.io
git remote set-url origin https://github.com/alice-ai/alice-ai.github.io.git
git push -u origin main
```

如果 GitHub 提示登录，请使用浏览器授权、Git Credential Manager 或 Personal Access Token。不要把 GitHub 密码、Token 或密钥写入代码文件。

### 3.4 修改仓库地址配置

打开 `_config.yml`，把以下三项改成你自己的信息：

```yml
url: "https://YOUR_USERNAME.github.io"
baseurl: ""
repository: "YOUR_USERNAME/YOUR_USERNAME.github.io"
```

案例：

```yml
url: "https://alice-ai.github.io"
baseurl: ""
repository: "alice-ai/alice-ai.github.io"
```

`url` 末尾不要加 `/`；用户主页仓库的 `baseurl` 保持为空。

### 3.5 启用 GitHub Pages

1. 打开新仓库的 **Settings → Pages**。
2. 在 **Build and deployment** 中把 Source 设为 **GitHub Actions**。
3. 推送代码后打开 **Actions**。
4. 等待 `Build and deploy GitHub Pages` 变成绿色。
5. 访问 `https://YOUR_USERNAME.github.io/`。

## 四、在电脑上预览

### 4.1 Windows 安装 Jekyll 依赖

推荐 Ruby 3.1 或 3.2 的 x64 Devkit 版本。进入项目文件夹后运行：

```powershell
gem install bundler -v 2.2.19
bundle _2.2.19_ install
```

依赖只需在第一次配置或 `Gemfile` 变化后安装。

### 4.2 macOS 或 Linux 安装依赖

确保已经安装 Ruby、Bundler 和编译工具，然后运行：

```bash
gem install bundler -v 2.2.19
bundle _2.2.19_ install
```

不要直接使用系统中非常旧的 Ruby。出现权限错误时，优先使用 rbenv、RubyInstaller 或其他版本管理工具，不建议使用 `sudo gem install` 强行覆盖系统环境。

### 4.3 启动预览

```powershell
bundle exec jekyll serve
```

看到 `Server address` 后访问：

```text
http://127.0.0.1:4000/
```

中文版地址：

```text
http://127.0.0.1:4000/zh/
```

案例：修改 `_pages/about.md` 并保存后，刷新 `/zh/` 即可查看中文效果。若没有自动更新，按 `Ctrl + C` 停止服务，再重新运行 `bundle exec jekyll serve`。

## 五、必须先会的 Markdown 与 HTML

### 5.1 常用 Markdown

```markdown
**粗体文字**
*斜体文字*
[链接名称](https://example.com/)
- 无序列表第一项
- 无序列表第二项
1. 有序列表第一项
```

显示效果：

- `**第一作者**` 会显示为 **第一作者**；
- `[GitHub](https://github.com/)` 会显示为可点击链接；
- 每行以 `- ` 开头会生成项目符号。

### 5.2 每个主页板块的固定结构

```html
<section id="education" data-nav-section markdown="1">

<h2 id="education-heading" class="section-heading">🎓 教育背景</h2>

这里填写内容。

</section>
```

这几个部分不要随意删除：

- `id="education"`：导航跳转使用的板块 ID；
- `data-nav-section`：滚动时高亮当前导航；
- `markdown="1"`：允许在板块中使用 Markdown；
- `class="section-heading"`：保留标题原有样式；
- `</section>`：结束当前板块。

案例：只想把“教育背景”改成“学习经历”，应修改标题中的可见文字：

```html
<h2 id="education-heading" class="section-heading">🎓 学习经历</h2>
```

不要同时把 `id="education"` 改掉，否则原导航链接会失效。

## 六、修改网站名称、姓名、邮箱和账号

### 6.1 网站标题和简介

修改 `_config.yml`：

```yml
title: "Your Name's Homepage"
description: "Multimodal Learning · AI Agents · Educational Technology"
```

案例：

```yml
title: "Alice Zhang's Homepage"
description: "Computer Vision · Multimodal Learning · Trustworthy AI"
```

### 6.2 姓名、头像和邮箱

修改 `_config.yml` 的 `author:`：

```yml
author:
  name: "张小明"
  name_en: "Xiaoming Zhang"
  avatar: "images/avatar.webp"
  bio: "计算机视觉 · 多模态学习 · 可信人工智能"
  location: "北京，中国"
  employer: "示例大学"
  email: "your-name@example.com"
```

YAML 依靠缩进表示层级。`author:` 下的字段必须保留两个空格，不要使用 Tab。

### 6.3 GitHub、Google Scholar 和 ORCID

```yml
author:
  github: "https://github.com/YOUR_USERNAME"
  googlescholar: "https://scholar.google.com/citations?user=YOUR_ID"
  orcid: "https://orcid.org/0000-0000-0000-0000"
```

案例：暂时没有 ORCID 时，可以先留空：

```yml
  orcid:
```

不要把一个无关链接伪装成 Scholar 或 ORCID；这会让访问者误以为链接内容是真实学术资料。

### 6.4 修改正文中的联系邮箱

侧边栏邮箱来自 `_config.yml`，正文邮箱写在中英文页面中，需要同步修改。

中文示例：

```markdown
联系方式：[your-name@example.com](mailto:your-name@example.com)
```

英文示例：

```markdown
Contact: [your-name@example.com](mailto:your-name@example.com)
```

## 七、逐板块修改主页内容

英文内容位于 `_pages/about-en.md`，中文内容位于 `_pages/about.md`。以下示例都应中英文同步添加。

### 7.1 关于我 / About Me

中文案例：

```markdown
我是**张小明**，目前就读于示例大学计算机科学与技术专业。我的研究兴趣包括计算机视觉、多模态学习与可信人工智能。
```

英文案例：

```markdown
I am **Xiaoming Zhang**, a student in Computer Science at Example University. My research interests include computer vision, multimodal learning, and trustworthy AI.
```

研究方向彩色标签案例：

```html
<span class="research-badge badge-blue">计算机视觉</span>
<span class="research-badge badge-teal">多模态学习</span>
<span class="research-badge badge-slate">可信人工智能</span>
<span class="research-badge badge-indigo">教育人工智能</span>
```

英文只替换标签文字，颜色 class 保持一致：

```html
<span class="research-badge badge-blue">Computer Vision</span>
```

### 7.2 教育背景 / Education

中文案例：

```markdown
- **2024.09 - 2027.06，示例大学，计算机学院，工学硕士。** 研究方向为多模态学习。
- **2020.09 - 2024.06，示例理工大学，软件学院，工学学士。** 专业排名 3/120。
- **核心课程：** 机器学习（95）、计算机视觉（93）、数据结构（92）。
```

英文案例：

```markdown
- **2024.09 - 2027.06, Example University, School of Computer Science, M.Eng.** Research focus: multimodal learning.
- **2020.09 - 2024.06, Example Institute of Technology, School of Software, B.Eng.** Ranked 3rd out of 120 students.
- **Selected coursework:** Machine Learning (95), Computer Vision (93), and Data Structures (92).
```

### 7.3 研究方向 / Research Interests

中文案例：

```markdown
- **多模态学习：** 研究文本、图像与语音的统一表征和跨模态对齐。
- **可信人工智能：** 研究模型鲁棒性、可解释性与安全评测。
```

英文案例：

```markdown
- **Multimodal Learning:** Unified representation and cross-modal alignment of text, images, and speech.
- **Trustworthy AI:** Model robustness, interpretability, and safety evaluation.
```

### 7.4 新闻动态 / News

新闻按时间倒序排列，最新内容放在最上面。

中文案例：

```markdown
- *2026.09：* 🎉 论文被示例会议接收。[项目主页](https://example.com/)
```

英文案例：

```markdown
- *2026.09:* 🎉 Our paper was accepted by Example Conference. [Project page](https://example.com/)
```

如果不需要链接，直接删除 `[项目主页](网址)` 即可。

### 7.5 研究课题 / Research Projects

中文案例：

```markdown
- **2025.01 - 2026.12｜面向课堂场景的多模态学习分析系统，** 校级科研项目，主持。
```

英文案例：

```markdown
- **2025.01 - 2026.12｜Multimodal Learning Analytics System for Classroom Scenarios.** University Research Project; Principal Investigator.
```

建议统一采用“时间｜项目名称，项目级别，角色”的顺序。

### 7.6 学术成果 / Academic Work

这一部分使用成果卡片，不是普通 Markdown 列表。简单替换时优先修改以下字段：

```html
<span class="badge">项目标签</span>
<span class="project-cover-title">PROJECT<br>NAME</span>
<div class="paper-title">成果或论文标题</div>
<p class="paper-authors"><strong>你的姓名</strong>（第一作者）</p>
<div class="paper-meta">会议、期刊或项目名称</div>
<p class="paper-summary">一句话介绍成果内容和贡献。</p>
```

英文版同步示例：

```html
<span class="badge">MULTIMODAL AI</span>
<span class="project-cover-title">PROJECT<br>NAME</span>
<div class="paper-title">Title of the Project or Paper</div>
<p class="paper-authors"><strong>Your Name</strong> (First Author)</p>
<div class="paper-meta">Conference, journal, or project information</div>
<p class="paper-summary">A one-sentence summary of the contribution.</p>
```

完整卡片和论文按钮见[第十节](#十修改学术成果卡片和论文链接)。

### 7.7 专利与软件著作权 / Intellectual Property

不要删除专利和软著的小标题 `<h3>`。只在对应列表中增加条目。

中文专利案例：

```markdown
- **CN123456789A**，一种面向多模态学习的智能分析方法与系统，已公开，第一作者。
```

英文专利案例：

```markdown
- **CN123456789A**, Intelligent Analysis Method and System for Multimodal Learning; published; first inventor.
```

中文软著案例：

```markdown
- **2026SR1234567**，多模态教学分析平台 V1.0，已授权，第一作者。
```

英文软著案例：

```markdown
- **2026SR1234567**, Multimodal Teaching Analytics Platform V1.0; registered; first author.
```

### 7.8 竞赛获奖 / Awards

中文案例：

```markdown
- 中国大学生计算机设计大赛全国**一等奖**。
```

英文案例：

```markdown
- **National First Prize**, Chinese Collegiate Computing Competition.
```

需要突出奖项级别时，只把“一等奖”等结果放在 `**` 中，不必整句话全部加粗。

### 7.9 技能与联系 / Skills and Contact

中文案例：

```markdown
- **人工智能与建模：** Python、PyTorch、Transformers；具备模型训练、调优和部署能力。
- **系统开发：** Linux、Git、Docker、FastAPI 和 MySQL。
```

英文案例：

```markdown
- **Artificial Intelligence and Modeling:** Python, PyTorch, and Transformers; model training, optimization, and deployment.
- **System Development:** Linux, Git, Docker, FastAPI, and MySQL.
```

板块底部联系方式案例：

```html
<span><strong>邮箱：</strong> <a href="mailto:your-name@example.com">your-name@example.com</a></span>
```

### 7.10 实习与工作 / Internships and Experience

中文案例：

```markdown
- **2025.06 - 2025.09｜示例科技有限公司**，算法工程师实习生。
```

英文案例：

```markdown
- **2025.06 - 2025.09｜Example Technology Co., Ltd.**, Algorithm Engineer Intern.
```

## 八、修改导航或新增板块

### 8.1 修改导航名称

在 `_data/navigation.yml` 中同步修改 `en` 和 `zh`。

案例：把“Projects / 研究课题”改成“Research Projects / 科研项目”：

```yml
en:
  - title: "Research Projects"
    url: "/#research-topics"

zh:
  - title: "科研项目"
    url: "/zh/#research-topics"
```

只改变 `title`，不要改变 `url` 中的锚点，正文定位就不会受影响。

### 8.2 调整导航顺序

导航在 YAML 中的排列顺序就是网页显示顺序。移动一个完整的两行条目即可：

```yml
- title: "News"
  url: "/#news"
```

正文板块最好按同样顺序移动，避免导航顺序和阅读顺序不一致。

### 8.3 新增一个“服务工作 / Service”板块

第一步，在英文页面加入：

```html
<section id="service" data-nav-section markdown="1">

<h2 id="service-heading" class="section-heading">🤝 Service</h2>

- Reviewer for Example Conference 2026.

</section>
```

第二步，在中文页面加入：

```html
<section id="service" data-nav-section markdown="1">

<h2 id="service-heading" class="section-heading">🤝 服务工作</h2>

- 示例会议 2026 审稿人。

</section>
```

第三步，在 `_data/navigation.yml` 增加：

```yml
en:
  - title: "Service"
    url: "/#service"

zh:
  - title: "服务工作"
    url: "/zh/#service"
```

三个位置中的 `service` 必须完全一致，只能使用英文、数字和连字符，不要使用空格。

## 九、修改头像、学校、图标和图片

### 9.1 更换头像

1. 把图片复制到 `images/`，例如 `images/avatar.webp`。
2. 在 `_config.yml` 修改：

```yml
author:
  avatar: "images/avatar.webp"
```

建议使用清晰的正方形或接近正方形照片。网页会自动裁成圆形，原图不需要先做成圆形。

### 9.2 调整头像裁切位置

在 `assets/css/custom.scss` 搜索 `object-position`：

```scss
.sidebar div.author__avatar > img.author__avatar {
  object-fit: cover;
  object-position: center;
}
```

案例：人物位置偏上，希望显示更多下方内容：

```scss
object-position: center 40%;
```

修改后同时检查电脑端和手机端，避免学士帽或脸部被裁掉。

### 9.3 修改头像下方学校

编辑 `_includes/author-profile.html`：

```html
{% if page.lang == "zh-CN" %}
  <p>本科：<a href="https://www.example.edu.cn/" target="_blank" rel="noopener noreferrer">示例大学</a></p>
{% else %}
  <p>Undergraduate: <a href="https://www.example.edu.cn/" target="_blank" rel="noopener noreferrer">Example University</a></p>
{% endif %}
```

增加硕士院校案例：

```html
{% if page.lang == "zh-CN" %}
  <p>硕士：<a href="https://www.example-a.edu.cn/" target="_blank" rel="noopener noreferrer">示例 A 大学</a></p>
  <p>本科：<a href="https://www.example-b.edu.cn/" target="_blank" rel="noopener noreferrer">示例 B 大学</a></p>
{% else %}
  <p>Master's: <a href="https://www.example-a.edu.cn/" target="_blank" rel="noopener noreferrer">Example University A</a></p>
  <p>Undergraduate: <a href="https://www.example-b.edu.cn/" target="_blank" rel="noopener noreferrer">Example University B</a></p>
{% endif %}
```

### 9.4 替换普通图片

把图片放入 `images/`，然后使用：

```markdown
![图片内容说明]({{ '/images/project-demo.webp' | relative_url }})
```

文件名区分大小写。代码写 `project-demo.webp` 时，真实文件名也必须完全相同。

### 9.5 修改浏览器图标

浏览器图标位于 `images/`：

```text
favicon-16x16.png
favicon-32x32.png
apple-touch-icon.png
android-chrome-192x192.png
android-chrome-512x512.png
```

建议使用同一张正方形图片生成多种尺寸，并保持文件名不变。这样不需要修改 `_includes/head/custom.html`。

## 十、修改学术成果卡片和论文链接

### 10.1 复制一个成果卡片

在 `_pages/about.md` 或 `_pages/about-en.md` 中复制一个完整的 `<div class="paper-box"> ... </div>`，然后替换文字。不要只复制一半，否则容易出现标签未闭合。

简化后的中文案例：

```html
<div class="paper-box">
  <div class="paper-box-image">
    <div class="project-cover project-cover-code" role="img" aria-label="项目封面说明">
      <span class="badge">多模态学习</span>
      <span class="project-cover-title">PROJECT<br>DEMO</span>
    </div>
  </div>
  <div class="paper-box-text">
    <div class="paper-title">面向课堂场景的多模态学习分析系统</div>
    <p class="paper-authors"><strong>张小明</strong>（第一作者）</p>
    <div class="paper-meta">示例会议 2026</div>
    <p class="paper-summary">研究课堂中的文本、语音和视觉信息融合。</p>
  </div>
</div>
```

英文版应复制相同结构并翻译文字，class 名称不要翻译。

### 10.2 替换 Paper 链接

```html
<a class="paper-badge" href="https://example.com/paper.pdf" target="_blank" rel="noopener noreferrer">
  <img src="https://img.shields.io/badge/Paper-PDF-0071C5" alt="Download paper PDF">
</a>
```

将 `href` 替换为论文 PDF、arXiv 或出版社页面。

### 10.3 替换 GitHub Stars 链接

```html
<a class="paper-badge" href="https://github.com/YOUR_USERNAME/YOUR_REPOSITORY" target="_blank" rel="noopener noreferrer">
  <img src="https://img.shields.io/github/stars/YOUR_USERNAME/YOUR_REPOSITORY?style=social" alt="GitHub stars">
</a>
```

案例：仓库为 `alice-ai/multimodal-demo`：

```text
https://img.shields.io/github/stars/alice-ai/multimodal-demo?style=social
```

### 10.4 替换引用链接

论文正式发表后，可以把禁用的“引用”按钮改成 BibTeX 链接：

```html
<a class="paper-badge-text" href="https://example.com/citation.bib" target="_blank" rel="noopener noreferrer">Cite</a>
```

如果还没有正式论文，保留 `Pending` 比填写错误题录更可靠。

### 10.5 使用真实项目图片代替纯色封面

把图片放到 `images/`，将项目封面区域替换为：

```html
<img src="{{ '/images/project-demo.webp' | relative_url }}" alt="项目方法框架图">
```

`alt` 应描述图片内容，不要只写“图片”或留空。

## 十一、修改颜色、字号和版式

自定义样式集中在 `assets/css/custom.scss`。建议先使用 VS Code 搜索 class 名，再修改对应规则。

### 11.1 修改研究标签颜色

```scss
.badge-blue {
  background-color: #536f9f;
}
```

案例：改成更明亮的蓝色：

```scss
.badge-blue {
  background-color: #2f6fbd;
}
```

请同时保证白色文字与背景有足够对比度。

### 11.2 修改板块标题渐变

搜索 `.section-heading`：

```scss
background: linear-gradient(
  90deg,
  rgba(93, 132, 169, 0.18) 0%,
  rgba(116, 159, 210, 0.09) 58%,
  rgba(116, 159, 210, 0) 100%
);
```

案例：让蓝色更明显一些，可以把第一个透明度从 `0.18` 调到 `0.24`：

```scss
rgba(93, 132, 169, 0.24)
```

一次只改一个数值并刷新预览，不建议全局替换所有颜色。

### 11.3 修改头像大小

```scss
@media (min-width: 80em) {
  .sidebar div.author__avatar {
    width: 200px;
    height: 200px;
  }
}
```

案例：改成 `220px` 时，宽和高必须同时修改，否则圆形会变成椭圆：

```scss
width: 220px;
height: 220px;
```

### 11.4 修改学术成果封面颜色

```scss
.project-cover-code {
  background: linear-gradient(135deg, #344b63, #7d91a4);
}
```

案例：新增第三种封面：

```scss
.project-cover-vision {
  background: linear-gradient(135deg, #304f68, #78a4bd);
}
```

然后在成果卡片中使用：

```html
<div class="project-cover project-cover-vision" role="img" aria-label="视觉研究项目封面">
```

### 11.5 修改移动端样式

`@media (max-width: ...)` 内的规则只影响较窄屏幕。修改导航、卡片宽度或头像时，至少检查：

- 电脑端约 1440px 宽；
- 平板约 768px 宽；
- 手机约 390px 宽。

不要为了修复手机端而直接修改所有屏幕共用的宽度。

## 十二、修改 SEO 与分享预览

### 12.1 全站 SEO

修改 `_config.yml`：

```yml
title: "Alice Zhang's Homepage"
description: "Academic homepage of Alice Zhang, focusing on multimodal learning and trustworthy AI."
url: "https://alice-ai.github.io"
repository: "alice-ai/alice-ai.github.io"
og_image: "/images/share-cover.jpg"
```

`og_image` 是微信、QQ 或其他社交平台分享链接时可能显示的预览图片。建议使用清晰横图或个人照片，不要使用包含手机号等隐私信息的图片。

### 12.2 单独修改中英文搜索摘要

中文页面 `_pages/about.md` 顶部：

```yml
seo_title: "张小明的个人主页"
excerpt: "张小明的个人学术主页，研究方向包括多模态学习与可信人工智能。"
```

英文页面 `_pages/about-en.md` 顶部：

```yml
seo_title: "Xiaoming Zhang's Homepage"
excerpt: "Academic homepage of Xiaoming Zhang, featuring multimodal learning and trustworthy AI."
```

不要删除两端的 `---`，它们用于标记页面配置区域。

## 十三、测试、提交和发布

### 13.1 普通内容修改后的检查

```powershell
git status
git diff --check
```

- `git status`：查看修改了哪些文件；
- `git diff --check`：检查多余空格等基础格式问题。

### 13.2 运行自动交互测试

首次安装：

```powershell
npm install
npx playwright install chromium
```

生成 Jekyll 网页：

```powershell
bundle exec jekyll build
```

运行测试：

```powershell
npm run test:e2e
```

自动测试会检查：

- 中英文页面是否都能打开；
- 标题 ID 是否重复；
- 桌面端和移动端导航是否可用；
- 最后两个板块是否能正常定位；
- 浏览器前进/后退后导航高亮是否正确；
- 不需要的统计脚本和 MathJax 是否被错误加载。

普通文字修改不需要运行 `npm run build:js`。只有修改 `assets/js/_main.js` 或主题插件后，才需要运行：

```powershell
npm run build:js
```

### 13.3 提交并推送

```powershell
git add .
git commit -m "更新个人主页"
git push origin main
```

含义：

1. `git add .`：把当前修改加入待提交列表；
2. `git commit`：生成一个可以追溯的版本记录；
3. `git push`：把本地版本上传到 GitHub。

案例：只更新研究项目时，可以使用更明确的提交说明：

```powershell
git commit -m "更新中英文研究项目"
```

### 13.4 查看发布结果

1. 打开仓库 **Actions**；
2. 查看最新的 `Build and deploy GitHub Pages`；
3. 所有步骤为绿色后再打开主页；
4. 浏览器仍显示旧内容时按 `Ctrl + F5`。

发布流程为：

```text
推送 main
  → 安装前端依赖
  → 校验 JavaScript 构建结果
  → Jekyll 生成 _site
  → Playwright 测试中英文与移动端
  → 发布到 GitHub Pages
```

## 十四、常见问题

### 14.1 修改后网页没有变化

依次检查：

1. 文件是否已经保存；
2. `git status` 是否仍显示未提交修改；
3. 是否执行了 `git push origin main`；
4. Actions 是否为绿色；
5. 是否按 `Ctrl + F5` 强制刷新；
6. 是否修改了正确语言的文件。

案例：中文版没有变化，但英文版变了，通常是只修改了 `_pages/about-en.md`，没有同步修改 `_pages/about.md`。

### 14.2 YAML 构建失败

错误示例：

```yml
author:
name: "张小明"
 email: "name@example.com"
```

正确示例：

```yml
author:
  name: "张小明"
  email: "name@example.com"
```

YAML 只能使用空格缩进，不要使用 Tab。

### 14.3 导航点击后没有跳转

检查正文：

```html
<section id="research-topics" data-nav-section markdown="1">
```

再检查导航：

```yml
- title: "研究课题"
  url: "/zh/#research-topics"
```

`#` 后的 `research-topics` 必须完全相同。

### 14.4 图片显示不出来

常见原因：

- 图片没有放进 `images/`；
- 文件名大小写不一致；
- 使用了本机绝对路径，例如 `C:\Users\...`；
- 中文或空格文件名没有正确引用；
- 图片只存在本地，但没有被 `git add` 和提交。

推荐写法：

```html
<img src="{{ '/images/avatar.webp' | relative_url }}" alt="个人头像">
```

### 14.5 `git push` 被拒绝

先运行：

```powershell
git remote -v
```

确认远程地址是你自己的仓库，而不是原作者仓库。需要修改时：

```powershell
git remote set-url origin https://github.com/YOUR_USERNAME/YOUR_USERNAME.github.io.git
```

如果远程仓库不是空仓库，可能存在不同历史。零基础同学不建议直接使用 `--force`；先备份文件，再确认远程内容。

### 14.6 Actions 测试失败

打开第一个红色步骤，优先检查：

- HTML 开始标签和结束标签是否成对；
- 是否误删 `section-heading`；
- 是否出现重复 `id`；
- 导航 `url` 与 section `id` 是否一致；
- 图片路径是否存在；
- 中英文页面是否都保留完整结构。

### 14.7 可以把隐私信息或密码写进仓库吗

不可以。公开网页和公开仓库可能被搜索引擎收录。以下内容不应提交：

- GitHub 密码、Token、API Key；
- 身份证号、家庭住址；
- 未脱敏的手机号和简历；
- 数据库密码或服务器密钥；
- 未公开论文、专利或项目的保密材料。

如果已经提交密钥，仅删除文件不够；还需要立即撤销或更换该密钥。

## 十五、发布前检查清单

复制成自己的版本后，逐项确认：

- [ ] 仓库名已经改成 `YOUR_USERNAME.github.io`；
- [ ] `_config.yml` 中的 `url` 和 `repository` 已替换；
- [ ] 中文姓名、英文姓名和邮箱已替换；
- [ ] GitHub、Scholar 和 ORCID 链接是自己的真实账号；
- [ ] 头像和分享图片已经替换；
- [ ] 头像下方学校名称与官网链接已替换；
- [ ] `_pages/about-en.md` 的英文内容已更新；
- [ ] `_pages/about.md` 的中文内容已同步更新；
- [ ] 新闻、项目、专利、获奖和实习均为本人信息；
- [ ] 没有手机号、密码、Token 或未脱敏材料；
- [ ] 导航链接与 section ID 完全一致；
- [ ] 电脑端和手机端均检查过；
- [ ] GitHub Actions 全部通过；
- [ ] 中英文正式网址都可以访问。

## 致谢与许可

本项目基于 [AcadHomepage](https://github.com/RayeRen/acad-homepage.github.io) 定制。原项目与本仓库的复用方式以仓库中的 [LICENSE](LICENSE) 为准；再次发布或二次开发时，请保留相应的版权和许可说明。
