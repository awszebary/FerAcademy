let currentLesson = null;
let currentCardIndex = 0;
let isFlipped = false;

function renderLessonHeader() {
  const titleEl = document.getElementById('lesson-title');
  const metaEl = document.getElementById('lesson-meta');
  
  titleEl.textContent = currentLesson.title;
  metaEl.innerHTML = `
    <span>📚 ${currentLesson.category}</span>
    <span>⏱ ${currentLesson.duration}</span>
    <span>${currentLesson.description}</span>
  `;
}

function renderMedia() {
  const mediaContainer = document.getElementById('lesson-media');
  
  if (currentLesson.video) {
    mediaContainer.innerHTML = `
      <h2 style="margin-bottom: 1rem;">📹 Video Lesson</h2>
      <video class="fa-video-player" controls>
        <source src="${currentLesson.video}" type="video/mp4">
        Your browser does not support the video tag.
      </video>
    `;
  } else {
    mediaContainer.innerHTML = `
      <h2 style="margin-bottom: 1rem;">📖 Lesson Materials</h2>
      <div class="fa-video-placeholder">
        <span style="font-size: 3rem;">📚</span>
        <span>Study the materials below</span>
      </div>
    `;
  }
  
  if (currentLesson.pdf) {
    mediaContainer.innerHTML += `
      <a href="${currentLesson.pdf}" class="fa-pdf-link" target="_blank" download>
        📄 Download PDF Notes
      </a>
    `;
  }
}

function updateFlashcard() {
  const flashcard = document.getElementById('flashcard');
  const frontFace = flashcard.querySelector('.fa-flashcard-front');
  const backFace = flashcard.querySelector('.fa-flashcard-back');
  const counter = document.getElementById('card-counter');
  const prevBtn = document.getElementById('prev-card');
  const nextBtn = document.getElementById('next-card');
  
  const card = currentLesson.flashcards[currentCardIndex];
  frontFace.textContent = card.front;
  backFace.textContent = card.back;
  
  counter.textContent = `Card ${currentCardIndex + 1} of ${currentLesson.flashcards.length}`;
  
  prevBtn.disabled = currentCardIndex === 0;
  nextBtn.disabled = currentCardIndex === currentLesson.flashcards.length - 1;
  
  if (isFlipped) {
    flashcard.classList.remove('flipped');
    isFlipped = false;
  }
}

function flipCard() {
  const flashcard = document.getElementById('flashcard');
  flashcard.classList.toggle('flipped');
  isFlipped = !isFlipped;
}

function nextCard() {
  if (currentCardIndex < currentLesson.flashcards.length - 1) {
    currentCardIndex++;
    updateFlashcard();
  }
}

function prevCard() {
  if (currentCardIndex > 0) {
    currentCardIndex--;
    updateFlashcard();
  }
}

function setupFlashcards() {
  if (!currentLesson.flashcards || currentLesson.flashcards.length === 0) {
    document.getElementById('flashcards-section').style.display = 'none';
    return;
  }
  
  updateFlashcard();
  
  document.getElementById('flip-card').addEventListener('click', flipCard);
  document.getElementById('next-card').addEventListener('click', nextCard);
  document.getElementById('prev-card').addEventListener('click', prevCard);
  
  const flashcard = document.getElementById('flashcard');
  flashcard.addEventListener('click', flipCard);
  
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') prevCard();
    if (e.key === 'ArrowRight') nextCard();
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      flipCard();
    }
  });
}

function setupQuizButton() {
  const quizBtn = document.getElementById('take-quiz-btn');
  quizBtn.href = `quiz.html?id=${currentLesson.id}`;
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
  
  renderLessonHeader();
  renderMedia();
  setupFlashcards();
  setupQuizButton();
}

document.addEventListener('DOMContentLoaded', init);
