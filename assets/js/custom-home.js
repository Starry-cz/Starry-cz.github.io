(function () {
  "use strict";

  /*
   * 主页交互脚本（只负责行为，不保存主页文字）：
   * - 导航名称和顺序：修改 _data/navigation.yml。
   * - 正文板块：修改 _pages/about.md。
   * - 颜色和动画时长：修改 assets/css/custom.scss。
   * 初学者只更新内容时，无需修改本文件。
   */

  // 浏览器开启“减少动态效果”时，停用非必要动画，避免引起不适。
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  // 下列选择器从 HTML 中找到板块、导航链接和交互控件，供后面的逻辑使用。
  const sections = Array.from(document.querySelectorAll("[data-nav-section]"));
  const navLinks = Array.from(
    document.querySelectorAll("#site-nav a[href*='#'], #mobile-nav-drawer a[href*='#']")
  );
  const revealBlocks = Array.from(document.querySelectorAll(".reveal-block"));
  const menuButton = document.querySelector("#site-nav button");
  const hiddenMenu = document.querySelector("#site-nav .hidden-links");
  const mobileNavShell = document.querySelector(".mobile-nav-shell");
  const mobileNavToggle = document.querySelector("#mobile-nav-toggle");
  const mobileNavDrawer = document.querySelector("#mobile-nav-drawer");
  const mobileNavCurrent = document.querySelector(".mobile-nav-current");
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  // 将当前板块对应的导航链接标为激活，并同步移动端按钮中的板块名称。
  const setActiveSection = (activeId) => {
    let activeTitle = "";

    navLinks.forEach((link) => {
      const hash = new URL(link.href, window.location.href).hash.slice(1);
      const isActive = hash === activeId;
      link.classList.toggle("is-active", isActive);

      if (isActive) {
        link.setAttribute("aria-current", "location");
        activeTitle = link.textContent.trim();
      } else {
        link.removeAttribute("aria-current");
      }
    });

    if (mobileNavCurrent && activeTitle) mobileNavCurrent.textContent = activeTitle;
  };

  let activeSectionFrame = 0;

  // 根据滚动位置判断正在阅读哪个板块；到达页面底部时直接激活最后一项。
  const updateActiveSection = () => {
    const documentHeight = document.documentElement.scrollHeight;
    const reachedPageBottom = window.scrollY + window.innerHeight >= documentHeight - 2;
    const secondSectionTop = sections[1].getBoundingClientRect().top;
    const keepAboutActive = secondSectionTop > window.innerHeight * 0.34;
    let activeSection = sections[0];

    if (reachedPageBottom) {
      activeSection = sections[sections.length - 1];
    } else if (!keepAboutActive) {
      const readingLine = window.innerHeight * 0.48;
      for (const section of sections) {
        if (section.getBoundingClientRect().top > readingLine) break;
        activeSection = section;
      }
    }

    setActiveSection(activeSection.id);
    activeSectionFrame = 0;
  };

  // requestAnimationFrame 把同一帧内的多次滚动事件合并，减少重复计算。
  const requestActiveSectionUpdate = () => {
    if (activeSectionFrame) return;
    activeSectionFrame = window.requestAnimationFrame(updateActiveSection);
  };

  window.addEventListener("scroll", requestActiveSectionUpdate, { passive: true });
  window.addEventListener("resize", requestActiveSectionUpdate);
  requestActiveSectionUpdate();

  // 统一关闭移动端目录，并同步无障碍属性与按钮提示文字。
  const closeMobileNav = () => {
    if (!mobileNavToggle || !mobileNavDrawer) return;
    mobileNavToggle.setAttribute("aria-expanded", "false");
    mobileNavToggle.setAttribute("aria-label", "打开页面目录");
    mobileNavDrawer.hidden = true;
  };

  // 只有页面上同时存在按钮和目录时才绑定交互，避免访问不存在的元素。
  if (mobileNavToggle && mobileNavDrawer) {
    mobileNavToggle.addEventListener("click", () => {
      const willOpen = mobileNavToggle.getAttribute("aria-expanded") !== "true";
      mobileNavToggle.setAttribute("aria-expanded", String(willOpen));
      mobileNavToggle.setAttribute("aria-label", willOpen ? "关闭页面目录" : "打开页面目录");
      mobileNavDrawer.hidden = !willOpen;
    });

    mobileNavDrawer.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMobileNav);
    });

    document.addEventListener("click", (event) => {
      if (!mobileNavShell || mobileNavShell.contains(event.target)) return;
      closeMobileNav();
    });

    document.addEventListener("keydown", (event) => {
      if (event.key !== "Escape" || mobileNavToggle.getAttribute("aria-expanded") !== "true") return;
      closeMobileNav();
      mobileNavToggle.focus();
    });
  }

  // 兼容主题原有的折叠菜单：选择板块后自动收起，避免遮挡正文。
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (menuButton && hiddenMenu && !hiddenMenu.classList.contains("hidden")) {
        menuButton.click();
      }
    });
  });

  // 正文进入视口时添加 is-visible；CSS 读取该类名并播放淡入动画。
  if (reducedMotion) {
    revealBlocks.forEach((block) => block.classList.add("is-visible"));
  } else {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    revealBlocks.forEach((block) => revealObserver.observe(block));
  }

  // 在论文条目内跟踪鼠标位置，驱动柔和光斑；触屏与减少动态效果模式不启用。
  if (finePointer && !reducedMotion) {
    document.querySelectorAll(".paper-box").forEach((paperBox) => {
      const updateSpotlight = (event) => {
        const rect = paperBox.getBoundingClientRect();
        paperBox.style.setProperty("--spotlight-x", `${event.clientX - rect.left}px`);
        paperBox.style.setProperty("--spotlight-y", `${event.clientY - rect.top}px`);
        paperBox.style.setProperty("--spotlight-opacity", "1");
      };

      paperBox.addEventListener("pointerenter", updateSpotlight);
      paperBox.addEventListener("pointermove", updateSpotlight);
      paperBox.addEventListener("pointerleave", () => {
        paperBox.style.setProperty("--spotlight-opacity", "0");
      });
    });
  }
})();
