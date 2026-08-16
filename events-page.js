(() => {
  const cfg = window.OVERSEAS_EVENTS_CONFIG || {};
  const homepageGrid = document.getElementById('homepageEventsGrid');
  const upcomingGrid = document.getElementById('upcomingEventsGrid');
  const pastGrid = document.getElementById('pastEventsGrid');

  const escapeHtml = value => String(value ?? '').replace(/[&<>'"]/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[ch]));

  function parseCsv(text){
    const rows=[];let row=[],cell='',quoted=false;
    for(let i=0;i<text.length;i++){
      const c=text[i],n=text[i+1];
      if(c==='"'&&quoted&&n==='"'){cell+='"';i++;continue}
      if(c==='"'){quoted=!quoted;continue}
      if(c===','&&!quoted){row.push(cell);cell='';continue}
      if((c==='\n'||c==='\r')&&!quoted){if(c==='\r'&&n==='\n')i++;row.push(cell);if(row.some(v=>v.trim()!==''))rows.push(row);row=[];cell='';continue}
      cell+=c;
    }
    if(cell||row.length){row.push(cell);if(row.some(v=>v.trim()!==''))rows.push(row)}
    if(!rows.length)return [];
    const headers=rows.shift().map(h=>h.trim());
    return rows.map(r=>Object.fromEntries(headers.map((h,i)=>[h,(r[i]||'').trim()])));
  }

  function formatDateTime(iso){
    const d=new Date(iso); if(Number.isNaN(d.getTime())) return {date:'Date TBA',time:'Time TBA'};
    const date=new Intl.DateTimeFormat('en',{weekday:'long',day:'2-digit',month:'short',year:'numeric'}).format(d);
    const time=new Intl.DateTimeFormat('en',{hour:'numeric',minute:'2-digit'}).format(d);
    return {date,time};
  }

  function eventEnd(e){
    const raw=e.EndDateTime||e.StartDateTime;const d=new Date(raw);return Number.isNaN(d.getTime())?new Date(8640000000000000):d;
  }

  function card(e,past=false){
    const start=e.StartDateTime||''; const f=formatDateTime(start);
    const title=escapeHtml(e.Title||'Untitled Event');
    const location=escapeHtml(e.Location||'Location TBA');
    const desc=escapeHtml(e.Description||'');
    const category=escapeHtml(e.Category||'EVENT').toUpperCase();
    const url=(e.RegisterURL||'').trim();
    return `<article class="event-card">
      <div class="event-title-row"><span class="event-pill">${category}</span>${past?'<span class="event-status">PAST EVENT</span>':''}</div>
      <h3>${title}</h3>
      <div class="event-meta">
        <div class="event-meta-row"><span class="event-meta-icon">▣</span><span>${escapeHtml(f.date)}</span></div>
        <div class="event-meta-row"><span class="event-meta-icon">◷</span><span>${escapeHtml(f.time)}</span></div>
        <div class="event-meta-row"><span class="event-meta-icon">●</span><span>${location}</span></div>
      </div>
      ${desc?`<p class="event-description">${desc}</p>`:''}
      ${url&&!past?`<div class="event-action"><a href="${escapeHtml(url)}" target="_blank" rel="noopener">Register / Learn More →</a></div>`:''}
    </article>`;
  }

  function setState(el,html){if(el)el.innerHTML=html}

  async function load(){
    if(!cfg.sheetId){
      const empty='<div class="events-empty"><strong>Events calendar ready.</strong><br>Connect the Google Sheet to publish upcoming events automatically.</div>';
      setState(homepageGrid,empty);setState(upcomingGrid,empty);setState(pastGrid,'');return;
    }
    const url=`https://docs.google.com/spreadsheets/d/${encodeURIComponent(cfg.sheetId)}/export?format=csv&gid=${encodeURIComponent(cfg.gid||'0')}`;
    try{
      const res=await fetch(url,{cache:'no-store'}); if(!res.ok)throw new Error('Unable to load events');
      const events=parseCsv(await res.text()).filter(e=>e.Title&&e.StartDateTime);
      const now=new Date();
      const upcoming=events.filter(e=>eventEnd(e)>=now).sort((a,b)=>new Date(a.StartDateTime)-new Date(b.StartDateTime));
      const past=events.filter(e=>eventEnd(e)<now).sort((a,b)=>new Date(b.StartDateTime)-new Date(a.StartDateTime));
      if(homepageGrid){const items=upcoming.slice(0,Number(cfg.homepageLimit)||2);setState(homepageGrid,items.length?items.map(e=>card(e)).join(''):'<div class="events-empty">No upcoming events at the moment.</div>')}
      if(upcomingGrid)setState(upcomingGrid,upcoming.length?upcoming.map(e=>card(e)).join(''):'<div class="events-empty">No upcoming events at the moment.</div>');
      if(pastGrid)setState(pastGrid,past.length?past.map(e=>card(e,true)).join(''):'<div class="events-empty">Past events will appear here automatically.</div>');
    }catch(err){
      const msg='<div class="events-error">Events could not be loaded right now. Please try again shortly.</div>';
      setState(homepageGrid,msg);setState(upcomingGrid,msg);
    }
  }
  load();
})();
