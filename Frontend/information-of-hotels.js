document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");
    
    // Menu toggle functionality
    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", function (event) {
            navLinks.classList.toggle("show");
            event.stopPropagation();
        });
        
        // Hide menu when clicking outside
        document.addEventListener("click", function (event) {
            if (!navLinks.contains(event.target) && !menuToggle.contains(event.target)) {
                navLinks.classList.remove("show");
            }
        });
    }
});

// Image slider functionality
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

// Auto-slide every 5 seconds
if (slides.length > 0) {
    setInterval(nextSlide, 5000);
}

// API Configuration
const API_BASE_URL = 'http://localhost:3000/api'; // Update with your backend URL
const SENTIMENT_API_URL = 'https://morsymahmoud.pythonanywhere.com/predict';
const CURRENT_HOTEL_ID = 1; // You can make this dynamic based on the current page

// Backend API Functions
async function saveReviewToDatabase(reviewData) {
    try {
        const response = await fetch(`${API_BASE_URL}/reviews`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(reviewData)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error saving review to database:', error);
        throw error;
    }
}

async function loadHotelReviews(hotelId) {
    try {
        const response = await fetch(`${API_BASE_URL}/reviews/${hotelId}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data.data; // Reviews array
    } catch (error) {
        console.error('Error loading reviews:', error);
        return [];
    }
}

// Sentiment Analysis Function
async function analyzeSentiment(message) {
    try {
        // Option 1: Try direct API call first
        const response = await fetch(SENTIMENT_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            mode: 'cors',
            body: JSON.stringify([
                { "review": message }
            ])
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data.Prediction[0];
        
    } catch (error) {
        console.log('Direct API failed, trying CORS proxy...', error);
        
        // Option 2: Use CORS proxy as fallback
        try {
            const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
            const response = await fetch(proxyUrl + SENTIMENT_API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                },
                body: JSON.stringify([
                    { "review": message }
                ])
            });

            if (!response.ok) {
                throw new Error(`Proxy request failed! status: ${response.status}`);
            }

            const data = await response.json();
            return data.Prediction[0];
            
        } catch (proxyError) {
            console.log('CORS proxy also failed, using local analysis...', proxyError);
            return 'neutral'; // Fallback to neutral
        }
    }
}

// Get star rating based on sentiment
function getStarsForSentiment(sentiment) {
    if (sentiment === 'positive') {
        return `
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
        `;
    } else if (sentiment === 'negative') {
        return `
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="far fa-star"></i>
            <i class="far fa-star"></i>
            <i class="far fa-star"></i>
        `;
    } else {
        return `
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star-half-alt"></i>
            <i class="far fa-star"></i>
        `;
    }
}

// Convert sentiment to rating
function sentimentToRating(sentiment) {
    switch (sentiment) {
        case 'positive': return 5.0;
        case 'negative': return 2.0;
        default: return 3.5;
    }
}

// Show sentiment analysis result
function showSentimentResult(sentiment, name, message) {
    // Remove existing sentiment result if any
    const existingResult = document.querySelector('.sentiment-analysis-result');
    if (existingResult) {
        existingResult.remove();
    }

    const sentimentResult = document.createElement('div');
    sentimentResult.className = 'sentiment-analysis-result';
    sentimentResult.style.cssText = `
        margin: 20px 0;
        padding: 15px;
        border-radius: 8px;
        text-align: center;
        animation: fadeIn 0.5s ease-in;
        ${sentiment === 'positive' 
            ? 'background-color: #d4edda; border-left: 4px solid #28a745; color: #155724;' 
            : sentiment === 'negative' 
            ? 'background-color: #f8d7da; border-left: 4px solid #dc3545; color: #721c24;'
            : 'background-color: #fff3cd; border-left: 4px solid #ffc107; color: #856404;'
        }
    `;

    const sentimentMessages = {
        positive: `✅ Great! Your review shows positive sentiment. Thank you ${name} for your wonderful feedback!`,
        negative: `⚠️ We detected some concerns in your review. Thank you ${name} for your honest feedback - we'll work to improve!`,
        neutral: `ℹ️ Thank you ${name} for your balanced feedback. We appreciate all reviews!`
    };

    sentimentResult.innerHTML = `
        <h4 style="margin: 0 0 10px 0;">Review Analysis</h4>
        <p style="margin: 0; font-weight: 500;">${sentimentMessages[sentiment]}</p>
        <small style="opacity: 0.8;">Sentiment: ${sentiment.charAt(0).toUpperCase() + sentiment.slice(1)}</small>
    `;

    // Insert after the comment form
    const commentForm = document.querySelector('.comment-form');
    if (commentForm) {
        commentForm.insertAdjacentElement('afterend', sentimentResult);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (sentimentResult && sentimentResult.parentNode) {
                sentimentResult.style.animation = 'fadeOut 0.5s ease-out';
                setTimeout(() => sentimentResult.remove(), 500);
            }
        }, 5000);
    }
}

// Display a review in the UI
function displayReview(review) {
    const commentSection = document.querySelector('.reviews-section');
    if (!commentSection) return;

    const newComment = document.createElement('div');
    newComment.classList.add('comment');
    newComment.style.cssText = `
        border-left: 3px solid ${review.sentiment === 'positive' ? '#28a745' : review.sentiment === 'negative' ? '#dc3545' : '#ffc107'};
        padding-left: 15px;
        margin-left: 10px;
        background-color: ${review.sentiment === 'positive' ? '#f8fff9' : review.sentiment === 'negative' ? '#fff8f8' : '#fffef8'};
        border-radius: 5px;
        padding: 15px;
        margin-bottom: 15px;
        animation: slideInUp 0.5s ease-out;
    `;
    
    // Format date
    const reviewDate = new Date(review.createdAt).toLocaleDateString();
    
    newComment.innerHTML = `
        <div class="stars">
            ${getStarsForSentiment(review.sentiment)}
        </div>
        <p><strong>${review.name}:</strong> "${review.message}"</p>
        <small style="color: #666; font-style: italic;">
            ${reviewDate} • Rating: ${review.rating}/5 • Sentiment: ${review.sentiment.charAt(0).toUpperCase() + review.sentiment.slice(1)}
        </small>
    `;
    
    commentSection.appendChild(newComment);
}

// Load and display existing reviews
async function loadAndDisplayReviews() {
    try {
        const reviews = await loadHotelReviews(CURRENT_HOTEL_ID);
        const reviewsSection = document.querySelector('.reviews-section');
        
        if (reviewsSection && reviews.length > 0) {
            // Clear existing reviews (except the form)
            const existingComments = reviewsSection.querySelectorAll('.comment');
            existingComments.forEach(comment => comment.remove());
            
            // Display all reviews
            reviews.forEach(review => displayReview(review));
        }
    } catch (error) {
        console.error('Error loading reviews:', error);
    }
}

// Enhanced contact form handler with sentiment analysis and database integration
document.addEventListener('DOMContentLoaded', function() {
    // Load existing reviews when page loads
    loadAndDisplayReviews();
    
    const contactForms = document.querySelectorAll('.contact-form');
    
    contactForms.forEach(form => {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitBtn = form.querySelector('button[type="submit"]');
            const name = form.querySelector('input[type="text"]').value.trim();
            const email = form.querySelector('input[type="email"]').value.trim();
            const message = form.querySelector('textarea').value.trim();
            
            // Validation
            if (!name || !email || !message) {
                alert("Please fill in all fields.");
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert("Please enter a valid email address.");
                return;
            }
            
            // Show loading state
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Analyzing & Saving...';
            submitBtn.disabled = true;
            
            try {
                // Analyze sentiment
                const sentiment = await analyzeSentiment(message);
                const rating = sentimentToRating(sentiment);
                
                // Prepare review data for database
                const reviewData = {
                    hotelId: CURRENT_HOTEL_ID,
                    name,
                    email,
                    message,
                    rating,
                    sentiment
                };
                
                // Save to database
                const savedReview = await saveReviewToDatabase(reviewData);
                
                // Show sentiment result
                showSentimentResult(sentiment, name, message);
                
                // Display the new review immediately
                displayReview(savedReview.data);
                
                // Scroll to new comment
                const reviewsSection = document.querySelector('.reviews-section');
                if (reviewsSection) {
                    const lastComment = reviewsSection.lastElementChild;
                    if (lastComment) {
                        lastComment.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                    }
                }
                
                // Reset form
                form.reset();
                
                // Success message based on sentiment
                const successMessages = {
                    positive: "Thank you for your positive feedback! 😊 Your review has been saved successfully!",
                    negative: "Thank you for your honest feedback. 🙏 Your review has been saved and we'll work to improve!",
                    neutral: "Thank you for your feedback! 💬 Your review has been saved successfully."
                };
                
                alert(successMessages[sentiment]);
                
            } catch (error) {
                console.error('Error processing feedback:', error);
                
                // Fallback: Still try to save without sentiment analysis
                try {
                    const fallbackReviewData = {
                        hotelId: CURRENT_HOTEL_ID,
                        name,
                        email,
                        message,
                        rating: 3.5,
                        sentiment: 'neutral'
                    };
                    
                    const savedReview = await saveReviewToDatabase(fallbackReviewData);
                    displayReview(savedReview.data);
                    form.reset();
                    alert("Thank you for your feedback! Your review has been saved.");
                    
                } catch (dbError) {
                    console.error('Database save also failed:', dbError);
                    alert("Sorry, there was an error saving your review. Please try again later.");
                }
                
            } finally {
                // Reset button
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        });
    });
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(-10px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes fadeOut {
        from { opacity: 1; transform: translateY(0); }
        to { opacity: 0; transform: translateY(-10px); }
    }
    
    @keyframes slideInUp {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    .new-comment {
        position: relative;
    }
    
    .new-comment::before {
        content: "NEW";
        position: absolute;
        top: -5px;
        right: 10px;
        background: #007bff;
        color: white;
        padding: 2px 8px;
        border-radius: 10px;
        font-size: 10px;
        font-weight: bold;
    }
    
    .reviews-section {
        max-height: 600px;
        overflow-y: auto;
    }
    
    .loading-spinner {
        display: inline-block;
        width: 12px;
        height: 12px;
        border: 2px solid #ccc;
        border-top: 2px solid #007bff;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin-left: 5px;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);