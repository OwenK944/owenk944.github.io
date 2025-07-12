// ====================
// TYPING ANIMATION
// ====================
const roles = ["Filmmaker.", "Game Dev.", "3D Designer.", "Creator."];
let i = 0, j = 0, current = "", isDeleting = false;

function typeEffect() {
  const typing = document.getElementById("typing");
  if (!typing) return;

  if (!isDeleting && j <= roles[i].length) {
    current = roles[i].substring(0, j++);
  } else if (isDeleting && j >= 0) {
    current = roles[i].substring(0, j--);
  }

  typing.innerHTML = current;

  if (!isDeleting && j === roles[i].length) {
    isDeleting = true;
    setTimeout(typeEffect, 1000);
  } else if (isDeleting && j === 0) {
    isDeleting = false;
    i = (i + 1) % roles.length;
    setTimeout(typeEffect, 400);
  } else {
    setTimeout(typeEffect, isDeleting ? 40 : 70);
  }
}
typeEffect();

// ====================
// SHAPE RANDOMIZATION
// ====================
const shapes = document.querySelectorAll(".shape");

shapes.forEach(shape => {
  resetShape(shape);
  shape.addEventListener("animationiteration", () => {
    resetShape(shape);
  });
});

function resetShape(shape) {
  const top = Math.random() * 100;
  const left = Math.random() * 100;
  const rotate = Math.random() * 360;
  const delay = Math.random() * 10;

  shape.style.top = `${top}%`;
  shape.style.left = `${left}%`;
  shape.style.animationDelay = `${delay}s`;
  shape.style.transform = `rotate(${rotate}deg)`;
}

// ====================
// MOUSE PARALLAX EFFECT
// ====================
document.addEventListener("mousemove", e => {
  const x = (e.clientX / window.innerWidth - 0.5) * 20;
  const y = (e.clientY / window.innerHeight - 0.5) * 20;

  document.querySelector("#background-grid").style.transform = `translate(${x}px, ${y}px)`;

  shapes.forEach(shape => {
    const speed = shape.dataset.speed === "fast" ? 1.5 : shape.dataset.speed === "slow" ? 0.5 : 1;
    shape.style.transform += ` translate(${x * speed}px, ${y * speed}px)`;
  });
});
