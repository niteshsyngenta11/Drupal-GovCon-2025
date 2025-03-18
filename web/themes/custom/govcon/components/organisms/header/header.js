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

  if (document.body.classList.contains("has-background-image")) {
    window.addEventListener("scroll", function () {
      if (window.scrollY > 50) {
        siteHeader.classList.add("header-color");
      } else {
        siteHeader.classList.remove("header-color");
      }
    });
  }
});
