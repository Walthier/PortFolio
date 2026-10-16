/**
 * Interacciones del Portfolio - Kevin Tobias Martinez
 * - Menú responsive Mobile-First (Hamburguesa / Drawer)
 * - Navegación con scroll suave y compensación del Navbar fijo (sin solapamiento)
 * - Detección de sección activa en el Navbar
 * - Copiado de email al portapapeles con feedback flotante (Toast)
 * - Año dinámico en el footer
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Año dinámico en el footer
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // 2. Menú móvil (Toggle Hamburguesa)
  const mobileToggle = document.getElementById('mobile-toggle');
  const navLinks = document.getElementById('nav-links');

  function closeMobileMenu() {
    if (mobileToggle && navLinks) {
      mobileToggle.classList.remove('active');
      mobileToggle.setAttribute('aria-expanded', 'false');
      navLinks.classList.remove('open');
    }
  }

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = navLinks.classList.contains('open');
      if (isOpen) {
        closeMobileMenu();
      } else {
        mobileToggle.classList.add('active');
        mobileToggle.setAttribute('aria-expanded', 'true');
        navLinks.classList.add('open');
      }
    });

    // Cerrar al hacer clic fuera del navbar
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.navbar-wrapper')) {
        closeMobileMenu();
      }
    });
  }

  // 3. Scroll suave compensado (evita que el navbar fijo solape las secciones)
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  const navbarWrapper = document.querySelector('.navbar-wrapper');

  anchorLinks.forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (!targetId || targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        
        // Cerrar menú móvil si está abierto
        closeMobileMenu();

        // Calcular la altura real actual del navbar + margen de respiro
        const navHeight = navbarWrapper ? navbarWrapper.offsetHeight : 70;
        const targetTop = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight - 14;

        window.scrollTo({
          top: Math.max(0, targetTop),
          behavior: 'smooth',
        });
      }
    });
  });

  // 4. Indicador de sección activa en el Navbar durante el scroll
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-links .nav-item');

  function highlightNavigation() {
    const scrollY = window.pageYOffset;
    const navHeight = navbarWrapper ? navbarWrapper.offsetHeight : 70;

    sections.forEach((current) => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - navHeight - 30;
      const sectionId = current.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navItems.forEach((link) => {
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.style.color = 'var(--color-orange)';
          } else {
            link.style.color = '';
          }
        });
      }
    });
  }

  window.addEventListener('scroll', highlightNavigation, { passive: true });
  highlightNavigation();

  // 5. Copiado de Correo con Toast
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
});
