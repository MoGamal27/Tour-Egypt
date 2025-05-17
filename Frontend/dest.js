document.querySelectorAll('.carousel').forEach(wrapper => {
    const carousel = wrapper.querySelector('.carousel-container');
    const prevBtn = wrapper.querySelector('button[id^="prev"]');
    const nextBtn = wrapper.querySelector('button[id^="next"]');

    if (carousel && prevBtn && nextBtn) {
        nextBtn.addEventListener('click', () => {
            carousel.scrollBy({ left: carousel.clientWidth, behavior: 'smooth' });
        });

        prevBtn.addEventListener('click', () => {
            carousel.scrollBy({ left: -carousel.clientWidth, behavior: 'smooth' });
        });
    }
    
});
