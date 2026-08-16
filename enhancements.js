(() => {
  // Remove the generic hero eyebrow on the homepage.
  document.querySelectorAll('.hero .kicker').forEach(el => {
    if (el.textContent.trim().toUpperCase() === 'GLOBAL MOBILITY • EDUCATION • INVESTMENT') el.remove();
  });

  const style = document.createElement('style');
  style.textContent = `
    .hero-copy h1{margin-top:0}

    /* Subtle motion across key cards */
    .service-card,.destination-card,.office-card,.trust-points>div,.app-grid a,.malaysia-stack a{
      transition:transform .32s ease,box-shadow .32s ease,border-color .32s ease;
    }
    .service-card:hover,.destination-card:hover,.office-card:hover,.trust-points>div:hover,.malaysia-stack a:hover{
      transform:translateY(-5px);
      box-shadow:0 18px 42px rgba(16,42,67,.10);
    }

    /* Social area: clean highlighted panel, no line under the buttons */
    .social-network{
      position:relative;
      overflow:hidden;
      margin-top:34px!important;
      padding:24px!important;
      border:0!important;
      border-top:0!important;
      border-bottom:0!important;
      border-radius:22px;
      background:linear-gradient(135deg,rgba(245,158,11,.12),rgba(24,166,184,.10),rgba(255,255,255,.035));
      box-shadow:inset 0 0 0 1px rgba(255,255,255,.08),0 12px 34px rgba(0,0,0,.10);
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
      border:0!important;
    }
    .social-network:after{display:none!important;content:none!important}
    .social-network>strong{
      display:block!important;
      margin:0 0 16px!important;
      padding:0!important;
      border:0!important;
      font-family:'Manrope','Inter',sans-serif;
      font-size:clamp(20px,2.3vw,28px);
      letter-spacing:-.025em;
      color:#fff;
    }
    .social-links{
      gap:10px!important;
      margin:0!important;
      padding:0!important;
      padding-bottom:0!important;
      border:0!important;
      border-bottom:0!important;
    }
    .social-links:after{display:none!important;content:none!important}
    .social-links a{
      min-height:42px;
      padding:10px 14px!important;
      margin-bottom:0!important;
      border-radius:13px!important;
      background:rgba(255,255,255,.075)!important;
      border:1px solid rgba(255,255,255,.12)!important;
      text-decoration:none!important;
      box-shadow:none!important;
      font-size:12px!important;
      transition:transform .25s ease,background .25s ease,border-color .25s ease!important;
    }
    .social-links a:hover{
      transform:translateY(-3px);
      background:rgba(255,255,255,.13)!important;
      border-color:rgba(245,158,11,.42)!important;
    }

    /* Plane animation belongs in the hero, not the footer */
    .hero{position:relative!important;overflow:hidden!important;isolation:isolate}
    .hero>.container{position:relative;z-index:2}
    .hero-flight-path{
      position:absolute;
      left:-70px;
      bottom:10%;
      z-index:1;
      font-size:26px;
      color:rgba(255,255,255,.68);
      pointer-events:none;
      filter:drop-shadow(0 5px 10px rgba(0,0,0,.12));
      animation:heroFlight 15s cubic-bezier(.22,.61,.36,1) infinite;
    }
    .hero-flight-path:after{
      content:'';
      position:absolute;
      width:140px;
      height:1px;
      right:20px;
      top:50%;
      background:linear-gradient(90deg,transparent,rgba(255,255,255,.18));
      transform:rotate(2deg);
    }
    @keyframes heroFlight{
      0%,10%{transform:translate(0,38px) rotate(-18deg);opacity:0}
      17%{opacity:.62}
      70%{opacity:.58}
      86%,100%{transform:translate(calc(100vw + 140px),-250px) rotate(-18deg);opacity:0}
    }

    /* Gentle reveal */
    .motion-reveal{opacity:0;transform:translateY(18px);transition:opacity .65s ease,transform .65s ease}
    .motion-reveal.is-visible{opacity:1;transform:none}

    @media (prefers-reduced-motion:reduce){
      .hero-flight-path{display:none!important}
      .motion-reveal{opacity:1!important;transform:none!important;transition:none!important}
      .service-card,.destination-card,.office-card,.trust-points>div,.app-grid a,.malaysia-stack a{transition:none!important}
    }
    @media(max-width:640px){
      .social-network{padding:19px!important}
      .hero-flight-path{font-size:20px;animation-duration:13s}
    }
  `;
  document.head.appendChild(style);

  // Remove any previously injected footer plane.
  document.querySelectorAll('.global-offices .flight-path').forEach(el => el.remove());

  const hero = document.querySelector('.hero');
  if (hero && !hero.querySelector('.hero-flight-path')) {
    const plane = document.createElement('span');
    plane.className = 'hero-flight-path';
    plane.setAttribute('aria-hidden','true');
    plane.textContent = '✈';
    hero.appendChild(plane);
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