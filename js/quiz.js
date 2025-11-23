let currentLesson = null;

function renderQuizTitle() {
  const titleEl = document.getElementById('quiz-title');
  titleEl.textContent = `${currentLesson.title} - Quiz`;
}

function renderQuestions() {
  const container = document.getElementById('quiz-questions');
  const quiz = currentLesson.quiz;
  
  if (!quiz || quiz.length === 0) {
    document.getElementById('quiz-form').style.display = 'none';
    document.getElementById('no-quiz').style.display = 'block';
    return;
  }
  
  container.innerHTML = '';
  
  quiz.forEach((question, index) => {
    const questionDiv = document.createElement('div');
    questionDiv.className = 'fa-quiz-question';
    
    const optionsHTML = question.options.map((option, optIndex) => `
      <label class="fa-option">
        <input type="radio" name="q${index}" value="${optIndex}" required>
        <span>${option}</span>
      </label>
    `).join('');
    
    questionDiv.innerHTML = `
      <div class="fa-question-number">Question ${index + 1} of ${quiz.length}</div>
      <div class="fa-question-text">${question.q}</div>
      <div class="fa-options">
        ${optionsHTML}
      </div>
    `;
    
    container.appendChild(questionDiv);
  });
}

function gradeQuiz(e) {
  e.preventDefault();
  
  const quiz = currentLesson.quiz;
  let correct = 0;
  
  quiz.forEach((question, index) => {
    const selected = document.querySelector(`input[name="q${index}"]:checked`);
    if (selected && Number(selected.value) === question.correctIndex) {
      correct++;
    }
  });
  
  const percent = Math.round((correct / quiz.length) * 100);
  const passed = percent >= 50;
  
  saveProgressEntry(currentLesson.id, {
    score: percent,
    completed: passed
  });
  
  showResults(percent, correct, quiz.length, passed);
}

function showResults(percent, correct, total, passed) {
  const modal = document.getElementById('result-modal');
  const scoreEl = document.getElementById('result-score');
  const messageEl = document.getElementById('result-message');
  const retryLink = document.getElementById('retry-link');
  
  scoreEl.textContent = `${percent}%`;
  
  let message = '';
  if (percent === 100) {
    message = `🎉 Perfect score! You got all ${total} questions correct!`;
  } else if (percent >= 80) {
    message = `🌟 Excellent work! You got ${correct} out of ${total} questions correct!`;
  } else if (percent >= 50) {
    message = `✅ Good job! You passed with ${correct} out of ${total} questions correct!`;
  } else {
    message = `📚 You got ${correct} out of ${total} questions correct. Keep studying and try again!`;
  }
  
  messageEl.textContent = message;
  retryLink.href = `quiz.html?id=${currentLesson.id}`;
  
  modal.classList.add('active');
}

function setupForm() {
  const form = document.getElementById('quiz-form');
  form.addEventListener('submit', gradeQuiz);
}

function init() {
  const lessonId = getLessonIdFromUrl();
  
  if (!lessonId) {
    window.location.href = 'courses.html';
    return;
  }
  
  currentLesson = findLessonById(lessonId);
  
  if (!currentLesson) {
    window.location.href = 'courses.html';
    return;
  }
  
  renderQuizTitle();
  renderQuestions();
  setupForm();
}

document.addEventListener('DOMContentLoaded', init);
