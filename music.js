const musicToggle = document.getElementById('musicToggle');
const musicLabel = document.getElementById('musicLabel');
const bgMusic = document.getElementById('bgMusic');

musicToggle.addEventListener('click', async () => {
  try {
    if (bgMusic.paused) {
      await bgMusic.play();
      musicToggle.classList.add('playing');
      musicToggle.setAttribute('aria-pressed', 'true');
      musicLabel.textContent = 'Pause our song';
    } else {
      bgMusic.pause();
      musicToggle.classList.remove('playing');
      musicToggle.setAttribute('aria-pressed', 'false');
      musicLabel.textContent = 'Play our song';
    }
  } catch {
    musicLabel.textContent = 'Tap to try again';
  }
});
