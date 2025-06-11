const API_BASE_URL = 'https://bf9a6a07-cd1d-4ebc-b7a7-adde95f7b91e-00-2z7xusx8q8552.kirk.replit.dev/api';

// Map hotel IDs to local images
const hotelImageMap = {
    // Cairo Hotels
    1: './imgs/jazz-bar 1.png',        // Kempinski Nile Hotel
    2: './imgs/le-meridien-cairo-airport 1.png', // Le Méridien Cairo Airport
    3: './imgs/room-pool-view 1.png',   // Le Passage
    4: './imgs/ramses-hilton 1.png',    // Ramses Hilton
    5: './imgs/exterior-night 1.png',// The Nile Ritz-Carlton

     // Alexandria Hotels
     6: './imgs/hilton-alexandria-king.jpg',  // Hilton Alexandria King's Ranch
     7: './imgs/steign.jpg',                  // Steigenberger Cecil Hotel
     8: './imgs/tolip.jpg',                   // TOLIP Hotel
     9: './imgs/fourseason.jpeg',             // Four Seasons Hotel
     10: './imgs/romance.jpg',
     
     // Luxor Hotels
    11: './imgs/pyramisa-hotel-luxor.jpg',  // Pyramisa Hotel
    12: './imgs/pavillon.jpg',              // Pavillon Winter Hotel
    13: './imgs/sonesta.jpg',               // Sonesta St. George Hotel
    14: './imgs/iberotel.jpg',              // Iberotel Hotel
    15: './imgs/roof-terrace.jpg', 
    
    // Aswan
    16: './imgs/sofitel-legend-old-cataract.jpg',  // Sofitel Legend Old Cataract
    17: './imgs/basmaa.jpg',                       // Basma Hotel
    18: './imgs/sonestaa.jpg',                     // Sonesta Nouba Hotel
    19: './imgs/kato.jpg',                         // Kato Dool Wellness Resort
    20: './imgs/movenpick.jpg' ,

    // Red Sea Hotels
    21: './imgs/premier-le-reve-hotel.jpg',  // Premier Le Reve Hotel & Spa
    22: './imgs/beach-overview.jpg',         // SUNRISE Arabian Beach Resort
    23: './imgs/rixos-sharm-el-sheikh.jpg',  // Rixos Hotel
    24: './imgs/savoy.jpg',                  // Savoy Hotel
    25: './imgs/meraki.jpg'                  // Meraki Resort          

};

// Fetch all hotels
async function getHotels() {
    try {
        const response = await fetch(`${API_BASE_URL}/hotel`);
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error('Error fetching hotels:', error);
        return [];
    }
}

// Render all hotels sections
async function renderAllHotels() {
    const hotels = await getHotels();
    const destinations = await getAllDestinations();
    
    if (!destinations) return;

    destinations.forEach(async (destination) => {
        const destinationHotels = hotels.filter(hotel => 
            hotel.destinationId === destination.id
        );
        
        const container = document.getElementById(`${destination.name.toLowerCase()}`);
        if (!container) return;

        const hotelGrid = container.querySelector('.hotel-grid');
        if (!hotelGrid) return;

        hotelGrid.innerHTML = '';

        destinationHotels.forEach(hotel => {
            const card = document.createElement('div');
            card.className = 'hotel-card';
            card.innerHTML = `
                <a href="information of hotels.html#${hotel.id}" target="_self">
                    <img src="${hotelImageMap[hotel.id] || 'imgs/default-hotel.png'}" alt="${hotel.name}" loading="lazy">
                    <div class="overlay">
                        <div class="hotel-info">
                            <h3>${hotel.name}</h3>
                            <p class="location">${hotel.location}</p>
                        </div>
                    </div>
                </a>
                <div class="hotel-details">
                    <span class="price-tag">$${hotel.price || 150} per night</span>
                    <button class="book-now-btn" onclick="window.location.href='payment.html?hotel=${hotel.id}'">Book Now</button>
                </div>
            `;
            hotelGrid.appendChild(card);
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
    renderAllHotels(); // Show all hotels for all destinations
});