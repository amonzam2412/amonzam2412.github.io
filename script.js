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
let coins = 2500;
let passOwned = false;

const products = [
  { name: "Sombra Vértice", type: "Skin", price: 800 },
  { name: "Valkiria Neón", type: "Skin", price: 800 },
  { name: "Samurái Carmesí", type: "Skin", price: 800 },
  { name: "Cosmos Oscuro", type: "Skin", price: 800 },
  { name: "Pack Alas del Cuervo", type: "Pack", price: 1500 },
  { name: "Pack Samurái Carmesí", type: "Pack", price: 1800 },
  { name: "Pack Reino Helado", type: "Pack", price: 1800 },
  { name: "Mochila Fantasma", type: "Accesorio", price: 400 },
  { name: "Gesto Bailarín", type: "Gesto", price: 300 },
  { name: "Diseño Venganza Violeta", type: "Arma", price: 500 }
];

const rewardNames = [
  "Icono Raven",
  "100 Raven Coins",
  "Mochila Fantasma",
  "Gesto Victoria",
  "Diseño Eclipse",
  "Skin especial Raven"
];

const missions = [
  "Visita la tienda",
  "Explora el pase de batalla",
  "Conoce las novedades",
  "Completa tu perfil",
  "Descubre los Raven Coins"
];

let completedMissions = new Set();
let friends = [];

function updateCoins() {
  document.getElementById("balance").textContent = coins;
  document.getElementById("coin-balance").textContent = coins;
}

function showPage(id) {
  document.querySelectorAll(".page").forEach(page => {
    page.classList.remove("active");
  });

  document.getElementById(id).classList.add("active");
  document.getElementById("navigation").classList.remove("open");
  window.scrollTo(0, 0);
}

function toggleMenu() {
  document.getElementById("navigation").classList.toggle("open");
}

function renderShop() {
  const container = document.getElementById("shop-products");

  container.innerHTML = products.map((product, index) => `
    <article class="card">
      <h3>🐦‍⬛ ${product.name}</h3>
      <p>${product.type}</p>
      <p><strong>${product.price} Raven Coins</strong></p>
      <button onclick="buyProduct(${index})">Comprar</button>
    </article>
  `).join("");
}

function buyProduct(index) {
  const product = products[index];

  if (coins < product.price) {
    alert("No tienes suficientes Raven Coins.");
    return;
  }

  coins -= product.price;
  updateCoins();
  alert("¡Has comprado " + product.name + "!");
}

function buyPass() {
  if (passOwned) {
    alert("Ya tienes el pase prémium.");
    return;
  }

  if (coins < 950) {
    alert("No tienes suficientes Raven Coins.");
    return;
  }

  coins -= 950;
  passOwned = true;
  updateCoins();
  alert("¡Has desbloqueado el pase prémium!");
}

function renderRewards() {
  const container = document.getElementById("rewards");

  container.innerHTML = Array.from({ length: 50 }, (_, i) => {
    const name = rewardNames[i % rewardNames.length];

    return `
      <article class="card">
        <h3>Nivel ${i + 1}</h3>
        <p>${name}</p>
        <p>Recompensa de temporada</p>
      </article>
    `;
  }).join("");
}

function renderMissions() {
  const container = document.getElementById("mission-list");

  container.innerHTML = missions.map((mission, i) => `
    <article class="card">
      <h3>🎯 Misión ${i + 1}</h3>
      <p>${mission}</p>
      <button
        onclick="completeMission(${i})"
        ${completedMissions.has(i) ? "disabled" : ""}>
        ${completedMissions.has(i) ? "Completada" : "Completar"}
      </button>
    </article>
  `).join("");
}

function completeMission(index) {
  completedMissions.add(index);
  renderMissions();
}

function demoCoins(amount) {
  coins += amount;
  updateCoins();
  alert("Se han añadido " + amount + " Coins de demostración.");
}

function addFriend() {
  const input = document.getElementById("friend-name");
  const name = input.value.trim();

  if (!name) {
    alert("Escribe un nombre.");
    return;
  }

  friends.push(name);
  input.value = "";
  renderFriends();
}

function renderFriends() {
  const container = document.getElementById("friend-list");

  container.innerHTML = friends.map(name => `
    <article class="card">
      <h3>👤 ${escapeHTML(name)}</h3>
      <p>Amigo añadido localmente</p>
    </article>
  `).join("");
}

function escapeHTML(value) {
  return value.replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[char]);
}

renderShop();
renderRewards();
renderMissions();
renderFriends();
updateCoins();