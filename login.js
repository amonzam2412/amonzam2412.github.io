const passwordInput = document.getElementById('password');
const togglePassword = document.getElementById('togglePassword');
const loginForm = document.getElementById('loginForm');
const formMessage = document.getElementById('formMessage');

togglePassword?.addEventListener('click', () => {
  const showing = passwordInput.type === 'text';
  passwordInput.type = showing ? 'password' : 'text';
  togglePassword.textContent = showing ? 'Ver' : 'Ocultar';
  togglePassword.setAttribute('aria-label', showing ? 'Mostrar contraseña' : 'Ocultar contraseña');
});

loginForm?.addEventListener('submit', event => {
  event.preventDefault();
  const identity = document.getElementById('email').value.trim();
  const password = passwordInput.value;
  if (!identity || !password) {
    formMessage.textContent = 'Completa el usuario y la contraseña para continuar.';
    return;
  }
  if (password.length < 6) {
    formMessage.textContent = 'La contraseña debe tener al menos 6 caracteres.';
    return;
  }
  formMessage.textContent = 'Diseño de demostración: el inicio de sesión todavía no está conectado a un servidor y no se ha enviado ningún dato.';
});

document.getElementById('forgotLink')?.addEventListener('click', event => {
  event.preventDefault();
  formMessage.textContent = 'La recuperación de contraseña estará disponible cuando se conecte el sistema de cuentas.';
});

document.getElementById('signupLink')?.addEventListener('click', event => {
  event.preventDefault();
  formMessage.textContent = 'El registro de cuentas estará disponible próximamente.';
});

document.querySelectorAll('[data-provider]').forEach(button => {
  button.addEventListener('click', () => {
    formMessage.textContent = `El acceso con ${button.dataset.provider} es solo visual y todavía no está conectado.`;
  });
});
