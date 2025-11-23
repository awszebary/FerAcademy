function renderStats() {
  const progress = getOverallProgress(LESSONS.length);
  const completed = getAllCompletedLessons();
  
  document.getElementById('total-lessons').textContent = progress.total;
  document.getElementById('completed-count').textContent = progress.completed;
  
  let totalScore = 0;
  completed.forEach(([id, prog]) => {
    totalScore += prog.score || 0;
  });
  const avgScore = completed.length > 0 ? Math.round(totalScore / completed.length) : 0;
  document.getElementById('average-score').textContent = `${avgScore}%`;
  
  const badges = calculateBadges(completed);
  document.getElementById('badges-count').textContent = badges.length;
}

function renderProgressBar() {
  const progress = getOverallProgress(LESSONS.length);
  const progressBar = document.getElementById('progress-bar-fill');
  
  setTimeout(() => {
    progressBar.style.width = `${progress.percentage}%`;
    progressBar.textContent = `${progress.percentage}%`;
  }, 100);
}

function calculateBadges(completed) {
  const badges = [];
  const completedCount = completed.length;
  
  if (completedCount >= 1) {
    badges.push({ icon: '🎯', name: 'First Steps', description: 'Complete your first lesson' });
  }
  
  if (completedCount >= 3) {
    badges.push({ icon: '🔥', name: 'On Fire', description: 'Complete 3 lessons' });
  }
  
  if (completedCount >= 5) {
    badges.push({ icon: '⭐', name: 'Rising Star', description: 'Complete 5 lessons' });
  }
  
  if (completedCount >= LESSONS.length) {
    badges.push({ icon: '🏆', name: 'Master', description: 'Complete all lessons' });
  }
  
  const perfectScores = completed.filter(([id, prog]) => prog.score === 100).length;
  if (perfectScores >= 1) {
    badges.push({ icon: '💯', name: 'Perfectionist', description: 'Get a perfect score' });
  }
  
  if (perfectScores >= 3) {
    badges.push({ icon: '🌟', name: 'Expert', description: 'Get 3 perfect scores' });
  }
  
  return badges;
}

function renderBadges() {
  const completed = getAllCompletedLessons();
  const badges = calculateBadges(completed);
  const container = document.getElementById('badges');
  const noBadges = document.getElementById('no-badges');
  
  if (badges.length === 0) {
    container.style.display = 'none';
    noBadges.style.display = 'block';
    return;
  }
  
  container.style.display = 'grid';
  noBadges.style.display = 'none';
  
  container.innerHTML = '';
  badges.forEach(badge => {
    const badgeEl = document.createElement('div');
    badgeEl.className = 'fa-badge-item';
    badgeEl.innerHTML = `
      <div class="fa-badge-icon">${badge.icon}</div>
      <div style="font-weight: 700;">${badge.name}</div>
      <div style="font-size: 0.875rem; opacity: 0.9;">${badge.description}</div>
    `;
    container.appendChild(badgeEl);
  });
}

function renderCompletedLessons() {
  const completed = getAllCompletedLessons();
  const container = document.getElementById('completed-list');
  const noCompleted = document.getElementById('no-completed');
  
  if (completed.length === 0) {
    container.style.display = 'none';
    noCompleted.style.display = 'block';
    return;
  }
  
  container.style.display = 'block';
  noCompleted.style.display = 'none';
  
  container.innerHTML = '';
  
  completed.sort((a, b) => new Date(b[1].lastAccessed) - new Date(a[1].lastAccessed));
  
  completed.forEach(([lessonId, prog]) => {
    const lesson = findLessonById(lessonId);
    if (!lesson) return;
    
    const date = new Date(prog.lastAccessed);
    const formattedDate = date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
    
    const li = document.createElement('li');
    li.className = 'fa-completed-item';
    li.innerHTML = `
      <div class="fa-completed-info">
        <h4>${lesson.title}</h4>
        <div class="fa-completed-date">Completed on ${formattedDate}</div>
      </div>
      <div class="fa-completed-score">${prog.score}%</div>
    `;
    container.appendChild(li);
  });
}

function setupClearButton() {
  const btn = document.getElementById('clear-progress-btn');
  btn.addEventListener('click', () => {
    if (confirm('Are you sure you want to clear all your progress? This cannot be undone.')) {
      clearProgress();
      location.reload();
    }
  });
}

function init() {
  renderStats();
  renderProgressBar();
  renderBadges();
  renderCompletedLessons();
  setupClearButton();
}

document.addEventListener('DOMContentLoaded', init);
