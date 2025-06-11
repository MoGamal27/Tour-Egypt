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

// Sentiment Analysis Configuration
const SENTIMENT_API_URL = 'https://morsymahmoud.pythonanywhere.com/predict';

// Sentiment Analysis Function
// Alternative sentiment analysis using a CORS proxy
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

// Enhanced contact form handler with sentiment analysis
document.addEventListener('DOMContentLoaded', function() {
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
            submitBtn.textContent = 'Analyzing...';
            submitBtn.disabled = true;
            
            try {
                // Analyze sentiment
                const sentiment = await analyzeSentiment(message);
                
                // Show sentiment result
                showSentimentResult(sentiment, name, message);
                
                // Add comment to reviews section
                const commentSection = document.querySelector('.reviews-section');
                if (commentSection) {
                    const newComment = document.createElement('div');
                    newComment.classList.add('comment', 'new-comment');
                    newComment.style.cssText = `
                        animation: slideInUp 0.5s ease-out;
                        border-left: 3px solid ${sentiment === 'positive' ? '#28a745' : sentiment === 'negative' ? '#dc3545' : '#ffc107'};
                        padding-left: 15px;
                        margin-left: 10px;
                        background-color: ${sentiment === 'positive' ? '#f8fff9' : sentiment === 'negative' ? '#fff8f8' : '#fffef8'};
                        border-radius: 5px;
                        padding: 15px;
                        margin-bottom: 15px;
                    `;
                    
                    newComment.innerHTML = `
                        <div class="stars">
                            ${getStarsForSentiment(sentiment)}
                        </div>
                        <p><strong>${name}:</strong> "${message}"</p>
                        <small style="color: #666; font-style: italic;">
                            Just now • Sentiment: ${sentiment.charAt(0).toUpperCase() + sentiment.slice(1)}
                        </small>
                    `;
                    
                    commentSection.appendChild(newComment);
                    
                    // Scroll to new comment
                    newComment.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }
                
                // Reset form
                form.reset();
                
                // Success message based on sentiment
                const successMessages = {
                    positive: "Thank you for your positive feedback! 😊 We're delighted to hear about your great experience!",
                    negative: "Thank you for your honest feedback. 🙏 We take all concerns seriously and will work to improve!",
                    neutral: "Thank you for your feedback! 💬 We appreciate you taking the time to share your thoughts."
                };
                
                alert(successMessages[sentiment]);
                
            } catch (error) {
                console.error('Error processing feedback:', error);
                alert("Thank you for your feedback! Your message has been received.");
                
                // Still add the comment even if sentiment analysis fails
                const commentSection = document.querySelector('.reviews-section');
                if (commentSection) {
                    const newComment = document.createElement('div');
                    newComment.classList.add('comment');
                    newComment.innerHTML = `
                        <div class="stars">
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star-half-alt"></i>
                            <i class="far fa-star"></i>
                        </div>
                        <p><strong>${name}:</strong> "${message}"</p>
                    `;
                    commentSection.appendChild(newComment);
                }
                
                form.reset();
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
`;
document.head.appendChild(style);