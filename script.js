/* ══ LOADING ══ */
const loadScreen = document.getElementById('loading-screen');
const loadBar    = document.getElementById('load-bar');
const loadPct    = document.getElementById('load-pct');
let pct = 0;
document.body.style.overflow = 'hidden';

const ticker = setInterval(() => {
  pct = Math.min(pct + Math.random() * 4 + 1, 100);
  const p = Math.floor(pct);
  loadBar.style.width = p + '%';
  loadPct.textContent = p + '%';
  if (pct >= 100) {
    clearInterval(ticker);
    setTimeout(() => {
      loadScreen.classList.add('hidden');
      document.body.style.overflow = '';
      startReveal();
      autoTypeHelp();
    }, 400);
  }
}, 55);

/* ══ DATE ══ */
function fmtDate() {
  const d = new Date();
  return '🗓 ' + d.toLocaleDateString('en-US', { weekday:'long', month:'numeric', day:'numeric', year:'numeric' });
}
const nd = document.getElementById('nav-date');
const md = document.getElementById('mob-date');
if (nd) nd.textContent = fmtDate();
if (md) md.textContent = fmtDate();

/* ══ HAMBURGER ══ */
const hamBtn  = document.getElementById('ham-btn');
const mobMenu = document.getElementById('mob-menu');
let menuOpen  = false;

hamBtn && hamBtn.addEventListener('click', () => {
  menuOpen = !menuOpen;
  mobMenu.classList.toggle('open', menuOpen);
  const spans = hamBtn.querySelectorAll('span');
  if (menuOpen) {
    spans[0].style.cssText = 'transform:rotate(45deg) translate(5px,5px)';
    spans[1].style.cssText = 'opacity:0';
    spans[2].style.cssText = 'transform:rotate(-45deg) translate(5px,-5px)';
  } else {
    spans.forEach(s => s.style.cssText = '');
  }
});

document.querySelectorAll('.mob-lnk,.mob-contact-btn').forEach(el =>
  el.addEventListener('click', () => {
    menuOpen = false;
    mobMenu.classList.remove('open');
    hamBtn.querySelectorAll('span').forEach(s => s.style.cssText = '');
  })
);

/* ══ SCROLL REVEAL ══ */
function startReveal() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), i * 80);
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
}

/* ══ ACTIVE NAV ══ */
window.addEventListener('scroll', () => {
  let cur = '';
  document.querySelectorAll('section[id]').forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) cur = s.id;
  });
  document.querySelectorAll('.nav-lnk').forEach(l => {
    const isContact = l.classList.contains('nav-lnk-contact');
    if (!isContact) l.style.background = l.getAttribute('href') === '#' + cur ? 'rgba(255,255,255,.3)' : '';
  });
});

/* ══ TERMINAL ══ */
const termIn  = document.getElementById('term-in');
const termOut = document.getElementById('term-out');

const CMDS = {
  help: `<div class="ol t-cyan">Available commands: <span class="t-yellow">about</span>, <span class="t-yellow">skills</span>, <span class="t-yellow">projects</span>, <span class="t-yellow">experience</span>, <span class="t-yellow">education</span>, <span class="t-yellow">contact</span>, <span class="t-yellow">whoami</span>, <span class="t-yellow">clear</span></div>`,

  about: `<div class="ol t-green">== DYUTIMAN BHARADWAJ ==</div>
<div class="ol">Software Developer | AI/ML & Data Science</div>
<div class="ol">📍 Guwahati, Assam | 🎓 VIT Bhopal (CGPA: 9.06)</div>
<div class="ol">📄 Published researcher in NLP (IF: 8.536)</div>
<div class="ol">🚀 Open to Software & Research Internships</div>`,

  whoami: `<div class="ol t-green">dyutiman</div>
<div class="ol">A developer who codes by day, builds AI systems by night,</div>
<div class="ol">and occasionally maps water bodies from space. 🛸</div>`,

  skills: `<div class="ol t-cyan">== TECHNICAL SKILLS ==</div>
<div class="ol"><span class="t-yellow">Languages:</span> Python, SQL, C++, JavaScript</div>
<div class="ol"><span class="t-yellow">AI/ML:</span>     TensorFlow, Keras, HuggingFace, NLTK, OpenCV</div>
<div class="ol"><span class="t-yellow">Web:</span>       React.js, Node.js, Flask, Streamlit, REST APIs</div>
<div class="ol"><span class="t-yellow">Tools:</span>     Git, Docker, AWS, QGIS, Tableau</div>`,

  projects: `<div class="ol t-cyan">== PROJECTS ==</div>
<div class="ol"><span class="t-yellow">1.</span> Invoice Triage Environment  — RL + AI</div>
<div class="ol"><span class="t-yellow">2.</span> Production RAG System       — BM25 + Vector + LangFuse</div>
<div class="ol"><span class="t-yellow">3.</span> ArogyaConnect               — Groq LLM + Healthcare</div>
<div class="ol"><span class="t-yellow">4.</span> AI Language Translator      — 200+ langs, published</div>
<div class="ol"><span class="t-yellow">5.</span> Sentiment Analysis System   — 92% acc, 50k+ comments</div>
<div class="ol"><span class="t-yellow">6.</span> Medical Image Classification — 98% acc, VGG16</div>`,

  experience: `<div class="ol t-cyan">== EXPERIENCE ==</div>
<div class="ol"><span class="t-yellow">ONGC</span>        — SDE Intern      | May 2026–Present</div>
<div class="ol"><span class="t-yellow">AssistFlow</span>  — Backend Intern   | Mar 2026–Present</div>
<div class="ol"><span class="t-yellow">Bluestock</span>   — SDE Intern       | Oct–Nov 2025</div>
<div class="ol"><span class="t-yellow">India Space</span> — GIS Intern       | Jul–Aug 2025</div>`,

  education: `<div class="ol t-cyan">== EDUCATION ==</div>
<div class="ol"><span class="t-yellow">VIT Bhopal</span>  — Integrated MTech CSE | CGPA: 9.06 | 2022–2027</div>
<div class="ol"><span class="t-yellow">SBOA School</span> — Class XII (CBSE)     | 94% | 2021</div>`,

  contact: `<div class="ol t-cyan">== CONTACT ==</div>
<div class="ol">✉  dyutiman2003@gmail.com</div>
<div class="ol">📞 +91 7397238605</div>
<div class="ol">💼 linkedin.com/in/dyutiman-bharadwaj</div>
<div class="ol">🐙 github.com/DYUTIMAN03</div>`,
};

function appendOut(html) {
  const d = document.createElement('div');
  d.innerHTML = html;
  d.style.marginBottom = '8px';
  termOut.appendChild(d);
}

termIn && termIn.addEventListener('keydown', e => {
  if (e.key !== 'Enter') return;
  const raw = termIn.value.trim().toLowerCase();
  termIn.value = '';

  const echo = document.createElement('div');
  echo.className = 'ol';
  echo.innerHTML = `<span class="t-green">guest@dyutiman:~$</span> ${raw}`;
  termOut.appendChild(echo);

  if (!raw) return;
  if (raw === 'clear') { termOut.innerHTML = ''; return; }
  if (CMDS[raw]) appendOut(CMDS[raw]);
  else appendOut(`<div class="ol t-red">bash: ${raw}: command not found — try <span class="t-yellow">"help"</span></div>`);

  termOut.scrollTop = termOut.scrollHeight;
});

document.querySelector('.terminal') && document.querySelector('.terminal').addEventListener('click', () => termIn.focus());

function autoTypeHelp() {
  if (!termIn) return;
  let i = 0; const cmd = 'help';
  const iv = setInterval(() => { termIn.value += cmd[i++]; if (i >= cmd.length) { clearInterval(iv); setTimeout(() => termIn.dispatchEvent(new KeyboardEvent('keydown',{key:'Enter',bubbles:true})), 500); } }, 100);
}

/* ══ DOODLE CANVAS ══ */
const canvas  = document.getElementById('doodle-canvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let drawing = false, tool = 'pen', hasDoodled = false;

  function resizeCanvas() {
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height);
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    ctx.putImageData(data, 0, 0);
    if (!hasDoodled) drawPlaceholder();
  }
  function drawPlaceholder() {
    ctx.save();
    ctx.fillStyle = 'rgba(255,255,255,0.12)';
    ctx.font = 'italic bold 28px Syne, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('DRAW HERE!', canvas.width / 2, canvas.height / 2);
    ctx.restore();
  }

  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  function getPos(e) {
    const r = canvas.getBoundingClientRect();
    const src = e.touches ? e.touches[0] : e;
    return { x: src.clientX - r.left, y: src.clientY - r.top };
  }
  function startDraw(e) {
    e.preventDefault();
    drawing = true;
    if (!hasDoodled) { hasDoodled = true; ctx.clearRect(0,0,canvas.width,canvas.height); }
    ctx.beginPath();
    const p = getPos(e);
    ctx.moveTo(p.x, p.y);
  }
  function doDraw(e) {
    e.preventDefault();
    if (!drawing) return;
    const p = getPos(e);
    if (tool === 'eraser') {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.lineWidth = 24;
      ctx.strokeStyle = 'rgba(0,0,0,1)';
    } else if (tool === 'marker') {
      ctx.globalCompositeOperation = 'source-over';
      ctx.lineWidth = 10;
      ctx.strokeStyle = 'rgba(245,184,0,0.6)';
    } else {
      ctx.globalCompositeOperation = 'source-over';
      ctx.lineWidth = 2.5;
      ctx.strokeStyle = '#fff';
    }
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(p.x, p.y);
  }
  function stopDraw() { drawing = false; }

  canvas.addEventListener('mousedown', startDraw);
  canvas.addEventListener('mousemove', doDraw);
  canvas.addEventListener('mouseup', stopDraw);
  canvas.addEventListener('mouseleave', stopDraw);
  canvas.addEventListener('touchstart', startDraw, { passive: false });
  canvas.addEventListener('touchmove',  doDraw,    { passive: false });
  canvas.addEventListener('touchend',   stopDraw);

  document.getElementById('dtool-pen')    && document.getElementById('dtool-pen').addEventListener('click',    () => setTool('pen'));
  document.getElementById('dtool-marker') && document.getElementById('dtool-marker').addEventListener('click', () => setTool('marker'));
  document.getElementById('dtool-eraser') && document.getElementById('dtool-eraser').addEventListener('click', () => setTool('eraser'));
  document.getElementById('dtool-clear')  && document.getElementById('dtool-clear').addEventListener('click',  () => {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    hasDoodled = false; drawPlaceholder();
  });

  function setTool(t) {
    tool = t;
    document.querySelectorAll('.dtool').forEach(b => b.classList.remove('active'));
    const el = document.getElementById('dtool-' + t);
    if (el) el.classList.add('active');
  }
}

/* ══ CONTACT FORM ══ */
const cForm = document.getElementById('contact-form');
const formOk = document.getElementById('form-ok');
const formErr = document.getElementById('form-err');
const submitBtn = document.getElementById('submit-btn');

cForm && cForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  if (submitBtn) submitBtn.textContent = '⏳ SENDING...';
  if (formErr) formErr.style.display = 'none';

  const formData = new FormData(cForm);
  
  try {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: formData
    });
    
    if (response.ok) {
      if (formOk) formOk.classList.add('show');
      cForm.reset();
      setTimeout(() => { if (formOk) formOk.classList.remove('show'); }, 5000);
    } else {
      throw new Error('Network response was not ok');
    }
  } catch (error) {
    if (formErr) formErr.style.display = 'block';
  } finally {
    if (submitBtn) submitBtn.textContent = '🚀 SEND_MESSAGE()';
  }
});

/* ══ RESUME BTN ══ */
const rBtn = document.getElementById('resume-btn');
rBtn && rBtn.addEventListener('click', e => {
  if (rBtn.getAttribute('href') === '#') {
    e.preventDefault();
    alert('📄 Resume PDF coming soon! Connect on LinkedIn in the meantime.');
  }
});

/* ══ SMOOTH SCROLL ══ */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 80, behavior:'smooth' });
    }
  });
});
