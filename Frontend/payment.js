document.getElementById("bookNow").addEventListener("click", function (event) {
    // التأكد من ملء جميع الحقول المطلوبة قبل الانتقال للدفع
    let formIsValid = validateBookingForm("bookingForm");

    if (formIsValid) {
        console.log("تم ملء جميع الحقول المطلوبة، سيتم الانتقال للدفع.");
        document.querySelector(".booking-form").classList.add("hidden");
        document.querySelector(".payment-section").classList.remove("hidden");
    }
});

document.querySelector("#paymentForm button[type='submit']").addEventListener("click", function (event) {
    event.preventDefault(); // منع إعادة تحميل الصفحة

    let paymentFormIsValid = validateBookingForm("paymentForm");

    if (paymentFormIsValid) {
        console.log("تمت عملية الدفع بنجاح! سيتم عرض رسالة النجاح.");
        document.querySelector(".payment-section").classList.add("hidden");
        document.getElementById("success-message").style.display = "block";
    }
});

function validateBookingForm(formId) {
    let form = document.getElementById(formId);
    let inputs = form.querySelectorAll("input[required]");
    
    for (let input of inputs) {
        if (input.value.trim() === "") {
            input.focus(); // يركز على أول حقل فارغ
            return false; // إيقاف العملية لأنه يوجد حقل فارغ
        }
    }
    return true; // كل الحقول ممتلئة، يمكن المتابعة
}

document.addEventListener("DOMContentLoaded", function () {
    fetch('https://yourwebsite.com/api/payment-methods') // ← غيري الرابط هنا حسب اللي هيديهولك الباك إند
        .then(response => response.json())
        .then(data => {
            const container = document.querySelector('.payment-methods');
            container.innerHTML = ''; // نحذف أي حاجة موجودة

            data.forEach(method => {
                const label = document.createElement('label');
                label.innerHTML = `
                    <input type="radio" name="paymentType" value="${method.id}">
                    ${method.label}
                `;
                container.appendChild(label);
            });

            // أول اختيار يكون مختار تلقائيًا
            const firstInput = container.querySelector('input');
            if (firstInput) {
                firstInput.checked = true;
            }
        })
        .catch(error => {
            console.error('Error fetching payment methods:', error);
        });
});
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