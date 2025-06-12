document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');
    const touristSpan = document.getElementById('tourist');
    const tourGuideSpan = document.getElementById('tourGuide');
    const extraFields = document.getElementById('extraFields');
    const imageUploadContainer = document.getElementById('image-upload-container');
    const profilePicInput = document.getElementById('profile-pic');
    const previewImg = document.getElementById('preview-img');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const passwordMessage = document.getElementById('password-message');
    const lengthMessage = document.getElementById('length-message');

    // Toggle between Tourist and Tour Guide
    touristSpan.addEventListener('click', () => {
        touristSpan.classList.add('active');
        tourGuideSpan.classList.remove('active');
        extraFields.style.display = 'none';
        imageUploadContainer.style.display = 'none';
    });

    tourGuideSpan.addEventListener('click', () => {
        tourGuideSpan.classList.add('active');
        touristSpan.classList.remove('active');
        extraFields.style.display = 'block';
        imageUploadContainer.style.display = 'block';
    });

    // Image preview
    profilePicInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                previewImg.src = e.target.result;
                previewImg.style.display = 'block';
            };
            reader.readAsDataURL(file);
        }
    });

    // Password validation
    const validatePassword = () => {
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;

        if (password.length < 6) {
            lengthMessage.style.display = 'block';
            return false;
        } else {
            lengthMessage.style.display = 'none';
        }

        if (password !== confirmPassword) {
            passwordMessage.textContent = 'Passwords do not match!';
            passwordMessage.style.color = 'red';
            return false;
        } else {
            passwordMessage.textContent = 'Passwords match!';
            passwordMessage.style.color = 'green';
            return true;
        }
    };

    passwordInput.addEventListener('input', validatePassword);
    confirmPasswordInput.addEventListener('input', validatePassword);

    // Form submission handler
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        if (!validatePassword()) {
            return;
        }

        const isTourGuide = tourGuideSpan.classList.contains('active');
        
        if (isTourGuide) {
            // Tour Guide registration
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phoneNumber: document.getElementById('phone').value,
                password: document.getElementById('password').value,
                language: document.getElementById('language').value,
                Experience: document.getElementById('experience').value,
                destinationId: parseInt(document.getElementById('destination').value),
                profilePic: previewImg.src || ''
            };

            try {
                const response = await fetch('https://bf9a6a07-cd1d-4ebc-b7a7-adde95f7b91e-00-2z7xusx8q8552.kirk.replit.dev/api/tourguide/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include', // Include cookies
                    body: JSON.stringify(formData)
                });

                const data = await response.json();

                if (response.ok) {
                    alert('Tour Guide registration successful!');
                    // Redirect to home page
                    window.location.href = '/home.html';
                } else {
                    alert('Registration failed: ' + data.message);
                }
            } catch (error) {
                console.error('Error:', error);
                alert('An error occurred during registration');
            }
        } else {
            // Tourist registration
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phoneNumber: document.getElementById('phone').value,
                password: document.getElementById('password').value
            };

            try {
                const response = await fetch('https://bf9a6a07-cd1d-4ebc-b7a7-adde95f7b91e-00-2z7xusx8q8552.kirk.replit.dev/api/tourist/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include', // Include cookies
                    body: JSON.stringify(formData)
                });

                const data = await response.json();

                if (response.ok) {
                    alert('Tourist registration successful!');
                    // Redirect to home page
                    window.location.href = '/home.html';
                } else {
                    alert('Registration failed: ' + data.message);
                }
            } catch (error) {
                console.error('Error:', error);
                alert('An error occurred during registration');
            }
        }
    });
});
