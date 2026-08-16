(() => {
  // Remove the generic hero eyebrow on the homepage.
  document.querySelectorAll('.hero .kicker').forEach(el => {
    if (el.textContent.trim().toUpperCase() === 'GLOBAL MOBILITY • EDUCATION • INVESTMENT') el.remove();
  });

  const style = document.createElement('style');
  style.textContent = `
    /* More distinctive hero spacing after removing the eyebrow */
    .hero-copy h1{margin-top:0}

    /* Subtle motion across key cards — no constant distracting movement */
    .service-card,.destination-card,.office-card,.trust-points>div,.app-grid a,.malaysia-stack a{
      transition:transform .32s ease,box-shadow .32s ease,border-color .32s ease;
    }
    .service-card:hover,.destination-card:hover,.office-card:hover,.trust-points>div:hover,.malaysia-stack a:hover{
      transform:translateY(-5px);
      box-shadow:0 18px 42px rgba(16,42,67,.10);
    }

    /* Social area: make it feel like a dedicated brand channel hub */
    .social-network{
      position:relative;
      overflow:hidden;
      margin-top:34px!important;
      padding:24px!important;
      border-top:0!important;
      border:1px solid rgba(255,255,255,.12)!important;
      border-radius:22px;
      background:linear-gradient(135deg,rgba(245,158,11,.12),rgba(24,166,184,.10),rgba(255,255,255,.035));
      box-shadow:inset 0 1px 0 rgba(255,255,255,.06);
    }
    .social-network:before{
      content:'SOCIAL CHANNELS';
      display:inline-flex;
      padding:5px 9px;
      margin-bottom:10px;
      border-radius:999px;
      background:rgba(245,158,11,.14);
      color:#ffd37b;
      font-size:9px;
      font-weight:800;
      letter-spacing:.14em;
    }
    .social-network>strong{
      display:block!important;
      margin:0 0 16px!important;
      font-family:'Manrope','Inter',sans-serif;
      font-size:clamp(20px,2.3vw,28px);
      letter-spacing:-.025em;
      color:#fff;
    }
    .social-links{gap:10px!important}
    .social-links a{
      min-height:42px;
      padding:10px 14px!important;
      border-radius:13px!important;
      background:rgba(255,255,255,.075)!important;
      border:1px solid rgba(255,255,255,.12)!important;
      font-size:12px!important;
      transition:transform .25s ease,background .25s ease,border-color .25s ease!important;
    }
    .social-links a:hover{
      transform:translateY(-3px);
      background:rgba(255,255,255,.13)!important;
      border-color:rgba(245,158,11,.42)!important;
    }

    /* A restrained travel motif: plane rises across the global-presence area */
    .global-offices{position:relative!important;overflow:hidden!important}
    .flight-path{
      position:absolute;
      left:-60px;
      bottom:18px;
      z-index:0;
      font-size:22px;
      opacity:.16;
      pointer-events:none;
      filter:grayscale(1) brightness(2);
      animation:overseasFlight 18s linear infinite;
    }
    .global-offices>.container{position:relative;z-index:1}
    @keyframes overseasFlight{
      0%{transform:translate(0,45px) rotate(-18deg);opacity:0}
      10%{opacity:.16}
      75%{opacity:.16}
      100%{transform:translate(calc(100vw + 120px),-310px) rotate(-18deg);opacity:0}
    }

    /* Gentle reveal when sections enter the viewport */
    .motion-reveal{opacity:0;transform:translateY(18px);transition:opacity .65s ease,transform .65s ease}
    .motion-reveal.is-visible{opacity:1;transform:none}

    @media (prefers-reduced-motion:reduce){
      .flight-path{display:none!important}
      .motion-reveal{opacity:1!important;transform:none!important;transition:none!important}
      .service-card,.destination-card,.office-card,.trust-points>div,.app-grid a,.malaysia-stack a{transition:none!important}
    }
    @media(max-width:640px){
      .social-network{padding:19px!important}
      .flight-path{font-size:18px;animation-duration:14s}
    }
  `;
  document.head.appendChild(style);

  const offices = document.querySelector('.global-offices');
  if (offices && !offices.querySelector('.flight-path')) {
    const plane = document.createElement('span');
    plane.className = 'flight-path';
    plane.setAttribute('aria-hidden','true');
    plane.textContent = '✈';
    offices.appendChild(plane);
  }

  const revealTargets = document.querySelectorAll('.service-card,.destination-card,.office-card,.trust-points>div');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {threshold:.12});
    revealTargets.forEach((el,i) => {
      el.classList.add('motion-reveal');
      el.style.transitionDelay = `${Math.min(i % 4,3) * 65}ms`;
      observer.observe(el);
    });
  }
})();