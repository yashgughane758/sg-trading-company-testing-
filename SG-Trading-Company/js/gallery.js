/**
 * SG TRADING COMPANY – GALLERY LIGHTBOX JS
 */

document.addEventListener('DOMContentLoaded', () => {
  const tiles = Array.from(document.querySelectorAll('.gallery-tile'));
  const modal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const closeBtn = document.getElementById('lightboxCloseBtn') || document.getElementById('lightboxClose');
  const prevBtn = document.getElementById('lightboxPrev');
  const nextBtn = document.getElementById('lightboxNext');

  if (!modal || !lightboxImg) return;

  let activeIndex = 0;
  let visibleTiles = [...tiles];

  function openLightbox(index) {
    activeIndex = index;
    const currentTile = visibleTiles[activeIndex];
    if (!currentTile) return;

    const img = currentTile.querySelector('img');
    const title = currentTile.querySelector('.gallery-tile-title')?.textContent || '';

    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt || '';
    if (lightboxCaption) lightboxCaption.textContent = title;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  function nextImage() {
    activeIndex = (activeIndex + 1) % visibleTiles.length;
    openLightbox(activeIndex);
  }

  function prevImage() {
    activeIndex = (activeIndex - 1 + visibleTiles.length) % visibleTiles.length;
    openLightbox(activeIndex);
  }

  tiles.forEach((tile) => {
    tile.addEventListener('click', () => {
      const idx = visibleTiles.indexOf(tile);
      if (idx !== -1) openLightbox(idx);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (nextBtn) nextBtn.addEventListener('click', nextImage);
  if (prevBtn) prevBtn.addEventListener('click', prevImage);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
  });
});
