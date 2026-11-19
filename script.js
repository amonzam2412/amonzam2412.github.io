// Raven Games — interacciones de la página
const modal = document.getElementById("modal");
const modalContent = document.getElementById("modalContent");
const navlinks = document.getElementById("navlinks");

function openModal(type) {
  if (!modal || !modalContent) return;
  const content = {
    trailer: { title: "Raven Strike · Tráiler conceptual", text: "Mira el teaser de Raven Strike." },
    community: { title: "Únete a la comunidad", text: "Estamos preparando los canales de la comunidad de Raven Games. ¡Vuelve pronto!" },
    shop: { title: "Tienda Raven", text: "La tienda conceptual estará disponible próximamente." },
    login: { title: "Acceso de jugador", text: "El acceso de jugadores es una demostración visual y todavía no utiliza cuentas reales." }
  };
  const item = content[type] || { title: "Raven Games", text: "Próximamente." };
  if (type === "trailer") {
    modalContent.innerHTML = `<h2 id="modalTitle">${item.title}</h2><p>${item.text}</p><video controls playsinline preload="metadata" style="width:100%;border-radius:12px;background:#050408" poster="raven-strike-banner.png"><source src="assets/raven-strike-trailer.mp4" type="video/mp4"></video><p><a href="assets/raven-strike-trailer.mp4" download>Descargar tráiler MP4 ↓</a></p>`;
  } else {
    modalContent.innerHTML = `<h2 id="modalTitle">${item.title}</h2><p>${item.text}</p>`;
  }
  modal.classList.add("show");
  modal.setAttribute("aria-hidden", "false");
}
function closeModal() {
  if (!modal) return;
  modal.classList.remove("show");
  modal.setAttribute("aria-hidden", "true");
}
function toggleMenu() { if (navlinks) navlinks.classList.toggle("show"); }
document.addEventListener("keydown", event => { if (event.key === "Escape") closeModal(); });
if (navlinks) navlinks.querySelectorAll("a").forEach(link => link.addEventListener("click", () => navlinks.classList.remove("show")));
