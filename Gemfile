source "https://rubygems.org"

# Ruby/Jekyll 依赖配置。只修改主页文字和样式时，不需要改动本文件。
# 首次本地预览先运行 `bundle install` 安装依赖，然后使用：
#
#     bundle exec jekyll serve
#
# 始终通过 `bundle exec` 启动，可以确保使用 Gemfile.lock 记录的依赖版本。

gem "github-pages", group: :jekyll_plugins

# 如需脱离 GitHub Pages 依赖并直接使用 Jekyll，可取消下方注释。
# 升级依赖前应先备份并在本地完整测试，不建议新手直接运行 `bundle update`。

# gem "jekyll"

gem "wdm", "~> 0.1.0" if Gem.win_platform?

# Jekyll 插件统一写在这个分组中。
group :jekyll_plugins do
  # gem "jekyll-archives"
  gem "jekyll-feed"
  gem 'jekyll-sitemap'
  gem 'hawkins'
end
