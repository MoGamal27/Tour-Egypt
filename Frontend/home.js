document.querySelector('.check-availability').addEventListener('click', function() {
    alert('Searching for availability...');
});

document.querySelectorAll('.destination button').forEach(button => {
    button.addEventListener('click', function() {
        alert('Booking confirmed!');
    });
});

// سلايدر المطاعم
const restaurantSlider = document.querySelector(".Restaurant-slider");
let scrollAmount = 0;
function autoSlide() {
    if (scrollAmount < restaurantSlider.scrollWidth - restaurantSlider.clientWidth) {
        scrollAmount += 300;
    } else {
        scrollAmount = 0;
    }
    restaurantSlider.scrollTo({ left: scrollAmount, behavior: "smooth" });
}
setInterval(autoSlide, 2000);

// عداد تنازلي للعرض الخاص
const countdownElement = document.querySelector(".offer");
let timeLeft = 5 * 60; // 5 دقائق بالثواني
function updateCountdown() {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    countdownElement.innerHTML = `<span style="font-size: 40px;font-weight: bold;">${minutes}:${seconds < 10 ? '0' : ''}${seconds}</span><br>Hurry! Offer ends soon!`;
    if (timeLeft > 0) {
        timeLeft--;
    }
}
setInterval(updateCountdown, 1000);

// تأثير عند تمرير صور الأنشطة
const activityImages = document.querySelectorAll(".activities-images img");
window.addEventListener("scroll", () => {
    activityImages.forEach((img) => {
        let position = img.getBoundingClientRect().top;
        let screenHeight = window.innerHeight;
        if (position < screenHeight - 50) {
            img.style.transform = "scale(1.1)";
            img.style.transition = "0.5s ease-in-out";
        } else {
            img.style.transform = "scale(1)";
        }
    });
});


function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    const menuToggle = document.querySelector('.menu-toggle');

    // أظهر أو أخفي القائمة
    navLinks.classList.toggle('show');

    // إزالة الحدث القديم لو موجود
    document.removeEventListener('click', closeMenuOnClickOutside);

    // أضف الحدث لإغلاق القائمة عند النقر خارجها
    setTimeout(() => {
        document.addEventListener('click', closeMenuOnClickOutside);
    }, 0); // استخدم timeout لتأخير التنفيذ لحظة
}

function closeMenuOnClickOutside(event) {
    const navLinks = document.querySelector('.nav-links');
    const menuToggle = document.querySelector('.menu-toggle');

    if (
        !navLinks.contains(event.target) &&
        !menuToggle.contains(event.target)
    ) {
        navLinks.classList.remove('show');
        document.removeEventListener('click', closeMenuOnClickOutside); // إزالة الحدث بعد الإغلاق
    }
}


