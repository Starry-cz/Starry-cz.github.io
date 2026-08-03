# 程子凡的学术主页

本项目基于 [AcadHomepage](https://github.com/RayeRen/acad-homepage.github.io) 定制，使用 Jekyll 构建并通过 GitHub Pages 发布。

## 内容维护

- 主页内容：`_pages/about.md`
- 站点与个人信息：`_config.yml`
- 顶部导航：`_data/navigation.yml`
- 自定义样式：`assets/css/custom.scss`
- 自定义交互：`assets/js/custom-home.js`
- 头像：`images/cheng-zifan-graduation.jpg`

手机号、政治面貌和籍贯没有放入公开网页。当前简历含这些信息，因此“简历下载”保留为待补充项；建议后续上传脱敏后的公开版 PDF。

## 本地预览

```bash
bundle install
bundle exec jekyll serve
```

访问 `http://127.0.0.1:4000`。

## 发布到 GitHub Pages

1. 将 `_config.yml` 中的 `repository` 改为 `你的用户名/你的用户名.github.io`。
2. 把仓库重命名为 `你的用户名.github.io`。
3. 推送到 GitHub 的 `main` 分支。
4. 在仓库 `Settings → Pages` 中选择从 `main` 分支部署。

## 后续待补充

- GitHub、Google Scholar、ORCID、DBLP 等个人链接
- 论文、学术报告与公开数据集
- 项目代码、演示地址与项目图片
- 脱敏后的公开版简历 PDF
- 英文主页
