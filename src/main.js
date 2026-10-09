import './style.css';

/**
 * Interacciones del Portfolio - Kevin Tobias Martinez (Vite Edition)
 * - Copiado de email al portapapeles con toast de confirmación
 * - Detección de sección activa en el navbar fijo
 * - Año dinámico para el footer
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Año dinámico en el footer
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // 2. Copiado de Correo con Toast
  const copyBtn = document.getElementById('copy-email-btn');
  const copyBtnText = document.getElementById('copy-btn-text');
  const toast = document.getElementById('toast');
  const emailToCopy = 'walthie.white.22@gmail.com';

  let toastTimeout = null;

  if (copyBtn) {
    copyBtn.addEventListener('click', async () => {
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(emailToCopy);
        } else {
          // Fallback para navegadores antiguos
          const tempInput = document.createElement('textarea');
          tempInput.value = emailToCopy;
          document.body.appendChild(tempInput);
          tempInput.select();
          document.execCommand('copy');
          document.body.removeChild(tempInput);
        }

        // Feedback visual en el botón
        if (copyBtnText) {
          copyBtnText.textContent = '¡Copiado!';
          setTimeout(() => {
            copyBtnText.textContent = 'Copiar Email';
          }, 2500);
        }

        // Mostrar Toast flotante
        if (toast) {
          toast.classList.add('show');
          if (toastTimeout) clearTimeout(toastTimeout);
          toastTimeout = setTimeout(() => {
            toast.classList.remove('show');
          }, 3200);
        }
      } catch (err) {
        console.error('Error al copiar al portapapeles:', err);
      }
    });
  }

  // 3. Indicador de sección activa en el Navbar al hacer scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links .nav-item');

  function highlightNavigation() {
    const scrollY = window.pageYOffset;

    sections.forEach((current) => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 140;
      const sectionId = current.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.style.color = 'var(--color-orange)';
          } else {
            link.style.color = '';
          }
        });
      }
    });
  }

  window.addEventListener('scroll', highlightNavigation);
  highlightNavigation();
});
