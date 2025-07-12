// script.js

document.addEventListener('DOMContentLoaded', () => {
  const loader   = document.getElementById('loading-screen');
  const progress = document.querySelector('.progress');

  // When the CSS loading animation finishes, hide the loader
  progress.addEventListener('animationend', () => {
    loader.style.display = 'none';
  });
});
