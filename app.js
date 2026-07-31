const WORKOUTS = {
  PUSH:{label:'DÍA 1 — PUSH',subtitle:'Pecho, hombros y tríceps · ~45 min',blocks:[
    {title:'Bloque 1',kind:'solo',ex:[
      ['Press banca','3×6-8','RIR 2','Descanso 2 min','Tempo 2-0-1'],
      ['Press inclinado con mancuernas','3×8-10','RIR 2','Descanso 2 min']
    ]},
    {title:'Bloque 2',kind:'super',rest:'60-90 s después de ambos',ex:[
      ['Pec Deck','3×12-15','RIR 1-2','Dropset opcional: última serie, -25% peso'],
      ['Tríceps con cuerda','3×10-12','RIR 1-2']
    ]},
    {title:'Bloque 3',kind:'super',rest:'60-90 s después de ambos',rounds:['Vuelta 1: ambos','Vuelta 2: ambos','Vuelta 3: solo elevaciones laterales'],ex:[
      ['Press de hombros en máquina','2×8-10','RIR 2'],
      ['Elevaciones laterales','3×12-15','RIR 1-2']
    ]}
  ]},
  PULL:{label:'DÍA 2 — PULL',subtitle:'Espalda y bíceps · ~45 min',blocks:[
    {title:'Bloque 1',kind:'solo',ex:[
      ['Jalón al pecho','3×8-10','RIR 2','Descanso 2 min'],
      ['Remo con pecho apoyado con mancuernas','3×8-10','RIR 2','Descanso 2 min']
    ]},
    {title:'Bloque 2',kind:'super',rest:'60-90 s después de ambos',ex:[
      ['Remo sentado en polea','2×10-12','RIR 1-2'],
      ['Face Pull','2×12-15','RIR 1-2']
    ]},
    {title:'Bloque 3',kind:'super',rest:'60-90 s después de ambos',rounds:['Vuelta 1: ambos','Vuelta 2: ambos','Vuelta 3: solo curl inclinado'],ex:[
      ['Curl inclinado','3×10-12','RIR 1-2'],
      ['Curl en polea','2×12-15','RIR 1-2','Dropset opcional: última serie, -25% peso']
    ]}
  ]},
  PIERNAS:{label:'DÍA 3 — PIERNAS',subtitle:'Tren inferior · ~45 min',blocks:[
    {title:'Bloque 1',kind:'solo',ex:[
      ['Prensa','3×10','RIR 2','Descanso 2 min'],
      ['Sentadilla Smith','3×8-10','RIR 2','Descanso 2 min']
    ]},
    {title:'Bloque 2',kind:'super',rest:'90 s después de ambos',ex:[
      ['Curl femoral sentado','3×12','RIR 1-2'],
      ['Extensión de cuádriceps','3×12','RIR 1-2','Dropset opcional: última serie, -25% peso']
    ]},
    {title:'Bloque 3',kind:'super',rest:'60 s después de ambos',ex:[
      ['Gemelos en prensa','3×12-15','RIR 1-2'],
      ['Gemelos parado','3×15','RIR 1-2']
    ]}
  ]},
  UPPER:{label:'DÍA 4 — UPPER',subtitle:'Tren superior completo · ~45 min',blocks:[
    {title:'Bloque 1',kind:'solo',ex:[
      ['Press inclinado con barra','3×8','RIR 2','Descanso 2 min'],
      ['Remo en máquina','3×8','RIR 2','Descanso 2 min']
    ]},
    {title:'Bloque 2',kind:'super',rest:'90 s después de ambos',ex:[
      ['Press de pecho convergente','2×12','RIR 1-2'],
      ['Jalón unilateral','2×12','RIR 1-2']
    ]},
    {title:'Bloque 3',kind:'super',rest:'60-90 s después de ambos',ex:[
      ['Elevaciones laterales','3×15','RIR 1-2'],
      ['Tríceps con cuerda','3×10-12','RIR 1-2','Dropset opcional: última serie, -25% peso']
    ]},
    {title:'Bloque 4',kind:'super',rest:'60-90 s después de ambos',rounds:['Vuelta 1: ambos','Vuelta 2: ambos','Vuelta 3: solo curl en polea'],ex:[
      ['Curl en polea','3×10-12','RIR 1-2'],
      ['Extensión de tríceps por encima de la cabeza con cuerda','2×12-15','RIR 1-2']
    ]}
  ]}
};

const DAYS=['sun','mon','tue','wed','thu','fri','sat'];
const DAY_LABELS={mon:'Lunes',tue:'Martes',wed:'Miércoles',thu:'Jueves',fri:'Viernes',sat:'Sábado',sun:'Domingo'};
const DEFAULT={mon:'PUSH',tue:'PULL',wed:'PIERNAS',thu:'FUTBOL',fri:'UPPER',sat:'DESCANSO',sun:'DESCANSO'};
const OPTIONS=[['PUSH','PUSH'],['PULL','PULL'],['PIERNAS','PIERNAS'],['UPPER','UPPER'],['FUTBOL','Fútbol/Descanso'],['DESCANSO','Descanso']];
const SCHEDULE_KEY='gym.schedule.v1';
const TIMER_KEY='gym.timer.v1';
let tab='hoy';
let schedule=loadJSON(SCHEDULE_KEY,DEFAULT);
let timerEnd=loadJSON(TIMER_KEY,null);

function loadJSON(key,fallback){try{const raw=localStorage.getItem(key);return raw?JSON.parse(raw):fallback}catch{return fallback}}
function saveJSON(key,val){try{localStorage.setItem(key,JSON.stringify(val))}catch{}}
function todayKey(){return DAYS[new Date().getDay()]}
function render(){
  const current = tab==='hoy'?schedule[todayKey()]:({d1:'PUSH',d2:'PULL',d3:'PIERNAS',d4:'UPPER'}[tab]);
  document.getElementById('app').innerHTML=`<main class="app">
    <header class="header"><div><div class="eyebrow">Rutina semanal</div><h1 class="title">Mi Rutina</h1></div><div class="today">${DAY_LABELS[todayKey()]}</div></header>
    <nav class="tabs">${[['hoy','Hoy'],['d1','Día 1'],['d2','Día 2'],['d3','Día 3'],['d4','Día 4'],['ajustes','Ajustes']].map(([id,l])=>`<button class="tab ${tab===id?'active':''}" data-tab="${id}">${l}</button>`).join('')}</nav>
    ${tab==='ajustes'?settingsHTML():contentHTML(current)}
  </main><div class="timer-wrap">${timerHTML()}</div>`;
  bind();
}
function contentHTML(id){
  if(id==='DESCANSO'||id==='FUTBOL') return `<section class="hero"><div class="eyebrow">${DAY_LABELS[todayKey()]}</div><h2>${id==='FUTBOL'?'Fútbol / descanso':'Descanso'}</h2><p>${id==='FUTBOL'?'Hoy toca fútbol. Si no jugás, descansá tranquilo.':'Hoy no hay gym. Descansá, comé bien y dormí.'}</p></section>${helpHTML()}`;
  const w=WORKOUTS[id];
  return `<section class="hero"><div class="eyebrow">${tab==='hoy'?'Entrenamiento de hoy':'Rutina'}</div><h2>${w.label}</h2><p>${w.subtitle}</p></section>
  ${w.blocks.map(blockHTML).join('')}${helpHTML()}`;
}
function blockHTML(b){return `<section class="section card"><div class="card-head"><h3>${b.title}</h3><span class="badge ${b.kind==='super'?'super':''}">${b.kind==='super'?'Superserie':'Por separado'}</span></div>
  <div>${b.ex.map((e,i)=>exerciseHTML(e,i+1)).join('')}</div>
  ${(b.rest||b.rounds)?`<div class="card-foot">${b.rest?`<div><strong>Descanso:</strong> ${b.rest}</div>`:''}${b.rounds?`<div style="margin-top:6px"><strong>Vueltas:</strong><br>${b.rounds.map(x=>'· '+x).join('<br>')}</div>`:''}</div>`:''}</section>`}
function exerciseHTML(e,n){return `<div class="exercise"><div class="num">${n}</div><div><h4>${e[0]}</h4><div class="chips"><span class="chip primary">${e[1]}</span><span class="chip">${e[2]}</span>${e.slice(3).map(x=>`<span class="chip ${x.startsWith('Dropset')?'drop':''}">${x}</span>`).join('')}</div></div></div>`}
function helpHTML(){return `<section class="section card help"><h3>Ayuda rápida</h3><ul><li><strong>RIR 2:</strong> terminás sintiendo que podrías hacer 2 repeticiones más.</li><li><strong>Tempo 2-0-1:</strong> 2 segundos al bajar, sin pausa, 1 segundo al subir.</li><li><strong>Superserie:</strong> ejercicio A, luego B, después descansás.</li><li><strong>Dropset:</strong> solo en la última serie indicada; bajá ~25% el peso y seguí con buena técnica.</li></ul></section>`}
function settingsHTML(){return `<section class="section card settings"><h2>Plan semanal</h2><p>Elegí qué entrenamiento toca cada día. Se guarda en este celular.</p>${['mon','tue','wed','thu','fri','sat','sun'].map(d=>`<div class="setting-row"><label>${DAY_LABELS[d]}</label><select data-day="${d}">${OPTIONS.map(([v,l])=>`<option value="${v}" ${schedule[d]===v?'selected':''}>${l}</option>`).join('')}</select></div>`).join('')}</section>${helpHTML()}`}
function timerHTML(){const rem=timerEnd?timerEnd-Date.now():0;const active=rem>0;return `<div class="timer"><div class="timer-time ${active?'':'idle'}" id="timerText">${active?format(rem):'0:00'}</div><div class="timer-buttons">${[60,90,120].map(s=>`<button data-timer="${s}">${s}s</button>`).join('')}<button class="stop" data-stop>Stop</button></div></div>`}
function bind(){
  document.querySelectorAll('[data-tab]').forEach(b=>b.onclick=()=>{tab=b.dataset.tab;render()});
  document.querySelectorAll('[data-day]').forEach(s=>s.onchange=()=>{schedule={...schedule,[s.dataset.day]:s.value};saveJSON(SCHEDULE_KEY,schedule);render()});
  document.querySelectorAll('[data-timer]').forEach(b=>b.onclick=()=>startTimer(Number(b.dataset.timer)));
  const stop=document.querySelector('[data-stop]');if(stop)stop.onclick=stopTimer;
}
function startTimer(sec){timerEnd=Date.now()+sec*1000;saveJSON(TIMER_KEY,timerEnd);render()}
function stopTimer(){timerEnd=null;localStorage.removeItem(TIMER_KEY);render()}
function format(ms){const t=Math.max(0,Math.ceil(ms/1000));return `${Math.floor(t/60)}:${String(t%60).padStart(2,'0')}`}
setInterval(()=>{if(!timerEnd)return;const rem=timerEnd-Date.now();const el=document.getElementById('timerText');if(rem<=0){timerEnd=null;localStorage.removeItem(TIMER_KEY);if(navigator.vibrate)navigator.vibrate([200,100,200]);if(el){el.textContent='0:00';el.classList.add('idle')}}else if(el){el.textContent=format(rem);el.classList.remove('idle')}},250);
render();
