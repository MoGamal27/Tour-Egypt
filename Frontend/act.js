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

    // Book Now functionality
    const bookBtn = document.querySelector('.book-btn');
    const checkInInput = document.querySelector('input[type="date"]:first-of-type');
    const checkOutInput = document.querySelector('input[type="date"]:last-of-type');
    const guestsInput = document.querySelector('input[type="number"]');

    if (bookBtn) {
        bookBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get form values
            const checkIn = checkInInput.value;
            const checkOut = checkOutInput.value;
            const guests = guestsInput.value;

            // Validate form
            if (!validateBookingForm(checkIn, checkOut, guests)) {
                return;
            }

            // Show booking confirmation
            showBookingModal(checkIn, checkOut, guests);
        });
    }

    // Add click handlers to individual activity cards
    const activityCards = document.querySelectorAll('.activity-card');
    activityCards.forEach(card => {
        // Add a book button to each card
        const cardDetails = card.querySelector('.activity-details');
        const bookButton = document.createElement('button');
        bookButton.className = 'card-book-btn';
        bookButton.innerHTML = '<i class="fas fa-calendar-check"></i> Book This Activity';
        cardDetails.appendChild(bookButton);

        bookButton.addEventListener('click', function(e) {
            e.preventDefault();
            const activityName = card.querySelector('h3').textContent;
            const activityPrice = card.querySelector('.price').textContent;
            const activityLocation = card.querySelector('.location').textContent;
            
            showActivityBookingModal(activityName, activityPrice, activityLocation);
        });
    });
});

// Validation function
function validateBookingForm(checkIn, checkOut, guests) {
    const today = new Date().toISOString().split('T')[0];
    
    if (!checkIn) {
        showAlert('Please select a check-in date', 'error');
        return false;
    }
    
    if (!checkOut) {
        showAlert('Please select a check-out date', 'error');
        return false;
    }
    
    if (checkIn < today) {
        showAlert('Check-in date cannot be in the past', 'error');
        return false;
    }
    
    if (checkOut <= checkIn) {
        showAlert('Check-out date must be after check-in date', 'error');
        return false;
    }
    
    if (guests < 1 || guests > 50) {
        showAlert('Number of guests must be between 1 and 50', 'error');
        return false;
    }
    
    return true;
}

// Show booking modal for general booking
function showBookingModal(checkIn, checkOut, guests) {
    const modal = createModal(`
        <div class="booking-modal">
            <div class="modal-header">
                <h2><i class="fas fa-calendar-check"></i> Booking Confirmation</h2>
                <button class="close-modal">&times;</button>
            </div>
            <div class="modal-body">
                <div class="booking-summary">
                    <h3>Booking Details</h3>
                    <div class="detail-row">
                        <span class="label">Check-in:</span>
                        <span class="value">${formatDate(checkIn)}</span>
                    </div>
                    <div class="detail-row">
                        <span class="label">Check-out:</span>
                        <span class="value">${formatDate(checkOut)}</span>
                    </div>
                    <div class="detail-row">
                        <span class="label">Guests:</span>
                        <span class="value">${guests} ${guests == 1 ? 'person' : 'people'}</span>
                    </div>
                    <div class="detail-row">
                        <span class="label">Duration:</span>
                        <span class="value">${calculateDays(checkIn, checkOut)} days</span>
                    </div>
                </div>
                <div class="modal-actions">
                    <button class="btn-secondary cancel-booking">Cancel</button>
                    <button class="btn-primary confirm-booking">Confirm Booking</button>
                </div>
            </div>
        </div>
    `);
    
    setupModalEvents(modal);
}

// Show booking modal for specific activity
function showActivityBookingModal(activityName, activityPrice, activityLocation) {
    const modal = createModal(`
        <div class="booking-modal">
            <div class="modal-header">
                <h2><i class="fas fa-map-marker-alt"></i> Book Activity</h2>
                <button class="close-modal">&times;</button>
            </div>
            <div class="modal-body">
                <div class="activity-booking-summary">
                    <h3>${activityName}</h3>
                    <p class="activity-location">${activityLocation}</p>
                    <p class="activity-price">${activityPrice}</p>
                    
                    <div class="booking-form-modal">
                        <div class="form-group">
                            <label>Select Date:</label>
                            <input type="date" id="activity-date" min="${new Date().toISOString().split('T')[0]}">
                        </div>
                        <div class="form-group">
                            <label>Number of Participants:</label>
                            <input type="number" id="activity-participants" min="1" max="25" value="1">
                        </div>
                        <div class="form-group">
                            <label>Contact Information:</label>
                            <input type="email" id="contact-email" placeholder="Your email address">
                        </div>
                    </div>
                </div>
                <div class="modal-actions">
                    <button class="btn-secondary cancel-booking">Cancel</button>
                    <button class="btn-primary confirm-activity-booking">Book Now</button>
                </div>
            </div>
        </div>
    `);
    
    setupActivityModalEvents(modal, activityName, activityPrice);
}

// Create modal element
function createModal(content) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = content;
    document.body.appendChild(modal);
    
    // Animate modal in
    setTimeout(() => modal.classList.add('show'), 10);
    
    return modal;
}

// Setup modal events for general booking
function setupModalEvents(modal) {
    const closeBtn = modal.querySelector('.close-modal');
    const cancelBtn = modal.querySelector('.cancel-booking');
    const confirmBtn = modal.querySelector('.confirm-booking');
    
    const closeModal = () => {
        modal.classList.remove('show');
        setTimeout(() => modal.remove(), 300);
    };
    
    closeBtn.addEventListener('click', closeModal);
    cancelBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    
    confirmBtn.addEventListener('click', () => {
        showAlert('Booking confirmed! You will receive a confirmation email shortly.', 'success');
        closeModal();
        // Here you would typically send the booking data to your backend
        setTimeout(() => {
            window.location.href = 'payment.html';
        }, 2000);
    });
}

// Setup modal events for activity booking
function setupActivityModalEvents(modal, activityName, activityPrice) {
    const closeBtn = modal.querySelector('.close-modal');
    const cancelBtn = modal.querySelector('.cancel-booking');
    const confirmBtn = modal.querySelector('.confirm-activity-booking');
    
    const closeModal = () => {
        modal.classList.remove('show');
        setTimeout(() => modal.remove(), 300);
    };
    
    closeBtn.addEventListener('click', closeModal);
    cancelBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    
    confirmBtn.addEventListener('click', () => {
        const date = document.getElementById('activity-date').value;
        const participants = document.getElementById('activity-participants').value;
        const email = document.getElementById('contact-email').value;
        
        if (!date || !participants || !email) {
            showAlert('Please fill in all fields', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showAlert('Please enter a valid email address', 'error');
            return;
        }
        
        showAlert(`${activityName} booked successfully for ${formatDate(date)}!`, 'success');
        closeModal();
        
        // Store booking data (you can send this to backend)
        const bookingData = {
            activity: activityName,
            price: activityPrice,
            date: date,
            participants: participants,
            email: email,
            timestamp: new Date().toISOString()
        };
        
        localStorage.setItem('lastBooking', JSON.stringify(bookingData));
        
        setTimeout(() => {
            window.location.href = 'payment.html';
        }, 2000);
    });
}

// Utility functions
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function calculateDays(checkIn, checkOut) {
    const date1 = new Date(checkIn);
    const date2 = new Date(checkOut);
    const diffTime = Math.abs(date2 - date1);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showAlert(message, type = 'info') {
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.innerHTML = `
        <div class="alert-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(alert);
    
    setTimeout(() => alert.classList.add('show'), 10);
    
    setTimeout(() => {
        alert.classList.remove('show');
        setTimeout(() => alert.remove(), 300);
    }, 4000);
}

document.addEventListener("DOMContentLoaded", function () {
    let cards = document.querySelectorAll(".activity-card");
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.style.transform = "scale(1)";
            card.style.opacity = "1";
        }, index * 200);
    });
});
