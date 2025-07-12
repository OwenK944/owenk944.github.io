document.addEventListener("DOMContentLoaded", () => {
  // ===========================
  // ✍️ Typing Effect Setup
  // ===========================
  const roles = [
    "Filmmaker.",
    "Game Developer.",
    "3D Designer.",
    "AI Creative Specialist.",
    "Video Editor.",
    "Content Creator."
  ];
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
      setTimeout(typeEffect, isDeleting ? 30 : 50);
    }
  }
  setTimeout(typeEffect, 4500); // Wait until after name reveal

  // ===========================
  // 🧠 3D Hover Shape Rotation
  // ===========================
  const hoverShapes = document.querySelectorAll(".hover-shape");
  document.addEventListener("mousemove", e => {
    const x = (e.clientX / window.innerWidth - 0.5) * 30;
    const y = (e.clientY / window.innerHeight - 0.5) * 30;

    hoverShapes.forEach(shape => {
      shape.style.transform = `rotateX(${-y}deg) rotateY(${x}deg)`;
    });
  });

  // ===========================
  // 💎 Retrowave Shard Spawn Loop
  // ===========================
  const shardContainer = document.getElementById("shard-container");

  function spawnShard() {
    const shard = document.createElement("div");
    shard.classList.add("shard");

    const size = 40 + Math.random() * 60;
    shard.style.width = `${size}px`;
    shard.style.height = `${size}px`;

    const top = Math.random() * 100;
    shard.style.top = `${top}%`;
    shard.style.left = `-100px`;

    const duration = 10 + Math.random() * 10;
    shard.style.animationDuration = `${duration}s`;

    shardContainer.appendChild(shard);

    // Remove after animation ends
    setTimeout(() => {
      shard.remove();
    }, duration * 1000 + 500);
  }

  // Spawn a shard every ~600ms
  setInterval(spawnShard, 600);

  // Optional: spawn a few instantly at load
  for (let k = 0; k < 5; k++) spawnShard();
});
