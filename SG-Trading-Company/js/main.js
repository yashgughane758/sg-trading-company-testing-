/**
 * SG TRADING COMPANY – MAIN JAVASCRIPT
 * ChatGPT Mobile App Style Navigation Drawer & Header Utilities
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNavigation();
  initStickyHeader();
});

function initMobileNavigation() {
  const menuBtn = document.getElementById('mobileMenuBtn');
  const closeBtn = document.getElementById('mobileNavClose');
  const drawer = document.getElementById('mobileNavDrawer');
  const backdrop = document.getElementById('mobileNavBackdrop');
  const navLinks = document.querySelectorAll('.drawer-nav-link, .mobile-nav-link');

  if (!menuBtn || !drawer || !backdrop) return;

  function toggleMenu(open) {
    const shouldOpen = open !== undefined ? open : !drawer.classList.contains('open');
    if (shouldOpen) {
      drawer.classList.add('open');
      backdrop.classList.add('active');
      menuBtn.classList.add('active');
      menuBtn.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      drawer.classList.remove('open');
      backdrop.classList.remove('active');
      menuBtn.classList.remove('active');
      menuBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
  }

  menuBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMenu(false);
    });
  }

  backdrop.addEventListener('click', () => toggleMenu(false));

  navLinks.forEach(link => {
    link.addEventListener('click', () => toggleMenu(false));
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      toggleMenu(false);
    }
  });

  // Swipe-to-close on mobile drawer (swipe left to close)
  let drawerStartX = 0;
  let drawerEndX = 0;

  drawer.addEventListener('touchstart', (e) => {
    drawerStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  drawer.addEventListener('touchend', (e) => {
    drawerEndX = e.changedTouches[0].screenX;
    if (drawerStartX - drawerEndX > 60) {
      // Swiped left by more than 60px
      toggleMenu(false);
    }
  }, { passive: true });
}

function initStickyHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}
