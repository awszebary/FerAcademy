function getLessonIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get('id');
}

function findLessonById(lessonId) {
  return LESSONS.find(l => l.id === lessonId);
}

function makeLessonCard(lesson) {
  const card = document.createElement('div');
  card.className = 'fa-card';
  
  const progress = getProgressForLesson(lesson.id);
  const completedBadge = progress && progress.completed 
    ? `<span class="fa-badge fa-badge-completed">✓ Completed</span>` 
    : '';
  
  card.innerHTML = `
    <div class="fa-card-image">
      <img src="${lesson.image || 'assets/images/default.png'}" alt="${lesson.title}">
      <span class="fa-card-category">${lesson.category}</span>
      ${completedBadge}
    </div>
    <div class="fa-card-content">
      <h3 class="fa-card-title">${lesson.title}</h3>
      <p class="fa-card-description">${lesson.description}</p>
      <div class="fa-card-meta">
        <span class="fa-duration">⏱ ${lesson.duration}</span>
        ${progress && progress.score ? `<span class="fa-score">Score: ${progress.score}%</span>` : ''}
      </div>
      <a href="lesson.html?id=${lesson.id}" class="fa-btn fa-btn-primary">View Lesson</a>
    </div>
  `;
  
  return card;
}

function renderFeaturedLessons() {
  const container = document.getElementById('featured-lessons');
  if (!container) return;
  
  container.innerHTML = '';
  LESSONS.slice(0, 3).forEach(lesson => {
    container.appendChild(makeLessonCard(lesson));
  });
}

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    getLessonIdFromUrl,
    findLessonById,
    makeLessonCard,
    renderFeaturedLessons,
    debounce
  };
}
