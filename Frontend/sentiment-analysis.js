// Sentiment Analysis API Configuration
const SENTIMENT_API_URL = 'https://morsy.pythonanywhere.com/predict';

// Sentiment Analysis Function
async function analyzeSentiment(message) {
    try {
        const response = await fetch(SENTIMENT_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify([
                { "review": message }
            ])
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data.Prediction[0]; // Returns 'positive' or 'negative'
    } catch (error) {
        console.error('Error analyzing sentiment:', error);
        throw error;
    }
}

// Display sentiment result
function displaySentimentResult(sentiment, message) {
    const resultDiv = document.getElementById('sentiment-result');
    const sentimentValue = document.getElementById('sentiment-value');
    const sentimentMessage = document.getElementById('sentiment-message');
    
    // Set sentiment value and styling
    sentimentValue.textContent = sentiment.charAt(0).toUpperCase() + sentiment.slice(1);
    sentimentValue.className = `sentiment-badge ${sentiment}`;
    
    // Set appropriate message based on sentiment
    const messages = {
        positive: "Thank you for your positive feedback! We're delighted to hear about your great experience.",
        negative: "We appreciate your honest feedback. We'll work hard to improve and address your concerns."
    };
    
    sentimentMessage.textContent = messages[sentiment] || "Thank you for your feedback!";
    
    // Show the result with animation
    resultDiv.style.display = 'block';
    resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Handle form submission
function handleFormSubmission() {
    const forms = document.querySelectorAll('#feedback-form');
    
    forms.forEach(form => {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitBtn = form.querySelector('#submit-btn');
            const btnText = submitBtn.querySelector('.btn-text');
            const btnLoading = submitBtn.querySelector('.btn-loading');
            const messageTextarea = form.querySelector('#user-message');
            const userMessage = messageTextarea.value.trim();
            
            if (!userMessage) {
                alert('Please enter your message before submitting.');
                return;
            }
            
            // Show loading state
            submitBtn.disabled = true;
            btnText.style.display = 'none';
            btnLoading.style.display = 'inline';
            
            try {
                // Analyze sentiment
                const sentiment = await analyzeSentiment(userMessage);
                
                // Display result
                displaySentimentResult(sentiment, userMessage);
                
                // Here you can also send the form data to your backend if needed
                await submitFeedback({
                    name: form.querySelector('#user-name').value,
                    email: form.querySelector('#user-email').value,
                    message: userMessage,
                    sentiment: sentiment
                });
                
                // Reset form
                form.reset();
                
            } catch (error) {
                console.error('Error processing feedback:', error);
                alert('Sorry, there was an error processing your feedback. Please try again.');
            } finally {
                // Reset button state
                submitBtn.disabled = false;
                btnText.style.display = 'inline';
                btnLoading.style.display = 'none';
            }
        });
    });
}



// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    handleFormSubmission();
});