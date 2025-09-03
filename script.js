// Global variables
let currentSlide = 1;
const totalSlides = 13;
let score = 0;
let selectedWord = null;
let matchedPairs = 0;
let quizAnswers = {
    2: 1, // Slide 2: Picture 1 is correct (boy with glasses)
    9: 'B', // Slide 9: "He has short hair" is correct
    10: 'B' // Slide 10: "He has short hair and glasses" is correct
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function () {
    updateProgress();
    updateNavigation();
    setupEventListeners();
    initializeSlides();
});

// Setup event listeners
function setupEventListeners() {
    // Keyboard navigation
    document.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowLeft') {
            previousSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
        } else if (e.key === 'Escape') {
            restartPresentation();
        }
    });

    // Touch/swipe support for mobile
    let startX = 0;
    let startY = 0;

    document.addEventListener('touchstart', function (e) {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
    });

    document.addEventListener('touchend', function (e) {
        if (!startX || !startY) return;

        let endX = e.changedTouches[0].clientX;
        let endY = e.changedTouches[0].clientY;

        let diffX = startX - endX;
        let diffY = startY - endY;

        // Only trigger if horizontal swipe is more significant than vertical
        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
            if (diffX > 0) {
                nextSlide();
            } else {
                previousSlide();
            }
        }

        startX = 0;
        startY = 0;
    });
}

// Initialize slides
function initializeSlides() {
    // Set initial slide
    showSlide(1);

    // Initialize quiz states
    initializeQuizStates();
}

// Navigation functions
function nextSlide() {
    if (currentSlide < totalSlides) {
        currentSlide++;
        showSlide(currentSlide);
        updateProgress();
        updateNavigation();
        playSlideTransition();
    }
}

function previousSlide() {
    if (currentSlide > 1) {
        currentSlide--;
        showSlide(currentSlide);
        updateProgress();
        updateNavigation();
        playSlideTransition();
    }
}

function showSlide(slideNumber) {
    // Hide all slides
    const slides = document.querySelectorAll('.slide');
    slides.forEach(slide => {
        slide.classList.remove('active', 'prev');
    });

    // Show current slide
    const currentSlideElement = document.getElementById(`slide-${slideNumber}`);
    if (currentSlideElement) {
        currentSlideElement.classList.add('active');
    }

    // Update current slide number
    document.getElementById('currentSlide').textContent = slideNumber;
    document.getElementById('totalSlides').textContent = totalSlides;

    // Special handling for specific slides
    handleSpecialSlides(slideNumber);
}

function handleSpecialSlides(slideNumber) {
    switch (slideNumber) {
        case 2:
            // Initialize warm-up quiz
            initializeWarmupQuiz();
            break;
        case 8:
            // Initialize practice exercise
            initializePracticeExercise();
            break;
        case 9:
        case 10:
            // Initialize quiz questions
            initializeQuizQuestion(slideNumber);
            break;
        case 11:
            // Initialize matching pair quiz
            initializeMatchingQuiz();
            break;
        case 13:
            // Show final results
            showFinalResults();
            break;
    }
}

// Progress and navigation updates
function updateProgress() {
    const progressFill = document.getElementById('progressFill');
    const progressPercentage = (currentSlide / totalSlides) * 100;
    progressFill.style.width = `${progressPercentage}%`;
}

function updateNavigation() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    prevBtn.disabled = currentSlide === 1;
    nextBtn.disabled = currentSlide === totalSlides;
}

// Quiz functions
function initializeQuizStates() {
    // Initialize quiz feedback elements
    for (let i = 2; i <= 10; i++) {
        const feedback = document.getElementById(`quiz-feedback-${i}`);
        if (feedback) {
            feedback.style.display = 'none';
        }
    }
}

function initializeWarmupQuiz() {
    // Reset warm-up quiz
    const options = document.querySelectorAll('#slide-2 .option');
    options.forEach(option => {
        option.classList.remove('selected', 'correct', 'incorrect');
    });

    const feedback = document.getElementById('quiz-feedback-2');
    if (feedback) {
        feedback.style.display = 'none';
        feedback.classList.remove('show', 'correct', 'incorrect');
    }
}

function selectOption(element, optionNumber) {
    // Remove previous selections
    const options = document.querySelectorAll('#slide-2 .option');
    options.forEach(option => {
        option.classList.remove('selected', 'correct', 'incorrect');
    });

    // Add selection to clicked option
    element.classList.add('selected');

    // Check if correct
    const isCorrect = optionNumber === quizAnswers[2];

    if (isCorrect) {
        element.classList.add('correct');
        showFeedback(2, 'Correct! He has glasses. Great job! 🎉', 'correct');
        score += 10;
        playSuccessSound();
    } else {
        element.classList.add('incorrect');
        showFeedback(2, 'Not quite right. Look carefully at the pictures. The boy with glasses is Picture 1! 👓', 'incorrect');
        playErrorSound();
    }

    // Auto-advance after 3 seconds
    setTimeout(() => {
        if (currentSlide === 2) {
            nextSlide();
        }
    }, 3000);
}

function initializeQuizQuestion(slideNumber) {
    // Reset quiz options
    const options = document.querySelectorAll(`#slide-${slideNumber} .option`);
    options.forEach(option => {
        option.classList.remove('selected', 'correct', 'incorrect');
    });

    const feedback = document.getElementById(`quiz-feedback-${slideNumber}`);
    if (feedback) {
        feedback.style.display = 'none';
        feedback.classList.remove('show', 'correct', 'incorrect');
    }
}

function selectQuizOption(element, optionLetter) {
    // Remove previous selections
    const options = document.querySelectorAll(`#slide-${currentSlide} .option`);
    options.forEach(option => {
        option.classList.remove('selected', 'correct', 'incorrect');
    });

    // Add selection to clicked option
    element.classList.add('selected');

    // Check if correct
    const isCorrect = optionLetter === quizAnswers[currentSlide];

    if (isCorrect) {
        element.classList.add('correct');
        showQuizFeedback(currentSlide, 'Excellent! You got it right! 🌟', 'correct');
        score += 15;
        playSuccessSound();
    } else {
        element.classList.add('incorrect');
        const correctAnswer = quizAnswers[currentSlide];
        showQuizFeedback(currentSlide, `Good try! The correct answer is ${correctAnswer}. Keep learning! 💪`, 'incorrect');
        playErrorSound();
    }

    // Auto-advance after 4 seconds
    setTimeout(() => {
        if (currentSlide === 9 || currentSlide === 10) {
            nextSlide();
        }
    }, 4000);
}

function showQuizFeedback(slideNumber, message, type) {
    const feedback = document.getElementById(`quiz-feedback-${slideNumber}`);
    if (feedback) {
        feedback.textContent = message;
        feedback.className = `quiz-feedback ${type} show`;
        feedback.style.display = 'block';
    }
}

function showFeedback(slideNumber, message, type) {
    const feedback = document.getElementById(`quiz-feedback-${slideNumber}`);
    if (feedback) {
        feedback.textContent = message;
        feedback.className = `quiz-feedback ${type} show`;
        feedback.style.display = 'block';
    }
}

// Practice exercise functions
function initializePracticeExercise() {
    // Reset practice inputs
    const inputs = document.querySelectorAll('.blank-input');
    inputs.forEach(input => {
        input.value = '';
        input.classList.remove('correct', 'incorrect');
    });

    const feedback = document.getElementById('answers-feedback');
    if (feedback) {
        feedback.style.display = 'none';
        feedback.classList.remove('show', 'correct', 'incorrect');
    }
}

function checkAnswers() {
    const inputs = document.querySelectorAll('.blank-input');
    let allCorrect = true;
    let correctCount = 0;

    inputs.forEach(input => {
        const userAnswer = input.value.toLowerCase().trim();
        const correctAnswer = input.dataset.answer.toLowerCase();

        if (userAnswer === correctAnswer) {
            input.classList.add('correct');
            input.classList.remove('incorrect');
            correctCount++;
        } else {
            input.classList.add('incorrect');
            input.classList.remove('correct');
            allCorrect = false;
        }
    });

    const feedback = document.getElementById('answers-feedback');

    if (allCorrect) {
        feedback.textContent = `Perfect! All answers are correct! You got ${correctCount}/3 right! 🎉`;
        feedback.className = 'answers-feedback correct show';
        score += 20;
        playSuccessSound();
    } else {
        feedback.textContent = `Good effort! You got ${correctCount}/3 correct. Keep practicing! 💪`;
        feedback.className = 'answers-feedback incorrect show';
        playErrorSound();
    }

    feedback.style.display = 'block';
}

// Audio functions
function playAudio(text) {
    // Create speech synthesis for pronunciation
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US';
        utterance.rate = 0.8;
        utterance.pitch = 1.1;
        speechSynthesis.speak(utterance);
    }
}

function playSuccessSound() {
    // Create a pleasant success sound using Web Audio API
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5
    oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1); // E5
    oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.2); // G5

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
}

function playErrorSound() {
    // Create a gentle error sound
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
    oscillator.frequency.setValueAtTime(150, audioContext.currentTime + 0.1);

    gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.3);
}

function playSlideTransition() {
    // Play a subtle transition sound
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.setValueAtTime(400, audioContext.currentTime);
    oscillator.frequency.setValueAtTime(600, audioContext.currentTime + 0.1);

    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.2);
}

// Results and restart functions
function showFinalResults() {
    const finalScoreElement = document.getElementById('finalScore');
    if (finalScoreElement) {
        finalScoreElement.textContent = score;
    }

    // Play celebration sound
    setTimeout(() => {
        playSuccessSound();
    }, 500);
}

function restartPresentation() {
    // Reset all variables
    currentSlide = 1;
    score = 0;
    selectedWord = null;
    matchedPairs = 0;

    // Reset all quiz states
    initializeQuizStates();
    initializeWarmupQuiz();
    initializePracticeExercise();
    initializeMatchingQuiz();

    // Reset progress and navigation
    updateProgress();
    updateNavigation();

    // Show first slide
    showSlide(1);

    // Play restart sound
    playSlideTransition();
}

// Utility functions
function addClickAnimation(element) {
    element.style.transform = 'scale(0.95)';
    setTimeout(() => {
        element.style.transform = 'scale(1)';
    }, 150);
}

// Add click animations to interactive elements
document.addEventListener('click', function (e) {
    if (e.target.classList.contains('option') ||
        e.target.classList.contains('vocab-item') ||
        e.target.classList.contains('clothing-item') ||
        e.target.classList.contains('nav-btn') ||
        e.target.classList.contains('start-btn') ||
        e.target.classList.contains('check-answers-btn') ||
        e.target.classList.contains('restart-btn')) {
        addClickAnimation(e.target);
    }
});

// Add hover effects for better interactivity
document.addEventListener('DOMContentLoaded', function () {
    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('click', function (e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');

            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Accessibility improvements
document.addEventListener('DOMContentLoaded', function () {
    // Add ARIA labels and roles
    const slides = document.querySelectorAll('.slide');
    slides.forEach((slide, index) => {
        slide.setAttribute('role', 'tabpanel');
        slide.setAttribute('aria-label', `Slide ${index + 1}`);
    });

    // Add keyboard navigation hints
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(button => {
        button.setAttribute('aria-label', button.id === 'prevBtn' ? 'Previous slide' : 'Next slide');
    });

    // Add focus management
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Tab') {
            // Ensure focus is visible
            document.body.classList.add('keyboard-navigation');
        }
    });

    document.addEventListener('mousedown', function () {
        document.body.classList.remove('keyboard-navigation');
    });
});

// Add CSS for keyboard navigation
const keyboardStyle = document.createElement('style');
keyboardStyle.textContent = `
    .keyboard-navigation *:focus {
        outline: 3px solid #4D96FF !important;
        outline-offset: 2px;
    }
`;
document.head.appendChild(keyboardStyle);

// Performance optimization
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

// Optimize scroll events
const optimizedScroll = debounce(function () {
    // Handle scroll events here if needed
}, 100);

// Add loading states
function showLoading() {
    const loader = document.createElement('div');
    loader.className = 'loading-overlay';
    loader.innerHTML = `
        <div class="loading-spinner">
            <div class="spinner"></div>
            <p>Loading...</p>
        </div>
    `;
    document.body.appendChild(loader);
}

function hideLoading() {
    const loader = document.querySelector('.loading-overlay');
    if (loader) {
        loader.remove();
    }
}

// Add loading styles
const loadingStyle = document.createElement('style');
loadingStyle.textContent = `
    .loading-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(255, 255, 255, 0.9);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
    }
    
    .loading-spinner {
        text-align: center;
    }
    
    .spinner {
        width: 50px;
        height: 50px;
        border: 5px solid #f3f3f3;
        border-top: 5px solid #4D96FF;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin: 0 auto 20px;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;
document.head.appendChild(loadingStyle);

// Initialize loading state
document.addEventListener('DOMContentLoaded', function () {
    showLoading();

    // Simulate loading time
    setTimeout(() => {
        hideLoading();
    }, 1000);
});

// Matching Pair Quiz Functions
function initializeMatchingQuiz() {
    // Reset matching quiz state
    selectedWord = null;
    matchedPairs = 0;

    // Reset all word and picture items
    const wordItems = document.querySelectorAll('.word-item');
    const pictureItems = document.querySelectorAll('.picture-item');

    wordItems.forEach(item => {
        item.classList.remove('dragging', 'matched');
        item.draggable = true;
    });

    pictureItems.forEach(item => {
        item.classList.remove('drag-over', 'matched');
    });

    // Reset feedback and progress
    const feedback = document.getElementById('matching-feedback');
    if (feedback) {
        feedback.style.display = 'none';
        feedback.classList.remove('show', 'correct', 'incorrect');
    }

    updateMatchingProgress();
}

// Drag and Drop Functions
function dragStart(event) {
    const draggedElement = event.target.closest('.word-item');
    if (draggedElement && !draggedElement.classList.contains('matched')) {
        draggedElement.classList.add('dragging');
        event.dataTransfer.setData('text/plain', draggedElement.dataset.word);
        event.dataTransfer.effectAllowed = 'move';
    } else {
        event.preventDefault();
    }
}

function dragOver(event) {
    event.preventDefault();
    const dropZone = event.target.closest('.picture-item');
    if (dropZone && !dropZone.classList.contains('matched')) {
        dropZone.classList.add('drag-over');
        event.dataTransfer.dropEffect = 'move';
    }
}

function dragLeave(event) {
    const dropZone = event.target.closest('.picture-item');
    if (dropZone) {
        dropZone.classList.remove('drag-over');
    }
}

function drop(event) {
    event.preventDefault();
    const dropZone = event.target.closest('.picture-item');
    const draggedWord = event.dataTransfer.getData('text/plain');

    // Remove drag-over class
    if (dropZone) {
        dropZone.classList.remove('drag-over');
    }

    // Remove dragging class from all words
    const wordItems = document.querySelectorAll('.word-item');
    wordItems.forEach(item => {
        item.classList.remove('dragging');
    });

    // Check if drop zone is valid and not already matched
    if (!dropZone || dropZone.classList.contains('matched')) {
        showMatchingFeedback('This picture is already matched! Try another one. 👀', 'incorrect');
        return;
    }

    // Check if match is correct
    const pictureWord = dropZone.dataset.word;
    const isCorrect = draggedWord === pictureWord;

    if (isCorrect) {
        // Correct match
        const draggedElement = document.querySelector(`.word-item[data-word="${draggedWord}"]`);
        draggedElement.classList.add('matched');
        dropZone.classList.add('matched');
        draggedElement.draggable = false;

        matchedPairs++;
        score += 10;

        showMatchingFeedback('Great match! 🎉', 'correct');
        playSuccessSound();

        updateMatchingProgress();

        // Check if all pairs are matched
        if (matchedPairs === 5) {
            setTimeout(() => {
                showMatchingFeedback('Excellent! All pairs matched! 🌟', 'correct');
                setTimeout(() => {
                    nextSlide();
                }, 2000);
            }, 1000);
        }
    } else {
        // Incorrect match
        showMatchingFeedback('Try again! Look carefully at the pictures. 👀', 'incorrect');
        playErrorSound();
    }
}

function showMatchingFeedback(message, type) {
    const feedback = document.getElementById('matching-feedback');
    if (feedback) {
        feedback.textContent = message;
        feedback.className = `matching-feedback ${type} show`;
        feedback.style.display = 'block';

        // Hide feedback after 3 seconds
        setTimeout(() => {
            feedback.classList.remove('show');
            setTimeout(() => {
                feedback.style.display = 'none';
            }, 300);
        }, 3000);
    }
}

function updateMatchingProgress() {
    const matchCount = document.getElementById('match-count');
    const progressFill = document.getElementById('matching-progress-fill');

    if (matchCount) {
        matchCount.textContent = matchedPairs;
    }

    if (progressFill) {
        const progressPercentage = (matchedPairs / 5) * 100;
        progressFill.style.width = `${progressPercentage}%`;
    }
}

// Export functions for global access
window.nextSlide = nextSlide;
window.previousSlide = previousSlide;
window.selectOption = selectOption;
window.selectQuizOption = selectQuizOption;
window.checkAnswers = checkAnswers;
window.playAudio = playAudio;
window.restartPresentation = restartPresentation;
window.dragStart = dragStart;
window.dragOver = dragOver;
window.dragLeave = dragLeave;
window.drop = drop;
