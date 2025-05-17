document.addEventListener("DOMContentLoaded", function () {
    const checkButton = document.getElementById("check-availability");
    const locationFilter = document.getElementById("location-filter");
    const languageFilter = document.getElementById("language-filter");

    checkButton.addEventListener("click", function () {
        const selectedLocation = locationFilter.value;
        const selectedLanguage = languageFilter.value.toLowerCase().trim();
        const tourGuides = document.querySelectorAll(".guide-card");

        tourGuides.forEach(card => {
            const guideLocation = card.getAttribute("data-location").trim();
            const guideLanguages = card.getAttribute("data-language").toLowerCase().split(",");

            const locationMatch = (selectedLocation === "all" || guideLocation === selectedLocation);
            const languageMatch = (selectedLanguage === "all" || guideLanguages.some(lang => lang.trim() === selectedLanguage));

            if (locationMatch && languageMatch) {
                card.style.display = "block"; // إظهار الكارد المناسب
            } else {
                card.style.display = "none"; // إخفاء الكارد الغير مناسب
            }
        });
    });
});
document.getElementById("check-availability").addEventListener("click", function () {
    let languageFilter = document.getElementById("language-filter").value;

    if (languageFilter === "all") {
        alert("يرجى اختيار لغة قبل البحث!");
    } else {
        // هنا تحط كود البحث لو اللغة مختارة
        filterGuides();
    }
});
