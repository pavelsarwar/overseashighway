document.addEventListener('DOMContentLoaded',()=>{
  const hero=document.querySelector('.hero');
  if(hero){
    const firstKicker=hero.querySelector('.hero-copy .kicker');
    if(firstKicker&&firstKicker.textContent.trim()==='GLOBAL MOBILITY • EDUCATION • INVESTMENT') firstKicker.remove();

    const flight=document.createElement('div');
    flight.className='hero-flight';
    flight.setAttribute('aria-hidden','true');
    flight.innerHTML='<span class="flight-trail"></span><span class="flight-plane">✈</span>';
    hero.appendChild(flight);
  }

  const social=document.querySelector('.social-network');
  if(social){
    social.classList.add('social-network-premium');
    const title=social.querySelector(':scope > strong');
    if(title){
      title.innerHTML='<span class="social-eyebrow">SOCIAL CHANNELS</span><span class="social-title">Connect with Overseas Highway</span>';
    }
  }

  const style=document.createElement('style');
  style.textContent=`
    .hero{isolation:isolate}
    .hero-flight{position:absolute;inset:0;pointer-events:none;overflow:hidden;z-index:1}
    .hero-flight .flight-plane{position:absolute;left:-9%;bottom:10%;font-size:28px;color:rgba(255,255,255,.72);filter:drop-shadow(0 5px 10px rgba(0,0,0,.14));transform:rotate(-18deg);animation:heroTakeoff 12s cubic-bezier(.3,.1,.25,1) infinite}
    .hero-flight .flight-trail{position:absolute;left:-14%;bottom:13%;width:180px;height:1px;background:linear-gradient(90deg,transparent,rgba(255,255,255,.22),transparent);transform:rotate(-18deg);animation:trailTakeoff 12s cubic-bezier(.3,.1,.25,1) infinite}
    @keyframes heroTakeoff{0%,12%{transform:translate(0,0) rotate(-18deg);opacity:0}18%{opacity:.75}62%{opacity:.72}78%,100%{transform:translate(118vw,-48vh) rotate(-18deg);opacity:0}}
    @keyframes trailTakeoff{0%,12%{transform:translate(0,0) rotate(-18deg);opacity:0}18%{opacity:.45}62%{opacity:.35}78%,100%{transform:translate(118vw,-48vh) rotate(-18deg);opacity:0}}

    .social-network-premium{margin-top:30px!important;padding:22px!important;border:0!important;border-top:0!important;border-bottom:0!important;border-radius:18px;background:linear-gradient(135deg,rgba(255,255,255,.07),rgba(245,158,11,.055));box-shadow:inset 0 0 0 1px rgba(255,255,255,.08)}
    .social-network-premium::before,.social-network-premium::after{display:none!important;content:none!important}
    .social-network-premium>strong{display:flex!important;flex-direction:column;gap:3px;margin:0 0 14px!important;border:0!important;padding:0!important}
    .social-eyebrow{font-size:9px;letter-spacing:.18em;color:#f6b84d;font-weight:800}
    .social-title{font-size:18px;line-height:1.2;color:#fff;font-weight:800}
    .social-network-premium .social-links{border:0!important;border-bottom:0!important;padding-bottom:0!important;margin-bottom:0!important}
    .social-network-premium .social-links a{border:1px solid rgba(255,255,255,.12)!important;text-decoration:none!important;box-shadow:none!important;transition:transform .22s ease,background .22s ease,border-color .22s ease}
    .social-network-premium .social-links a:hover{transform:translateY(-2px);background:rgba(255,255,255,.11)!important;border-color:rgba(245,158,11,.42)!important}

    @media(max-width:640px){.hero-flight .flight-plane{font-size:22px}.social-network-premium{padding:18px!important}.social-title{font-size:16px}}
    @media(prefers-reduced-motion:reduce){.hero-flight{display:none}.social-network-premium .social-links a{transition:none!important}}
  `;
  document.head.appendChild(style);
});
