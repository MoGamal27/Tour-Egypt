function goToSection() {
    let locationSelect = document.getElementById("locationSelect");
    let selectedLocation = locationSelect.value;

    console.log("Selected location:", selectedLocation); // تحقق من القيمة المختارة

    if (selectedLocation) {
        let section = document.getElementById(selectedLocation);
        
        if (section) {
            console.log("Navigating to:", section.id); // تحقق مما إذا كان وجد القسم
            section.scrollIntoView({ behavior: "smooth" });
        } else {
            console.error("Section not found:", selectedLocation);
        }
    } else {
        alert("Please select a governorate first!");
    }
}

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



