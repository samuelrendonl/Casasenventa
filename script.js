/*
 * Configuración rápida de la propiedad.
 * Escribe el número con indicativo de país, sin espacios ni símbolos.
 * Ejemplo Colombia: 573001234567
 */
const propertyConfig = {
  // Esta es una página estática: las variables process.env no existen en el navegador.
  // WhatsApp necesita el código de país, sin espacios ni símbolos.
  whatsappNumber: "573008028577",
  whatsappMessage:
    "Hola, estoy interesado en una de las propiedades publicadas en la página.",
};

const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");

if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    document.body.classList.toggle("menu-open", isOpen);
  });

  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
      document.body.classList.remove("menu-open");
    });
  });
}

const whatsappLinks = document.querySelectorAll("[data-whatsapp]");
if (propertyConfig.whatsappNumber) {
  const whatsappUrl = `https://wa.me/${propertyConfig.whatsappNumber}?text=${encodeURIComponent(propertyConfig.whatsappMessage)}`;
  whatsappLinks.forEach((link) => {
    link.href = whatsappUrl;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  });
}

const galleryItems = document.querySelectorAll(".gallery-item");
const lightbox = document.querySelector("#lightbox");
const lightboxImage = document.querySelector("#lightbox-image");
const lightboxClose = document.querySelector(".lightbox-close");

function closeLightbox() {
  lightbox.classList.remove("is-visible");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.classList.remove("menu-open");
  lightboxImage.src = "";
}

galleryItems.forEach((item) => {
  item.addEventListener("click", () => {
    lightboxImage.src = item.dataset.image;
    lightboxImage.alt = item.dataset.alt || "";
    lightbox.classList.add("is-visible");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("menu-open");
  });
});

if (lightbox && lightboxImage && lightboxClose) {
  lightboxClose.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) closeLightbox();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && lightbox.classList.contains("is-visible"))
      closeLightbox();
  });
}

document.querySelector("#current-year").textContent = new Date().getFullYear();
