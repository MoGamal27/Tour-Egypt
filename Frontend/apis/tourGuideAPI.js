const API_BASE_URL = 'http://localhost:3000/api';

// Map tour guide IDs to local images
const tourGuideImageMap = {
    // Cairo Tour Guides
    1: './images/a4e201a05798aca511eb7465c7813801.png',  // Ahmed Ali
    2: './images/17c80660cd789842c57c957d37a2d247.png',  // Mona Hassan
    3: './images/840c62ad1df4a762376d1ca2ee3608aa.png',  // Karim Mohamed
    4: './images/4e1fd548d4524a7283f162f726ba9d87.png',  // Mahmoud Al Attar
    5: './images/f492723e27d1c5e86ff7bc392f919090.png',  // Kareem Elsayed
    6: './images/ee0c9ce92fb9df4fdfad29b44a4ea8aa.png'   // Ahmed Tarik
};

// Price map for tour guides (moved to frontend)
const tourGuidePriceMap = {
    1: 300,  // Ahmed Ali
    2: 200,  // Mona Hassan
    3: 250,  // Karim Mohamed
    4: 190,  // Mahmoud Al Attar
    5: 175,  // Kareem Elsayed
    6: 165   // Ahmed Tarik
};

// Fetch all tour guides
async function getAllTourGuides() {
    try {
        const response = await fetch(`${API_BASE_URL}/tourguide`);
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error('Error fetching tour guides:', error);
        return [];
    }
}

// Fetch tour guide by ID
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

// Render all tour guides sections
async function renderAllTourGuides() {
    const guides = await getAllTourGuides();
    const destinations = await getAllDestinations();
    
    if (!destinations) return;

    destinations.forEach(async (destination) => {
        const destinationGuides = guides.filter(guide => 
            guide.destinationId === destination.id
        );
        
        const container = document.querySelector('.guides-container');
        if (!container) return;

        destinationGuides.forEach(guide => {
            const card = document.createElement('div');
            card.className = 'guide-card';
            card.setAttribute('data-location', destination.name);
            card.setAttribute('data-language', guide.language);
            
            card.innerHTML = `
                <img src="${tourGuideImageMap[guide.id] || 'images/default-guide.png'}" alt="${guide.name}">
                <div class="guide-info">
                    <h3>${guide.name}</h3>
                    <p>Expert in ${guide.expertise || destination.name} Tours</p>
                    <p class="languages">Languages: ${guide.language}</p>
                    <p class="price">Price: ${tourGuidePriceMap[guide.id] || 200}$/day</p>
                    <p class="rating">⭐ ${guide.rating || '4.5'}</p>
                    <a href="book.html?guide=${guide.id}" class="book-btn">Book a Tour</a>
                </div>
            `;
            container.appendChild(card);
        });
    });
}

// Helper function to get all destinations
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
    renderAllTourGuides(); // Show all tour guides for all destinations
});

//export { getAllTourGuides, getTourGuideById, renderAllTourGuides };