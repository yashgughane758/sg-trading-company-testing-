/**
 * SG TRADING COMPANY – PRODUCTS CATALOG JS
 * Category toggle pills & URL query parameter filter & search
 */

document.addEventListener('DOMContentLoaded', () => {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const productCards = document.querySelectorAll('.product-card-item');

  let currentCategory = 'all';
  let searchQuery = '';

  const getBtnCategory = btn => (btn.getAttribute('data-category') || btn.getAttribute('data-filter') || 'all').toLowerCase();

  // Check URL params for initial category or search query
  const urlParams = new URLSearchParams(window.location.search);
  const initialCategory = urlParams.get('category');
  const searchParam = urlParams.get('search');

  if (initialCategory) {
    currentCategory = initialCategory.toLowerCase();
    filterButtons.forEach(btn => {
      if (getBtnCategory(btn) === currentCategory) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  if (searchParam) {
    searchQuery = searchParam.toLowerCase().trim();
  }

  function filterProducts() {
    productCards.forEach(card => {
      const cardCategory = (card.getAttribute('data-category') || '').toLowerCase();
      const cardTitle = (card.querySelector('.product-card-title')?.textContent || '').toLowerCase();
      const cardDesc = (card.querySelector('.product-card-desc')?.textContent || '').toLowerCase();

      const matchesCategory = (currentCategory === 'all' || cardCategory.includes(currentCategory));
      const matchesSearch = !searchQuery || 
        cardTitle.includes(searchQuery) || 
        cardDesc.includes(searchQuery) || 
        cardCategory.includes(searchQuery);

      if (matchesCategory && matchesSearch) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  }

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategory = getBtnCategory(btn);
      searchQuery = ''; // Reset search on explicit category click
      filterProducts();
    });
  });

  filterProducts();
});
