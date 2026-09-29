/* Ativa as animações progressivas: sem JS, o conteúdo continua visível. */
document.documentElement.classList.add("js");

/* HEADER */
const header = document.getElementById("header");

function updateHeader() {
  if (!header) return;
  header.classList.toggle("scrolled", window.scrollY > 40);
}
window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();

/* MENU MOBILE */
const menuButton = document.getElementById("menuButton");
const nav = document.getElementById("nav");
const navLinks = document.querySelectorAll(".nav a");

function closeMenu() {
  if (!menuButton || !nav) return;
  nav.classList.remove("active");
  menuButton.classList.remove("active");
  document.body.classList.remove("menu-open");
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Abrir menu");
}

function openMenu() {
  if (!menuButton || !nav) return;
  nav.classList.add("active");
  menuButton.classList.add("active");
  document.body.classList.add("menu-open");
  menuButton.setAttribute("aria-expanded", "true");
  menuButton.setAttribute("aria-label", "Fechar menu");
}

if (menuButton && nav) {
  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    if (isOpen) closeMenu();
    else openMenu();
  });

  navLinks.forEach((link) => link.addEventListener("click", closeMenu));

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      const wasOpen = menuButton.getAttribute("aria-expanded") === "true";
      closeMenu();
      if (wasOpen) menuButton.focus();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 850) closeMenu();
  });
}

/* REVEAL ON SCROLL */
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  /* Navegadores sem IntersectionObserver não deixam o conteúdo oculto. */
  revealElements.forEach((element) => element.classList.add("visible"));
}

/* ANO AUTOMÁTICO */
const yearElement = document.getElementById("year");
if (yearElement) yearElement.textContent = new Date().getFullYear();
