document.addEventListener('DOMContentLoaded', function () {
    const sortSelect = document.getElementById('sort-activities');
    if (!sortSelect) {
        console.error('Sort select element not found!');
        return;
    }

    sortSelect.addEventListener('change', function () {
        const sortBy = this.value;
        const container = document.querySelector('.activities-container');
        if (!container) {
            console.error('Activities container not found!');
            return;
        }

        const cards = Array.from(container.querySelectorAll('.activity-card'));
        if (cards.length === 0) {
            console.error('No activity cards found!');
            return;
        }

        cards.sort((a, b) => {
            const getPrice = (card) => {
                const priceText = card.querySelector('.price')?.textContent.replace('💰 $', '').trim() || '0';
                const priceValue = parseFloat(priceText);
                console.log(`Price ${card.querySelector('h3').textContent}: ${priceValue}`);
                return isNaN(priceValue) ? 0 : priceValue;
            };

            const getRating = (card) => {
                const ratingText = card.querySelector('.rating span')?.textContent.replace('(', '').replace(')', '').trim() || '0';
                const ratingValue = parseFloat(ratingText);
                console.log(`Rating ${card.querySelector('h3').textContent}: ${ratingValue}`);
                return isNaN(ratingValue) ? 0 : ratingValue;
            };

            if (sortBy === 'priceLowToHigh') {
                return getPrice(a) - getPrice(b);
            } else if (sortBy === 'priceHighToLow') {
                return getPrice(b) - getPrice(a);
            } else if (sortBy === 'mostPopular') {
                return getRating(b) - getRating(a);
            }
            return 0;
        });

        // إعادة ترتيب الكروت
        cards.forEach(card => container.appendChild(card));
        console.log(`Sorted by: ${sortBy}`);
    });

    // تهيئة الفرز عند التحميل بـ "Most Popular" افتراضيًا
    sortSelect.value = 'mostPopular';
    sortSelect.dispatchEvent(new Event('change'));
});
document.addEventListener("DOMContentLoaded", function () {
    let cards = document.querySelectorAll(".card");
    cards.forEach((card, index) => {
      setTimeout(() => {
        card.style.transform = "scale(1)";
        card.style.opacity = "1";
      }, index * 200); // التأخير التدريجي بين كل كارد
    });
  });
  

  document.addEventListener('DOMContentLoaded', function () {
    // Function to handle booking for each activity
    function setupActivityBooking() {
        const bookButtons = document.querySelectorAll('.book-activity-btn');
        
        bookButtons.forEach(button => {
            button.addEventListener('click', function() {
                const activityCard = this.closest('.activity-card');
                const activityName = activityCard.querySelector('h3').textContent;
                const activityPrice = activityCard.querySelector('.price').textContent;
                
                // Get dates from the main booking form
                const checkInDate = document.querySelector('.booking-form .input-box:nth-child(1) input').value;
                const checkOutDate = document.querySelector('.booking-form .input-box:nth-child(2) input').value;
                const guests = document.querySelector('.booking-form .input-box:nth-child(3) input').value;
                
                if (!checkInDate || !checkOutDate) {
                    alert('Please select check-in and check-out dates first');
                    return;
                }
                
                const bookingDetails = `
                    Activity: ${activityName}
                    Price: ${activityPrice}
                    Check-In: ${checkInDate}
                    Check-Out: ${checkOutDate}
                    Guests: ${guests}
                `;
                
                alert(`Booking Confirmation:\n\n${bookingDetails}\n\nThank you! We will contact you shortly.`);
            });
        });
    }

    // Initialize the booking functionality
    setupActivityBooking();
});


  document.addEventListener('DOMContentLoaded', function () {
    function setupActivityBooking() {
        const bookButtons = document.querySelectorAll('.book-activity-btn');

        bookButtons.forEach(button => {
            button.addEventListener('click', function () {
                const activityCard = this.closest('.activity-card');
                const activityName = activityCard.querySelector('h3').textContent;
                const priceText = activityCard.querySelector('.price').textContent.replace('💰 $', '').trim();
                const activityPrice = parseFloat(priceText);

                // الحصول على التواريخ وعدد الأشخاص من النموذج الرئيسي
                const checkInDate = document.querySelector('.booking-form .input-box:nth-child(1) input').value;
                const checkOutDate = document.querySelector('.booking-form .input-box:nth-child(2) input').value;
                const guests = parseInt(document.querySelector('.booking-form .input-box:nth-child(3) input').value) || 1;

                if (!checkInDate || !checkOutDate) {
                    alert('Please select check-in and check-out dates first.');
                    return;
                }

                const totalPrice = (isNaN(activityPrice) ? 0 : activityPrice) * guests;

                const bookingDetails = `
Booking Confirmation ✅

Activity: ${activityName}
Price per person: $${activityPrice.toFixed(2)}
Number of guests: ${guests}
Total Price: $${totalPrice.toFixed(2)}
Check-In: ${checkInDate}
Check-Out: ${checkOutDate}

Thank you! We will contact you shortly.
                `;

                alert(bookingDetails);
            });
        });
    }

    setupActivityBooking();
});
document.addEventListener('DOMContentLoaded', function () {
    const bookNowBtn = document.getElementById('book-now-btn');

    if (bookNowBtn) {
        bookNowBtn.addEventListener('click', function () {
            const checkInDate = document.querySelector('.booking-form .input-box:nth-child(1) input').value;
            const checkOutDate = document.querySelector('.booking-form .input-box:nth-child(2) input').value;

            if (!checkInDate || !checkOutDate) {
                alert('Please select check-in and check-out dates first.');
                return;
            }

            // ✅ الرسالة البسيطة المطلوبة
            alert('✅ Booking submitted! Please scroll down and choose your preferred activity.');
        });
    }
});
