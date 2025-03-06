document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.querySelector(".hamburger");
  const menu = document.querySelector(".header__menu");

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
});
