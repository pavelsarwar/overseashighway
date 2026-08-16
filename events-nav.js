(() => {
  document.querySelectorAll('.desktop-nav,.mobile-menu').forEach(nav => {
    if (nav.querySelector('a[href="events.html"]')) return;
    const link=document.createElement('a');
    link.href='events.html';
    link.innerHTML='<span class="nav-icon">▣</span><span>Events</span>';
    const malaysia=nav.querySelector('a[href="malaysia.html"]');
    if(malaysia) nav.insertBefore(link,malaysia); else nav.appendChild(link);
  });
  const path=location.pathname.split('/').pop()||'index.html';
  if(path==='events.html') document.querySelectorAll('a[href="events.html"]').forEach(a=>a.classList.add('active'));
})();
