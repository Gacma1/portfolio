// Mobile navigation
const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-menu");

menuToggle.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Close navigation menu" : "Open navigation menu",
  );
});

document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
  });
});

// Highlight the section currently in view and change the header on scroll.
const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".nav-link");
const header = document.querySelector(".site-header");
const backToTop = document.querySelector(".back-to-top");

const updateScrollState = () => {
  header.classList.toggle("scrolled", window.scrollY > 30);
  backToTop.classList.toggle("visible", window.scrollY > 600);

  let currentSection = "home";
  sections.forEach((section) => {
    if (window.scrollY >= section.offsetTop - 150) currentSection = section.id;
  });
  navLinks.forEach((link) =>
    link.classList.toggle(
      "active",
      link.getAttribute("href") === `#${currentSection}`,
    ),
  );
};

window.addEventListener("scroll", updateScrollState, { passive: true });
updateScrollState();

backToTop.addEventListener("click", () =>
  window.scrollTo({ top: 0, behavior: "smooth" }),
);

// Reveal content as it enters the viewport.
const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 },
);

document
  .querySelectorAll(".reveal")
  .forEach((element) => revealObserver.observe(element));

// Filter project cards without a framework.
const filterButtons = document.querySelectorAll(".filter-button");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    filterButtons.forEach((item) =>
      item.classList.toggle("active", item === button),
    );
    projectCards.forEach((card) => {
      card.classList.toggle(
        "is-hidden",
        filter !== "all" && card.dataset.category !== filter,
      );
    });
  });
});
