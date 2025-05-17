document.addEventListener('DOMContentLoaded', function() {
    // Guide Data
    const guides = [
        {
            id: 1,
            name: "Ahmed Ali",
            image: "images/a4e201a05798aca511eb7465c7813801.png",
            location: "Cairo",
            languages: ["Arabic", "English", "French"],
            specialty: "Cairo & Pyramids Expert",
            price: 300,
            rating: 4.8,
            description: "With over 10 years of experience, Ahmed will show you the hidden gems of Cairo and the majestic pyramids."
        },
        {
            id: 2,
            name: "Mona Hassan",
            image: "images/17c80660cd789842c57c957d37a2d247.png",
            location: "Luxor",
            languages: ["English", "French", "Arabic"],
            specialty: "Luxor & Aswan Specialist",
            price: 200,
            rating: 4.9,
            description: "Mona is an Egyptologist who brings ancient temples and tombs to life with her captivating stories."
        },
        {
            id: 3,
            name: "Karim Mohamed",
            image: "images/840c62ad1df4a762376d1ca2ee3608aa.png",
            location: "Alexandria",
            languages: ["French", "Arabic", "English"],
            specialty: "Alexandria Coastal Guide",
            price: 250,
            rating: 4.6,
            description: "Karim knows every corner of Alexandria and will show you the Mediterranean charm of Egypt."
        },
        {
            id: 4,
            name: "Mahmoud Al Attar",
            image: "images/4e1fd548d4524a7283f162f726ba9d87.png",
            location: "Red Sea",
            languages: ["English", "Arabic", "French"],
            specialty: "Red Sea Adventure Guide",
            price: 190,
            rating: 4.5,
            description: "Dive into the Red Sea's wonders with Mahmoud, an expert in marine life and desert adventures."
        },
        {
            id: 5,
            name: "Kareem Elsayed",
            image: "images/f492723e27d1c5e86ff7bc392f919090.png",
            location: "Red Sea",
            languages: ["Arabic", "French", "English"],
            specialty: "Desert Safari Expert",
            price: 175,
            rating: 4.9,
            description: "Experience the magic of the desert with Kareem, who knows all the best spots for stargazing."
        },
        {
            id: 6,
            name: "Ahmed Tarik",
            image: "images/ee0c9ce92fb9df4fdfad29b44a4ea8aa.png",
            location: "Aswan",
            languages: ["French", "English", "Arabic"],
            specialty: "Nile Cruise Specialist",
            price: 165,
            rating: 4.7,
            description: "Ahmed will make your Nile cruise unforgettable with his knowledge of Nubian culture and history."
        }
    ];

    // Current Booking Data
    let currentBooking = {
        guide: null,
        date: null,
        duration: 1,
        groupSize: 1,
        specialRequests: '',
        paymentMethod: 'credit-card'
    };

    // DOM Elements
    const guidesContainer = document.getElementById('guides-container');
    const locationFilter = document.getElementById('location-filter');
    const languageFilter = document.getElementById('language-filter');
    const steps = document.querySelectorAll('.step');
    const bookingSteps = document.querySelectorAll('.booking-step');
    const tourDetailsForm = document.getElementById('tour-details-form');
    const paymentForm = document.getElementById('payment-form');
    const finalBookingSummary = document.getElementById('final-booking-summary');
    const totalAmount = document.getElementById('total-amount');
    const confirmationDetails = document.getElementById('confirmation-details');

    // Initialize the page
    renderGuides(guides);
    setupEventListeners();

    function renderGuides(guidesToRender) {
        guidesContainer.innerHTML = '';
        
        guidesToRender.forEach(guide => {
            const guideCard = document.createElement('div');
            guideCard.className = 'guide-card';
            guideCard.dataset.location = guide.location;
            guideCard.dataset.language = guide.languages.join(',');
            
            guideCard.innerHTML = `
                <img src="${guide.image}" alt="${guide.name}">
                <div class="guide-info">
                    <h3>${guide.name}</h3>
                    <p class="specialty">${guide.specialty}</p>
                    <div class="details">
                        <p><i class="fas fa-map-marker-alt"></i> ${guide.location}, Egypt</p>
                        <p><i class="fas fa-language"></i> ${guide.languages.join(', ')}</p>
                        <p><i class="fas fa-dollar-sign"></i> $${guide.price}/day</p>
                        <div class="rating">
                            <span>${guide.rating}</span>
                            <div class="stars">
                                ${renderStars(guide.rating)}
                            </div>
                        </div>
                    </div>
                    <button class="select-btn" data-id="${guide.id}">Select Guide</button>
                </div>
            `;
            
            guidesContainer.appendChild(guideCard);
        });

        // Add event listeners to select buttons
        document.querySelectorAll('.select-btn').forEach(button => {
            button.addEventListener('click', function() {
                const guideId = parseInt(this.getAttribute('data-id'));
                selectGuide(guideId);
            });
        });
    }

    function renderStars(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        let starsHTML = '';
        
        for (let i = 1; i <= 5; i++) {
            if (i <= fullStars) {
                starsHTML += '<i class="fas fa-star"></i>';
            } else if (i === fullStars + 1 && hasHalfStar) {
                starsHTML += '<i class="fas fa-star-half-alt"></i>';
            } else {
                starsHTML += '<i class="far fa-star"></i>';
            }
        }
        
        return starsHTML;
    }

    function selectGuide(guideId) {
        currentBooking.guide = guides.find(g => g.id === guideId);
        updateStep(2);
    }

    function updateStep(stepNumber) {
        // Update step indicators
        steps.forEach((step, index) => {
            if (index < stepNumber) {
                step.classList.add('active');
            } else {
                step.classList.remove('active');
            }
        });

        // Show the correct step content
        bookingSteps.forEach((step, index) => {
            if (index === stepNumber - 1) {
                step.style.display = 'block';
            } else {
                step.style.display = 'none';
            }
        });

        // Update content based on step
        if (stepNumber === 3) {
            updatePaymentSummary();
        } else if (stepNumber === 4) {
            updateConfirmationDetails();
        }
    }

    function updatePaymentSummary() {
        if (!currentBooking.guide) return;
        
        const total = currentBooking.guide.price * currentBooking.duration;
        
        finalBookingSummary.innerHTML = `
            <div class="summary-item">
                <span class="label">Guide:</span>
                <span class="value">${currentBooking.guide.name}</span>
            </div>
            <div class="summary-item">
                <span class="label">Tour Date:</span>
                <span class="value">${formatDate(currentBooking.date)}</span>
            </div>
            <div class="summary-item">
                <span class="label">Duration:</span>
                <span class="value">${currentBooking.duration} day${currentBooking.duration > 1 ? 's' : ''}</span>
            </div>
            <div class="summary-item">
                <span class="label">Group Size:</span>
                <span class="value">${currentBooking.groupSize} person${currentBooking.groupSize > 1 ? 's' : ''}</span>
            </div>
            ${currentBooking.specialRequests ? `
            <div class="summary-item">
                <span class="label">Special Requests:</span>
                <span class="value">${currentBooking.specialRequests}</span>
            </div>
            ` : ''}
            <div class="summary-item">
                <span class="label">Price per day:</span>
                <span class="value">$${currentBooking.guide.price}</span>
            </div>
        `;
        
        totalAmount.textContent = `$${total}`;
    }

    function updateConfirmationDetails() {
        if (!currentBooking.guide) return;
        
        const total = currentBooking.guide.price * currentBooking.duration;
        
        confirmationDetails.innerHTML = `
            <p><strong>Booking Reference:</strong> PW-${Math.floor(100000 + Math.random() * 900000)}</p>
            <p><strong>Guide:</strong> ${currentBooking.guide.name}</p>
            <p><strong>Tour Date:</strong> ${formatDate(currentBooking.date)}</p>
            <p><strong>Duration:</strong> ${currentBooking.duration} day${currentBooking.duration > 1 ? 's' : ''}</p>
            <p><strong>Group Size:</strong> ${currentBooking.groupSize} person${currentBooking.groupSize > 1 ? 's' : ''}</p>
            <p><strong>Total Amount:</strong> $${total}</p>
            <p><strong>Payment Method:</strong> ${currentBooking.paymentMethod === 'credit-card' ? 'Credit Card' : 'PayPal'}</p>
            ${currentBooking.specialRequests ? `
            <p><strong>Special Requests:</strong> ${currentBooking.specialRequests}</p>
            ` : ''}
            <p class="confirmation-note">Your guide will contact you within 24 hours to confirm the details of your tour.</p>
        `;
    }

    function formatDate(dateString) {
        if (!dateString) return 'Not selected';
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    }

    function setupEventListeners() {
        // Filter guides
        locationFilter.addEventListener('change', filterGuides);
        languageFilter.addEventListener('change', filterGuides);

        // Navigation between steps
        document.getElementById('back-to-guides').addEventListener('click', () => updateStep(1));
        document.getElementById('back-to-details').addEventListener('click', () => updateStep(2));

        // Form submissions
        tourDetailsForm.addEventListener('submit', function(e) {
            e.preventDefault();
            currentBooking.date = document.getElementById('tour-date').value;
            currentBooking.duration = parseInt(document.getElementById('tour-duration').value);
            currentBooking.groupSize = parseInt(document.getElementById('group-size').value);
            currentBooking.specialRequests = document.getElementById('special-requests').value;
            updateStep(3);
        });

        paymentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            currentBooking.paymentMethod = document.querySelector('input[name="payment"]:checked').value;
            
            // In a real app, you would process payment here
            // For this demo, we'll just show the confirmation
            updateStep(4);
        });

        // Print button
        document.querySelector('.print-btn').addEventListener('click', function(e) {
            e.preventDefault();
            window.print();
        });
    }

    function filterGuides() {
        const location = locationFilter.value;
        const language = languageFilter.value;
        
        let filteredGuides = guides;
        
        if (location !== 'all') {
            filteredGuides = filteredGuides.filter(guide => guide.location === location);
        }
        
        if (language !== 'all') {
            filteredGuides = filteredGuides.filter(guide => 
                guide.languages.some(lang => lang.toLowerCase() === language.toLowerCase())
            );
        }
        
        renderGuides(filteredGuides);
    }
});

