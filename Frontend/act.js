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
  

  