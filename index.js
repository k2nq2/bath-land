document.querySelectorAll(".accordion-header").forEach(button => {
    button.addEventListener("click", () => {
        const accordionItem = button.parentElement;
        
        // Закрываем все остальные
        document.querySelectorAll(".accordion-item").forEach(item => {
            if (item !== accordionItem) {
                item.classList.remove("active");
            }
        });

        // Переключаем текущий
        accordionItem.classList.toggle("active");
    });
});


function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}

window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {

    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

document.addEventListener("DOMContentLoaded", function () {
    const slides = document.querySelectorAll(".slide");
    const prevButton = document.getElementById("prev");
    const nextButton = document.getElementById("next");
    const slideNumber = document.getElementById("slide-number");
    const progressRing = document.querySelector(".progress-ring");
    
    const totalSlides = slides.length;
    let currentIndex = 0;

    const circle = document.querySelector(".progress-ring");
    const radius = 18; // Радиус круга (70px / 2)
    const circumference = 2 * Math.PI * radius; // Полная длина окружности

    progressRing.style.strokeDasharray = circumference;
    progressRing.style.strokeDashoffset = circumference;

    function updateSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle("active", i === index);
        });

        // Обновляем нумерацию в формате "1/2", "2/2"
        slideNumber.textContent = `${index + 1}/${totalSlides}`;

        // Анимация круга: уменьшаем dashoffset, заполняя круг
        const progress = (index + 1) / totalSlides;
        progressRing.style.strokeDashoffset = circumference * (1 - progress);
    }

    prevButton.addEventListener("click", function () {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        updateSlide(currentIndex);
    });

    nextButton.addEventListener("click", function () {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateSlide(currentIndex);
    });

    updateSlide(currentIndex);
});


document.addEventListener("DOMContentLoaded", function () {
    const lowerSection = document.querySelector(".slider-cont");

    window.addEventListener("scroll", function () {
        const lowerSectionPosition = lowerSection.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        // Если нижний блок попадает в область видимости — показываем его
        if (lowerSectionPosition < windowHeight * 0.8) {
            lowerSection.classList.add("visible");
        } else {
            lowerSection.classList.remove("visible");
        }
    });
});
document.addEventListener("DOMContentLoaded", function () {
    const lowerSection = document.querySelector(".work-cont");

    window.addEventListener("scroll", function () {
        const lowerSectionPosition = lowerSection.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        // Если нижний блок попадает в область видимости — показываем его
        if (lowerSectionPosition < windowHeight * 0.8) {
            lowerSection.classList.add("visible");
        } else {
            lowerSection.classList.remove("visible");
        }
    });
});


document.addEventListener("DOMContentLoaded", function () {
    const slides = document.querySelectorAll(".slide2");
    const categories = document.querySelectorAll(".category");
    const prevBtn = document.querySelector(".prev2");
    const nextBtn = document.querySelector(".next2");
    const indicatorsContainer = document.querySelector(".indicators");

    let currentIndex = 0;

    // Создаем индикаторы
    slides.forEach((_, index) => {
        const dot = document.createElement("span");
        dot.dataset.index = index;
        if (index === 0) dot.classList.add("active");
        indicatorsContainer.appendChild(dot);
    });

    const indicators = document.querySelectorAll(".indicators span");

    function showSlide(index) {
        slides.forEach((slide) => slide.classList.remove("active"));
        slides[index].classList.add("active");

        categories.forEach((cat) => cat.classList.remove("active"));
        categories[index].classList.add("active");

        indicators.forEach((dot) => dot.classList.remove("active"));
        indicators[index].classList.add("active");
    }

    nextBtn.addEventListener("click", function () {
        currentIndex = (currentIndex + 1) % slides.length;
        showSlide(currentIndex);
    });

    prevBtn.addEventListener("click", function () {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        showSlide(currentIndex);
    });

    categories.forEach((category) => {
        category.addEventListener("click", function () {
            currentIndex = parseInt(category.getAttribute("data-index"));
            showSlide(currentIndex);
        });
    });

    indicators.forEach((dot) => {
        dot.addEventListener("click", function () {
            currentIndex = parseInt(this.dataset.index);
            showSlide(currentIndex);
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const sliderContainer = document.querySelector(".slider-container5");
    const slides = document.querySelectorAll(".slide5");
    const prevBtn = document.querySelector(".prev-btn5");
    const nextBtn = document.querySelector(".next-btn5");
    const progressBar = document.querySelector(".progress");

    let index = 0;
    let slidesToShow = window.innerWidth < 768 ? 1 : 2;

    function updateSlidesToShow() {
        slidesToShow = window.innerWidth < 768 ? 1 : 2;
        updateSlider();
    }

    function updateSlider() {
        const slideWidth = slides[0].offsetWidth;
        sliderContainer.style.transform = `translateX(-${index * slideWidth}px)`;
        updateProgressBar();
    }

    function updateProgressBar() {
        let progress = ((index + slidesToShow) / slides.length) * 100;
        progressBar.style.width = `${progress}%`;
    }

    nextBtn.addEventListener("click", function () {
        if (index < slides.length - slidesToShow) {
            index++;
            updateSlider();
        }
    });

    prevBtn.addEventListener("click", function () {
        if (index > 0) {
            index--;
            updateSlider();
        }
    });

    // Поддержка свайпа
    // Поддержка свайпа (с фиксами для Safari)
    let touchStartX = 0;
    let touchEndX = 0;
    let isSwiping = false;

    sliderContainer.addEventListener("touchstart", (e) => {
        touchStartX = e.touches[0].clientX;
        isSwiping = true;
    }, { passive: false });

    sliderContainer.addEventListener("touchmove", (e) => {
        if (!isSwiping) return;
        touchEndX = e.touches[0].clientX;
        e.preventDefault(); // Блокируем скролл страницы
    }, { passive: false });

    sliderContainer.addEventListener("touchend", () => {
        if (!isSwiping) return;
        isSwiping = false;
        handleSwipe();
    });

    sliderContainer.addEventListener("touchcancel", () => {
        isSwiping = false;
    });

    function handleSwipe() {
        let swipeDistance = touchStartX - touchEndX;

        if (Math.abs(swipeDistance) > 50) { // Минимальная длина свайпа
            if (swipeDistance > 0 && index < slides.length - slidesToShow) {
                index++;
            } else if (swipeDistance < 0 && index > 0) {
                index--;
            }
            updateSlider();
        }
    }

    // Автоматически обновляем при изменении размера окна
    window.addEventListener("resize", updateSlidesToShow);
});
document.addEventListener("DOMContentLoaded", function () {
    const sliderContainer2 = document.querySelector(".slider-container6");
    const slides2 = document.querySelectorAll(".slide6");
    const prevBtn2 = document.querySelector(".prev-btn6");
    const nextBtn2 = document.querySelector(".next-btn6");
    const progressBar2 = document.querySelector(".progress2");

    let index = 0;
    let slides2ToShow = window.innerWidth < 768 ? 1 : 2;

    function updateSlidesToShow() {
        slides2ToShow = window.innerWidth < 768 ? 1 : 2;
        updateSlider();
    }

    function updateSlider() {
        const slideWidth = slides2[0].offsetWidth;
        sliderContainer2.style.transform = `translateX(-${index * slideWidth}px)`;
        updateProgressBar();
    }

    function updateProgressBar() {
        let progress = ((index + slides2ToShow) / slides2.length) * 100;
        progressBar2.style.width = `${progress}%`;
    }

    nextBtn2.addEventListener("click", function () {
        if (index < slides2.length - slides2ToShow) {
            index++;
            updateSlider();
        }
    });

    prevBtn2.addEventListener("click", function () {
        if (index > 0) {
            index--;
            updateSlider();
        }
    });

    // Поддержка свайпа
       let touchStartX = 0;
    let touchEndX = 0;
    let isSwiping = false;

    sliderContainer2.addEventListener("touchstart", (e) => {
        touchStartX = e.touches[0].clientX;
        isSwiping = true;
    }, { passive: false });

    sliderContainer2.addEventListener("touchmove", (e) => {
        if (!isSwiping) return;
        touchEndX = e.touches[0].clientX;
        e.preventDefault(); // Блокируем скролл страницы
    }, { passive: false });

    sliderContainer2.addEventListener("touchend", () => {
        if (!isSwiping) return;
        isSwiping = false;
        handleSwipe();
    });

    sliderContainer2.addEventListener("touchcancel", () => {
        isSwiping = false;
    });

    function handleSwipe() {
        let swipeDistance = touchStartX - touchEndX;

        if (Math.abs(swipeDistance) > 50) { // Минимальная длина свайпа
            if (swipeDistance > 0 && index < slides2.length - slides2ToShow) {
                index++;
            } else if (swipeDistance < 0 && index > 0) {
                index--;
            }
            updateSlider();
        }
    }

    // Автоматически обновляем при изменении размера окна
    window.addEventListener("resize", updateSlidesToShow);
});




document.addEventListener("DOMContentLoaded", function () {
    const slides = document.querySelectorAll(".slide2");
    const fullscreenContainer = document.querySelector(".fullscreen-image");
    const fullscreenImage = fullscreenContainer.querySelector("img");
    const prevBtn = fullscreenContainer.querySelector(".prev");
    const nextBtn = fullscreenContainer.querySelector(".next");
    const closeBtn = fullscreenContainer.querySelector(".close"); // Кнопка закрытия

    let currentImages = []; // Список изображений текущего слайда
    let currentIndex = 0;

    // Функция открытия изображения
    function openImage(index, images) {
        currentIndex = index;
        currentImages = images;
        fullscreenImage.src = currentImages[currentIndex].src;
        fullscreenContainer.classList.add("active");
    }

    // Навешиваем обработчики на все изображения
    slides.forEach(slide => {
        const images = slide.querySelectorAll("img");
        images.forEach((img, index) => {
            img.addEventListener("click", function () {
                openImage(index, images);
            });
        });
    });

    // Функция переключения изображений
    function changeImage(direction) {
        currentIndex += direction;

        if (currentIndex < 0) {
            currentIndex = currentImages.length - 1; // Переход к последнему
        } else if (currentIndex >= currentImages.length) {
            currentIndex = 0; // Переход к первому
        }

        fullscreenImage.src = currentImages[currentIndex].src;
    }

    // Клик по стрелкам
    prevBtn.addEventListener("click", function () {
        changeImage(-1);
    });

    nextBtn.addEventListener("click", function () {
        changeImage(1);
    });

    // Закрытие при клике на фон
    fullscreenContainer.addEventListener("click", function (e) {
        if (e.target === fullscreenContainer) {
            fullscreenContainer.classList.remove("active");
        }
    });

    // Закрытие при клике на кнопку с классом close
    closeBtn.addEventListener("click", function () {
        fullscreenContainer.classList.remove("active");
    });

    // Переключение клавишами ← и →
    document.addEventListener("keydown", function (e) {
        if (fullscreenContainer.classList.contains("active")) {
            if (e.key === "ArrowLeft") {
                changeImage(-1);
            } else if (e.key === "ArrowRight") {
                changeImage(1);
            } else if (e.key === "Escape") {
                fullscreenContainer.classList.remove("active");
            }
        }
    });
});



document.addEventListener("DOMContentLoaded", function () {
    const track = document.querySelector(".testimonial-track");
    const prevButton = document.querySelector(".prev-btn4");
    const nextButton = document.querySelector(".next-btn4");
    const slides = document.querySelectorAll(".testimonial-slide");

    let index = 0;
    const totalSlides = slides.length;

    function moveSlide(direction) {
        index += direction;

        if (index < 0) {
            index = totalSlides - 1; // Переключаемся на последний блок
        } else if (index >= totalSlides) {
            index = 0; // Переключаемся на первый блок
        }

        const offset = -(index * 100); // Смещение в %
        track.style.transform = `translateX(${offset}%)`;
    }

    prevButton.addEventListener("click", () => moveSlide(-1));
    nextButton.addEventListener("click", () => moveSlide(1));
});

function toggleMenu() {
    document.getElementById('menu').classList.toggle('active');
}

document.querySelectorAll('.service-wrap').forEach(block => {
    const plusIcon = block.querySelector('.circle');
    const popup = block.querySelector('.circle-item');

    plusIcon.addEventListener('mouseover', () => {
        popup.style.opacity = '1';
        popup.style.pointerEvents = 'auto';
    });

    plusIcon.addEventListener('mouseout', () => {
        popup.style.opacity = '0';
        popup.style.pointerEvents = 'none';
    });
});
