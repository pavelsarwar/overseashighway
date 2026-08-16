(() => {
  if (document.getElementById('homepageEventsSection')) return;
  const anchor = document.querySelector('.service-grid')?.closest('section');
  if (!anchor) return;

  const section = document.createElement('section');
  section.id = 'homepageEventsSection';
  section.className = 'events-section homepage-events-section';
  section.innerHTML = `<div class="container"><div class="events-head"><div><div class="events-eyebrow">▣ EVENTS CALENDAR</div><h2>Upcoming Events</h2></div><div class="events-head-side"><p>Meet, learn and explore opportunities with Overseas Highway.</p><a href="events.html">View all events →</a></div></div><div id="homepageEventsGrid" class="events-grid"><div class="events-loading">Loading upcoming events…</div></div></div>`;
  anchor.insertAdjacentElement('afterend', section);

  if (!document.querySelector('link[href="events.css"]')) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'events.css';
    document.head.appendChild(link);
  }

  const loadScript = src => new Promise((resolve,reject)=>{
    if (document.querySelector(`script[src="${src}"]`)) return resolve();
    const s=document.createElement('script');s.src=src;s.onload=resolve;s.onerror=reject;document.body.appendChild(s);
  });

  loadScript('events-config.js').then(()=>loadScript('events-page.js')).catch(()=>{
    const grid=document.getElementById('homepageEventsGrid');
    if(grid)grid.innerHTML='<div class="events-error">Events could not be loaded right now.</div>';
  });
})();
