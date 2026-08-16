(() => {
  if(!document.querySelector('link[href="events.css"]')){const l=document.createElement('link');l.rel='stylesheet';l.href='events.css';document.head.appendChild(l)}
  const services=document.querySelector('.service-grid')?.closest('section');
  if(services&&!document.getElementById('homepageEvents')){
    const section=document.createElement('section');
    section.id='homepageEvents';section.className='events-section';
    section.innerHTML=`<div class="container"><div class="events-head"><div><div class="events-eyebrow">▣ EVENTS CALENDAR</div><h2>Upcoming Events</h2></div><p>Meet our advisors, explore global opportunities and join Overseas Highway sessions near you.</p></div><div id="homepageEventsGrid" class="events-grid"><div class="events-loading">Loading upcoming events…</div></div><div class="events-more"><a href="events.html">View all events →</a></div></div>`;
    services.insertAdjacentElement('afterend',section);
  }
  const load=(src)=>new Promise((resolve,reject)=>{if(document.querySelector(`script[src="${src}"]`)){resolve();return}const s=document.createElement('script');s.src=src;s.onload=resolve;s.onerror=reject;document.body.appendChild(s)});
  load('events-nav.js').then(()=>load('events-config.js')).then(()=>load('events-page.js'));
})();
