document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.querySelector(".hamburger");
  const menu = document.querySelector(".header__menu");
  const siteHeader = document.querySelector(".site-header");

  if (hamburger && menu) {
    hamburger.addEventListener("click", function () {
      menu.classList.toggle("open");
      this.classList.toggle("active");
    });
  }

  document.querySelectorAll(".chevron-icon").forEach((chevron) => {
    chevron.addEventListener("click", function (event) {
      event.preventDefault();
      event.stopPropagation();

      const parentItem = this.closest(".has-below");
      parentItem.classList.toggle("open");
    });
  });

  window.addEventListener("scroll", function () {
    const hasBackgroundImage = document.body.classList.contains("has-background-image");
    const isWideScreen = window.innerWidth > 991;
    const scrolled = window.scrollY > 50;

    if (hasBackgroundImage) {
      siteHeader.classList.toggle("header-color", scrolled);
    }

    if (isWideScreen) {
      if (scrolled)
      siteHeader.classList.add("sticky-header");
      else
      siteHeader.classList.remove("sticky-header");
    }
  });
});
