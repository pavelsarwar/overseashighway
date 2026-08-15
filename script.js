const year=document.getElementById('year');if(year)year.textContent=new Date().getFullYear();

const navItems=[['index.html','⌂','Home'],['study.html','🎓','Study'],['migration.html','🌐','Migration'],['tourism.html','✈️','Tourism'],['investment.html','↗','Invest'],['malaysia.html','🇲🇾','Malaysia Hub']];

document.querySelectorAll('.desktop-nav,.mobile-menu').forEach(nav=>{
  const existing=[...nav.querySelectorAll('a')];
  if(!existing.some(a=>(a.getAttribute('href')||'').split('#')[0]==='index.html')){
    const home=document.createElement('a');home.href='index.html';nav.prepend(home);
  }
  [...nav.querySelectorAll('a')].forEach(a=>{
    const href=(a.getAttribute('href')||'').split('#')[0];
    const item=navItems.find(i=>i[0]===href);
    if(item)a.textContent=`${item[1]} ${item[2]}`;
  });
});

// Use the exact manually uploaded logo.png file. No recreation or crop.
document.querySelectorAll('.brand-symbol').forEach(el=>{
  el.style.background='none';
  el.innerHTML='';
  const img=document.createElement('img');
  img.src='./logo.png?v=20260815-manual';
  img.alt='Overseas Highway';
  img.className='official-logo';
  el.appendChild(img);
});

const fix=document.createElement('style');
fix.textContent=`
.desktop-nav a::before{content:none!important}
.brand-symbol{display:flex!important;align-items:center!important;width:190px!important;height:48px!important;flex:0 0 190px!important;background:none!important;overflow:visible!important}
.official-logo{display:block!important;width:100%!important;height:100%!important;object-fit:contain!important;object-position:left center!important;max-width:none!important}
.site-footer{padding:30px 0 18px!important}
.footer-bottom{margin-top:18px!important;padding-top:12px!important}
.site-footer .brand-symbol{width:170px!important;height:44px!important;flex-basis:170px!important}
@media(max-width:640px){
 .brand-symbol{width:150px!important;height:40px!important;flex-basis:150px!important}
 .site-footer{padding:24px 0 70px!important}
 .site-footer .brand-symbol{width:145px!important;height:38px!important;flex-basis:145px!important}
 .footer-bottom{margin-top:14px!important;padding-top:10px!important}
}`;
document.head.appendChild(fix);

const menuBtn=document.querySelector('.menu-btn'),mobileMenu=document.querySelector('.mobile-menu');
if(menuBtn&&mobileMenu)menuBtn.addEventListener('click',()=>mobileMenu.classList.toggle('open'));

const path=location.pathname.split('/').pop()||'index.html';
document.querySelectorAll('.desktop-nav a').forEach(a=>{if((a.getAttribute('href')||'').split('#')[0]===path)a.classList.add('active')});

const exploreBtn=document.getElementById('exploreBtn');
if(exploreBtn)exploreBtn.addEventListener('click',()=>{
 const service=document.getElementById('serviceSelect').value,destination=document.getElementById('destinationSelect').value;
 if(destination==='malaysia'){location.href='malaysia.html';return}
 const routes={study:'study.html',migration:'migration.html',tourism:'tourism.html',investment:'investment.html'};
 location.href=routes[service]||'#services';
});

document.querySelectorAll('.consult-form').forEach(form=>form.addEventListener('submit',e=>{
 e.preventDefault();
 const data=new FormData(form),name=data.get('name')||'',service=data.get('service')||'general consultation';
 const msg=`Hello Overseas Highway, I am ${name}. I would like to discuss ${service}.`;
 window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`,'_blank');
}));