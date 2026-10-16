/**
 * Interacciones del Portfolio - Kevin Tobias Martinez
 * - Menú responsive Mobile-First (Hamburguesa en la derecha)
 * - Navegación con scroll suave y compensación del Navbar fijo (anti-solapamiento)
 * - Detección de sección activa en el Navbar (Presentación, Skills, Proyectos, Contacto)
 * - Año dinámico en el footer
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Año dinámico en el footer
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // 2. Menú móvil (Toggle Hamburguesa a la derecha)
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
        const targetTop = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight - 16;

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
      const sectionTop = current.offsetTop - navHeight - 32;
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
});
