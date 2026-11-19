const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');
if (menuButton && nav) {
  menuButton.addEventListener('click', () => {
    const opened = nav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(opened));
    menuButton.setAttribute('aria-label', opened ? 'Cerrar menú' : 'Abrir menú');
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
  }));
}
const notifyButton = document.getElementById('notifyButton');
const notifyMessage = document.getElementById('notifyMessage');
if (notifyButton && notifyMessage) {
  notifyButton.addEventListener('click', () => {
    notifyMessage.textContent = '¡Perfecto! Cuando haya novedades oficiales, esta sección podrá enlazarse a las noticias de Raven Games.';
  });
}
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();
