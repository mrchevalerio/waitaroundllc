(function () {
  'use strict';

  var nav = document.getElementById('nav');
  var navToggle = document.getElementById('navToggle');
  var mobileMenu = document.getElementById('mobileMenu');
  var yearEl = document.getElementById('year');
  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var currentYear = new Date().getFullYear();
  if (yearEl) yearEl.textContent = currentYear;

  // Nav background on scroll
  function onScroll() {
    if (window.scrollY > 24) {
      nav.classList.add('is-scrolled');
    } else {
      nav.classList.remove('is-scrolled');
    }
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Mobile menu toggle
  function closeMenu() {
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Open menu');
    mobileMenu.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  function openMenu() {
    navToggle.setAttribute('aria-expanded', 'true');
    navToggle.setAttribute('aria-label', 'Close menu');
    mobileMenu.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  if (navToggle) {
    navToggle.addEventListener('click', function () {
      var isOpen = navToggle.getAttribute('aria-expanded') === 'true';
      if (isOpen) closeMenu(); else openMenu();
    });
  }

  if (mobileMenu) {
    mobileMenu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', closeMenu);
    });
  }
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMenu();
  });

  // Smooth scroll for data-scroll-to triggers (e.g. the hero scroll cue)
  document.querySelectorAll('[data-scroll-to]').forEach(function (el) {
    el.addEventListener('click', function () {
      var target = document.querySelector(el.getAttribute('data-scroll-to'));
      if (target) target.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth' });
    });
  });

  // Scroll reveal via IntersectionObserver
  var revealEls = document.querySelectorAll('[data-reveal]');

  if (prefersReduced || !('IntersectionObserver' in window)) {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  } else {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var delay = entry.target.getAttribute('data-reveal-delay') || 0;
            entry.target.style.setProperty('--reveal-delay', delay);
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );
    revealEls.forEach(function (el) { revealObserver.observe(el); });
  }

  // ============================================================
  // Language toggle (EN / ES)
  // ============================================================
  var translations = {
    en: {
      'nav.mission': 'Mission',
      'nav.approach': 'Approach',
      'nav.industries': 'Industries',
      'nav.contact': 'Contact',
      'nav.cta': 'Get in touch',
      'hero.title1': 'Efficient solutions designed to keep',
      'hero.title2': 'your business <em>moving forward</em>.',
      'hero.sub': 'waitAround LLC builds calm, human-centered tools that reduce friction, improve flow, and create more predictable everyday experiences.',
      'hero.cta1': 'Start a conversation',
      'hero.cta2': 'See how we work',
      'mission.eyebrow': 'What we believe',
      'mission.heading': 'Three principles guide everything we build.',
      'mission.card1.title': 'Reduce friction',
      'mission.card1.body': 'We strip away the steps that don’t need to exist, so people can move through their day without thinking twice.',
      'mission.card2.title': 'Improve flow',
      'mission.card2.body': 'Good software disappears into the rhythm of real life. We design for momentum, not interruption.',
      'mission.card3.title': 'Create predictability',
      'mission.card3.body': 'When people know what to expect, and when, everything downstream gets calmer.',
      'manifesto.kicker': 'Creating thoughtful technology that respects people’s time.',
      'manifesto.statement': 'If it doesn’t feel calm, it doesn’t ship.',
      'industries.eyebrow': 'Who we serve',
      'industries.heading': 'Industries we work with.',
      'industries.item1.title': 'Local services',
      'industries.item1.body': 'Barbershops, salons, clinics, repair shops — anywhere a line forms.',
      'industries.item2.title': 'Transportation',
      'industries.item2.body': 'Dispatch, routing, digital boards, and rider flow that stays predictable.',
      'industries.item3.title': 'Warehouse &amp; logistics',
      'industries.item3.body': 'Dock scheduling, digital boards, and floor operations without the chaos.',
      'industries.item4.title': 'Travel agencies',
      'industries.item4.body': 'Booking and itinerary tools built around real client time.',
      'industries.more': '…and more industries where time is the product.',
      'approach.eyebrow': 'How we work',
      'approach.heading': 'From first conversation to shipped product.',
      'approach.step1.title': 'Listen',
      'approach.step1.body': 'We learn the real workflow behind the request, not just the feature list.',
      'approach.step2.title': 'Design',
      'approach.step2.body': 'We prototype the calmest version first, then test it against real use.',
      'approach.step3.title': 'Build',
      'approach.step3.body': 'We ship something real, fast, and reliable — built to last past launch day.',
      'approach.step4.title': 'Refine',
      'approach.step4.body': 'We keep tuning after launch, based on how people actually use it.',
      'contact.eyebrow': 'Let’s talk',
      'contact.heading': 'Tell us what’s slowing you down.',
      'contact.copy': 'Whether it’s a rough idea or a fully-scoped project, we’d like to hear about it. We usually reply within one business day.',
      'contact.location': 'Albany, NY',
      'footer.poweredby': 'Powered by',
      'footer.tagline': 'Human by Design',
      'footer.legal': '© {year} waitAround LLC. Human by Design.'
    },
    es: {
      'nav.mission': 'Misión',
      'nav.approach': 'Enfoque',
      'nav.industries': 'Industrias',
      'nav.contact': 'Contacto',
      'nav.cta': 'Hablemos',
      'hero.title1': 'Soluciones eficientes diseñadas para',
      'hero.title2': 'mantener tu negocio <em>en movimiento</em>.',
      'hero.sub': 'waitAround LLC crea herramientas tranquilas y centradas en las personas que reducen la fricción, mejoran el flujo y hacen que el día a día sea más predecible.',
      'hero.cta1': 'Iniciar una conversación',
      'hero.cta2': 'Ver cómo trabajamos',
      'mission.eyebrow': 'En lo que creemos',
      'mission.heading': 'Tres principios guían todo lo que construimos.',
      'mission.card1.title': 'Reducir la fricción',
      'mission.card1.body': 'Eliminamos los pasos innecesarios para que las personas puedan seguir con su día sin pensarlo dos veces.',
      'mission.card2.title': 'Mejorar el flujo',
      'mission.card2.body': 'El buen software se integra en el ritmo de la vida real. Diseñamos para el movimiento, no para la interrupción.',
      'mission.card3.title': 'Crear previsibilidad',
      'mission.card3.body': 'Cuando las personas saben qué esperar, y cuándo, todo lo demás se vuelve más tranquilo.',
      'manifesto.kicker': 'Creamos tecnología pensada que respeta el tiempo de las personas.',
      'manifesto.statement': 'Si no se siente tranquilo, no sale a producción.',
      'industries.eyebrow': 'A quién servimos',
      'industries.heading': 'Industrias con las que trabajamos.',
      'industries.item1.title': 'Servicios locales',
      'industries.item1.body': 'Barberías, salones, clínicas, talleres: cualquier lugar donde se forme una fila.',
      'industries.item2.title': 'Transporte',
      'industries.item2.body': 'Despacho, rutas, pantallas digitales y flujo de pasajeros que se mantiene predecible.',
      'industries.item3.title': 'Almacén y logística',
      'industries.item3.body': 'Programación de muelles, pantallas digitales y operaciones sin el caos habitual.',
      'industries.item4.title': 'Agencias de viaje',
      'industries.item4.body': 'Herramientas de reservas e itinerarios pensadas para el tiempo real del cliente.',
      'industries.more': '…y muchas más industrias donde el tiempo es el producto.',
      'approach.eyebrow': 'Cómo trabajamos',
      'approach.heading': 'Desde la primera conversación hasta el producto en marcha.',
      'approach.step1.title': 'Escuchar',
      'approach.step1.body': 'Entendemos el flujo de trabajo real detrás de la solicitud, no solo la lista de funciones.',
      'approach.step2.title': 'Diseñar',
      'approach.step2.body': 'Prototipamos primero la versión más tranquila, luego la probamos con uso real.',
      'approach.step3.title': 'Construir',
      'approach.step3.body': 'Entregamos algo real, rápido y confiable, hecho para durar más allá del lanzamiento.',
      'approach.step4.title': 'Perfeccionar',
      'approach.step4.body': 'Seguimos ajustando después del lanzamiento, según el uso real de las personas.',
      'contact.eyebrow': 'Hablemos',
      'contact.heading': 'Cuéntanos qué te está frenando.',
      'contact.copy': 'Ya sea una idea inicial o un proyecto totalmente definido, nos gustaría escucharte. Normalmente respondemos en un día hábil.',
      'contact.location': 'Albany, NY',
      'footer.poweredby': 'Desarrollado por',
      'footer.tagline': 'Humano por Diseño',
      'footer.legal': '© {year} waitAround LLC. Humano por Diseño.'
    }
  };

  var LANG_KEY = 'waitaround-lang';
  var currentLang = localStorage.getItem(LANG_KEY) || 'en';

  function applyLang(lang) {
    var dict = translations[lang] || translations.en;
    document.documentElement.lang = lang;

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      var value = dict[key];
      if (value === undefined) return;
      if (key === 'footer.legal') {
        value = value.replace('{year}', currentYear);
      }
      el.innerHTML = value;
    });

    document.querySelectorAll('.lang-btn').forEach(function (btn) {
      btn.classList.toggle('is-active', btn.getAttribute('data-lang') === lang);
    });

    currentLang = lang;
    localStorage.setItem(LANG_KEY, lang);
  }

  document.querySelectorAll('.lang-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      applyLang(btn.getAttribute('data-lang'));
    });
  });

  applyLang(currentLang);
})();
