const API_BASE_URL = 'https://bf9a6a07-cd1d-4ebc-b7a7-adde95f7b91e-00-2z7xusx8q8552.kirk.replit.dev/api'; // Update if deploying

// Map destination/attraction IDs to local images
const imageMap = {
    // Destinations
    'Cairo': './img/cairo.jpeg',
    'Alexandria': './img/alex2.jpg',
    'Luxor': './img/Luxor.jpg',
    'Aswan': './img/Nile River, Aswan.jpeg',
    'Red Sea': './img/Red Sea _ Egypt.jpeg',
    
    // Cairo Attractions
    1: "./img/pyramids.jpg",
    2: "./img/2021-07-07.jpg",
    3: "./img/20230304_100040.jpg",
    4: "./img/e9436bfa-d65c-4f6f-863c-4172ed0b5728.jpeg",
    5: "./img/Khan el khalil.jpeg",
    6: "./img/Photo by Seif Amr on Unsplash.jpeg",
    
    // Alexandria Attractions
    7: "./img/Bey Citadel.jpeg",
    8: "./img/WhatsApp Image 2025-02-17 at 23.23.05_40dcff4e.jpg",
    9: "./img/WhatsApp Image 2025-02-17 at 23.37.19_a8f2752c.jpg",
    10: "./img/WhatsApp Image 2025-02-17 at 23.23.05_b2405ed0.jpg",
    11: "./img/2023-05-21.jpg",

     // Luxor Attractions
     12: "./img/tamp.jpg",                // Karnak Temple
     13: "./img/download (5).jpeg",       // Valley of the Kings
     14: "./img/معبد حتشبسوت بالدير البحري - الاقصر.jpeg", // Hatshepsut Temple
     15: "./img/Luksor Tapınağı_   📍Mısır_.jpeg", // Luxor Temple
     16: "./img/Visiting the Colossi of Memnon, Luxorrnrn.jpeg",

     // Aswan Attractions
    17: "./img/Great Temple of Abu Simbel in Egypt_.jpeg",
    18: "./img/Philae Temple - Visiting The Striking Temple of Isis in Aswanrnrn.jpeg",
    19: "./img/Nubia.jpeg",
    20: "./img/24_2 aswan.jpeg",
    21: "./img/download (7).jpeg",
    
    // Red Sea Attractions
    22: "./img/bd62e3a9-4d8f-4c57-9eca-c8c904840c88.jpeg",
    23: "./img/El Gouna, Egypt.jpeg",
    24: "./img/Ägypten _ Egypt _ Soma Bay.jpeg",
    25: "./img/images (3).jpeg",
    26: "./img/Wadi el Gamal National Park.jpeg"

};

// Fetch all destinations
async function getDestinations() {
    try {
        const response = await fetch(`${API_BASE_URL}/destination`);
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error('Error fetching destinations:', error);
        return [];
    }
}

// Fetch all attractions
async function getAttractions() {
    try {
        const response = await fetch(`${API_BASE_URL}/attraction`);
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error('Error fetching attractions:', error);
        return [];
    }
}

function renderDestination(destination) {
    const container = document.getElementById('destinations-container');
    
    const section = document.createElement('div');
    section.innerHTML = `
        <section class="explore-section" id="explore-${destination.name.toLowerCase()}">
            <h2 class="explore-title">Explore ${destination.name}</h2>
        </section>
        
        <div class="explore-container">
            <div class="explore-img">
                <img src="${imageMap[destination.name] || 'img/default.jpg'}" alt="${destination.name}">
            </div>
            <div class="explore-text">
                <p>${destination.description}</p>
            </div>
        </div>
    `;
    container.appendChild(section);
}

async function renderAllDestinations() {
    const destinations = await getDestinations();
    const container = document.getElementById('destinations-container');
    container.innerHTML = ''; // Clear previous content
    
    if (destinations && destinations.length > 0) {
        destinations.forEach(destination => {
            renderDestination(destination);
        });
    }
}

async function renderAttractions() {
    const attractions = await getAttractions();
    const destinations = await getDestinations();
    
    destinations.forEach(async destination => {
        const destinationAttractions = attractions.filter(
            attraction => attraction.destinationId === destination.id
        );
        
        const container = document.createElement('section');
        container.className = 'attractions';
        container.innerHTML = `
            <h2>Top Attractions in ${destination.name}</h2>
            <div class="carousel">
                <button id="prev-${destination.name.toLowerCase()}" class="nav-btn">&#10094;</button>
                <div class="carousel-container" id="attraction-cards-${destination.name.toLowerCase()}">
                    ${destinationAttractions.map(attraction => `
                        <div class="card">
                            <a href="information.html#${attraction.id}">
                                <img src="${imageMap[attraction.id] || 'img/default.jpg'}" alt="${attraction.name}">
                                <div class="overlay">${attraction.name}</div>
                            </a>
                        </div>
                    `).join('')}
                </div>
                <button id="next-${destination.name.toLowerCase()}" class="nav-btn">&#10095;</button>
            </div>
        `;
        
        document.getElementById('destinations-container').appendChild(container);
    });
}

// Initial Load
document.addEventListener("DOMContentLoaded", async () => {
    await renderAllDestinations();
    await renderAttractions();
});