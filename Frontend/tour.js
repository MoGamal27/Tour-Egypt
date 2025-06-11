document.addEventListener("DOMContentLoaded", function () {
    const checkButton = document.getElementById("check-availability");
    const locationFilter = document.getElementById("location-filter");
    const languageFilter = document.getElementById("language-filter");

    checkButton.addEventListener("click", function () {
        filterGuides();
    });

    function filterGuides() {
        const selectedLocation = locationFilter.value;
        const selectedLanguage = languageFilter.value;
        const tourGuides = document.querySelectorAll(".guide-card");
        
        console.log('Filtering with:', { selectedLocation, selectedLanguage }); // Debug log
        
        let visibleCount = 0;

        tourGuides.forEach(card => {
            const guideLocation = card.getAttribute("data-location");
            const guideLanguages = card.getAttribute("data-language");
            
            console.log('Guide data:', { guideLocation, guideLanguages }); // Debug log

            // Check location match
            const locationMatch = (selectedLocation === "all" || guideLocation === selectedLocation);
            
            // Check language match - languages are space-separated, not comma-separated
            let languageMatch = false;
            if (selectedLanguage === "all") {
                languageMatch = true;
            } else {
                // Split by space and check if the selected language exists
                const languageArray = guideLanguages.split(' ').map(lang => lang.trim());
                languageMatch = languageArray.includes(selectedLanguage);
            }

            console.log('Matches:', { locationMatch, languageMatch }); // Debug log

            // Show/hide card based on filters
            if (locationMatch && languageMatch) {
                card.style.display = "block";
                visibleCount++;
            } else {
                card.style.display = "none";
            }
        });

        // Show message with results
        showFilterResults(visibleCount, selectedLocation, selectedLanguage);
    }

    function showFilterResults(count, location, language) {
        // Remove existing message
        const existingMessage = document.querySelector('.filter-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        // Create new message
        const message = document.createElement('div');
        message.className = 'filter-message';
        message.style.cssText = `
            text-align: center;
            padding: 20px;
            margin: 20px 0;
            background-color: #f8f9fa;
            border-radius: 8px;
            border-left: 4px solid #007bff;
        `;

        if (count === 0) {
            message.innerHTML = `
                <h3 style="color: #dc3545;">No tour guides found</h3>
                <p>No guides available for the selected criteria:</p>
                <p><strong>Location:</strong> ${location === 'all' ? 'Any' : location}</p>
                <p><strong>Language:</strong> ${language === 'all' ? 'Any' : language}</p>
                <button onclick="resetFilters()" style="
                    background-color: #007bff;
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    border-radius: 5px;
                    cursor: pointer;
                    margin-top: 10px;
                ">Show All Guides</button>
            `;
        } else {
            message.innerHTML = `
                <h3 style="color: #28a745;">Found ${count} tour guide${count > 1 ? 's' : ''}</h3>
                <p>Showing guides for:</p>
                <p><strong>Location:</strong> ${location === 'all' ? 'Any' : location}</p>
                <p><strong>Language:</strong> ${language === 'all' ? 'Any' : language}</p>
                <button onclick="resetFilters()" style="
                    background-color: #6c757d;
                    color: white;
                    border: none;
                    padding: 8px 16px;
                    border-radius: 5px;
                    cursor: pointer;
                    margin-top: 10px;
                ">Show All Guides</button>
            `;
        }

        // Insert message after the section title
        const guidesSection = document.querySelector('.guides-section h2');
        if (guidesSection) {
            guidesSection.insertAdjacentElement('afterend', message);
        }
    }

    // Make resetFilters globally available
    window.resetFilters = function() {
        locationFilter.value = "all";
        languageFilter.value = "all";
        
        // Show all guides
        const tourGuides = document.querySelectorAll(".guide-card");
        tourGuides.forEach(card => {
            card.style.display = "block";
        });

        // Remove filter message
        const existingMessage = document.querySelector('.filter-message');
        if (existingMessage) {
            existingMessage.remove();
        }
    };
});
