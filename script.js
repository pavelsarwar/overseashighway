const year=document.getElementById('year');if(year)year.textContent=new Date().getFullYear();

const FLAG_BASE='https://flagcdn.com/w40/';
const flags={malaysia:'my',australia:'au','new-zealand':'nz',uae:'ae',turkiye:'tr',saudi:'sa',thailand:'th',singapore:'sg',japan:'jp'};
const flagNames={MALAYSIA:'my',AUSTRALIA:'au','NEW ZEALAND':'nz','DUBAI / UAE':'ae',DUBAI:'ae',UAE:'ae','TÜRKİYE':'tr',TURKIYE:'tr','SAUDI ARABIA':'sa',SAUDI:'sa',THAILAND:'th',SINGAPORE:'sg',JAPAN:'jp'};
const flagImg=(code,cls='country-flag',alt='')=>`<img class="${cls}" src="${FLAG_BASE}${code}.png" alt="${alt}" loading="lazy">`;

const ui=document.createElement('style');ui.textContent=`
.brand{display:flex!important;align-items:center!important;flex:0 0 auto!important;text-decoration:none!important}.brand .brand-symbol{display:none!important}.brand-logo{display:block!important;width:184px!important;height:48px!important;object-fit:contain!important;object-position:left center!important}.site-footer .brand-logo{width:160px!important;height:44px!important}.nav-icon{width:18px;height:18px;display:inline-flex;align-items:center;justify-content:center;flex:0 0 18px}.nav-flag,.country-flag,.select-flag{width:22px;height:15px;object-fit:cover;border-radius:3px;box-shadow:0 0 0 1px rgba(16,42,67,.12);vertical-align:-2px;flex:0 0 auto}.country-flag{margin-right:7px}.desktop-nav a,.mobile-menu a{display:flex!important;align-items:center!important;gap:6px!important}.desktop-nav a::before{content:none!important}.custom-country-select{position:relative}.custom-country-trigger{width:100%;border:0;background:transparent;font:inherit;font-weight:700;color:var(--ink);display:flex;align-items:center;justify-content:space-between;gap:12px;padding:0;cursor:pointer;text-align:left}.custom-country-trigger .selected-country{display:flex;align-items:center;gap:9px}.country-options{position:absolute;left:-13px;right:-13px;top:calc(100% + 14px);background:#fff;border:1px solid var(--line);border-radius:15px;padding:7px;box-shadow:0 18px 45px rgba(16,42,67,.18);z-index:120;display:none;max-height:330px;overflow:auto}.custom-country-select.open .country-options{display:block}.country-option{width:100%;display:flex;align-items:center;gap:10px;border:0;background:#fff;color:var(--ink);padding:10px 11px;border-radius:10px;font:inherit;font-size:13px;font-weight:650;cursor:pointer;text-align:left}.country-option:hover{background:#f2f8fa}.form-note{font-size:11px;color:rgba(255,255,255,.74);margin:2px 2px 0}.submit-success{background:#e9f8f1;color:#176b4d;border:1px solid #b9e5d2;border-radius:12px;padding:12px 14px;margin-bottom:10px;font-size:13px;font-weight:700}@media(max-width:640px){.brand-logo{width:148px!important;height:40px!important}.site-footer .brand-logo{width:142px!important;height:39px!important}}
`;document.head.appendChild(ui);

// Exact approved logo files: dark version in header, white version in footer.
document.querySelectorAll('.brand').forEach(brand=>{const footer=!!brand.closest('.site-footer');brand.innerHTML=`<img class="brand-logo" src="${footer?'logo-white.png':'logo.png'}" alt="Overseas Highway">`;});

// Stable navigation. Real Malaysia flag image avoids Windows emoji rendering issues.
const navItems=[['index.html','⌂','Home'],['study.html','🎓','Study'],['migration.html','◎','Migration'],['tourism.html','✈','Tourism'],['investment.html','↗','Invest'],['malaysia.html',flagImg('my','nav-flag','Malaysia'),'Malaysia Hub']];
document.querySelectorAll('.desktop-nav,.mobile-menu').forEach(nav=>{nav.innerHTML=navItems.map(([href,icon,label])=>`<a href="${href}"><span class="nav-icon">${icon}</span><span>${label}</span></a>`).join('');});

// Replace country emoji/text markers with actual flag images. Supports cards containing multiple countries.
document.querySelectorAll('.destination-card>span,.content-card .kicker,.chips span,.malaysia-feature .kicker,.page-hero .kicker').forEach(el=>{
  const clean=el.textContent.replace(/[\p{Regional_Indicator}\p{Extended_Pictographic}\uFE0F]/gu,'').replace(/\s+/g,' ').trim();
  const upper=clean.toUpperCase();
  const found=[];
  Object.entries(flagNames).forEach(([name,code])=>{if(upper.includes(name)&&!found.includes(code))found.push(code);});
  if(found.length)el.innerHTML=found.map(code=>flagImg(code)).join('')+clean;
});

// Native <select> cannot reliably display image flags, so build an accessible custom destination dropdown with real images.
const destSelect=document.getElementById('destinationSelect');
if(destSelect){
  destSelect.style.display='none';
  const labels={malaysia:'Malaysia',australia:'Australia','new-zealand':'New Zealand',uae:'Dubai / UAE',turkiye:'Türkiye',saudi:'Saudi Arabia',thailand:'Thailand',singapore:'Singapore',japan:'Japan'};
  const custom=document.createElement('div');custom.className='custom-country-select';
  custom.innerHTML=`<button type="button" class="custom-country-trigger" aria-haspopup="listbox" aria-expanded="false"><span class="selected-country">Choose destination</span><span>⌄</span></button><div class="country-options" role="listbox">${Object.entries(labels).map(([value,label])=>`<button type="button" class="country-option" data-value="${value}">${flagImg(flags[value],'select-flag',label)}<span>${label}</span></button>`).join('')}</div>`;
  destSelect.parentElement.appendChild(custom);
  const trigger=custom.querySelector('.custom-country-trigger');
  trigger.addEventListener('click',()=>{custom.classList.toggle('open');trigger.setAttribute('aria-expanded',custom.classList.contains('open'));});
  custom.querySelectorAll('.country-option').forEach(btn=>btn.addEventListener('click',()=>{const value=btn.dataset.value;destSelect.value=value;const label=labels[value];trigger.querySelector('.selected-country').innerHTML=`${flagImg(flags[value],'select-flag',label)}<span>${label}</span>`;custom.classList.remove('open');trigger.setAttribute('aria-expanded','false');}));
  document.addEventListener('click',e=>{if(!custom.contains(e.target)){custom.classList.remove('open');trigger.setAttribute('aria-expanded','false');}});
}

const menuBtn=document.querySelector('.menu-btn'),mobileMenu=document.querySelector('.mobile-menu');if(menuBtn&&mobileMenu)menuBtn.addEventListener('click',()=>mobileMenu.classList.toggle('open'));
const path=location.pathname.split('/').pop()||'index.html';document.querySelectorAll('.desktop-nav a,.mobile-menu a').forEach(a=>{if((a.getAttribute('href')||'').split('#')[0]===path)a.classList.add('active')});

const exploreBtn=document.getElementById('exploreBtn');if(exploreBtn)exploreBtn.addEventListener('click',()=>{const service=document.getElementById('serviceSelect')?.value,destination=destSelect?.value;if(destination==='malaysia'){location.href='malaysia.html';return}const routes={study:'study.html',migration:'migration.html',tourism:'tourism.html',investment:'investment.html'};if(routes[service])location.href=routes[service];});

// Send all consultation enquiries to info.overseashighway@gmail.com through FormSubmit.
document.querySelectorAll('.consult-form').forEach(form=>{
  form.action='https://formsubmit.co/info.overseashighway@gmail.com';form.method='POST';
  const hidden={_subject:'New Overseas Highway Website Inquiry',_template:'table',_captcha:'false',_next:`https://pavelsarwar.github.io/overseashighway/${path}?submitted=1#consultation`};
  Object.entries(hidden).forEach(([name,value])=>{let input=form.querySelector(`input[name="${name}"]`);if(!input){input=document.createElement('input');input.type='hidden';input.name=name;form.appendChild(input)}input.value=value;});
  if(!form.querySelector('[name="message"]')){const message=document.createElement('textarea');message.name='message';message.placeholder='Tell us briefly about your plan';message.rows=3;message.style.cssText='border:1px solid rgba(255,255,255,.22);background:rgba(255,255,255,.96);border-radius:12px;padding:14px;font:inherit;color:var(--ink);resize:vertical';form.insertBefore(message,form.querySelector('button'));}
  const note=document.createElement('div');note.className='form-note';note.textContent='Your inquiry will be sent securely to Overseas Highway.';form.appendChild(note);
});
if(new URLSearchParams(location.search).get('submitted')==='1'){const form=document.querySelector('.consult-form');if(form){const msg=document.createElement('div');msg.className='submit-success';msg.textContent='Thank you. Your inquiry has been submitted.';form.prepend(msg);}}
