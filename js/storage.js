const PROGRESS_KEY = 'fa_progress';

function readProgress() {
  return JSON.parse(localStorage.getItem(PROGRESS_KEY) || '{}');
}

function saveProgressEntry(lessonId, { completed = true, score = 0 } = {}) {
  const data = readProgress();
  data[lessonId] = { completed, score, lastAccessed: new Date().toISOString() };
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(data));
}

function clearProgress() {
  localStorage.removeItem(PROGRESS_KEY);
}

function getProgressForLesson(lessonId) {
  const data = readProgress();
  return data[lessonId] || null;
}

function getAllCompletedLessons() {
  const data = readProgress();
  return Object.entries(data).filter(([id, prog]) => prog.completed);
}

function getOverallProgress(totalLessons) {
  const completed = getAllCompletedLessons();
  return {
    total: totalLessons,
    completed: completed.length,
    percentage: totalLessons > 0 ? Math.round((completed.length / totalLessons) * 100) : 0
  };
}
