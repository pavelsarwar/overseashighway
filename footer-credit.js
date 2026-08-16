(() => {
  const style=document.createElement('style');
  style.textContent=`
    .footer-bottom{display:grid!important;grid-template-columns:minmax(0,1fr) auto minmax(0,1fr)!important;gap:18px!important;align-items:center!important}
    .footer-bottom .developer-credit{justify-self:center;display:inline-flex;align-items:center;gap:6px;color:#b9cad6;text-decoration:none;font-size:11px;font-weight:600;white-space:nowrap;transition:color .2s ease,transform .2s ease}
    .footer-bottom .developer-credit .heart{color:#ff6b6b;font-size:13px;display:inline-block;animation:ohHeart 1.8s ease-in-out infinite}
    .footer-bottom .developer-credit strong{color:#fff;font-weight:700}
    .footer-bottom .developer-credit:hover{color:#fff;transform:translateY(-1px)}
    @keyframes ohHeart{0%,100%{transform:scale(1)}50%{transform:scale(1.16)}}
    @media(max-width:760px){.footer-bottom{grid-template-columns:1fr!important;text-align:center!important;gap:9px!important}.footer-bottom>span,.footer-bottom .developer-credit{justify-self:center!important}.footer-bottom .developer-credit{order:2}.footer-bottom>span:last-child{order:3}}
    @media(prefers-reduced-motion:reduce){.footer-bottom .developer-credit .heart{animation:none}}
  `;
  document.head.appendChild(style);

  document.querySelectorAll('.site-footer .footer-bottom').forEach(bottom=>{
    if(bottom.querySelector('.developer-credit')) return;
    const credit=document.createElement('a');
    credit.className='developer-credit';
    credit.href='https://www.facebook.com/asmpavelsarwar';
    credit.target='_blank';
    credit.rel='noopener';
    credit.setAttribute('aria-label','Developed with love by Pavel');
    credit.innerHTML='Developed with <span class="heart" aria-hidden="true">♥</span> <strong>Pavel</strong>';
    const spans=bottom.querySelectorAll(':scope > span');
    if(spans.length>1) bottom.insertBefore(credit,spans[1]); else bottom.appendChild(credit);
  });
})();
