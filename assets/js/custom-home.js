(function () {
  "use strict";

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
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

  // 按视口阅读线同步导航，短小的末尾板块也能依次获得激活状态。
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

  const requestActiveSectionUpdate = () => {
    if (activeSectionFrame) return;
    activeSectionFrame = window.requestAnimationFrame(updateActiveSection);
  };

  window.addEventListener("scroll", requestActiveSectionUpdate, { passive: true });
  window.addEventListener("resize", requestActiveSectionUpdate);
  requestActiveSectionUpdate();

  // 移动端目录使用独立抽屉，并同步按钮的展开状态。
  const closeMobileNav = () => {
    if (!mobileNavToggle || !mobileNavDrawer) return;
    mobileNavToggle.setAttribute("aria-expanded", "false");
    mobileNavDrawer.hidden = true;
  };

  if (mobileNavToggle && mobileNavDrawer) {
    mobileNavToggle.addEventListener("click", () => {
      const willOpen = mobileNavToggle.getAttribute("aria-expanded") !== "true";
      mobileNavToggle.setAttribute("aria-expanded", String(willOpen));
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
      if (event.key !== "Escape") return;
      closeMobileNav();
      mobileNavToggle.focus();
    });
  }

  // 手机端选择板块后自动收起折叠菜单，避免菜单遮挡正文。
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (menuButton && hiddenMenu && !hiddenMenu.classList.contains("hidden")) {
        menuButton.click();
      }
    });
  });

  // 进入视口时展示正文块；减少动态效果模式下直接显示。
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
