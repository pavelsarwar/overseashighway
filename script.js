const year=document.getElementById('year');if(year)year.textContent=new Date().getFullYear();
const menuBtn=document.querySelector('.menu-btn'),mobileMenu=document.querySelector('.mobile-menu');
if(menuBtn&&mobileMenu)menuBtn.addEventListener('click',()=>mobileMenu.classList.toggle('open'));
const path=location.pathname.split('/').pop()||'index.html';
document.querySelectorAll('.desktop-nav a,.mobile-menu a').forEach(a=>{if((a.getAttribute('href')||'').split('#')[0]===path)a.classList.add('active')});
const exploreBtn=document.getElementById('exploreBtn');
if(exploreBtn)exploreBtn.addEventListener('click',()=>{const service=document.getElementById('serviceSelect')?.value,destination=document.getElementById('destinationSelect')?.value;if(destination==='malaysia'){location.href='malaysia.html';return;}const routes={study:'study.html',migration:'migration.html',tourism:'tourism.html',investment:'investment.html'};if(routes[service])location.href=routes[service];});
document.querySelectorAll('.consult-form').forEach(form=>form.addEventListener('submit',e=>{e.preventDefault();const data=new FormData(form),name=data.get('name')||'',service=data.get('service')||'general consultation';window.open(`https://wa.me/?text=${encodeURIComponent(`Hello Overseas Highway, I am ${name}. I would like to discuss ${service}.`)}`,'_blank')}));