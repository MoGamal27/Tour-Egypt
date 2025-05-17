document.addEventListener("DOMContentLoaded", () => {
    const touristBtn = document.getElementById("tourist");
    const tourGuideBtn = document.getElementById("tourGuide");
    const form = document.getElementById("registerForm");

    // تبديل النمط النشط بين السائح والمرشد
    touristBtn.addEventListener("click", () => {
        touristBtn.classList.add("active");
        tourGuideBtn.classList.remove("active");
    });

    tourGuideBtn.addEventListener("click", () => {
        tourGuideBtn.classList.add("active");
        touristBtn.classList.remove("active");
    });

document.querySelectorAll('.toggle-password').forEach(icon => {
    icon.addEventListener('click', function () {
        let input = this.previousElementSibling;
        if (input.type === "password") {
            input.type = "text";
            this.textContent = "🔒"; // أيقونة مغلقة
        } else {
            input.type = "password";
            this.textContent = "👁"; // أيقونة مفتوحة
        }
    });
});

});
document.addEventListener("DOMContentLoaded", function () {
    const touristBtn = document.getElementById("tourist");
    const tourGuideBtn = document.getElementById("tourGuide");
    const confirmPasswordField = document.getElementById("confirmPassword").parentNode;
    const loginParagraph = document.querySelector(".login");

    // إنشاء قائمة اللغات
    const languageField = document.createElement("div");
    languageField.innerHTML = `
        <label>Language</label>
        <select id="language">
            <option value="" disabled selected >Select a language</option>
            <option value="English">English</option>
            <option value="Arabic">Arabic</option>
            <option value="French">French</option>
            <option value="Spanish">Spanish</option>
            <option value="German">German</option>
        </select>
        
    `;
    languageField.style.display = "none"; // إخفاؤه في البداية

    const experienceField = document.createElement("div");
    experienceField.innerHTML = `
        <label>Experience</label>
        <input type="number" id="experience" min="0" placeholder="Enter years of experience">

        
    `;
    experienceField.style.display = "none"; // إخفاؤه في البداية

    const destinationField = document.createElement("div");
    destinationField.innerHTML = `
        <label>Destination</label>
        <select id="destination">
            <option value="" disabled selected >Select a destination</option>
            <option value="Cairo">Cairo</option>
            <option value="Alexandria">Alexandria</option>
            <option value="Red Sea">Red Sea</option>
            <option value="Luxor">Luxor</option>
            <option value="Aswan">Aswan</option>
             <option value="Saina">Saina</option>
        </select>
        
    `;
    destinationField.style.display = "none"; // إخفاؤه في البداية

    confirmPasswordField.parentNode.insertBefore(languageField, confirmPasswordField.nextSibling); // إضافته بعد Confirm Password
    confirmPasswordField.parentNode.insertBefore(experienceField, languageField.nextSibling); // إضافته بعد Confirm Password
    confirmPasswordField.parentNode.insertBefore(destinationField, experienceField.nextSibling); // إضافته بعد Confirm Password



    // عند اختيار "Tour Guide"
    tourGuideBtn.addEventListener("click", function () {
        tourGuideBtn.classList.add("active");
        touristBtn.classList.remove("active");
        languageField.style.display = "block"; // إظهار القائمة
        experienceField.style.display = "block"; // إظهار القائمة
        destinationField.style.display = "block"; // إظهار القائمة


        loginParagraph.style.display = "block";
    });

    // عند اختيار "Tourist"
    touristBtn.addEventListener("click", function () {
        touristBtn.classList.add("active");
        tourGuideBtn.classList.remove("active");
        languageField.style.display = "none"; // إخفاء القائمة
        experienceField.style.display = "none"; // إخفاء القائمة
        destinationField.style.display = "none"; // إخفاء القائمة
        loginParagraph.style.display = "block";
    });
});



document.addEventListener("DOMContentLoaded", function () {
    const touristBtn = document.getElementById("tourist");
    const tourGuideBtn = document.getElementById("tourGuide");
    const imageUploadContainer = document.getElementById("image-upload-container");
    const profilePicInput = document.getElementById("profile-pic");
    const previewImg = document.getElementById("preview-img");

    // عند اختيار "Tour Guide"
    tourGuideBtn.addEventListener("click", function () {
        tourGuideBtn.classList.add("active");
        touristBtn.classList.remove("active");
        imageUploadContainer.style.display = "block"; // إظهار حقل رفع الصورة
    });

    // عند اختيار "Tourist"
    touristBtn.addEventListener("click", function () {
        touristBtn.classList.add("active");
        tourGuideBtn.classList.remove("active");
        imageUploadContainer.style.display = "none"; // إخفاء حقل رفع الصورة
        profilePicInput.value = ""; // مسح الملف عند الإخفاء
        previewImg.style.display = "none"; // إخفاء المعاينة
    });

    // عرض الصورة عند رفعها
    profilePicInput.addEventListener("change", function (event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                previewImg.src = e.target.result;
                previewImg.style.display = "block";
            };
            reader.readAsDataURL(file);
        }
    });
});



document.addEventListener("DOMContentLoaded", function () {
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirmPassword");
    const registerForm = document.getElementById("registerForm");

    // رسالة الخطأ لكلمة المرور
    const passwordError = document.createElement("p");
    passwordError.style.color = "black";
    passwordError.style.fontSize = "14px";
    passwordError.style.display = "none"; // إخفاء الرسالة في البداية
    passwordError.textContent = "Password must be at least 6 characters.";
    
    // إضافة الرسالة تحت حقل كلمة المرور
    passwordInput.parentNode.appendChild(passwordError);

    // التحقق أثناء الكتابة
    passwordInput.addEventListener("input", function () {
        if (passwordInput.value.length < 6) {
            passwordError.style.display = "block"; // إظهار الرسالة إذا كانت أقل من 6
        } else {
            passwordError.style.display = "none"; // إخفاء الرسالة إذا كانت 6 أو أكثر
        }
    });

    // رسالة الخطأ لتأكيد كلمة المرور
    const confirmPasswordError = document.createElement("p");
    confirmPasswordError.style.color = "black";
    confirmPasswordError.style.fontSize = "12px";
    confirmPasswordError.style.display = "none"; // إخفاء الرسالة في البداية
    confirmPasswordError.textContent = "Passwords do not match.";

    confirmPasswordInput.parentNode.appendChild(confirmPasswordError);

    // التحقق أثناء الكتابة في حقل تأكيد كلمة المرور
    confirmPasswordInput.addEventListener("input", function () {
        if (passwordInput.value !== confirmPasswordInput.value) {
            confirmPasswordError.style.display = "block"; // إظهار الرسالة إذا كانت الكلمات غير متطابقة
        } else {
            confirmPasswordError.style.display = "none"; // إخفاء الرسالة إذا كانت الكلمات متطابقة
        }
    });

    // عند الضغط على زر Create
    registerForm.addEventListener("submit", function (event) {
        event.preventDefault(); // منع إرسال النموذج مباشرة

        // التحقق من كلمة المرور
        if (passwordInput.value.length < 6) {
            passwordError.style.display = "block";
        } else if (passwordInput.value !== confirmPasswordInput.value) {
            confirmPasswordError.style.display = "block";
        } else {
            // إذا كانت البيانات صحيحة، سيتم إظهار رسالة التنبيه
            alert("Your account has been successfully created!");
        }
    });

    // إخفاء الرسائل عند التركيز على أي حقل آخر
    document.querySelectorAll("input").forEach(input => {
        input.addEventListener("focus", function () {
            // إخفاء رسائل الخطأ عند التركيز على أي حقل آخر
            passwordError.style.display = "none";
            confirmPasswordError.style.display = "none";
        });
    });
});


document.addEventListener("DOMContentLoaded", function() {
    const languageSelect = document.getElementById("language");
    const createBtn = document.getElementById("createBtn");

    // التحقق من اللغات المحددة قبل إرسال النموذج
    createBtn.addEventListener("click", function(event) {
        const selectedLanguages = Array.from(languageSelect.selectedOptions).map(option => option.value);

        if (selectedLanguages.length === 0) {
            alert("Please select at least one language.");
            event.preventDefault(); // منع إرسال النموذج إذا لم يتم اختيار لغة
        } else {
            console.log("Selected languages:", selectedLanguages);
        }
    });
});




