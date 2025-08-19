// Hover preview (play/pause silently)
const cards = document.querySelectorAll('.card');
cards.forEach(card => {
  const vid = card.querySelector('video');
  card.addEventListener('mouseenter', () => { vid.currentTime = 0; vid.play().catch(()=>{}); });
  card.addEventListener('mouseleave', () => { vid.pause(); });
});

// Filtering
const buttons = document.querySelectorAll('.btn');
const gridItems = document.querySelectorAll('.card');
buttons.forEach(btn => btn.addEventListener('click', () => {
  buttons.forEach(b => { b.classList.remove('active'); b.setAttribute('aria-selected', 'false'); });
  btn.classList.add('active'); btn.setAttribute('aria-selected', 'true');
  const f = btn.dataset.filter;
  gridItems.forEach(it => {
    const show = (f === 'all') || it.dataset.category === f;
    it.style.display = show ? '' : 'none';
  });
}));

// Lightbox open/close
const lightbox = document.getElementById('lightbox');
const lightboxVideo = document.getElementById('lightboxVideo');
const closeBtn = document.getElementById('closeBtn');

function openLightbox(src) {
  lightboxVideo.src = src; lightbox.classList.add('open');
  lightboxVideo.play().catch(()=>{});
  document.body.style.overflow = 'hidden';
}
function closeLightbox() {
  lightboxVideo.pause(); lightboxVideo.removeAttribute('src'); lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

document.addEventListener('click', (e) => {
  const card = e.target.closest('.card');
  if (card) {
    const src = card.querySelector('video source')?.src;
    if (src) openLightbox(src);
  }
});

closeBtn.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && lightbox.classList.contains('open')) closeLightbox(); });
