const musicToggle = document.getElementById('musicToggle');
const musicLabel = document.getElementById('musicLabel');
const bgMusic = document.getElementById('bgMusic');
let musicReady = false;

// Browsers require a user action before audio can start. Add music.mp3 to this folder
// and uncomment the <source> line in index.html to enable the music player.
musicToggle.addEventListener('click', async () => {
  const source = bgMusic.querySelector('source');
  if (!source) {
    musicLabel.textContent = 'Add your song in music.mp3';
    musicToggle.classList.add('music-hint');
    setTimeout(() => { musicLabel.textContent = 'Play our song'; musicToggle.classList.remove('music-hint'); }, 2800);
    return;
  }
  try {
    if (bgMusic.paused) {
      await bgMusic.play();
      musicToggle.classList.add('playing');
      musicToggle.setAttribute('aria-pressed', 'true');
      musicLabel.textContent = 'Pause our song';
      musicReady = true;
    } else {
      bgMusic.pause();
      musicToggle.classList.remove('playing');
      musicToggle.setAttribute('aria-pressed', 'false');
      musicLabel.textContent = 'Play our song';
    }
  } catch (err) {
    musicLabel.textContent = 'Tap to try again';
  }
});

// Days together since November 11, 2024, based on the visitor's local calendar date.
const relationshipStart = new Date(2024, 10, 11);
function updateDaysTogether() {
  const now = new Date();
  const todayUtc = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
  const startUtc = Date.UTC(relationshipStart.getFullYear(), relationshipStart.getMonth(), relationshipStart.getDate());
  const daysTogether = Math.floor((todayUtc - startUtc) / 86400000);
  document.getElementById('days').textContent = String(Math.max(0, daysTogether));
}
updateDaysTogether();
setInterval(updateDaysTogether, 3600000);

// Photo viewer
const photoButtons = [...document.querySelectorAll('.photo-card')];
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxCaption = document.getElementById('lightboxCaption');
let currentPhoto = 0;
function showPhoto(index) {
  currentPhoto = (index + photoButtons.length) % photoButtons.length;
  const button = photoButtons[currentPhoto];
  const img = button.querySelector('img');
  lightboxImage.src = img.src;
  lightboxImage.alt = img.alt;
  lightboxCaption.textContent = button.querySelector('.photo-caption').innerText.replace(/\n/g, ' — ');
}
function openPhoto(index) {
  showPhoto(index);
  lightbox.classList.add('open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  document.getElementById('lightboxClose').focus();
}
function closePhoto() {
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}
photoButtons.forEach((button, index) => button.addEventListener('click', () => openPhoto(index)));
document.getElementById('lightboxClose').addEventListener('click', closePhoto);
document.getElementById('lightboxPrev').addEventListener('click', () => showPhoto(currentPhoto - 1));
document.getElementById('lightboxNext').addEventListener('click', () => showPhoto(currentPhoto + 1));
lightbox.addEventListener('click', event => { if (event.target === lightbox) closePhoto(); });
document.addEventListener('keydown', event => {
  if (!lightbox.classList.contains('open')) return;
  if (event.key === 'Escape') closePhoto();
  if (event.key === 'ArrowLeft') showPhoto(currentPhoto - 1);
  if (event.key === 'ArrowRight') showPhoto(currentPhoto + 1);
});

// Last surprise
document.getElementById('surpriseBtn').addEventListener('click', event => {
  const message = document.getElementById('surpriseMessage');
  message.hidden = false;
  event.currentTarget.textContent = 'A promise from my heart ♡';
  event.currentTarget.setAttribute('aria-expanded', 'true');
  event.currentTarget.disabled = true;
  for (let i = 0; i < 18; i++) {
    const heart = document.createElement('span');
    heart.textContent = Math.random() > .5 ? '♥' : '♡';
    heart.style.cssText = `position:fixed;left:${Math.random()*100}vw;top:105vh;z-index:40;color:${['#d9a0ad','#f0cbd2','#a95f7b'][i%3]};font-size:${12+Math.random()*20}px;pointer-events:none;animation:floatHeart ${3+Math.random()*3}s ease-out forwards`;
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 6500);
  }
});
const heartStyle = document.createElement('style');
heartStyle.textContent = '@keyframes floatHeart{to{transform:translateY(-120vh) rotate(35deg);opacity:0}}';
document.head.appendChild(heartStyle);

// "I love you too" choice — the no button shrinks while the yes button grows.
(() => {
  const section = document.getElementById('love-game');
  if (!section) return;

  const yesBtn = document.getElementById('loveYes');
  const noBtn = document.getElementById('loveNo');
  const emoji = document.getElementById('gameEmoji');
  const question = document.getElementById('gameQuestion');
  const feedback = document.getElementById('gameFeedback');
  const progress = document.getElementById('gameProgress');
  const choiceArea = document.getElementById('gameAnswers');
  const card = document.getElementById('gameCard');

  let noClicks = 0;
  const playfulReplies = [
    'Hehe, try again, love. 🥺',
    'Are you sure, Sheena? My heart is buffering… 💔',
    'The “no” button is getting shy now. 🙈',
    'Love, look how tiny that button is getting! 😭',
    'There is still room for the right answer, Sheena. 💗',
    'Okay, that button is practically a tiny dot now. 😂'
  ];

  noBtn.addEventListener('click', () => {
    noClicks += 1;
    const shrink = Math.max(0.12, 1 - noClicks * 0.14);
    const grow = Math.min(2.25, 1 + noClicks * 0.18);
    noBtn.style.transform = `scale(${shrink})`;
    noBtn.style.fontSize = `${Math.max(0.35, 0.92 - noClicks * 0.075)}rem`;
    noBtn.style.opacity = String(Math.max(0.25, 1 - noClicks * 0.1));
    noBtn.classList.add('shrinking');
    yesBtn.style.transform = `scale(${grow})`;
    yesBtn.style.fontSize = `${Math.min(1.45, 1 + noClicks * 0.045)}rem`;
    yesBtn.classList.add('growing');
    emoji.textContent = ['🥺', '😭', '😳', '🥹', '💗', '💞'][Math.min(noClicks - 1, 5)];
    feedback.textContent = playfulReplies[Math.min(noClicks - 1, playfulReplies.length - 1)];
    progress.textContent = `TRY ${noClicks + 1} 😉`;
  });

  yesBtn.addEventListener('click', () => {
    card.classList.add('love-celebration');
    progress.textContent = 'CORRECT ANSWER ♡';
    emoji.textContent = '🥰';
    question.textContent = 'I knew you loved me! ♡';
    choiceArea.innerHTML = '<div class="love-result-message"><span class="big-heart">♥</span><p>And I love you even more, Sheena, love.</p><strong>Forever your Frank. ♡</strong></div>';
    feedback.textContent = 'Come here and give me a hug! 🤗';
    for (let i = 0; i < 22; i++) {
      const heart = document.createElement('span');
      heart.textContent = Math.random() > .5 ? '♥' : '♡';
      heart.style.cssText = `position:fixed;left:${Math.random()*100}vw;top:105vh;z-index:40;color:${['#d9a0ad','#f0cbd2','#a95f7b'][i%3]};font-size:${12+Math.random()*22}px;pointer-events:none;animation:floatHeart ${3+Math.random()*3}s ease-out forwards`;
      document.body.appendChild(heart);
      setTimeout(() => heart.remove(), 6500);
    }
  });
})();

