/* ═══════════════════════════════════════════════════
   Avi Goyal Portfolio — Main JavaScript
   Sections:
   1.  Custom Cursor
   2.  Navigation (scroll, hamburger)
   3.  Hero Typing Animation
   4.  Neural Network Canvas (hero)
   5.  Education Roadmap Walker
   6.  Experience Timeline
   7.  Metric Counters
   8.  Skill Progress Bars
   9.  Project Carousel
   10. Filterable Project Grid
   11. Radar Chart
   12. Benchmark Chart
   13. Scroll Progress Bar
   14. Back to Top
   15. Toast Notification
   16. Intersection Observer (animations)
   17. Interactive Terminal
   18. AI Chat Widget
   19. Easter Egg
   20. 3D Tilt Cards
   21. Background Starfield Canvas
   22. CV Download
   23. Language Switcher (EN/DE)
═══════════════════════════════════════════════════ */

// ── CUSTOM CURSOR ──
(function(){
  const dot  = document.getElementById('custom-cursor');
  const ring = document.getElementById('cursor-ring');
  if(!dot || !ring) return;

  let mx=0, my=0, rx=0, ry=0;

  document.addEventListener('mousemove', e=>{
    mx = e.clientX; my = e.clientY;
    dot.style.left  = mx + 'px';
    dot.style.top   = my + 'px';
  });

  // Smooth ring follow with lag
  (function animRing(){
    rx += (mx - rx) * 0.1;
    ry += (my - ry) * 0.1;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(animRing);
  })();

  // Hover state
  document.addEventListener('mouseover', e=>{
    if(e.target.closest('a,button,[role="button"],.ctrl-btn,.filter-btn,.view-btn,.ca,.cbtn,.cdot,.edu-node,.term-hint span'))
      document.body.classList.add('cursor-hover');
  });
  document.addEventListener('mouseout', e=>{
    if(e.target.closest('a,button,[role="button"],.ctrl-btn,.filter-btn,.view-btn,.ca,.cbtn,.cdot,.edu-node,.term-hint span'))
      document.body.classList.remove('cursor-hover');
  });

  // Click burst
  document.addEventListener('mousedown', e=>{
    document.body.classList.add('cursor-click');
    const b = document.createElement('div');
    b.className='star-burst';
    b.style.cssText=`left:${e.clientX}px;top:${e.clientY}px;width:44px;height:44px;border:1.5px solid var(--cyan);border-radius:50%;box-shadow:0 0 12px var(--cyan),0 0 24px var(--blue2)`;
    document.body.appendChild(b);
    // Extra micro dots
    for(let i=0;i<6;i++){
      const a = (i/6)*Math.PI*2;
      const spark = document.createElement('div');
      spark.style.cssText=`position:fixed;pointer-events:none;z-index:9997;width:4px;height:4px;border-radius:50%;background:var(--cyan);left:${e.clientX}px;top:${e.clientY}px;transform:translate(-50%,-50%);animation:sparkDot${i} .45s ease forwards`;
      const tx = Math.cos(a)*22, ty = Math.sin(a)*22;
      document.head.insertAdjacentHTML('beforeend',`<style>@keyframes sparkDot${i}{0%{opacity:1;transform:translate(-50%,-50%)}100%{opacity:0;transform:translate(calc(-50% + ${tx}px),calc(-50% + ${ty}px)) scale(0)}}
</style>`);
      document.body.appendChild(spark);
      setTimeout(()=>spark.remove(), 460);
    }
    setTimeout(()=>b.remove(), 520);
  });
  document.addEventListener('mouseup', ()=>document.body.classList.remove('cursor-click'));

  document.addEventListener('mouseleave', ()=>{ dot.style.opacity='0'; ring.style.opacity='0'; });
  document.addEventListener('mouseenter', ()=>{ dot.style.opacity='1'; ring.style.opacity='1'; });
})();

// ── NAV ──
window.addEventListener('scroll',()=>document.getElementById('nav').classList.toggle('scrolled',scrollY>40));
document.getElementById('ham').onclick=()=>document.getElementById('mob-nav').classList.add('open');
document.getElementById('mob-close').onclick=closeNav;
function closeNav(){document.getElementById('mob-nav').classList.remove('open')}

// ── SPACE STARFIELD BACKGROUND ──
const bgc = document.getElementById('bgc'), bgx = bgc.getContext('2d');
let BW, BH;
function resizeBg(){ BW = bgc.width = innerWidth; BH = bgc.height = innerHeight; }
resizeBg(); addEventListener('resize', resizeBg);

// Stars with varying sizes and twinkle
const stars = [];
for(let i = 0; i < 200; i++){
  stars.push({
    x: Math.random(), y: Math.random(),
    r: Math.random() * 1.4 + 0.2,
    a: Math.random() * 0.8 + 0.2,
    twinkle: Math.random() * Math.PI * 2,
    twinkleSpeed: 0.005 + Math.random() * 0.02,
    color: Math.random() < 0.15 ? '#00e5ff' : Math.random() < 0.1 ? '#ff9100' : '#e8f4ff'
  });
}

// Occasional shooting star
const shootingStars = [];
function addShootingStar(){
  shootingStars.push({
    x: Math.random() * BW * 0.6,
    y: Math.random() * BH * 0.4,
    len: 80 + Math.random() * 120,
    speed: 8 + Math.random() * 6,
    life: 1, vx: 6 + Math.random()*4, vy: 3 + Math.random()*3
  });
}
setInterval(addShootingStar, 3000 + Math.random() * 4000);

(function bgLoop(){
  bgx.clearRect(0, 0, BW, BH);
  stars.forEach(s => {
    s.twinkle += s.twinkleSpeed;
    const alpha = s.a * (0.5 + Math.sin(s.twinkle) * 0.5);
    bgx.beginPath();
    bgx.arc(s.x * BW, s.y * BH, s.r, 0, Math.PI*2);
    bgx.fillStyle = s.color;
    bgx.globalAlpha = alpha;
    bgx.fill();
    if(s.r > 1.0){
      const g = bgx.createRadialGradient(s.x*BW, s.y*BH, 0, s.x*BW, s.y*BH, s.r*4);
      g.addColorStop(0, s.color + '44'); g.addColorStop(1, 'transparent');
      bgx.fillStyle = g;
      bgx.beginPath(); bgx.arc(s.x*BW, s.y*BH, s.r*4, 0, Math.PI*2); bgx.fill();
    }
  });
  for(let i = shootingStars.length-1; i >= 0; i--){
    const ss = shootingStars[i];
    ss.x += ss.vx; ss.y += ss.vy; ss.life -= 0.018;
    if(ss.life <= 0){ shootingStars.splice(i,1); continue; }
    const grad = bgx.createLinearGradient(ss.x, ss.y, ss.x - ss.vx*(ss.len/ss.speed), ss.y - ss.vy*(ss.len/ss.speed));
    grad.addColorStop(0, `rgba(255,255,255,${ss.life * 0.9})`);
    grad.addColorStop(1, 'rgba(255,255,255,0)');
    bgx.beginPath();
    bgx.moveTo(ss.x, ss.y);
    bgx.lineTo(ss.x - ss.vx*(ss.len/ss.speed), ss.y - ss.vy*(ss.len/ss.speed));
    bgx.strokeStyle = grad; bgx.lineWidth = 1.5; bgx.globalAlpha = ss.life; bgx.stroke();
  }
  bgx.globalAlpha = 1;
  requestAnimationFrame(bgLoop);
})();

// ── HERO TYPING ──
const phrases=["initialize_model(architecture='LLM-NAS')","train(epochs=100, dataset='CIFAR-100')","accuracy=validate(model)  # → 92.4%","papers.publish(arxiv=True)  # 2 done","open_to_work(roles=['ML Engineer','DS'])"];
let pi=0,ci=0,del=false;
const tel=document.getElementById('typing-text');
function type(){
  const ph=phrases[pi];
  if(!del){tel.textContent=ph.slice(0,++ci);if(ci===ph.length){setTimeout(()=>{del=true;setTimeout(type,40)},1800);return}}
  else{tel.textContent=ph.slice(0,--ci);if(ci===0){del=false;pi=(pi+1)%phrases.length}}
  setTimeout(type,del?28:52)}
setTimeout(type,500);

// ── NEURAL NET CANVAS ──
const nnC=document.getElementById('nn-canvas');
if(nnC){
  const nnX=nnC.getContext('2d');
  const layers=[3,5,6,5,3];
  const lNames=['Input','H1','H2','H3','Output'];
  let hovNode=null,acts=layers.map(n=>Array.from({length:n},()=>Math.random()));
  const nodes=layers.map((n,li)=>Array.from({length:n},(_,ni)=>({
    x:50+li*(nnC.width-100)/(layers.length-1),
    y:nnC.height/2-(n-1)*36/2+ni*36,li,ni})));
  function drawNN(){
    nnX.clearRect(0,0,nnC.width,nnC.height);
    // connections
    for(let l=0;l<nodes.length-1;l++)nodes[l].forEach(a=>nodes[l+1].forEach(b=>{
      const w=acts[l][a.ni]*acts[l+1][b.ni];
      nnX.beginPath();nnX.moveTo(a.x,a.y);nnX.lineTo(b.x,b.y);
      nnX.strokeStyle=`rgba(41,121,255,${w*.3+.04})`;nnX.lineWidth=w*1.6+.2;nnX.stroke()}));
    // nodes
    nodes.forEach((layer,li)=>layer.forEach((n,ni)=>{
      const v=acts[li][ni],isH=hovNode&&hovNode.li===li&&hovNode.ni===ni,r=isH?13:8;
      const g=nnX.createRadialGradient(n.x,n.y,0,n.x,n.y,r*2.5);
      g.addColorStop(0,`rgba(0,229,255,${v*.5})`);g.addColorStop(1,'transparent');
      nnX.beginPath();nnX.arc(n.x,n.y,r*2.5,0,Math.PI*2);nnX.fillStyle=g;nnX.fill();
      nnX.beginPath();nnX.arc(n.x,n.y,r,0,Math.PI*2);
      const ng=nnX.createRadialGradient(n.x-2,n.y-2,0,n.x,n.y,r);
      ng.addColorStop(0,`rgba(0,229,255,${v*.9+.1})`);ng.addColorStop(1,`rgba(21,101,255,${v*.5+.1})`);
      nnX.fillStyle=ng;nnX.shadowColor=`rgba(0,229,255,${v*.8})`;nnX.shadowBlur=isH?18:8;nnX.fill();nnX.shadowBlur=0;
      if(isH){nnX.font='bold 10px JetBrains Mono';nnX.fillStyle='#00e5ff';nnX.textAlign='center';nnX.fillText(v.toFixed(3),n.x,n.y-18)}}));
    // labels
    nodes.forEach((l,li)=>{nnX.font='9px JetBrains Mono';nnX.fillStyle='rgba(58,90,130,.6)';nnX.textAlign='center';nnX.fillText(lNames[li],l[0].x,nnC.height-6)});
  }
  setInterval(()=>{
    acts=acts.map((l,li)=>l.map((v,ni)=>{const t=hovNode&&hovNode.li===li?1:Math.random();return v+(t-v)*.07}));
    drawNN();},38);
  nnC.addEventListener('mousemove',e=>{
    const rect=nnC.getBoundingClientRect();
    const ex=(e.clientX-rect.left)*(nnC.width/rect.width),ey=(e.clientY-rect.top)*(nnC.height/rect.height);
    hovNode=null;nodes.forEach(l=>l.forEach(n=>{if(Math.hypot(n.x-ex,n.y-ey)<15)hovNode=n}));
  });
  nnC.addEventListener('mouseleave',()=>hovNode=null);
  nnC.addEventListener('click',()=>{acts=layers.map(n=>Array.from({length:n},()=>Math.random()))});
}

// ── CAROUSEL ──
const pt=document.getElementById('pt'),dotsEl=document.getElementById('car-dots');
const total=pt?pt.children.length:0;let cur2=0;
for(let i=0;i<total;i++){const d=document.createElement('div');d.className='cdot'+(i===0?' on':'');d.onclick=()=>go(i);dotsEl.appendChild(d)}
function go(n){cur2=(n+total)%total;pt.style.transform=`translateX(-${cur2*100}%)`;document.querySelectorAll('.cdot').forEach((d,i)=>d.classList.toggle('on',i===cur2))}
document.getElementById('cp').onclick=()=>go(cur2-1);
document.getElementById('cn').onclick=()=>go(cur2+1);
let t0=0;pt.addEventListener('touchstart',e=>t0=e.touches[0].clientX);
pt.addEventListener('touchend',e=>{const d=e.changedTouches[0].clientX-t0;if(Math.abs(d)>50)go(d<0?cur2+1:cur2-1)});
setInterval(()=>go(cur2+1),6500);

// ── SCROLL REVEAL ──
const io=new IntersectionObserver(e=>{e.forEach(en=>{if(en.isIntersecting){en.target.classList.add('vis')}})},{threshold:.15});
document.querySelectorAll('.rev,.tl-item,.bc,.pub-item,.sk-cat,.edu-stop,.cert-card').forEach(el=>io.observe(el));

// Stagger cert cards
document.querySelectorAll('.cert-card').forEach((card,i)=>{ card.style.transitionDelay = (i*0.12)+'s'; });


(function(){
  const wrapper = document.getElementById('edu-road-wrapper');
  const progressLine = document.getElementById('edu-progress-line');
  const walker = document.getElementById('road-walker');
  if(!wrapper||!walker) return;

  const stops = [
    document.getElementById('edu-stop-0'),
    document.getElementById('edu-stop-1')
  ];

  // Get center y of each stop node relative to wrapper
  function getStopY(idx) {
    const node = document.getElementById('edu-node-' + idx);
    if(!node) return 0;
    const wRect = wrapper.getBoundingClientRect();
    const nRect = node.getBoundingClientRect();
    return (nRect.top + nRect.height/2) - wRect.top + wrapper.scrollTop + (window.scrollY - wrapper.getBoundingClientRect().top - window.scrollY);
  }

  function getNodeOffsetTop(idx) {
    const node = document.getElementById('edu-node-' + idx);
    if(!node) return 0;
    let top = 0, el = node;
    while(el && el !== wrapper) { top += el.offsetTop; el = el.offsetParent; }
    return top + node.offsetHeight/2;
  }

  let walkerY = 0;
  let targetY = 0;
  let walkerFrame = 0;

  // Animate walker legs/arms
  function animateWalker(t) {
    const speed = 0.08;
    const swing = 18;
    const legL = document.getElementById('w-leg-l');
    const legR = document.getElementById('w-leg-r');
    const armL = document.getElementById('w-arm-l');
    const armR = document.getElementById('w-arm-r');
    const shoeL = document.getElementById('w-shoe-l');
    const shoeR = document.getElementById('w-shoe-r');
    if(!legL) return;
    const s = Math.sin(t * speed * 6);
    legL.setAttribute('transform', `rotate(${s*swing}, 16.5, 30)`);
    legR.setAttribute('transform', `rotate(${-s*swing}, 23.5, 30)`);
    armL.setAttribute('transform', `rotate(${-s*swing*0.6}, 12, 20)`);
    armR.setAttribute('transform', `rotate(${s*swing*0.6}, 28, 20)`);
    // Move shoes with legs
    shoeL.setAttribute('transform', `rotate(${s*swing}, 16.5, 30)`);
    shoeR.setAttribute('transform', `rotate(${-s*swing}, 23.5, 30)`);
  }

  let raf;
  function walkerLoop(t) {
    walkerFrame = t;
    animateWalker(t);
    raf = requestAnimationFrame(walkerLoop);
  }
  requestAnimationFrame(walkerLoop);

  // Scroll-driven walker position
  function updateWalker() {
    const wRect = wrapper.getBoundingClientRect();
    const wTop = wRect.top + window.scrollY;
    const wH = wrapper.offsetHeight;
    const viewH = window.innerHeight;
    // How far user has scrolled through the section
    const scrolled = window.scrollY + viewH*0.5 - wTop;
    const pct = Math.max(0, Math.min(1, scrolled / wH));

    // Walker travels from top to bottom of road
    const startY = 60;
    const endY = wH - 80;
    const newY = startY + (endY - startY) * pct;

    walker.style.top = newY + 'px';

    // Progress line grows
    progressLine.style.height = newY + 'px';

    // Highlight nodes when walker passes them
    for(let i=0; i<2; i++){
      const nodeY = getNodeOffsetTop(i);
      const node = document.getElementById('edu-node-'+i);
      if(node){
        if(newY >= nodeY - 30){
          node.classList.add('active');
          // burst glow effect
          node.style.boxShadow = '0 0 40px #2979ff, 0 0 80px #00e5ff55';
        }
      }
    }
  }

  window.addEventListener('scroll', updateWalker);
  updateWalker();

  // Click to jump
  window.jumpToStop = function(idx) {
    const stop = stops[idx];
    if(stop) { stop.scrollIntoView({behavior:'smooth', block:'center'}); }
  };

  // Add visible flag when cards in view
  const eduObs = new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(e.isIntersecting) e.target.classList.add('vis');
    });
  },{threshold:0.2});
  stops.forEach(s=>{ if(s) eduObs.observe(s); });
})();

// ── RADAR CHART ──
(function(){
  const c = document.getElementById('radar-canvas');
  if(!c) return;
  const ctx = c.getContext('2d');
  const W = c.width, H = c.height;
  const cx = W/2, cy = H/2, R = 120;
  const skills = [
    {label:'Machine Learning', val:0.95, color:'#2979ff'},
    {label:'Python / PyTorch',  val:0.92, color:'#00e5ff'},
    {label:'Computer Vision',  val:0.88, color:'#00e676'},
    {label:'Data Science',     val:0.90, color:'#ff9100'},
    {label:'LLMs / AutoML',    val:0.85, color:'#e040fb'},
    {label:'Full Stack Dev',   val:0.72, color:'#ff5252'},
  ];
  const N = skills.length;
  let animPct = 0;

  // Legend
  const legend = document.getElementById('radar-legend');
  if(legend){ skills.forEach(s=>{ legend.innerHTML += `<div class="rl-item"><div class="rl-dot" style="background:${s.color}"></div>${s.label}</div>`; }); }

  function drawRadar(pct){
    ctx.clearRect(0,0,W,H);
    // grid rings
    for(let r=1;r<=5;r++){
      ctx.beginPath();
      for(let i=0;i<N;i++){
        const a = (i/N)*Math.PI*2 - Math.PI/2;
        const x = cx + Math.cos(a)*R*(r/5);
        const y = cy + Math.sin(a)*R*(r/5);
        i===0 ? ctx.moveTo(x,y) : ctx.lineTo(x,y);
      }
      ctx.closePath();
      ctx.strokeStyle = r===5 ? 'rgba(41,121,255,0.3)' : 'rgba(15,37,69,0.8)';
      ctx.lineWidth = r===5 ? 1 : 0.5;
      ctx.stroke();
    }
    // spokes + labels
    skills.forEach((s,i)=>{
      const a = (i/N)*Math.PI*2 - Math.PI/2;
      const x2 = cx + Math.cos(a)*R, y2 = cy + Math.sin(a)*R;
      ctx.beginPath(); ctx.moveTo(cx,cy); ctx.lineTo(x2,y2);
      ctx.strokeStyle = 'rgba(41,121,255,0.25)'; ctx.lineWidth = 0.8; ctx.stroke();
      // label
      const lx = cx + Math.cos(a)*(R+22), ly = cy + Math.sin(a)*(R+22);
      ctx.font = '10px JetBrains Mono'; ctx.fillStyle = '#7a9cc8';
      ctx.textAlign = Math.abs(lx-cx)<10 ? 'center' : lx<cx ? 'right' : 'left';
      ctx.textBaseline = ly < cy-10 ? 'bottom' : ly > cy+10 ? 'top' : 'middle';
      ctx.fillText(s.label.split(' ')[0], lx, ly);
    });
    // filled polygon
    ctx.beginPath();
    skills.forEach((s,i)=>{
      const a = (i/N)*Math.PI*2 - Math.PI/2;
      const v = s.val * pct;
      const x = cx + Math.cos(a)*R*v, y = cy + Math.sin(a)*R*v;
      i===0 ? ctx.moveTo(x,y) : ctx.lineTo(x,y);
    });
    ctx.closePath();
    const grad = ctx.createRadialGradient(cx,cy,0,cx,cy,R);
    grad.addColorStop(0,'rgba(0,229,255,0.35)');
    grad.addColorStop(1,'rgba(21,101,255,0.08)');
    ctx.fillStyle = grad; ctx.fill();
    ctx.strokeStyle = '#00e5ff'; ctx.lineWidth = 2; ctx.stroke();
    // dots
    skills.forEach((s,i)=>{
      const a = (i/N)*Math.PI*2 - Math.PI/2;
      const v = s.val * pct;
      const x = cx + Math.cos(a)*R*v, y = cy + Math.sin(a)*R*v;
      ctx.beginPath(); ctx.arc(x,y,4,0,Math.PI*2);
      ctx.fillStyle = s.color; ctx.shadowColor = s.color; ctx.shadowBlur = 8; ctx.fill();
      ctx.shadowBlur = 0;
    });
    // center dot
    ctx.beginPath(); ctx.arc(cx,cy,5,0,Math.PI*2);
    ctx.fillStyle = '#2979ff'; ctx.shadowColor='#2979ff'; ctx.shadowBlur=12; ctx.fill(); ctx.shadowBlur=0;
  }

  // Animate in when visible
  const obs = new IntersectionObserver(entries=>{
    if(entries[0].isIntersecting){
      let start = null;
      function animate(ts){
        if(!start) start=ts;
        animPct = Math.min((ts-start)/900, 1);
        // ease out
        const ease = 1 - Math.pow(1-animPct,3);
        drawRadar(ease);
        if(animPct < 1) requestAnimationFrame(animate);
      }
      requestAnimationFrame(animate);
      obs.disconnect();
    }
  },{threshold:0.3});
  obs.observe(c);
  drawRadar(0);
})();

// ── 3D TILT CARDS ──
document.querySelectorAll('.tilt-card').forEach(card=>{
  card.addEventListener('mousemove', e=>{
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width  - 0.5;
    const y = (e.clientY - r.top)  / r.height - 0.5;
    card.style.transform = `perspective(600px) rotateY(${x*16}deg) rotateX(${-y*16}deg) translateZ(8px)`;
  });
  card.addEventListener('mouseleave', ()=>{
    card.style.transform = 'perspective(600px) rotateY(0deg) rotateX(0deg) translateZ(0px)';
  });
});
// Also apply to project cards and pub items
document.querySelectorAll('.pc,.pub-item,.tl-item').forEach(card=>{
  card.addEventListener('mousemove', e=>{
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width  - 0.5;
    const y = (e.clientY - r.top)  / r.height - 0.5;
    card.style.transform = `perspective(800px) rotateY(${x*8}deg) rotateX(${-y*8}deg) translateZ(4px)`;
    card.style.transition = 'transform 0.1s ease';
  });
  card.addEventListener('mouseleave', ()=>{
    card.style.transform = '';
    card.style.transition = 'transform 0.4s ease';
  });
});

// ── CV DOWNLOAD ──
function downloadCV(){
  const btn = document.getElementById('cv-download-btn');
  const icon = btn.querySelector('.cv-btn-icon');
  btn.classList.add('cv-launching');
  const txt = btn.querySelector('.cv-btn-text');
  setTimeout(()=>{ txt.textContent = 'Launching…'; }, 200);
  setTimeout(()=>{
    // Create a text file with CV info (in real deployment, link to actual PDF)
    const cvText = `AVI GOYAL — CV\n==============\nEmail: avi.goyal@stud-mail.uni-wuerzburg.de\nLinkedIn: linkedin.com/in/avi-goyal\nGitHub: github.com/GoyalAvi\n\nEDUCATION\n---------\nM.Sc. Computer Science — Julius Maximilian University of Würzburg (Oct 2023 – Present)\nB.Tech Computer Science — SRM IST Chennai (2018–2022), CGPA: 9.0/10\n\nEXPERIENCE\n----------\nData Science Research Assistant — JMU Würzburg (Mar–Oct 2025)\nData Analyst — Universitätsklinikum Würzburg (Aug 2024–Sept 2025)\nSoftware Developer — PTN Event (Jun 2022–Mar 2023)\nData Science Intern — The Sparks Foundation (Sept 2020–Dec 2021)\n\nPUBLICATIONS\n------------\nhttps://arxiv.org/abs/2512.24120\nhttps://arxiv.org/abs/2511.20333`;
    const blob = new Blob([cvText], {type:'text/plain'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'Avi_Goyal_CV.txt'; a.click();
    URL.revokeObjectURL(url);
    btn.classList.remove('cv-launching');
    txt.textContent = '✓ Downloaded!';
    setTimeout(()=>{ txt.textContent = 'Download CV'; icon.textContent = '🚀'; }, 2500);
  }, 700);
}

// ── AI CHAT WIDGET ──
let chatOpen = false;
const AVI_CONTEXT = `You are Avi Goyal's AI portfolio assistant. Answer questions about Avi enthusiastically and helpfully. Here is Avi's background:

PROFILE: M.Sc. Computer Science student at Julius Maximilian University of Würzburg, Germany. Specialising in Machine Learning, AutoML, Computer Vision, and LLMs. Originally from India.

EXPERIENCE:
- Data Science Research Assistant at JMU Würzburg (Mar–Oct 2025): Built AutoML using DeepSeek Coder 7B, generated 1,900+ neural architectures, expanded LEMUR dataset 13x, achieved +11.6% on CIFAR-100 with Few-Shot Architecture Prompting. Supervised by Prof. Dr. Radu Timofte.
- Data Analyst at Universitätsklinikum Würzburg (Aug 2024–Sept 2025): Medical OCT imaging, 90%+ validation accuracy, AI in Medicine coursework under Prof. Dr. Rüdiger Pryss.
- Software Developer at PTN Event (Jun 2022–Mar 2023): Built 7+ live conference websites for Oil & Gas sector.
- Data Science Intern at The Sparks Foundation (Sept 2020–Dec 2021): ML models for business analytics.

EDUCATION:
- M.Sc. Computer Science, JMU Würzburg, Oct 2023–Present, CGPA 2.4 (German scale)
- B.Tech Computer Science, SRM IST Chennai, 2018–2022, CGPA 9.0/10

PUBLICATIONS (ArXiv):
- "Enhancing LLM-Based Neural Network Generation: Few-Shot Prompting and Efficient Validation" — arxiv.org/abs/2512.24120
- "NNGPT: Rethinking AutoML with Large Language Models" — arxiv.org/abs/2511.20333

SKILLS: Python, PyTorch, DeepSeek, AutoML, NAS, Computer Vision, OpenCV, PySpark, Django, React, Docker, Kubernetes, Azure, MySQL, MongoDB, Tableau, Go, C/C++, JavaScript

LANGUAGES: English (C1), German (A2), Hindi (Native), Japanese (A1)

AVAILABILITY: Open to full-time ML/Data Science/AI Research roles. Based in Würzburg, Germany. Open to remote.

Respond in a friendly, concise way. Be enthusiastic about Avi's achievements. Keep answers to 2-4 sentences unless more detail is needed. Use the first person occasionally ("Avi has..." or "He...").`;

function toggleChat(){
  chatOpen = !chatOpen;
  document.getElementById('ai-chat-panel').classList.toggle('open', chatOpen);
  if(chatOpen) setTimeout(()=>document.getElementById('chat-input').focus(), 300);
}

function sendSuggestion(btn){
  document.getElementById('chat-input').value = btn.textContent;
  document.getElementById('chat-suggestions').style.display = 'none';
  sendChat();
}

async function sendChat(){
  const input = document.getElementById('chat-input');
  const msg = input.value.trim();
  if(!msg) return;
  input.value = '';

  const messages = document.getElementById('chat-messages');

  // User bubble
  messages.innerHTML += `<div class="chat-msg user"><div class="msg-bubble">${msg}</div></div>`;

  // Thinking indicator
  const thinking = document.createElement('div');
  thinking.className = 'chat-msg bot';
  thinking.innerHTML = '<div class="chat-thinking"><span></span><span></span><span></span></div>';
  messages.appendChild(thinking);
  messages.scrollTop = messages.scrollHeight;

  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        system: AVI_CONTEXT,
        messages: [{role:'user', content: msg}]
      })
    });
    const data = await res.json();
    const reply = data.content?.[0]?.text || "Sorry, I couldn't reach Avi's AI right now. Try emailing him directly!";
    thinking.remove();
    messages.innerHTML += `<div class="chat-msg bot"><div class="msg-bubble">${reply}</div></div>`;
  } catch(e) {
    thinking.remove();
    messages.innerHTML += `<div class="chat-msg bot"><div class="msg-bubble">🛸 Comms glitch! Try reaching Avi at <a href="mailto:avi.goyal@stud-mail.uni-wuerzburg.de" style="color:var(--cyan)">his email</a> directly.</div></div>`;
  }
  messages.scrollTop = messages.scrollHeight;
}

// ── EASTER EGG ──
let eggBuffer = '';
const eggCode = 'hireme';
document.addEventListener('keydown', e=>{
  eggBuffer = (eggBuffer + e.key.toLowerCase()).slice(-eggCode.length);
  if(eggBuffer === eggCode) showEgg();
  // also 'h' shortcut
  if(e.key.toLowerCase() === 'h' && !['input','textarea'].includes(document.activeElement.tagName.toLowerCase())) showEgg();
});

function showEgg(){
  const egg = document.getElementById('easter-egg');
  egg.style.display = 'flex';
  egg.classList.add('show');
  // stagger facts in
  document.querySelectorAll('.egg-fact').forEach((f,i)=>{
    setTimeout(()=>f.classList.add('vis'), 200 + i*120);
  });
  // confetti
  launchConfetti();
}

function closeEgg(){
  const egg = document.getElementById('easter-egg');
  egg.classList.remove('show');
  setTimeout(()=>{ egg.style.display='none'; document.querySelectorAll('.egg-fact').forEach(f=>f.classList.remove('vis')); }, 300);
  stopConfetti();
}

// Confetti system
let confettiRaf, confettiPieces = [];
function launchConfetti(){
  const canvas = document.getElementById('confetti-canvas');
  canvas.width = innerWidth; canvas.height = innerHeight;
  const ctx = canvas.getContext('2d');
  confettiPieces = [];
  const colors = ['#2979ff','#00e5ff','#00e676','#ff9100','#e040fb','#ff5252','#ffeb3b','#fff'];
  for(let i=0;i<120;i++){
    confettiPieces.push({
      x: Math.random()*innerWidth, y: -20-Math.random()*200,
      w: 6+Math.random()*8, h: 4+Math.random()*6,
      color: colors[Math.floor(Math.random()*colors.length)],
      vy: 2+Math.random()*3, vx: (Math.random()-.5)*2,
      rot: Math.random()*360, rotV: (Math.random()-.5)*6,
      alpha: 0.8+Math.random()*0.2
    });
  }
  function drawConfetti(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    confettiPieces.forEach(p=>{
      p.y+=p.vy; p.x+=p.vx; p.rot+=p.rotV; p.vy+=0.04;
      if(p.y > canvas.height) p.y = -20;
      ctx.save(); ctx.translate(p.x,p.y); ctx.rotate(p.rot*Math.PI/180);
      ctx.globalAlpha = p.alpha;
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.w/2,-p.h/2,p.w,p.h);
      ctx.restore();
    });
    confettiRaf =requestAnimationFrame(drawConfetti);
  }
  drawConfetti();
}
function stopConfetti(){
  cancelAnimationFrame(confettiRaf);
  const canvas = document.getElementById('confetti-canvas');
  if(canvas){ const ctx = canvas.getContext('2d'); ctx.clearRect(0,0,canvas.width,canvas.height); }
}

// ══════════════════════════════════════════════════════════════════════
// NEW FEATURES
// ══════════════════════════════════════════════════════════════════════

// ── FEATURE 1: SCROLL PROGRESS BAR ──
(function(){
  const bar = document.getElementById('scroll-progress');
  window.addEventListener('scroll', ()=>{
    const pct = (scrollY / (document.body.scrollHeight - innerHeight)) * 100;
    bar.style.width = Math.min(pct, 100) + '%';
  }, {passive:true});
})();

// ── FEATURE 2: BACK TO TOP BUTTON ──
(function(){
  const btn = document.getElementById('back-to-top');
  window.addEventListener('scroll', ()=>{
    btn.classList.toggle('show', scrollY > 400);
  }, {passive:true});
  btn.addEventListener('click', ()=>{ window.scrollTo({top:0, behavior:'smooth'}); });
})();

// ── FEATURE 3: COPY TO CLIPBOARD TOAST ──
function showToast(msg){
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(()=>t.classList.remove('show'), 2400);
}
function copyContact(e, text){
  e.preventDefault();
  navigator.clipboard.writeText(text).then(()=>{
    showToast('✓ Copied: ' + text);
  }).catch(()=>{ showToast('✓ ' + text); });
}


// ── FEATURE 5: SKILL PROGRESS BARS (scroll-triggered + counter) ──
(function(){
  const groups = document.querySelectorAll('.sb-group');
  if(!groups.length) return;

  function animateBars(group){
    const fills = group.querySelectorAll('.sb-fill');
    const pcts  = group.querySelectorAll('.sb-pct');
    fills.forEach((fill, i)=>{
      const target = parseInt(fill.dataset.pct);
      const pctEl  = pcts[i];
      // Animate bar width
      setTimeout(()=>{
        fill.style.width = target + '%';
      }, i * 80);
      // Count up number
      let start = 0;
      const duration = 1200;
      const startTime = performance.now() + i * 80;
      function tick(now){
        const elapsed = Math.max(0, now - startTime);
        const progress = Math.min(elapsed / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        const val = Math.round(ease * target);
        if(pctEl) pctEl.textContent = val + '%';
        if(progress < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    });
  }

  const obs = new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(e.isIntersecting && !e.target.dataset.animated){
        e.target.dataset.animated = '1';
        e.target.classList.add('vis');
        animateBars(e.target);
      }
    });
  }, {threshold: 0.3});

  groups.forEach(g => obs.observe(g));
})();

// ── FEATURE 6: FILTERABLE PROJECT GRID ──
(function(){
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards      = document.querySelectorAll('.pg-card');
  const grid       = document.getElementById('proj-grid');
  const gridBtn    = document.getElementById('grid-view-btn');
  const listBtn    = document.getElementById('list-view-btn');

  filterBtns.forEach(btn=>{
    btn.addEventListener('click', ()=>{
      filterBtns.forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.cat;
      cards.forEach(card=>{
        const cats = card.dataset.cat || '';
        if(cat === 'all' || cats.includes(cat)){
          card.classList.remove('hidden');
          card.style.position = '';
        } else {
          card.classList.add('hidden');
          setTimeout(()=>{ if(card.classList.contains('hidden')) card.style.position='absolute'; }, 400);
        }
      });
    });
  });

  // View toggle
  if(gridBtn) gridBtn.addEventListener('click', ()=>{
    gridBtn.classList.add('active'); listBtn.classList.remove('active');
    grid.style.gridTemplateColumns = 'repeat(auto-fill,minmax(320px,1fr))';
  });
  if(listBtn) listBtn.addEventListener('click', ()=>{
    listBtn.classList.add('active'); gridBtn.classList.remove('active');
    grid.style.gridTemplateColumns = '1fr';
  });
})();

// ── TERMINAL SOUND ENGINE ──
const TermSound = (function(){
  let ctx = null;

  function getCtx(){
    if(!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
    return ctx;
  }

  // Generic tone builder
  function play(type, freq, freq2, duration, gainVal, distort){
    try {
      const ac = getCtx();
      const osc = ac.createOscillator();
      const gain = ac.createGain();

      if(distort){
        const wave = ac.createWaveShaper();
        const curve = new Float32Array(256);
        for(let i=0;i<256;i++){ const x=i*2/256-1; curve[i]=x*(Math.abs(x)+0.3)/(x*x+0.3); }
        wave.curve = curve;
        osc.connect(wave); wave.connect(gain);
      } else {
        osc.connect(gain);
      }
      gain.connect(ac.destination);

      osc.type = type;
      osc.frequency.setValueAtTime(freq, ac.currentTime);
      if(freq2) osc.frequency.exponentialRampToValueAtTime(freq2, ac.currentTime + duration * 0.7);
      gain.gain.setValueAtTime(gainVal, ac.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + duration);
      osc.start(ac.currentTime);
      osc.stop(ac.currentTime + duration);
    } catch(e){}
  }

  return {
    // Soft typewriter click — each keystroke
    keyclick: function(){
      play('square', 800 + Math.random()*400, 300, 0.04, 0.04);
    },
    // Enter / submit — rising blip
    submit: function(){
      play('sine', 440, 880, 0.12, 0.12);
    },
    // Valid command output — soft chime sequence
    success: function(){
      try {
        const ac = getCtx();
        [523, 659, 784].forEach((f, i)=>{
          const o = ac.createOscillator();
          const g = ac.createGain();
          o.connect(g); g.connect(ac.destination);
          o.type = 'sine';
          o.frequency.value = f;
          const t = ac.currentTime + i * 0.08;
          g.gain.setValueAtTime(0.08, t);
          g.gain.exponentialRampToValueAtTime(0.0001, t + 0.18);
          o.start(t); o.stop(t + 0.18);
        });
      } catch(e){}
    },
    // Unknown command — low buzz
    error: function(){
      play('sawtooth', 180, 120, 0.18, 0.1, true);
    },
    // Clear — quick swoosh down
    clear: function(){
      play('sine', 600, 80, 0.15, 0.1);
    }
  };
})();

// ── FEATURE 7: INTERACTIVE TERMINAL ──
const TERM_CMDS = {
  'whoami': [
    {t:'out', txt:"<span class='hl'>Avi Goyal</span> — ML Engineer & Data Scientist"},
    {t:'out', txt:"M.Sc. Computer Science @ JMU Würzburg, Germany"},
    {t:'out', txt:"Specialised in AutoML, Computer Vision, LLMs"},
  ],
  'ls': [
    {t:'out', txt:"<span class='cmd'>./about</span>  <span class='cmd'>./skills</span>  <span class='cmd'>./experience</span>  <span class='cmd'>./projects</span>  <span class='cmd'>./contact</span>  <span class='cmd'>./research</span>"},
  ],
  './about': [
    {t:'out', txt:"<span class='hl'>// About Avi Goyal</span>"},
    {t:'out', txt:"• Originally from India, currently in Würzburg, Germany"},
    {t:'out', txt:"• Building neural architectures that <span class='success'>think</span>"},
    {t:'out', txt:"• Medical imaging systems that <span class='success'>see</span>"},
    {t:'out', txt:"• AutoML pipelines that <span class='success'>design themselves</span>"},
    {t:'out', txt:"• Trilingual: English (C1) · German (A2) · Hindi (Native)"},
  ],
  './skills': [
    {t:'out', txt:"<span class='hl'>// Core Skills</span>"},
    {t:'out', txt:"ML/AI:   <span class='success'>PyTorch · AutoML · NAS · Computer Vision · LLMs</span>"},
    {t:'out', txt:"Code:    <span class='cmd'>Python · Go · C++ · JavaScript · SQL</span>"},
    {t:'out', txt:"Stack:   <span class='hl'>Django · React · Docker · Kubernetes · Azure</span>"},
    {t:'out', txt:"Data:    <span class='success'>Pandas · PySpark · OpenCV · Tableau</span>"},
  ],
  './experience': [
    {t:'out', txt:"<span class='hl'>// Work Experience</span>"},
    {t:'out', txt:"<span class='success'>[2025]</span> Research Assistant — JMU Würzburg (AutoML)"},
    {t:'out', txt:"<span class='success'>[2024]</span> Data Analyst — Universitätsklinikum Würzburg"},
    {t:'out', txt:"<span class='cmd'> [2022]</span> Software Developer — PTN Event"},
    {t:'out', txt:"<span class='cmd'> [2020]</span> DS Intern — The Sparks Foundation"},
  ],
  './projects': [
    {t:'out', txt:"<span class='hl'>// Featured Projects</span>"},
    {t:'out', txt:"<span class='success'>[1]</span> LLM-Based Neural Architecture Generation (+11.6% CIFAR-100)"},
    {t:'out', txt:"<span class='success'>[2]</span> OCT Medical Imaging Segmentation (90%+ accuracy)"},
    {t:'out', txt:"<span class='cmd'> [3]</span> Water Quality Classification (7000+ samples, A+)"},
    {t:'out', txt:"<span class='cmd'> [4]</span> Kerala Flood Prediction (ensemble ML, A+)"},
    {t:'out', txt:"<span class='cmd'> [5]</span> Petroleum Trade Network (7 live sites)"},
  ],
  './research': [
    {t:'out', txt:"<span class='hl'>// ArXiv Publications</span>"},
    {t:'out', txt:"<span class='success'>[1]</span> Few-Shot Architecture Prompting & Efficient Validation"},
    {t:'out', txt:"    <span class='comment'>→ arxiv.org/abs/2512.24120</span>"},
    {t:'out', txt:"<span class='success'>[2]</span> NNGPT: Rethinking AutoML with LLMs"},
    {t:'out', txt:"    <span class='comment'>→ arxiv.org/abs/2511.20333</span>"},
  ],
  './contact': [
    {t:'out', txt:"<span class='hl'>// Contact Avi</span>"},
    {t:'out', txt:"✉ Email:    <span class='success'>avi.goyal@stud-mail.uni-wuerzburg.de</span>"},
    {t:'out', txt:"💼 LinkedIn: <span class='cmd'>linkedin.com/in/avi-goyal</span>"},
    {t:'out', txt:"🐙 GitHub:   <span class='cmd'>github.com/GoyalAvi</span>"},
    {t:'out', txt:"📍 Location: <span class='hl'>Würzburg, Germany</span>"},
  ],
  'help': [
    {t:'out', txt:"<span class='hl'>Available commands:</span>"},
    {t:'out', txt:"<span class='cmd'>./about</span>      — Who is Avi?"},
    {t:'out', txt:"<span class='cmd'>./skills</span>     — Technical skills overview"},
    {t:'out', txt:"<span class='cmd'>./experience</span> — Work history"},
    {t:'out', txt:"<span class='cmd'>./projects</span>   — Featured projects"},
    {t:'out', txt:"<span class='cmd'>./research</span>   — ArXiv publications"},
    {t:'out', txt:"<span class='cmd'>./contact</span>    — Get in touch"},
    {t:'out', txt:"<span class='cmd'>whoami</span>       — Quick intro"},
    {t:'out', txt:"<span class='cmd'>ls</span>           — List commands"},
    {t:'out', txt:"<span class='cmd'>clear</span>        — Clear terminal"},
  ],
};

function runCmd(cmd){
  const body  = document.getElementById('term-body');
  const input = document.getElementById('term-input');
  if(input) input.value = '';
  cmd = cmd.trim();
  if(!cmd) return;
  TermSound.submit();

  // Echo the command
  const cmdLine = document.createElement('div');
  cmdLine.className = 'term-line';
  cmdLine.innerHTML = `<span class='prompt'>avi@portfolio:~$</span> <span class='cmd'>${cmd}</span>`;
  body.appendChild(cmdLine);

  if(cmd === 'clear'){
    TermSound.clear();
    setTimeout(()=>{ body.innerHTML = ''; }, 80);
    body.scrollTop = body.scrollHeight;
    return;
  }

  const isKnown = !!TERM_CMDS[cmd];
  const lines = TERM_CMDS[cmd] || [{t:'err', txt:`<span class='err'>command not found: ${cmd}</span> — try <span class='cmd'>help</span>`}];

  // Play success or error sound after submit
  setTimeout(()=>{ isKnown ? TermSound.success() : TermSound.error(); }, 60);

  lines.forEach((l, i)=>{
    setTimeout(()=>{
      const div = document.createElement('div');
      div.className = 'term-line';
      div.innerHTML = l.txt;
      body.appendChild(div);
      body.scrollTop = body.scrollHeight;
    }, (i+1) * 60);
  });
  // Blank line after
  setTimeout(()=>{
    const blank = document.createElement('div');
    blank.className = 'term-line';
    blank.innerHTML = '&nbsp;';
    body.appendChild(blank);
    body.scrollTop = body.scrollHeight;
  }, (lines.length + 1) * 60);
}

function handleTermKey(e){
  if(e.key === 'Enter'){
    runCmd(document.getElementById('term-input').value);
  } else if(e.key.length === 1 || e.key === 'Backspace'){
    TermSound.keyclick();
  }
}

// ── FEATURE 10: ANIMATED METRIC COUNTERS (page load) ──
(function(){
  const metrics = document.querySelectorAll('.metric-val[data-target]');
  metrics.forEach(el=>{
    const target = parseInt(el.dataset.target);
    const suffix = el.dataset.suffix || '';
    const useComma = el.dataset.comma === 'true';
    const duration = 1800;
    const delay = 400;
    let started = false;

    function start(){
      if(started) return;
      started = true;
      const startTime = performance.now();
      function tick(now){
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        const val = Math.round(ease * target);
        el.textContent = (useComma ? val.toLocaleString() : val) + suffix;
        if(progress < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    }

    // Start when hero is visible (on load with slight delay)
    setTimeout(start, delay);
  });
})();

// ── SKILL BAR INTERSECTION OBSERVER ALREADY ABOVE ──
// Extra: also observe .sb-group for lazy init



// ══════════════════════════════════════════
// LANGUAGE SWITCHER
// ══════════════════════════════════════════
const TRANSLATIONS = {
  en: {
    nav_education: 'Education',
    nav_experience: 'Experience',
    nav_projects: 'Projects',
    nav_papers: 'Papers',
    nav_certs: 'Certifications',
    nav_contact: 'Contact',
    nav_status: 'open_to_work',

    hero_role: '"ML Engineer & Data Scientist"',
    hero_bio: 'M.Sc. Computer Science @ University of Würzburg. I build neural architectures that think, medical imaging systems that see, and AutoML pipelines that design themselves.',
    hero_btn_exp: 'View Experience →',
    hero_btn_contact: 'Get in Touch',
    metric_accuracy: 'Val Accuracy',
    metric_models: 'Models Generated',
    metric_papers: 'ArXiv Papers',
    metric_dataset: 'Dataset Expanded',
    nn_hint: '// hover nodes · click to re-initialize',

    edu_tag: 'Academic Journey',
    edu_title: 'Education <span>Roadmap</span>',
    srm_period: 'July 2018 – May 2022',
    srm_degree: 'B.Tech — Computer Science & Engineering',
    srm_school: 'SRM Institute of Science and Technology, Chennai',
    srm_detail: 'Graduated with a stellar CGPA of <strong style="color:var(--cyan)">9.0/10</strong> from one of India\'s top private universities. Developed foundations in algorithms, data structures, and software engineering. Completed major projects in Water Quality Classification (A+) and Flood Prediction (A+) using ML.',
    srm_tooltip: 'SRM University · 2018',
    jmu_period: 'Oct 2023 – Present · <span style="color:var(--green)">● Currently Enrolled</span>',
    jmu_degree: 'M.Sc. — Computer Science',
    jmu_school: 'Julius Maximilian University of Würzburg',
    jmu_detail: 'Pursuing a Master\'s degree at one of Germany\'s oldest universities (founded 1402), specialising in <strong style="color:var(--cyan)">Machine Learning, AutoML, and Computer Vision</strong>. Actively contributing to two ArXiv research publications while working as a Research & Data Science Assistant.',
    jmu_badge: '📍 CGPA: 2.4 (German Scale) · In Progress',
    jmu_tooltip: 'JMU Würzburg · 2023 – Now',

    exp_tag: 'Career',
    exp_title: 'Work <span>Experience</span>',
    proj_tag: 'Work',
    proj_title: 'Featured <span>Projects</span>',
    pub_tag: 'Research',
    pub_title: 'ArXiv <span>Publications</span>',
    cert_tag: 'Credentials',
    cert_title: 'Certifications <span>& Badges</span>',
    skills_title: 'Technical <span>Skills</span>',
    prof_tag: 'Proficiency',
    prof_title: 'Skill <span>Levels</span>',
    pgrid_tag: 'Work',
    pgrid_title: 'Projects <span>Grid</span>',
    term_tag: 'CLI',
    term_title: 'Interactive <span>Terminal</span>',
    term_welcome: "// Welcome to Avi\'s interactive portfolio terminal",
    term_hint_top: '// Type a command or click a suggestion below',
    term_placeholder: 'Type a command...',

    contact_tag: "Let\'s Connect",
    contact_title: 'Open to <span>Opportunities</span>',
    contact_bio: 'Looking for ML engineering, data science, or AI research roles. Let\'s talk about building intelligent systems together.',
    avail_status: 'Available for Opportunities',
    avail_sub: 'Open to full-time ML / Data Science roles · Würzburg, Germany (or Remote)',
    cv_btn: 'Download CV',
    footer_text: '// avi_goyal.py · Würzburg, Germany · 2025 · M.Sc. CS @ JMU Würzburg',
  },

  de: {
    nav_education: 'Ausbildung',
    nav_experience: 'Erfahrung',
    nav_projects: 'Projekte',
    nav_papers: 'Publikationen',
    nav_contact: 'Kontakt',
    nav_status: 'offen_für_stellen',

    hero_role: '"ML-Ingenieur & Data Scientist"',
    hero_bio: 'M.Sc. Informatik @ Universität Würzburg. Ich entwickle neuronale Architekturen, die denken, medizinische Bildverarbeitungssysteme, die sehen, und AutoML-Pipelines, die sich selbst entwerfen.',
    hero_btn_exp: 'Erfahrung ansehen →',
    hero_btn_contact: 'Kontakt aufnehmen',
    metric_accuracy: 'Val. Genauigkeit',
    metric_models: 'Generierte Modelle',
    metric_papers: 'ArXiv-Arbeiten',
    metric_dataset: 'Datensatz erweitert',
    nn_hint: '// Knoten hovern · Klicken zum Neustart',

    edu_tag: 'Akademischer Werdegang',
    edu_title: 'Ausbildungs-<span>Karte</span>',
    srm_period: 'Juli 2018 – Mai 2022',
    srm_degree: 'B.Tech — Informatik & Ingenieurwesen',
    srm_school: 'SRM Institut für Wissenschaft und Technologie, Chennai',
    srm_detail: 'Abschluss mit hervorragendem GPA von <strong style="color:var(--cyan)">9,0/10</strong> an einer der führenden Privatuniversitäten Indiens. Fundierte Kenntnisse in Algorithmen, Datenstrukturen und Softwareentwicklung. Abschlussprojekte in Wasserqualitätsklassifizierung (A+) und Hochwasservorhersage (A+) mit ML.',
    srm_tooltip: 'SRM Universität · 2018',
    jmu_period: 'Okt. 2023 – heute · <span style="color:var(--green)">● Eingeschrieben</span>',
    jmu_degree: 'M.Sc. — Informatik',
    jmu_school: 'Julius-Maximilians-Universität Würzburg',
    jmu_detail: 'Master-Studium an einer der ältesten Universitäten Deutschlands (gegr. 1402), Schwerpunkte: <strong style="color:var(--cyan)">Maschinelles Lernen, AutoML und Computer Vision</strong>. Aktiver Beitrag zu zwei ArXiv-Publikationen als Forschungs- und Datenanlyse-Assistent.',
    jmu_badge: '📍 Note: 2,4 (deutsches System) · In Bearbeitung',
    jmu_tooltip: 'JMU Würzburg · 2023 – heute',

    exp_tag: 'Karriere',
    exp_title: 'Berufliche <span>Erfahrung</span>',
    proj_tag: 'Arbeit',
    proj_title: 'Ausgewählte <span>Projekte</span>',
    pub_tag: 'Forschung',
    pub_title: 'ArXiv-<span>Publikationen</span>',
    skills_tag: 'Kompetenzen',
    skills_title: 'Technische <span>Fähigkeiten</span>',
    prof_tag: 'Kenntnisstand',
    prof_title: 'Fähigkeits-<span>Niveau</span>',
    pgrid_tag: 'Arbeit',
    pgrid_title: 'Projektraster',
    term_tag: 'Konsole',
    term_title: 'Interaktives <span>Terminal</span>',
    term_welcome: '// Willkommen in Avis interaktivem Portfolio-Terminal',
    term_hint_top: '// Befehl eingeben oder Vorschlag klicken',
    term_placeholder: 'Befehl eingeben...',

    contact_tag: 'Kontakt aufnehmen',
    contact_title: 'Offen für <span>Möglichkeiten</span>',
    contact_bio: 'Auf der Suche nach Stellen im Bereich ML-Engineering, Data Science oder KI-Forschung. Lassen Sie uns über den Aufbau intelligenter Systeme sprechen.',
    avail_status: 'Verfügbar für Stellen',
    avail_sub: 'Offen für Vollzeit ML / Data Science · Würzburg, Deutschland (oder Remote)',
    cv_btn: 'Lebenslauf herunterladen',
    footer_text: '// avi_goyal.py · Würzburg, Deutschland · 2025 · M.Sc. Informatik @ JMU Würzburg',
  }
};

let currentLang = 'en';

function setLang(lang) {
  if(lang === currentLang) return;
  currentLang = lang;
  const t = TRANSLATIONS[lang];

  // Toggle button states
  document.getElementById('btn-en').classList.toggle('active', lang === 'en');
  document.getElementById('btn-de').classList.toggle('active', lang === 'de');

  // Update all data-i18n elements
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if(t[key] !== undefined) el.innerHTML = t[key];
  });

  // Update placeholders
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if(t[key] !== undefined) el.placeholder = t[key];
  });

  // Update html lang attribute
  document.documentElement.lang = lang;

  // Animate a subtle flash to signal the switch
  document.body.style.transition = 'opacity .15s';
  document.body.style.opacity = '0.85';
  setTimeout(() => { document.body.style.opacity = '1'; }, 150);
}