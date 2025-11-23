let currentFilter = 'All';
let searchQuery = '';

function getUniqueCategories() {
  const categories = LESSONS.map(l => l.category);
  return ['All', ...new Set(categories)];
}

function renderCategoryFilters() {
  const container = document.getElementById('category-filters');
  const categories = getUniqueCategories();
  
  container.innerHTML = '';
  categories.forEach(category => {
    const btn = document.createElement('button');
    btn.className = `fa-filter-btn ${category === currentFilter ? 'active' : ''}`;
    btn.textContent = category;
    btn.addEventListener('click', () => {
      currentFilter = category;
      renderCategoryFilters();
      renderCourses();
    });
    container.appendChild(btn);
  });
}

function filterLessons() {
  return LESSONS.filter(lesson => {
    const matchesCategory = currentFilter === 'All' || lesson.category === currentFilter;
    const matchesSearch = lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         lesson.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });
}

function renderCourses() {
  const container = document.getElementById('courses-list');
  const noResults = document.getElementById('no-results');
  const filtered = filterLessons();
  
  container.innerHTML = '';
  
  if (filtered.length === 0) {
    noResults.style.display = 'block';
    return;
  }
  
  noResults.style.display = 'none';
  filtered.forEach(lesson => {
    container.appendChild(makeLessonCard(lesson));
  });
}

function setupSearch() {
  const searchInput = document.getElementById('search-input');
  const debouncedSearch = debounce(() => {
    searchQuery = searchInput.value;
    renderCourses();
  }, 250);
  
  searchInput.addEventListener('input', debouncedSearch);
}

function init() {
  renderCategoryFilters();
  renderCourses();
  setupSearch();
}

document.addEventListener('DOMContentLoaded', init);
