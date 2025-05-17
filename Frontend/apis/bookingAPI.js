const API_BASE_URL = 'http://localhost:3000/api';

async function createBooking(bookingData) {
    try {
        const response = await fetch(`${API_BASE_URL}/bookings`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bookingData)
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error creating booking:', error);
        throw error;
    }
}

// Add event listener to the booking form
document.addEventListener('DOMContentLoaded', () => {
    const bookingForm = document.getElementById('bookingForm');
    const bookNowBtn = document.getElementById('bookNow');

    bookNowBtn.addEventListener('click', async (e) => {
        e.preventDefault();

        const bookingData = {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            checkIn: document.getElementById('checkIn').value,
            checkOut: document.getElementById('checkOut').value,
            adults: document.getElementById('adults').value,
            children: document.getElementById('children').value || 0,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value
        };

        try {
            const response = await createBooking(bookingData);
            if (response.success) {
                alert('Booking created successfully!');
                bookingForm.reset();
            } else {
                alert('Failed to create booking. Please try again.');
            }
        } catch (error) {
            alert('An error occurred. Please try again later.');
        }
    });
});