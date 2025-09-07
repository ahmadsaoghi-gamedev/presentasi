// Global variables
let currentSlide = 1;
const totalSlides = 16;
let score = 0;
let matchingPairScore = 0; // Hanya untuk matching pair quiz
let selectedWord = null;
let matchedPairs = 0;
let audioContext = null; // Global audio context
let quizAnswers = {
    2: 1, // Slide 2: Picture 1 is correct (boy with glasses)
    9: 'B', // Slide 9: "They have black hair" is correct
    12: 'B', // Slide 12: "He has short hair" is correct
    13: 'C' // Slide 13: "He has curly hair and no glasses" is correct
    // Note: Other slides are content slides, not quiz slides
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function () {
    updateProgress();
    updateNavigation();
    setupEventListeners();
    initializeSlides();

    // Show scroll indicator on page load
    setTimeout(() => {
        const indicator = document.getElementById('scroll-indicator');
        if (indicator) {
            indicator.classList.add('show');
            setTimeout(() => {
                indicator.classList.remove('show');
            }, 4000); // Hide after 4 seconds
        }
    }, 1000); // Show after 1 second

    // Ensure functions are available globally immediately
    window.nextSlide = nextSlide;
    window.previousSlide = previousSlide;
    window.selectOption = selectOption;
    window.closeFeedbackPopup = closeFeedbackPopup;
    window.selectQuizOption = selectQuizOption;
    window.selectHasHaveQuiz = selectHasHaveQuiz;
    window.checkAnswers = checkAnswers;
    window.checkHasHaveAnswers = checkHasHaveAnswers;
    window.playAudio = playAudio;
    window.restartPresentation = restartPresentation;
    window.dragStart = dragStart;
    window.dragOver = dragOver;
    window.dragLeave = dragLeave;
    window.drop = drop;
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

    // Show scroll indicator on first interaction
    let scrollIndicatorTimeout;

    function showScrollIndicator() {
        const indicator = document.getElementById('scroll-indicator');
        if (indicator) {
            indicator.classList.add('show');
            clearTimeout(scrollIndicatorTimeout);
            scrollIndicatorTimeout = setTimeout(() => {
                indicator.classList.remove('show');
            }, 3000); // Hide after 3 seconds
        }
    }

    // Show scroll indicator on first wheel interaction
    document.addEventListener('wheel', function (e) {
        showScrollIndicator();
    }, { passive: true });

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

    // Handle body background for slide 1
    if (slideNumber === 1) {
        document.body.classList.add('slide-1-active');
    } else {
        document.body.classList.remove('slide-1-active');
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
            // Initialize has/have practice exercise
            initializeHasHavePractice();
            break;
        case 9:
            // Initialize has/have quiz
            initializeQuizQuestion(slideNumber);
            break;
        case 11:
            // Initialize practice exercise
            initializePracticeExercise();
            break;
        case 12:
        case 13:
            // Initialize quiz questions
            initializeQuizQuestion(slideNumber);
            break;
        case 14:
            // Initialize matching pair quiz
            initializeMatchingQuiz();
            break;
        case 16:
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
    for (let i = 2; i <= 16; i++) {
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
        if (currentSlide === 13) {
            showQuizFeedback(currentSlide, 'Perfect! You correctly identified that he has curly hair and no glasses! 🌟', 'correct');
        } else {
            showQuizFeedback(currentSlide, 'Excellent! You got it right! 🌟', 'correct');
        }
        playSuccessSound();
    } else {
        element.classList.add('incorrect');
        const correctAnswer = quizAnswers[currentSlide];
        if (currentSlide === 13) {
            showQuizFeedback(currentSlide, `Good try! The correct answer is ${correctAnswer}. Look carefully - he has curly hair and no glasses! 👀`, 'incorrect');
        } else {
            showQuizFeedback(currentSlide, `Good try! The correct answer is ${correctAnswer}. Keep learning! 💪`, 'incorrect');
        }
        playErrorSound();
    }

    // Auto-advance after 4 seconds
    setTimeout(() => {
        if (currentSlide === 12 || currentSlide === 13) {
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

// Has vs Have Practice functions
function initializeHasHavePractice() {
    // Reset has/have practice selects
    const selects = document.querySelectorAll('.has-have-select');
    selects.forEach(select => {
        select.value = '';
        select.classList.remove('correct', 'incorrect');
    });

    const feedback = document.getElementById('has-have-feedback');
    if (feedback) {
        feedback.style.display = 'none';
        feedback.classList.remove('show', 'correct', 'incorrect');
    }
}

function checkHasHaveAnswers() {
    const selects = document.querySelectorAll('.has-have-select');
    let allCorrect = true;
    let correctCount = 0;

    selects.forEach(select => {
        const userAnswer = select.value;
        const correctAnswer = select.dataset.correct;

        if (userAnswer === correctAnswer) {
            select.classList.add('correct');
            select.classList.remove('incorrect');
            correctCount++;
        } else {
            select.classList.add('incorrect');
            select.classList.remove('correct');
            allCorrect = false;
        }
    });

    // Show popup overlay instead of inline feedback
    if (allCorrect) {
        const message = `Excellent work! You got all ${correctCount}/5 answers correct! 🎉\n\nYou understand "has" and "have" perfectly!`;
        showFeedbackPopup(true, message);
        playSuccessSound();
    } else {
        const message = `Good effort! You got ${correctCount}/5 answers correct. 💪\n\nKeep practicing! Remember:\n• 1 person = HAS\n• More than 1 person = HAVE`;
        showFeedbackPopup(false, message);
        playErrorSound();
    }
}

function selectHasHaveQuiz(element, optionLetter) {
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
        showQuizFeedback(currentSlide, 'Excellent! You understand "has" and "have" perfectly! 🌟', 'correct');
        playSuccessSound();
    } else {
        element.classList.add('incorrect');
        const correctAnswer = quizAnswers[currentSlide];
        showQuizFeedback(currentSlide, `Good try! The correct answer is ${correctAnswer}. Remember: "They" use "have"! 💪`, 'incorrect');
        playErrorSound();
    }

    // Auto-advance after 4 seconds
    setTimeout(() => {
        if (currentSlide === 9) {
            nextSlide();
        }
    }, 4000);
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
    // Create a more cheerful success sound with multiple notes
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }

    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    const durations = [0.15, 0.15, 0.15, 0.2];

    notes.forEach((frequency, index) => {
        setTimeout(() => {
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
            oscillator.type = 'sine';

            gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + durations[index]);

            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + durations[index]);
        }, index * 100);
    });
}

function playErrorSound() {
    // Create a gentle error sound
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }

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
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }

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
        // Hitung skor final berdasarkan matching pair quiz (10 pasangan x 10 poin = 100)
        const finalScore = Math.min(matchingPairScore, 100);
        finalScoreElement.textContent = finalScore;
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
    matchingPairScore = 0;
    selectedWord = null;
    matchedPairs = 0;

    // Reset all quiz states
    initializeQuizStates();
    initializeWarmupQuiz();
    initializeHasHavePractice();
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

// Enhanced feedback function with more variety and interactivity
function getSimpleFeedback(isCorrect, word, context = '') {
    const correctMessages = [
        `Fantastic! "${word}" is perfect! 🌟`,
        `Amazing! You matched "${word}" correctly! 🎉`,
        `Brilliant! "${word}" is absolutely right! ⭐`,
        `Wonderful! You got "${word}" spot on! 🎊`,
        `Excellent! "${word}" is the correct match! 🏆`,
        `Perfect! You nailed "${word}"! 🎯`,
        `Outstanding! "${word}" is exactly right! 🌈`,
        `Superb! You matched "${word}" perfectly! 🚀`
    ];

    const incorrectMessages = [
        `Good try! Let's try "${word}" again! 💪`,
        `Not quite! Keep going with "${word}"! 🌱`,
        `Almost there! Try "${word}" once more! 🔄`,
        `Nice effort! Let's match "${word}"! 🎪`,
        `Keep trying! You can do "${word}"! 🌟`,
        `Don't give up! "${word}" is waiting! 🎨`,
        `You're learning! Try "${word}" again! 📚`,
        `Great attempt! Let's find "${word}"! 🎭`
    ];

    if (isCorrect) {
        return correctMessages[Math.floor(Math.random() * correctMessages.length)];
    } else {
        return incorrectMessages[Math.floor(Math.random() * incorrectMessages.length)];
    }
}

// Matching Pair Quiz Functions
function initializeMatchingQuiz() {
    // Reset matching quiz state
    selectedWord = null;
    matchedPairs = 0;

    // Reset all word and picture items
    const wordItems = document.querySelectorAll('.word-item');
    const pictureItems = document.querySelectorAll('.picture-item');
    const dropZoneBoxes = document.querySelectorAll('.drop-zone-box');

    wordItems.forEach(item => {
        item.classList.remove('dragging', 'matched');
        item.draggable = true;
    });

    pictureItems.forEach(item => {
        item.classList.remove('drag-over', 'matched');
    });

    dropZoneBoxes.forEach(box => {
        box.classList.remove('drag-over', 'matched');
        const matchedWordSpan = box.querySelector('.matched-word');
        if (matchedWordSpan) {
            matchedWordSpan.textContent = '';
        }
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
    const dropZoneBox = event.target.closest('.drop-zone-box');
    if (dropZoneBox && !dropZoneBox.classList.contains('matched')) {
        dropZoneBox.classList.add('drag-over');
        event.dataTransfer.dropEffect = 'move';
    }
}

function dragLeave(event) {
    const dropZoneBox = event.target.closest('.drop-zone-box');
    if (dropZoneBox) {
        dropZoneBox.classList.remove('drag-over');
    }
}

function drop(event) {
    event.preventDefault();
    const dropZoneBox = event.target.closest('.drop-zone-box');
    const draggedWord = event.dataTransfer.getData('text/plain');

    // Remove drag-over class
    if (dropZoneBox) {
        dropZoneBox.classList.remove('drag-over');
    }

    // Remove dragging class from all words
    const wordItems = document.querySelectorAll('.word-item');
    wordItems.forEach(item => {
        item.classList.remove('dragging');
    });

    // Check if drop zone is valid and not already matched
    if (!dropZoneBox || dropZoneBox.classList.contains('matched')) {
        showMatchingFeedback('This picture is already matched! Try another one. 👀', 'incorrect');
        return;
    }

    // Get the correct word from drop zone box
    const pictureWord = dropZoneBox.dataset.word;
    const isCorrect = draggedWord === pictureWord;

    if (isCorrect) {
        // Correct match
        const draggedElement = document.querySelector(`.word-item[data-word="${draggedWord}"]`);
        draggedElement.classList.add('matched');
        dropZoneBox.classList.add('matched');
        draggedElement.draggable = false;

        // Show the matched word in the drop zone
        const matchedWordSpan = dropZoneBox.querySelector('.matched-word');
        matchedWordSpan.textContent = draggedWord;

        matchedPairs++;
        matchingPairScore += 10; // Setiap pasangan yang benar = 10 poin

        // Show feedback for correct answer
        const feedback = getSimpleFeedback(true, draggedWord);
        showFeedbackPopup(true, feedback);
        playSuccessSound();

        updateMatchingProgress();

        // Check if all pairs are matched
        if (matchedPairs === 10) {
            setTimeout(() => {
                showFeedbackPopup(true, 'Amazing! You matched all 10 pairs perfectly! 🌟 You\'re a vocabulary master!');
                createConfetti(); // Add confetti celebration
                setTimeout(() => {
                    nextSlide();
                }, 4000);
            }, 1000);
        }
    } else {
        // Incorrect match - show feedback
        const feedback = getSimpleFeedback(false, draggedWord);
        showFeedbackPopup(false, feedback);
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
        const progressPercentage = (matchedPairs / 10) * 100;
        progressFill.style.width = `${progressPercentage}%`;
    }
}

// Popup Overlay Functions
function showFeedbackPopup(isCorrect, message) {
    const overlay = document.getElementById('feedback-overlay');
    const icon = document.getElementById('feedback-icon');
    const title = document.getElementById('feedback-title');
    const messageEl = document.getElementById('feedback-message');
    const popup = overlay.querySelector('.feedback-popup');

    // Set content based on correctness with random variety
    if (isCorrect) {
        const correctIcons = ['🎉', '🌟', '⭐', '🎊', '🏆', '🎯', '🌈', '🚀', '💫', '✨'];
        const correctTitles = ['Fantastic!', 'Amazing!', 'Brilliant!', 'Wonderful!', 'Excellent!', 'Perfect!', 'Outstanding!', 'Superb!'];
        icon.textContent = correctIcons[Math.floor(Math.random() * correctIcons.length)];
        title.textContent = correctTitles[Math.floor(Math.random() * correctTitles.length)];
        popup.classList.remove('error');
        popup.classList.add('success');
    } else {
        const incorrectIcons = ['💪', '🌱', '🔄', '🎪', '🌟', '🎨', '📚', '🎭', '🔮', '🎲'];
        const incorrectTitles = ['Keep Going!', 'Try Again!', 'Almost There!', 'Good Effort!', 'Don\'t Give Up!', 'You\'re Learning!'];
        icon.textContent = incorrectIcons[Math.floor(Math.random() * incorrectIcons.length)];
        title.textContent = incorrectTitles[Math.floor(Math.random() * incorrectTitles.length)];
        popup.classList.remove('success');
        popup.classList.add('error');
    }

    messageEl.innerHTML = message.replace(/\n/g, '<br>');
    overlay.classList.add('show');

    // Add bounce animation after a short delay
    setTimeout(() => {
        popup.classList.add('bounce');
    }, 100);

    // Auto close after 3 seconds
    setTimeout(() => {
        popup.classList.remove('bounce');
        closeFeedbackPopup();
    }, 3000);
}

function closeFeedbackPopup() {
    const overlay = document.getElementById('feedback-overlay');
    overlay.classList.remove('show');
}

// Confetti effect for celebrations
function createConfetti() {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3', '#54a0ff'];
    const confettiCount = 50;

    for (let i = 0; i < confettiCount; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.top = '-10px';
            confetti.style.borderRadius = '50%';
            confetti.style.pointerEvents = 'none';
            confetti.style.zIndex = '9999';
            confetti.style.animation = `confettiFall ${2 + Math.random() * 3}s linear forwards`;

            document.body.appendChild(confetti);

            setTimeout(() => {
                confetti.remove();
            }, 5000);
        }, i * 50);
    }
}

// Add confetti animation to CSS
const confettiCSS = `
@keyframes confettiFall {
    0% {
        transform: translateY(-100vh) rotate(0deg);
        opacity: 1;
    }
    100% {
        transform: translateY(100vh) rotate(720deg);
        opacity: 0;
    }
}
`;

// Inject confetti CSS
const confettiStyle = document.createElement('style');
confettiStyle.textContent = confettiCSS;
document.head.appendChild(confettiStyle);

// Functions are exported in DOMContentLoaded event
