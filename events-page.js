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

  function normalizeDate(raw){
    const s=String(raw||'').trim();
    if(!s)return '';
    let m;
    if((m=s.match(/^(\d{4})[-/](\d{1,2})[-/](\d{1,2})$/))) return `${m[1]}-${m[2].padStart(2,'0')}-${m[3].padStart(2,'0')}`;
    if((m=s.match(/^(\d{1,2})[/-](\d{1,2})[/-](\d{4})$/))){
      const a=Number(m[1]), b=Number(m[2]);
      // Your current sheet uses DD/MM/YYYY. If the first number is >12 it is definitely the day.
      // For ambiguous dates we also default to DD/MM/YYYY to match the sheet's current format.
      const day=a, month=b;
      if(month<1||month>12||day<1||day>31)return '';
      return `${m[3]}-${String(month).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
    }
    const d=new Date(s);
    if(Number.isNaN(d.getTime()))return '';
    return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
  }

  function normalizeTime(raw, fallback='00:00:00'){
    const s=String(raw||'').trim();
    if(!s)return fallback;
    const m=s.match(/^(\d{1,2}):(\d{2})(?::(\d{2}))?\s*(AM|PM)?$/i);
    if(!m)return fallback;
    let h=Number(m[1]);const min=m[2];const sec=m[3]||'00';const ap=(m[4]||'').toUpperCase();
    if(ap==='PM'&&h<12)h+=12;if(ap==='AM'&&h===12)h=0;
    return `${String(h).padStart(2,'0')}:${min}:${sec}`;
  }

  function buildDateTime(dateRaw,timeRaw,end=false){
    const date=normalizeDate(dateRaw);if(!date)return null;
    const time=normalizeTime(timeRaw,end?'23:59:59':'00:00:00');
    const d=new Date(`${date}T${time}+08:00`);
    return Number.isNaN(d.getTime())?null:d;
  }

  function eventStart(e){
    if(e.StartDateTime){const d=new Date(e.StartDateTime);if(!Number.isNaN(d.getTime()))return d;}
    return buildDateTime(e['Start Date'],e['Start Time'],false);
  }

  function eventEnd(e){
    if(e.EndDateTime){const d=new Date(e.EndDateTime);if(!Number.isNaN(d.getTime()))return d;}
    return buildDateTime(e['End Date']||e['Start Date'],e['End Time'],true) || eventStart(e) || new Date(8640000000000000);
  }

  function formatDateTime(dateObj){
    const d=dateObj instanceof Date?dateObj:new Date(dateObj);
    if(Number.isNaN(d.getTime())) return {date:'Date TBA',time:'Time TBA'};
    const options={timeZone:'Asia/Kuala_Lumpur'};
    return {
      date:new Intl.DateTimeFormat('en',{...options,weekday:'long',day:'2-digit',month:'short',year:'numeric'}).format(d),
      time:new Intl.DateTimeFormat('en',{...options,hour:'numeric',minute:'2-digit'}).format(d)
    };
  }

  function getField(e,...names){for(const n of names){if(e[n])return e[n]}return ''}
  function cleanUrl(raw){let s=String(raw||'').trim();if(!s)return '';s=s.replace(/^https?:\/\/https?:\/\//i,'https://');if(/^www\./i.test(s))s='https://'+s;return s;}

  function card(e,past=false){
    const f=formatDateTime(eventStart(e));
    const title=escapeHtml(e.Title||'Untitled Event');
    const location=escapeHtml(e.Location||'Location TBA');
    const desc=escapeHtml(getField(e,'Description','description'));
    const category=escapeHtml(getField(e,'Category','category')||'EVENT').toUpperCase();
    const url=cleanUrl(getField(e,'RegisterURL','Register URL','Registration URL','registration_link','Registration Link','Link','URL'));
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

  const setState=(el,html)=>{if(el)el.innerHTML=html};

  async function load(){
    if(!cfg.sheetId){
      const empty='<div class="events-empty"><strong>Events calendar ready.</strong><br>Connect the Google Sheet to publish upcoming events automatically.</div>';
      setState(homepageGrid,empty);setState(upcomingGrid,empty);setState(pastGrid,'');return;
    }
    const url=`https://docs.google.com/spreadsheets/d/${encodeURIComponent(cfg.sheetId)}/export?format=csv&gid=${encodeURIComponent(cfg.gid||'0')}`;
    try{
      const res=await fetch(url,{cache:'no-store'});if(!res.ok)throw new Error('Unable to load events');
      const events=parseCsv(await res.text()).filter(e=>e.Title&&eventStart(e));
      const now=new Date();
      const upcoming=events.filter(e=>eventEnd(e)>=now).sort((a,b)=>eventStart(a)-eventStart(b));
      const past=events.filter(e=>eventEnd(e)<now).sort((a,b)=>eventStart(b)-eventStart(a));
      if(homepageGrid){const items=upcoming.slice(0,Number(cfg.homepageLimit)||2);setState(homepageGrid,items.length?items.map(e=>card(e)).join(''):'<div class="events-empty">No upcoming events at the moment.</div>')}
      if(upcomingGrid)setState(upcomingGrid,upcoming.length?upcoming.map(e=>card(e)).join(''):'<div class="events-empty">No upcoming events at the moment.</div>');
      if(pastGrid)setState(pastGrid,past.length?past.map(e=>card(e,true)).join(''):'<div class="events-empty">Past events will appear here automatically.</div>');
    }catch(err){
      console.error('Events load error:',err);
      const msg='<div class="events-error">Events could not be loaded right now. Please try again shortly.</div>';
      setState(homepageGrid,msg);setState(upcomingGrid,msg);
    }
  }
  load();
})();
