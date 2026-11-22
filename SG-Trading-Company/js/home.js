/**
 * SG TRADING COMPANY – HOMEPAGE JAVASCRIPT (home.js)
 * Hero Slider with 5s Auto-play, Pause on Hover, Controls & Touch Support
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeroSlider();
});

function initHeroSlider() {
  const sliderContainer = document.querySelector('.hero-slider-section');
  const slides = document.querySelectorAll('.hero-slide');
  const indicators = document.querySelectorAll('.indicator-dot');
  const prevBtn = document.querySelector('.slider-arrow-prev');
  const nextBtn = document.querySelector('.slider-arrow-next');

  if (!slides.length) return;

  let currentIndex = 0;
  const slideCount = slides.length;
  const autoPlayDelay = 5000; // 5 seconds
  let timerId = null;
  let isPaused = false;

  function showSlide(index) {
    if (index < 0) {
      currentIndex = slideCount - 1;
    } else if (index >= slideCount) {
      currentIndex = 0;
    } else {
      currentIndex = index;
    }

    slides.forEach((slide, i) => {
      if (i === currentIndex) {
        slide.classList.add('active');
        slide.setAttribute('aria-hidden', 'false');
      } else {
        slide.classList.remove('active');
        slide.setAttribute('aria-hidden', 'true');
      }
    });

    indicators.forEach((dot, i) => {
      if (i === currentIndex) {
        dot.classList.add('active');
        dot.setAttribute('aria-current', 'true');
      } else {
        dot.classList.remove('active');
        dot.removeAttribute('aria-current');
      }
    });
  }

  function nextSlide() {
    showSlide(currentIndex + 1);
  }

  function prevSlide() {
    showSlide(currentIndex - 1);
  }

  function startAutoPlay() {
    stopAutoPlay();
    timerId = setInterval(() => {
      if (!isPaused) {
        nextSlide();
      }
    }, autoPlayDelay);
  }

  function stopAutoPlay() {
    if (timerId) {
      clearInterval(timerId);
      timerId = null;
    }
  }

  function resetAutoPlay() {
    startAutoPlay();
  }

  // Next / Prev button clicks
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      nextSlide();
      resetAutoPlay();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      prevSlide();
      resetAutoPlay();
    });
  }

  // Indicator clicks
  indicators.forEach((dot) => {
    dot.addEventListener('click', () => {
      const targetIndex = parseInt(dot.getAttribute('data-slide-to'), 10);
      showSlide(targetIndex);
      resetAutoPlay();
    });
  });

  // Pause on hover / interaction
  if (sliderContainer) {
    sliderContainer.addEventListener('mouseenter', () => {
      isPaused = true;
    });

    sliderContainer.addEventListener('mouseleave', () => {
      isPaused = false;
    });

    // Keyboard navigation (when window focused or slider container active)
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        prevSlide();
        resetAutoPlay();
      } else if (e.key === 'ArrowRight') {
        nextSlide();
        resetAutoPlay();
      }
    });

    // Touch swipe support for mobile
    let touchStartX = 0;
    let touchStartY = 0;
    let touchEndX = 0;
    let touchEndY = 0;

    sliderContainer.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
      touchStartY = e.changedTouches[0].screenY;
      isPaused = true;
    }, { passive: true });

    sliderContainer.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      touchEndY = e.changedTouches[0].screenY;
      isPaused = false;
      handleGesture();
    }, { passive: true });

    function handleGesture() {
      const diffX = touchEndX - touchStartX;
      const diffY = touchEndY - touchStartY;
      const swipeThreshold = 40;
      // Trigger slide only if horizontal swipe dominates vertical scrolling
      if (Math.abs(diffX) > swipeThreshold && Math.abs(diffX) > Math.abs(diffY) * 1.3) {
        if (diffX < 0) {
          nextSlide();
          resetAutoPlay();
        } else {
          prevSlide();
          resetAutoPlay();
        }
      }
    }
  }

  // Initialize first slide and start timer
  showSlide(0);
  startAutoPlay();
}
