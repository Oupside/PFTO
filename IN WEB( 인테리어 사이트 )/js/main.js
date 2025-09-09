const slides = document.querySelectorAll('.main-img');
let currentIndex = 0;

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
    });
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
}

// 첫 번째 이미지 표시
showSlide(currentIndex);

// 3초마다 다음 이미지로 자동 전환
setInterval(nextSlide, 3000);
