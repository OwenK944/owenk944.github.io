// Mouse-based parallax movement
document.addEventListener("mousemove", e => {
  const orb1 = document.querySelector(".orb");
  const orb2 = document.querySelector(".orb.small");
  const grid = document.querySelector(".glow-grid");

  const x = (e.clientX / window.innerWidth - 0.5) * 30;
  const y = (e.clientY / window.innerHeight - 0.5) * 30;

  orb1.style.transform = `translate(${x}px, ${y}px)`;
  orb2.style.transform = `translate(${-x}px, ${-y}px)`;
  grid.style.transform = `translate(${x / 2}px, ${y / 2}px)`;
});

// Typing animation
const roles = ["Filmmaker.", "Game Dev.", "3D Designer.", "Creator."];
let i = 0, j = 0, current = "", isDeleting = false;

function typeEffect() {
  const typing = document.getElementById("typing");
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
