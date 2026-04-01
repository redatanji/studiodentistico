/* ============================================================
   STUDIO DR. ANTONIO FASSA – MAIN.JS
   ============================================================ */
(function () {
  'use strict';

  /* ---- Navbar scroll ---- */
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 10);
    });
  }

  /* ---- Hamburger ---- */
  const hamburger = document.querySelector('.hamburger');
  const menu = document.querySelector('.navbar__menu');
  if (hamburger && menu) {
    hamburger.addEventListener('click', () => {
      menu.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', menu.classList.contains('open'));
    });
    document.addEventListener('click', (e) => {
      if (!menu.contains(e.target) && !hamburger.contains(e.target)) {
        menu.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
    /* Close menu on Escape key */
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && menu.classList.contains('open')) {
        menu.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.focus();
      }
    });
  }

  /* ---- Scroll reveal ---- */
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.15 });
    reveals.forEach((el) => io.observe(el));
  }

  /* ---- FAQ accordion ---- */
  document.querySelectorAll('.faq-item__q').forEach((q) => {
    q.setAttribute('role', 'button');
    q.setAttribute('tabindex', '0');
    const toggle = () => {
      const item = q.parentElement;
      const wasOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach((i) => i.classList.remove('open'));
      if (!wasOpen) item.classList.add('open');
    };
    q.addEventListener('click', toggle);
    q.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggle();
      }
    });
  });

  /* ---- Active link ---- */
  const currentPath = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar__menu a').forEach((a) => {
    const href = a.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  /* ---- Smooth anchor scroll ---- */
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
        if (menu) menu.classList.remove('open');
      }
    });
  });

  /* ---- Contact form feedback (demo mode) ---- */
  const form = document.querySelector('.form');
  if (form) {
    form.addEventListener('submit', (e) => {
      /* If the form has a real action (e.g. Formspree), let it submit normally.
         For demo purposes without a backend, intercept and show feedback. */
      const action = form.getAttribute('action');
      if (!action || action.includes('YOUR_FORM_ID')) {
        e.preventDefault();
        const msg = form.querySelector('.form__msg');
        if (msg) {
          msg.textContent = 'Grazie! Ti ricontatteremo al più presto. (Nota: questa è una demo — in produzione il messaggio verrà inviato via email.)';
          msg.style.display = 'block';
        }
        setTimeout(() => form.reset(), 2000);
      }
    });
  }
})();