// === NAME REVEAL ANIMATION ===
document.addEventListener("DOMContentLoaded", () => {
  const name = "OWEN KLEA";
  const nameReveal = document.getElementById("name-reveal");

  const directions = ["from-top", "from-left", "from-bottom", "from-right"];

  name.split("").forEach((char, index) => {
    const span = document.createElement("span");
    span.classList.add("letter");

    if (char === " ") {
      span.classList.add("spacer");
    } else {
      const dir = directions[index % directions.length];
      span.classList.add(dir);
      span.classList.add(`delay-${Math.floor(index / 2) + 1}`);
      span.textContent = char;
    }

    nameReveal.appendChild(span);
  });

  // Typing animation init after letters reveal
  setTimeout(startTyping, 6000);
});

// === TYPING EFFECT ===
const typingText = document.getElementById("typing");
const phrases = [
  "Digital Creator",
  "Cinematic Editor",
  "Game Dev",
  "Synthwave Aesthetic Wizard",
  "Unreal Engine Enthusiast"
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function startTyping() {
  const currentPhrase = phrases[phraseIndex];
  const currentText = currentPhrase.substring(0, charIndex);
  typingText.textContent = currentText;

  if (!isDeleting && charIndex < currentPhrase.length) {
    charIndex++;
    setTimeout(startTyping, 100);
  } else if (isDeleting && charIndex > 0) {
    charIndex--;
    setTimeout(startTyping, 60);
  } else {
    isDeleting = !isDeleting;
    if (!isDeleting) {
      phraseIndex = (phraseIndex + 1) % phrases.length;
    }
    setTimeout(startTyping, 1500);
  }
}

// === FAKE 3D SHAPES ===
const shapeContainer = document.getElementById("shapes-3d");
const shapeCount = 16;
const shapes = [];

for (let i = 0; i < shapeCount; i++) {
  const shape = document.createElement("div");
  shape.className = "shape";
  shape.style.left = Math.random() * 100 + "vw";
  shape.style.top = Math.random() * 100 + "vh";
  shape.style.background = "radial-gradient(circle at center, #ff00cc, #3333ff)";
  shapeContainer.appendChild(shape);
  shapes.push(shape);
}

// === MOUSE-PARALLAX ROTATION ===
document.addEventListener("mousemove", (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 2;
  const y = (e.clientY / window.innerHeight - 0.5) * 2;

  shapes.forEach((shape, i) => {
    shape.style.transform = `rotateX(${y * 45}deg) rotateY(${x * 45}deg)`;
  });
});

// === CANVAS GRID (for later upgrade) ===
const gridCanvas = document.getElementById("grid-canvas");
const ctx = gridCanvas.getContext("2d");

function resizeCanvas() {
  gridCanvas.width = window.innerWidth;
  gridCanvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

function drawGrid() {
  ctx.clearRect(0, 0, gridCanvas.width, gridCanvas.height);

  const spacing = 40;
  ctx.strokeStyle = "#00ffff22";
  ctx.lineWidth = 1;

  for (let y = 0; y < gridCanvas.height; y += spacing) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(gridCanvas.width, y);
    ctx.stroke();
  }
  for (let x = 0; x < gridCanvas.width; x += spacing) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, gridCanvas.height);
    ctx.stroke();
  }

  requestAnimationFrame(drawGrid);
}
drawGrid();
