const year=document.getElementById('year');if(year)year.textContent=new Date().getFullYear();

const ui=document.createElement('style');ui.textContent=`
.brand{display:flex!important;align-items:center!important;flex:0 0 auto!important}
.brand .brand-symbol{display:none!important}
.brand-logo{display:block!important;width:180px!important;height:auto!important;max-height:48px!important;object-fit:contain!important;object-position:left center!important}
.nav-icon{width:17px;height:17px;display:inline-flex;align-items:center;justify-content:center;flex:0 0 17px}
.nav-flag,.country-flag{width:20px;height:14px;object-fit:cover;border-radius:2px;box-shadow:0 0 0 1px rgba(16,42,67,.08);vertical-align:-2px;margin-right:7px}
.desktop-nav a,.mobile-menu a{display:flex!important;align-items:center!important;gap:6px!important}
.desktop-nav a::before{content:none!important}
@media(max-width:640px){.brand-logo{width:150px!important;max-height:40px!important}}
`;document.head.appendChild(ui);

document.querySelectorAll('.brand').forEach(brand=>{
  brand.innerHTML='<img class="brand-logo" src="./logo.png?v=4" alt="Overseas Highway">';
});

const navItems=[
  ['index.html','⌂','Home'],
  ['study.html','🎓','Study'],
  ['migration.html','🌐','Migration'],
  ['tourism.html','✈','Tourism'],
  ['investment.html','↗','Invest'],
  ['malaysia.html','<img class="nav-flag" src="https://flagcdn.com/w40/my.png" alt="Malaysia">','Malaysia Hub']
];
document.querySelectorAll('.desktop-nav,.mobile-menu').forEach(nav=>{
  nav.innerHTML=navItems.map(([href,icon,label])=>`<a href="${href}"><span class="nav-icon">${icon}</span><span>${label}</span></a>`).join('');
});

const countryFlags={
  'MALAYSIA':'my','AUSTRALIA':'au','NEW ZEALAND':'nz','DUBAI / UAE':'ae','DUBAI':'ae','UAE':'ae','TÜRKİYE':'tr','TURKIYE':'tr','SAUDI ARABIA':'sa','SAUDI':'sa','THAILAND':'th','SINGAPORE':'sg','JAPAN':'jp'
};
document.querySelectorAll('.destination-card>span,.content-card .kicker,.chips span').forEach(el=>{
  let text=el.textContent.trim().replace(/^[\p{Extended_Pictographic}\p{Regional_Indicator}\s]+/u,'').trim();
  let code=null;
  for(const [name,c] of Object.entries(countryFlags)){if(text.toUpperCase().includes(name)){code=c;break;}}
  if(code)el.innerHTML=`<img class="country-flag" src="https://flagcdn.com/w40/${code}.png" alt="">${text}`;
});

const menuBtn=document.querySelector('.menu-btn'),mobileMenu=document.querySelector('.mobile-menu');
if(menuBtn&&mobileMenu)menuBtn.addEventListener('click',()=>mobileMenu.classList.toggle('open'));
const path=location.pathname.split('/').pop()||'index.html';
document.querySelectorAll('.desktop-nav a,.mobile-menu a').forEach(a=>{if((a.getAttribute('href')||'').split('#')[0]===path)a.classList.add('active')});
const exploreBtn=document.getElementById('exploreBtn');
if(exploreBtn)exploreBtn.addEventListener('click',()=>{const service=document.getElementById('serviceSelect')?.value,destination=document.getElementById('destinationSelect')?.value;if(destination==='malaysia'){location.href='malaysia.html';return;}const routes={study:'study.html',migration:'migration.html',tourism:'tourism.html',investment:'investment.html'};if(routes[service])location.href=routes[service];});
document.querySelectorAll('.consult-form').forEach(form=>form.addEventListener('submit',e=>{e.preventDefault();const data=new FormData(form),name=data.get('name')||'',service=data.get('service')||'general consultation';window.open(`https://wa.me/?text=${encodeURIComponent(`Hello Overseas Highway, I am ${name}. I would like to discuss ${service}.`)}`,'_blank')}));