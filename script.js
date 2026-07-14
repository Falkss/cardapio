/* ====================================================================
   FOGO & BRASA BURGERS — script.js
   ====================================================================
   Este arquivo controla apenas COMPORTAMENTOS (menu, scroll, animações).
   Para editar textos, preços ou imagens, vá no arquivo index.html.
   Para editar cores e fontes, vá no arquivo style.css.

   ÍNDICE RÁPIDO:
   1. LOADING SCREEN
   2. NAVBAR (fundo ao rolar + menu mobile)
   3. SCROLL SUAVE PARA OS LINKS DO MENU
   4. SCROLL REVEAL (animação ao aparecer na tela)
   5. BOTÃO VOLTAR AO TOPO
   6. PARALLAX LEVE NO HERO
   7. ANO ATUAL NO RODAPÉ
==================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  /* ==================================================================
     2. NAVBAR — muda de transparente para sólida ao rolar a página
     e controla a abertura/fechamento do menu mobile.
  ================================================================== */
  const navbar = document.getElementById('navbar');
  const menuToggle = document.getElementById('menu-toggle');
  const navLinks = document.getElementById('nav-links');

  function updateNavbarBackground() {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
  updateNavbarBackground();
  window.addEventListener('scroll', updateNavbarBackground);

  // Abre/fecha o menu no celular
  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  // Fecha o menu mobile automaticamente ao clicar em um link
  document.querySelectorAll('.nav-link').forEach((link) => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });


  /* ==================================================================
     3. SCROLL SUAVE
     O scroll suave já é feito via CSS (scroll-behavior: smooth),
     mas aqui garantimos compatibilidade e o ajuste fino do offset
     da navbar fixa em todos os links internos (começam com "#").
  ================================================================== */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId.length > 1) {
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          const offset = 80; // altura aproximada da navbar fixa
          const top = targetEl.getBoundingClientRect().top + window.pageYOffset - offset;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      }
    });
  });


  /* ==================================================================
     4. SCROLL REVEAL
     Todo elemento com o atributo "data-reveal" no HTML ganha a classe
     "revealed" assim que entra na tela, disparando a animação
     definida em style.css (seção 12. ANIMAÇÕES).
  ================================================================== */
  const revealElements = document.querySelectorAll('[data-reveal]');

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          revealObserver.unobserve(entry.target); // anima só uma vez
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px',
    }
  );

  revealElements.forEach((el) => revealObserver.observe(el));


  /* ==================================================================
     5. BOTÃO VOLTAR AO TOPO
     Aparece depois que o usuário rola uma certa distância da página.
  ================================================================== */
  const backToTopBtn = document.getElementById('back-to-top');

  function toggleBackToTop() {
    if (window.scrollY > 500) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  }
  toggleBackToTop();
  window.addEventListener('scroll', toggleBackToTop);

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });


  /* ==================================================================
     6. PARALLAX LEVE NO HERO
     Move sutilmente o elemento de "brasas" do Hero conforme o
     usuário rola a página, criando profundidade.
  ================================================================== */
  const parallaxEl = document.querySelector('[data-parallax]');

  function updateParallax() {
    if (!parallaxEl) return;
    // Só aplica em telas maiores (evita jank em celulares)
    if (window.innerWidth > 768) {
      const offset = window.scrollY * 0.25;
      parallaxEl.style.transform = `translateY(${offset}px)`;
    }
  }
  window.addEventListener('scroll', updateParallax);


  /* ==================================================================
     7. ANO ATUAL NO RODAPÉ
     Atualiza automaticamente o ano do copyright — nunca fica
     desatualizado.
  ================================================================== */
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

});
