document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    // عند النقر على زر القائمة
    menuToggle.addEventListener("click", function (event) {
        navLinks.classList.toggle("show");
        event.stopPropagation(); // لمنع إغلاقها عند النقر على الزر نفسه
    });

    // إخفاء القائمة عند النقر في أي مكان خارجها
    document.addEventListener("click", function (event) {
        if (!navLinks.contains(event.target) && !menuToggle.contains(event.target)) {
            navLinks.classList.remove("show");
        }
    });
});

let currentIndex = 0;
const slides = document.querySelectorAll(".slider-image");

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle("active", i === index);
  });
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % slides.length;
  showSlide(currentIndex);
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  showSlide(currentIndex);
}

setInterval(nextSlide, 5000);

document.querySelector('.contact-form').addEventListener('submit', function(e) {
  e.preventDefault();

  const name = this.querySelector('input[type="text"]').value.trim();
  const email = this.querySelector('input[type="email"]').value.trim();
  const message = this.querySelector('textarea').value.trim();

  if (!name || !email || !message) {
    alert("Please fill in all fields.");
    return;
  }

  const commentSection = document.querySelector('.reviews-section');

  const newComment = document.createElement('div');
  newComment.classList.add('comment');
  newComment.innerHTML = `
    <div class="stars">
        <i class="fas fa-star"></i>
        <i class="fas fa-star"></i>
        <i class="fas fa-star"></i>
        <i class="fas fa-star"></i>
        <i class="fas fa-star-half-alt"></i>
    </div>
    <p><strong>${name}:</strong> "${message}"</p>
  `;

  commentSection.appendChild(newComment); // ضيفي التعليق في آخر الريفيوز

  this.reset(); // نفضي الحقول
  alert("Thank you for your feedback! 💬");
});
