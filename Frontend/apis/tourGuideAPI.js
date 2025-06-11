const API_BASE_URL = 'https://bf9a6a07-cd1d-4ebc-b7a7-adde95f7b91e-00-2z7xusx8q8552.kirk.replit.dev/api';

// Map tour guide IDs to local images
const tourGuideImageMap = {
    1: './images/a4e201a05798aca511eb7465c7813801.png',
    2: './images/17c80660cd789842c57c957d37a2d247.png',
    3: './images/840c62ad1df4a762376d1ca2ee3608aa.png',
    4: './images/4e1fd548d4524a7283f162f726ba9d87.png',
    5: './images/f492723e27d1c5e86ff7bc392f919090.png',
    6: './images/ee0c9ce92fb9df4fdfad29b44a4ea8aa.png'
};

const tourGuidePriceMap = {
    1: 300, 2: 200, 3: 250, 4: 190, 5: 175, 6: 165
};

async function getAllTourGuides() {
    try {
        const response = await fetch(`${API_BASE_URL}/tourguide`);
        const data = await response.json();
        console.log('API Response:', data); // Debug log
        return data.data;
    } catch (error) {
        console.error('Error fetching tour guides:', error);
        return [];
    }
}

async function getTourGuideById(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/tourguide/${id}`);
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error('Error fetching tour guide:', error);
        return null;
    }
}

async function renderAllTourGuides() {
    const guides = await getAllTourGuides();
    
    if (!guides || guides.length === 0) {
        console.error('No guides data received');
        return;
    }

    const container = document.querySelector('.guides-container');
    if (!container) {
        console.error('Guides container not found');
        return;
    }

    // Clear existing content
    container.innerHTML = '';

    // Render each guide
    guides.forEach(guide => {
        const card = document.createElement('div');
        card.className = 'guide-card';
        
        // Set data attributes for filtering - use the exact data from API
        card.setAttribute('data-location', guide.destination.name);
        card.setAttribute('data-language', guide.language); // This will be "Arabic English French" format
        
        console.log('Setting card attributes:', {
            location: guide.destination.name,
            language: guide.language
        }); // Debug log
        
        card.innerHTML = `
            <img src="${tourGuideImageMap[guide.id] || 'images/default-guide.png'}" alt="${guide.name}">
            <div class="guide-info">
                <h3>${guide.name}</h3>
                <p>Expert in ${guide.expertise}</p>
                <p class="languages">Languages: ${guide.language}</p>
                <p class="location">Location: ${guide.destination.name}</p>
                <p class="experience">Experience: ${guide.Experience}</p>
                <p class="price">Price: $${tourGuidePriceMap[guide.id] || 200}/day</p>
                <p class="rating">⭐ ${guide.rating}</p>
                <a href="book.html?guide=${guide.id}" class="book-btn">Book a Tour</a>
            </div>
        `;
        container.appendChild(card);
    });
}

async function getAllDestinations() {
    try {
        const response = await fetch(`${API_BASE_URL}/destination`);
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error('Error fetching destinations:', error);
        return null;
    }
}

// Initial Load
document.addEventListener("DOMContentLoaded", () => {
    renderAllTourGuides();
});