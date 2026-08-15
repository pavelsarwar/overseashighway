const year=document.getElementById('year');if(year)year.textContent=new Date().getFullYear();

const navIcons={
  'index.html':'⌂',
  'study.html':'🎓',
  'migration.html':'🌐',
  'tourism.html':'✈️',
  'investment.html':'↗',
  'malaysia.html':'🇲🇾'
};
const navLabels={
  'index.html':'Home',
  'study.html':'Study',
  'migration.html':'Migration',
  'tourism.html':'Tourism',
  'investment.html':'Invest',
  'malaysia.html':'Malaysia Hub'
};

document.querySelectorAll('.desktop-nav,.mobile-menu').forEach(nav=>{
  const links=[...nav.querySelectorAll('a')];
  const hasHome=links.some(a=>(a.getAttribute('href')||'').split('#')[0]==='index.html');
  if(!hasHome){
    const home=document.createElement('a');
    home.href='index.html';
    nav.prepend(home);
  }
  [...nav.querySelectorAll('a')].forEach(a=>{
    const href=(a.getAttribute('href')||'').split('#')[0];
    if(navIcons[href]&&navLabels[href]) a.textContent=`${navIcons[href]} ${navLabels[href]}`;
  });
});

const uiFix=document.createElement('style');
uiFix.textContent=`
.desktop-nav a::before{content:none!important}
.site-footer{padding:34px 0 22px!important}
.footer-bottom{margin-top:20px!important;padding-top:14px!important}
@media(max-width:640px){
  .site-footer{padding:28px 0 72px!important}
  .footer-bottom{margin-top:16px!important;padding-top:12px!important}
}
`;
document.head.appendChild(uiFix);

const menuBtn=document.querySelector('.menu-btn'),mobileMenu=document.querySelector('.mobile-menu');if(menuBtn&&mobileMenu)menuBtn.addEventListener('click',()=>mobileMenu.classList.toggle('open'));

const path=location.pathname.split('/').pop()||'index.html';document.querySelectorAll('.desktop-nav a').forEach(a=>{if((a.getAttribute('href')||'').split('#')[0]===path)a.classList.add('active')});

const exploreBtn=document.getElementById('exploreBtn');if(exploreBtn)exploreBtn.addEventListener('click',()=>{const service=document.getElementById('serviceSelect').value,destination=document.getElementById('destinationSelect').value;if(destination==='malaysia'){location.href='malaysia.html';return}const routes={study:'study.html',migration:'migration.html',tourism:'tourism.html',investment:'investment.html'};location.href=routes[service]||'#services'});

document.querySelectorAll('.consult-form').forEach(form=>form.addEventListener('submit',e=>{e.preventDefault();const data=new FormData(form),name=data.get('name')||'',service=data.get('service')||'general consultation';const msg=`Hello Overseas Highway, I am ${name}. I would like to discuss ${service}.`;window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`,'_blank')}));

// Preserve the approved Overseas Highway logo exactly as supplied.
const officialLogo='data:image/png;base64,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';
document.querySelectorAll('.brand-symbol').forEach(el=>{el.style.backgroundImage=`url(${officialLogo})`;el.style.width='220px';el.style.height='58px';el.style.backgroundSize='contain';el.style.backgroundRepeat='no-repeat';el.style.backgroundPosition='left center';});
if(window.matchMedia('(max-width:640px)').matches){document.querySelectorAll('.brand-symbol').forEach(el=>{el.style.width='170px';el.style.height='46px';});}
