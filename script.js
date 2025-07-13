// script.js
import portfolioData from './portfolio-data.js';

function renderPortfolio() {
  const container = document.getElementById('portfolio-panel');
  container.innerHTML = '';

  portfolioData.forEach((item, idx) => {
    const sec = document.createElement('section');
    sec.dataset.index = idx;

    if (item.type === 'intro') {
      sec.id = 'intro-section';

      // build the static “Hey there, I’m”
      const h1small = document.createElement('h2');
      h1small.textContent = item.heading;
      sec.appendChild(h1small);

      // build the big reactive name
      const h1big = document.createElement('h1');
      h1big.id = 'intro-heading';
      [...item.bigText].forEach((char, i) => {
        const span = document.createElement('span');
        span.className = 'letter';
        span.textContent = char;
        span.style.animationDelay = `${i * 0.06}s`;
        // start off-screen
        const dir = i % 4;
        if (dir === 0) span.style.transform = 'translateX(-100vw)';
        if (dir === 1) span.style.transform = 'translateY(-100vh)';
        if (dir === 2) span.style.transform = 'translateX(100vw)';
        if (dir === 3) span.style.transform = 'translateY(100vh)';
        h1big.appendChild(span);
      });
      sec.appendChild(h1big);

      // filler paragraphs for scroll
      for (let j = 0; j < item.fillerCount; j++) {
        const p = document.createElement('p');
        p.className = 'filler';
        p.innerHTML = '&nbsp;';
        sec.appendChild(p);
      }

    } else if (item.type === 'project') {
      sec.classList.add('portfolio-item');
      sec.innerHTML = `
        <h2>${item.title}</h2>
        <p>${item.description}</p>
      `;
    }

    container.appendChild(sec);
  });

  // mouse-move “look at” effect for your big letters
  document.addEventListener('mousemove', e => {
    const cx = window.innerWidth/2;
    const cy = window.innerHeight/2;
    const dx = (e.clientX - cx)/cx * 10;   // ±10°
    const dy = (e.clientY - cy)/cy * -10;
    document.querySelectorAll('#intro-heading .letter')
      .forEach(l => l.style.transform = `rotateY(${dx}deg) rotateX(${dy}deg)`);
  });
}


// 1) Render portfolio from external data
function renderPortfolio() {
  const container = document.getElementById('portfolio-panel');
  container.innerHTML = '';
  portfolioData.forEach((item, idx) => {
    const sec = document.createElement('section');
    sec.dataset.index = idx;
    sec.classList.add('portfolio-item');
    sec.innerHTML = `
      <h2>${item.title}</h2>
      <p>${item.description}</p>
    `;
    container.appendChild(sec);
  });
}

// 2) Loading status messages
const messages = [
  "Fetching resources…",
  "Doing cool stuff…",
  "Loading modules…",
  "Optimizing assets…",
  "Working hard…"
];

// 3) VU meter randomizer
function randomizeAudioLevels() {
  document.querySelectorAll('#sound-panel .vu-fill').forEach(fill => {
    const level = Math.random() * 70 + 20; // 20%–90%
    fill.style.height = level + '%';
  });
}

// 4) Waveform setup & animation
const canvas = document.getElementById('waveform-canvas');
const ctx    = canvas.getContext('2d');
let width, height;
window.addEventListener('resize', resizeWaveform);
resizeWaveform();
function resizeWaveform() {
  width  = canvas.clientWidth;
  height = canvas.clientHeight;
  canvas.width  = width;
  canvas.height = height;
}

const POINT_COUNT = 6;
function genWave() {
  const pts = [];
  for (let i = 0; i <= POINT_COUNT; i++) {
    pts.push(0.5 + (Math.random() - 0.5) * 0.4);
  }
  return pts;
}

let currentWave = genWave();
let targetWave  = genWave();
let transitionStart = performance.now();
const TRANSITION_DURATION = 3000; // ms per transition

function animateWave(time) {
  // interpolation factor [0..1]
  let t = (time - transitionStart) / TRANSITION_DURATION;
  if (t >= 1) {
    currentWave = targetWave;
    targetWave  = genWave();
    transitionStart = time;
    t = 0;
  }

  // clear & draw grid
  ctx.clearRect(0, 0, width, height);
  ctx.strokeStyle = 'rgba(255,255,255,0.05)';
  ctx.lineWidth = 1;
  for (let x = 0; x < width; x += 20) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
  }
  for (let y = 0; y < height; y += 20) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y);  ctx.stroke();
  }

  // draw smooth curve
  ctx.strokeStyle = getComputedStyle(document.documentElement)
                     .getPropertyValue('--primary').trim();
  ctx.lineWidth = 2;
  ctx.beginPath();
  const slice = width / POINT_COUNT;
  const pts = [];
  for (let i = 0; i <= POINT_COUNT; i++) {
    const v = currentWave[i] + (targetWave[i] - currentWave[i]) * t;
    pts.push({ x: i * slice, y: (1 - v) * height });
  }

  // Catmull–Rom smoothing
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i === 0 ? i : i - 1];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2 < pts.length ? i + 2 : i + 1];
    for (let tt = 0; tt <= 1; tt += 0.1) {
      const tt2 = tt * tt, tt3 = tt2 * tt;
      const x = 0.5 * ((2 * p1.x) +
        (-p0.x + p2.x) * tt +
        (2 * p0.x - 5 * p1.x + 4 * p2.x - p3.x) * tt2 +
        (-p0.x + 3 * p1.x - 3 * p2.x + p3.x) * tt3);
      const y = 0.5 * ((2 * p1.y) +
        (-p0.y + p2.y) * tt +
        (2 * p0.y - 5 * p1.y + 4 * p2.y - p3.y) * tt2 +
        (-p0.y + 3 * p1.y - 3 * p2.y + p3.y) * tt3);
      if (i === 0 && tt === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
  }
  ctx.stroke();

  requestAnimationFrame(animateWave);
}
requestAnimationFrame(animateWave);

// 5) Scroll-scrubbing playhead
function initScrollTimeline() {
  const port = document.getElementById('portfolio-panel');
  const ph   = document.getElementById('playhead');
  function update() {
    const ratio = port.scrollTop / (port.scrollHeight - port.clientHeight);
    ph.style.left = `${ratio * 100}%`;
  }
  port.addEventListener('scroll', update);
  update();
}

// 6) Main loading & startup logic
window.addEventListener('DOMContentLoaded', () => {
  // Hide editor until load finishes
  const editor = document.getElementById('editor');
  editor.style.display = 'none';

  // a) Render portfolio
  renderPortfolio();

  // b) Start VU meters
  randomizeAudioLevels();
  setInterval(randomizeAudioLevels, 300);

  // c) Loading screen
  const loader   = document.getElementById('loading-screen');
  const progress = document.querySelector('.progress');
  const msgEl    = document.getElementById('loading-message');
  let pct = 0;

  function step() {
    pct = Math.min(100, pct + (Math.random() * 10 + 5));
    progress.style.width = pct + '%';

    if (pct < 100) {
      msgEl.textContent = messages[Math.floor(Math.random() * messages.length)];
      setTimeout(step, Math.random() * 400 + 300);
    } else {
      msgEl.textContent = 'Complete!';
      loader.classList.add('fade-out');
      loader.addEventListener('transitionend', () => {
        loader.style.display = 'none';
        editor.style.display = 'grid';
        initScrollTimeline();
      }, { once: true });
    }
  }

  step();
});
