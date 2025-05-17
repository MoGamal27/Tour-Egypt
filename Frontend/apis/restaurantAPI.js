const API_BASE_URL = 'http://localhost:3000/api';


const restaurantImageMap = {
    // Cairo Restaurants
    1: './imgs/pic.png',                    // Saigon Restaurant & Lounge
    2: './imgs/pic (1).png',                // Al Khal Egyptian Restaurant
    3: './imgs/pic (6).png',                // Bab El-Sharq
    4: './imgs/revolving-restauarant.jpg',  // Revolving Restaurant
    5: './imgs/caption (4).jpg',            // Crimson Bar & Grill

    // Alexandria Restaurants
    6: './imgs/pic (7).png',                // Santorini Greek Restaurant
    7: './imgs/pic (8).png',                // Ginger Asian Restaurant
    8: './imgs/pic (9).png',                // Roberto's Italian Restaurant
    9: './imgs/pic (10).png',               // White and Blue Restaurant
    10: './imgs/pic (12).png',
    
     
    // Luxor Restaurants
    11: './imgs/eltarposh.jpg',             // El Tarboush
    12: './imgs/casa-di-napoli.jpg',        // Casa Di Napoli
    13: './imgs/alsahaby-roof-terrace.jpg', // Al-Sahaby Lane Restaurant
    14: './imgs/1886.jpg',                  // 1886 Restaurant
    15: './imgs/metro-restaurant.jpg',

    //ASwan
    16: './imgs/salle-interieure-du-restaurant.jpg',  // Oriental Kebabgy
    17: './imgs/mezze-restaurant.jpg',                // Mezze Restaurant
    18: './imgs/saal-von-1902-wie-1001.jpg',         // 1902 Restaurant
    19: './imgs/restaurant-photo.jpg',                // Panorama Restaurant & Bar
    20: './imgs/solaih-nubian-restaurant.jpg',
    
    //Red Sea
    21: './imgs/getlstd-property-photo.jpg',           // Corallo Restaurant
    22: './imgs/cuisines-european-mediterranea.jpg',    // Beach Restaurant
    23: './imgs/aqua-restaurant.jpg',                  // Aqua Restaurant
    24: './imgs/el-sayadin-restaurant.jpg',            // El Sayadin Restaurant
    25: './imgs/dining-in-the-heart-of.jpg'   

};
// Fetch all restaurants
async function getRestaurants() {
    try {
        const response = await fetch(`${API_BASE_URL}/restaurant`);
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error('Error fetching restaurants:', error);
        return [];
    }
}

// Render all restaurant sections
async function renderAllRestaurants() {
    const restaurants = await getRestaurants();
    const destinations = await getAllDestinations();
    
    if (!destinations) return;

    destinations.forEach(async (destination) => {
        const destinationRestaurants = restaurants.filter(restaurant => 
            restaurant.destinationId === destination.id
        );
        
        const container = document.getElementById(`${destination.name.toLowerCase()}`);
        if (!container) return;

        const restaurantGrid = container.querySelector('.restaurant-grid');
        if (!restaurantGrid) return;

        restaurantGrid.innerHTML = '';

        destinationRestaurants.forEach(restaurant => {
            const card = document.createElement('div');
            card.className = 'restaurant-card';
            card.innerHTML = `
                <a href="information of restaurants.html#${restaurant.id}" target="_blank">
                    <img src="${restaurantImageMap[restaurant.id] || 'imgs/default-restaurant.png'}" alt="${restaurant.name}" loading="lazy">
                    <div class="overlay">
                        <div class="restaurant-info">
                            <h3>${restaurant.name}</h3>
                            <p class="location">${restaurant.location}</p>
                        </div>
                    </div>
                </a>
            `;
            restaurantGrid.appendChild(card);
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
    renderAllRestaurants(); // Show all restaurants for all destinations
});