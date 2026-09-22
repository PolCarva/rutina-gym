const WORKOUTS = {
  PIERNAS:{label:'DÍA 1 — PIERNAS',subtitle:'Tren inferior · 50–60 min',blocks:[
    {title:'Bloque 1',kind:'solo',ex:[
      ['Sentadilla Smith','3×6–10','RIR 2 / 2 / 1–2','Descanso 2–3 min','Tempo 2-0-X','Rango completo tolerable']
    ]},
    {title:'Bloque 2',kind:'solo',ex:[
      ['Peso muerto rumano','3×6–10','RIR 2 / 2 / 1','Descanso 2–3 min','Tempo 3-0-1','Cadera atrás · rodillas levemente flexionadas · columna estable']
    ]},
    {title:'Bloque 3',kind:'solo',ex:[
      ['Prensa','2×10–15','RIR 1–2','Descanso 90–120 s','Profundidad alta manteniendo pelvis y espalda estables']
    ]},
    {title:'Bloque 4',kind:'super',rest:'75–90 s después de ambos',ex:[
      ['Curl femoral sentado','3×10–15','RIR 1–2'],
      ['Extensión de cuádriceps','3×10–15','RIR 1–2','Dropset opcional: última serie, -20/25% peso']
    ]},
    {title:'Bloque 5',kind:'solo',ex:[
      ['Gemelos de pie o en prensa (rodilla extendida)','3×10–20','RIR 0–2','Descanso 60–75 s','Pausa breve en máxima dorsiflexión · no rebotar']
    ]}
  ]},

  PUSH:{label:'DÍA 2 — PUSH',subtitle:'Pecho superior, pecho, deltoide lateral y tríceps · 45–55 min',blocks:[
    {title:'Bloque 1',kind:'solo',ex:[
      ['Press inclinado Smith (20–30°)','3×6–10','RIR 2 / 2 / 1','Descanso 2–3 min','Tempo 2-0-X','Prioridad estética: pecho superior'],
      ['Press banca plano con barra','3×6–10','RIR 1–2','Descanso 2–3 min','Tempo 2-0-X','Va segundo: priorizamos pecho superior, no 1RM de banca']
    ]},
    {title:'Bloque 2',kind:'super',rest:'60–90 s después de ambos',rounds:['Vuelta 1: ambos','Vuelta 2: ambos','Vuelta 3: solo tríceps'],ex:[
      ['Pec Deck','2×12–15','RIR 1','Estiramiento controlado'],
      ['Extensión de tríceps overhead con cuerda','3×10–15','RIR 1–2']
    ]},
    {title:'Bloque 3',kind:'solo',ex:[
      ['Elevación lateral en polea','4×12–20','RIR 1 / 1 / 1 / 0–1','Descanso 45–60 s','Dropset opcional: última serie, -20/25% peso']
    ]}
  ]},

  PULL:{label:'DÍA 3 — PULL',subtitle:'Anchura + espesor de espalda, deltoide posterior y bíceps · 45–55 min',blocks:[
    {title:'Bloque 1',kind:'solo',ex:[
      ['Jalón al pecho','3×8–12','RIR 2 / 2 / 1','Descanso 2 min','Agarre cómodo, aprox. hombros o apenas más ancho'],
      ['Remo con pecho apoyado','3×8–12','RIR 2 / 2 / 1','Descanso 2 min','Sin impulso del torso']
    ]},
    {title:'Bloque 2',kind:'super',rest:'60–90 s después de ambos',ex:[
      ['Reverse Pec Deck','3×12–20','RIR 1–2'],
      ['Curl inclinado con mancuernas','3×8–12','RIR 1–2']
    ]},
    {title:'Bloque 3',kind:'super',rest:'60–75 s después de ambos',ex:[
      ['Pullover en polea / jalón brazos rectos','2×10–15','RIR 1–2'],
      ['Curl en polea','2×10–15','RIR 1','Dropset opcional: última serie, -20/25% peso']
    ]}
  ]},

  UPPER:{label:'DÍA 4 — UPPER',subtitle:'Segundo estímulo de torso · alta densidad · 45–55 min',blocks:[
    {title:'Bloque 1',kind:'super',rest:'Press → 30–45 s → Jalón → 90–120 s → repetir',ex:[
      ['Press convergente ligeramente inclinado (15–30°)','3×8–12','RIR 1–2'],
      ['Jalón unilateral','3×8–12 por lado','RIR 1–2']
    ]},
    {title:'Bloque 2',kind:'super',rest:'75–90 s después de ambos',ex:[
      ['Remo en máquina','3×8–12','RIR 1–2'],
      ['Elevaciones laterales','3×12–20','RIR 1–2','Dropset opcional: última serie']
    ]},
    {title:'Bloque 3',kind:'super',rest:'60–75 s después de ambos',ex:[
      ['Curl en polea','3×10–15','RIR 1–2'],
      ['Tríceps con cuerda','3×10–15','RIR 1–2']
    ]}
  ]}
};

const DAYS=['sun','mon','tue','wed','thu','fri','sat'];
const DAY_LABELS={mon:'Lunes',tue:'Martes',wed:'Miércoles',thu:'Jueves',fri:'Viernes',sat:'Sábado',sun:'Domingo'};
const DEFAULT={mon:'PIERNAS',tue:'PUSH',wed:'PULL',thu:'FUTBOL',fri:'UPPER',sat:'DESCANSO',sun:'DESCANSO'};
const OPTIONS=[['PIERNAS','Día 1 · Piernas'],['PUSH','Día 2 · Push'],['PULL','Día 3 · Pull'],['UPPER','Día 4 · Upper'],['FUTBOL','Fútbol/Descanso'],['DESCANSO','Descanso']];
const SCHEDULE_KEY='gym.schedule.v2';
const TIMER_KEY='gym.timer.v1';
let tab='hoy';
let schedule=loadJSON(SCHEDULE_KEY,DEFAULT);
let timerEnd=loadJSON(TIMER_KEY,null);

function loadJSON(key,fallback){try{const raw=localStorage.getItem(key);return raw?JSON.parse(raw):fallback}catch{return fallback}}
function saveJSON(key,val){try{localStorage.setItem(key,JSON.stringify(val))}catch{}}
function todayKey(){return DAYS[new Date().getDay()]}

function render(){
  const current = tab==='hoy'?schedule[todayKey()]:({d1:'PIERNAS',d2:'PUSH',d3:'PULL',d4:'UPPER'}[tab]);
  document.getElementById('app').innerHTML=`<main class="app">
    <header class="header"><div><div class="eyebrow">Estética + hipertrofia</div><h1 class="title">Mi Rutina</h1></div><div class="today">${DAY_LABELS[todayKey()]}</div></header>
    <nav class="tabs">${[['hoy','Hoy'],['d1','Día 1'],['d2','Día 2'],['d3','Día 3'],['d4','Día 4'],['guia','Guía'],['ajustes','Ajustes']].map(([id,l])=>`<button class="tab ${tab===id?'active':''}" data-tab="${id}">${l}</button>`).join('')}</nav>
    ${tab==='ajustes'?settingsHTML():tab==='guia'?guideHTML():contentHTML(current)}
  </main><div class="timer-wrap">${timerHTML()}</div>`;
  bind();
}

function contentHTML(id){
  if(id==='DESCANSO'||id==='FUTBOL') return `<section class="hero"><div class="eyebrow">${DAY_LABELS[todayKey()]}</div><h2>${id==='FUTBOL'?'Fútbol / descanso':'Descanso'}</h2><p>${id==='FUTBOL'?'El fútbol cuenta como fatiga de piernas, sprints, impacto y acondicionamiento; no como series de hipertrofia.':'Hoy no hay gym. Priorizá recuperación, comida y sueño.'}</p></section>${helpHTML()}`;
  const w=WORKOUTS[id];
  return `<section class="hero"><div class="eyebrow">${tab==='hoy'?'Entrenamiento de hoy':'Rutina estable de referencia'}</div><h2>${w.label}</h2><p>${w.subtitle}</p></section>
  ${w.blocks.map(blockHTML).join('')}${helpHTML()}`;
}

function blockHTML(b){return `<section class="section card"><div class="card-head"><h3>${b.title}</h3><span class="badge ${b.kind==='super'?'super':''}">${b.kind==='super'?'Superserie':'Por separado'}</span></div>
  <div>${b.ex.map((e,i)=>exerciseHTML(e,i+1)).join('')}</div>
  ${(b.rest||b.rounds)?`<div class="card-foot">${b.rest?`<div><strong>Descanso:</strong> ${b.rest}</div>`:''}${b.rounds?`<div style="margin-top:6px"><strong>Vueltas:</strong><br>${b.rounds.map(x=>'· '+x).join('<br>')}</div>`:''}</div>`:''}</section>`}

function exerciseHTML(e,n){return `<div class="exercise"><div class="num">${n}</div><div><h4>${e[0]}</h4><div class="chips"><span class="chip primary">${e[1]}</span><span class="chip">${e[2]}</span>${e.slice(3).map(x=>`<span class="chip ${x.startsWith('Dropset')?'drop':''}">${x}</span>`).join('')}</div></div></div>`}

function helpHTML(){return `<section class="section card help"><h3>Reglas rápidas</h3><ul>
<li><strong>Compuestos:</strong> normalmente 1–2 RIR. No buscar fallo deliberado.</li>
<li><strong>Aislamientos:</strong> normalmente 0–2 RIR; última serie puede llegar a 0–1 RIR / fallo técnico controlado.</li>
<li><strong>Tempo:</strong> excéntrica ~2–3 s controlada, sin rebotes, concéntrica con intención rápida. Aproximadamente 2-0-X.</li>
<li><strong>Calentamiento:</strong> 2–3 series de aproximación antes del primer ejercicio importante; no cuentan como efectivas.</li>
<li><strong>Dropsets:</strong> opcionales, máximo habitual 1–2 por sesión. No usarlos en RDL, Smith, banca, presses pesados ni remos pesados.</li>
</ul></section>`}

function guideHTML(){return `<section class="hero"><div class="eyebrow">Versión base estable</div><h2>Cómo progresar sin cambiar por cambiar</h2><p>Solo modificar ejercicios por rendimiento, recuperación, molestias, equipamiento, preferencia fuerte o cambio de prioridad.</p></section>
<section class="section card help"><h3>Distribución semanal</h3><ul>
<li><strong>Lunes:</strong> Día 1 · Piernas</li><li><strong>Martes:</strong> Día 2 · Push</li><li><strong>Miércoles:</strong> Día 3 · Pull</li><li><strong>Jueves:</strong> Fútbol / descanso</li><li><strong>Viernes:</strong> Día 4 · Upper</li><li><strong>Sábado/Domingo:</strong> descanso</li>
<li>Piernas va el lunes para dejar ~72 h antes del fútbol.</li></ul></section>
<section class="section card help"><h3>Doble progresión</h3><ul>
<li>Mantené peso hasta alcanzar el tope del rango en todas las series con técnica, ROM y RIR objetivo.</li>
<li>Después subí el incremento mínimo disponible y volvé a la zona baja/media del rango.</li>
<li>Orientativo: tren superior +2–5%; tren inferior +2,5–5%.</li>
<li>Registrá cada serie efectiva como <strong>peso × reps @ RIR</strong>.</li></ul></section>
<section class="section card help"><h3>Volumen semanal aprox.</h3><ul>
<li>Pecho: ~11 series directas</li><li>Espalda/dorsales: ~14</li><li>Deltoide lateral: 7 + dropsets opcionales</li><li>Deltoide posterior: 3 + remos indirectos</li><li>Bíceps: 8 directas + tirones</li><li>Tríceps: 6 directas + presses</li><li>Cuádriceps: 8 + fútbol como fatiga</li><li>Isquios: 6 + fútbol como fatiga</li><li>Gemelos: 3 directas + carga deportiva</li></ul></section>
<section class="section card help"><h3>Cuándo cambiar un ejercicio</h3><ul>
<li>Dolor o molestias persistentes.</li><li>Sin progreso durante varias semanas tras revisar técnica, volumen y recuperación.</li><li>El patrón no se adapta bien a tu anatomía.</li><li>Falta equipamiento.</li><li>Existe una alternativa que disfrutás claramente más y cumple la misma función.</li><li>Si funciona y progresa, mantenelo normalmente 6–10+ semanas.</li></ul></section>
<section class="section card help"><h3>Deload</h3><ul>
<li>No programarlo automáticamente cada 4 semanas.</li><li>Considerarlo si aparecen juntos caída de rendimiento, cargas anormalmente pesadas, dolores articulares, mala recuperación y cansancio persistente.</li><li>Durante ~1 semana: -30–50% series, ~3–4 RIR, sin dropsets.</li></ul></section>
<section class="section card help"><h3>Superseries</h3><ul>
<li><strong>Muy buenas:</strong> pecho + espalda, bíceps + tríceps, rear delt + bíceps, laterales + remo, cuádriceps + isquios.</li>
<li><strong>Usar con cuidado:</strong> press + laterales, remo + curl, jalón + curl.</li>
<li><strong>Evitar como base:</strong> press + press, curl + curl, RDL + curl femoral, Smith + prensa.</li></ul></section>`}

function settingsHTML(){return `<section class="section card settings"><h2>Plan semanal</h2><p>Elegí qué entrenamiento toca cada día. Se guarda en este celular.</p><button class="copy-btn full" data-copy-all>Copiar toda la rutina</button>${['mon','tue','wed','thu','fri','sat','sun'].map(d=>`<div class="setting-row"><label>${DAY_LABELS[d]}</label><select data-day="${d}">${OPTIONS.map(([v,l])=>`<option value="${v}" ${schedule[d]===v?'selected':''}>${l}</option>`).join('')}</select></div>`).join('')}</section>${helpHTML()}`}

function timerHTML(){const rem=timerEnd?timerEnd-Date.now():0;const active=rem>0;return `<div class="timer"><div class="timer-time ${active?'':'idle'}" id="timerText">${active?format(rem):'0:00'}</div><div class="timer-buttons">${[60,75,90,120,180].map(s=>`<button data-timer="${s}">${s<60?s+'s':(s/60)+'m'}</button>`).join('')}<button class="stop" data-stop>Stop</button></div></div>`}

function bind(){
  document.querySelectorAll('[data-tab]').forEach(b=>b.onclick=()=>{tab=b.dataset.tab;render()});
  document.querySelectorAll('[data-day]').forEach(s=>s.onchange=()=>{schedule={...schedule,[s.dataset.day]:s.value};saveJSON(SCHEDULE_KEY,schedule);render()});
  document.querySelectorAll('[data-timer]').forEach(b=>b.onclick=()=>startTimer(Number(b.dataset.timer)));
  const stop=document.querySelector('[data-stop]');if(stop)stop.onclick=stopTimer;
}

function workoutText(id){
  const w=WORKOUTS[id];
  const lines=[w.label,w.subtitle,''];
  w.blocks.forEach(b=>{
    lines.push(b.title+(b.kind==='super'?' — Superserie':' — Por separado'));
    b.ex.forEach((e,i)=>{lines.push(`${i+1}. ${e[0]} — ${e.slice(1).join(' · ')}`);});
    if(b.rest) lines.push('Descanso: '+b.rest);
    if(b.rounds) lines.push('Vueltas: '+b.rounds.join(' · '));
    lines.push('');
  });
  return lines.join('\n').trim();
}
function allRoutineText(){
  return ['RUTINA 4 DÍAS — ESTÉTICA + HIPERTROFIA','Lunes: Piernas · Martes: Push · Miércoles: Pull · Jueves: Fútbol/descanso · Viernes: Upper','',''+workoutText('PIERNAS'),'',''+workoutText('PUSH'),'',''+workoutText('PULL'),'',''+workoutText('UPPER')].join('\n');
}
async function copyText(text,button){
  try{
    await navigator.clipboard.writeText(text);
    const old=button.textContent;button.textContent='Copiado ✓';button.classList.add('copied');
    setTimeout(()=>{button.textContent=old;button.classList.remove('copied')},1400);
  }catch{
    const ta=document.createElement('textarea');ta.value=text;ta.style.position='fixed';ta.style.opacity='0';document.body.appendChild(ta);ta.select();document.execCommand('copy');ta.remove();
    const old=button.textContent;button.textContent='Copiado ✓';setTimeout(()=>button.textContent=old,1400);
  }
}
function copyWorkout(id,button){copyText(workoutText(id),button)}
function copyRoutine(button){copyText(allRoutineText(),button)}

function startTimer(sec){timerEnd=Date.now()+sec*1000;saveJSON(TIMER_KEY,timerEnd);render()}
function stopTimer(){timerEnd=null;localStorage.removeItem(TIMER_KEY);render()}
function format(ms){const t=Math.max(0,Math.ceil(ms/1000));return `${Math.floor(t/60)}:${String(t%60).padStart(2,'0')}`}

setInterval(()=>{if(!timerEnd)return;const rem=timerEnd-Date.now();const el=document.getElementById('timerText');if(rem<=0){timerEnd=null;localStorage.removeItem(TIMER_KEY);if(navigator.vibrate)navigator.vibrate([200,100,200]);if(el){el.textContent='0:00';el.classList.add('idle')}}else if(el){el.textContent=format(rem);el.classList.remove('idle')}},250);
render();
