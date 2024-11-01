// SLIDES
const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.banner');
const dots = document.querySelectorAll('.slider-dot');
const prevButton = document.querySelector('.slider-arrow.prev');
const nextButton = document.querySelector('.slider-arrow.next');

let currentSlide = 0;
const totalSlides = slides.length;

function updateSlider() {
    // Atualiza a posição do slider
    slider.style.transform = `translateX(-${currentSlide * 100 / totalSlides}%)`;

    // Atualiza as classes active
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlider();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateSlider();
}

// Event Listeners
nextButton.addEventListener('click', nextSlide);
prevButton.addEventListener('click', prevSlide);

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentSlide = index;
        updateSlider();
    });
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') nextSlide();
    if (e.key === 'ArrowLeft') prevSlide();
});

// Touch events
let touchStartX = 0;
let touchEndX = 0;

slider.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

slider.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const difference = touchStartX - touchEndX;

    if (Math.abs(difference) > swipeThreshold) {
        if (difference > 0) {
            nextSlide();
        } else {
            prevSlide();
        }
    }
}

// Autoplay SLIDES
setInterval(() => {
    nextSlide();
}, 7000);

// FIM SLIDES