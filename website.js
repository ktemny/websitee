document.addEventListener("DOMContentLoaded", () => {
    showSection("home");
    typeEffect();
    showSkills();
    setupNextButtons();
    createPaginationDots();
    updateSlide();
});

// SECTION SWITCHING
function showSection(sectionId) {
    document.querySelectorAll(".section").forEach(section => {
        section.style.display = section.id === sectionId ? "block" : "none";
    });

    document.querySelectorAll("nav a").forEach(link => {
        link.classList.remove("active");
        if (link.dataset.section === sectionId) {
            link.classList.add("active");
        }
    });
}

// TYPING EFFECT
const nameText = "Hanna Kate Perez";
let index = 0;

function typeEffect() {
    const displayText = nameText.slice(0, index);
    document.getElementById("typing-name").innerHTML = displayText + '<span class="cursor">|</span>'; 

    if (index < nameText.length) {
        index++;
        setTimeout(typeEffect, 200);
    } else {
        index = 0;
        setTimeout(typeEffect, 1000);
    }
}

// NEXT BUTTONS
function setupNextButtons() {
    document.querySelectorAll(".next-btn").forEach(button => {
        button.addEventListener("click", function() {
            const nextSection = this.getAttribute("data-next");
            showSection(nextSection);
        });
    });
}

// SKILLS ANIMATION
function showSkills() {
    const skills = document.querySelectorAll('.skill');
    skills.forEach((skill, index) => {
        setTimeout(() => {
            skill.classList.add('show');
        }, index * 300);
    });
}

// PROJECTS & GALLERY ON SCROLL
window.addEventListener('scroll', () => {
    const windowHeight = window.innerHeight;

    document.querySelectorAll('.project').forEach(project => {
        const projectTop = project.getBoundingClientRect().top;
        if (projectTop < windowHeight - 100) {
            project.classList.add('show');
        } else {
            project.classList.remove('show');
        }
    });

    const gallery = document.querySelector('.gallery');
    if (gallery) {
        const galleryTop = gallery.getBoundingClientRect().top;
        if (galleryTop < windowHeight - 100) {
            gallery.classList.add('show');
        } else {
            gallery.classList.remove('show');
        }
    }
});

// SLIDESHOW
let currentIndex = 0;
const slides = document.querySelector('.slides');
const totalSlides = document.querySelectorAll('.slides img').length;
const paginationDots = document.querySelector('.pagination-dots');

function createPaginationDots() {
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        dot.addEventListener('click', () => {
            currentIndex = i;
            updateSlide();
        });
        paginationDots.appendChild(dot);
    }
}

function changeSlide(direction) {
    currentIndex += direction;
    if (currentIndex < 0) currentIndex = totalSlides - 1;
    if (currentIndex >= totalSlides) currentIndex = 0;
    updateSlide();
}

function updateSlide() {
    const offset = -currentIndex * 100;
    slides.style.transform = `translateX(${offset}%)`;

    document.querySelectorAll('.dot').forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
    });
}
