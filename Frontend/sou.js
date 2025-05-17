// Shared Functions
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast-message';
    toast.innerHTML = `<i class="fas fa-check-circle"></i><span>${message}</span>`;
    toast.style.cssText = `
        position: fixed; bottom: 20px; right: 20px; background: #27ae60; 
        color: white; padding: 10px 20px; border-radius: 5px; 
        box-shadow: 0 2px 10px rgba(0,0,0,0.2); opacity: 0; 
        transition: opacity 0.3s ease; z-index: 1000;
    `;
    document.body.appendChild(toast);
    setTimeout(() => toast.style.opacity = '1', 10);
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        cartCountElement.textContent = cartCount;
        cartCountElement.style.display = cartCount > 0 ? 'inline-block' : 'none';
    }
}

// Page Specific Functions
function handleNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 50);
}

function smoothScrollTo(targetId) {
    const target = document.getElementById(targetId);
    if (!target) return;
    const navbar = document.querySelector('.navbar');
    const navbarHeight = navbar ? navbar.offsetHeight : 0;
    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight - 20;
    window.scrollTo({ top: targetPosition, behavior: 'smooth' });
}

function setupCategoryNavigation() {
    const navButtons = document.querySelectorAll('.category-nav button[data-target]');
    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            navButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            smoothScrollTo(this.dataset.target);
        });
    });
}

function setupAddToCartButtons() {
    document.querySelector('.product-grid')?.addEventListener('click', (event) => {
        const button = event.target.closest('.add-to-cart-btn');
        if (!button) return;

        const productCard = button.closest('.product-card');
        const id = productCard.dataset.id;
        const name = productCard.querySelector('.product-name')?.textContent.trim() || 
                    productCard.querySelector('.product-description').textContent.trim();
        const priceText = productCard.querySelector('.product-price').textContent.trim();
        const price = parseFloat(priceText.replace(/[^0-9.]/g, ''));
        const image = productCard.querySelector('.product-image-container img').src;

        const product = { id, name, price, image, quantity: 1 };
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingItem = cart.find(item => item.id === product.id);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push(product);
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        showToast(`${product.name} added to cart!`);

        button.disabled = true;
        button.innerHTML = '<i class="fas fa-check"></i> Added';
        setTimeout(() => {
            button.innerHTML = '<i class="fas fa-shopping-cart"></i> Add to cart';
            button.disabled = false;
        }, 1500);
    });
}

function setupHeroButtonScroll() {
    const shopNowButton = document.querySelector('.hero-section .shop-now-btn');
    if (shopNowButton?.getAttribute('href')?.startsWith('#')) {
        shopNowButton.addEventListener('click', (e) => {
            e.preventDefault();
            smoothScrollTo(shopNowButton.getAttribute('href').substring(1));
        });
    }
}

// Event Listeners
window.addEventListener('scroll', handleNavbarScroll);
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    setupCategoryNavigation();
    setupAddToCartButtons();
    setupHeroButtonScroll();
});
function setupAddToCartButtons() {
    document.querySelectorAll('.product-grid').forEach(grid => {
        grid.addEventListener('click', (event) => {
            const button = event.target.closest('.add-to-cart-btn');
            if (!button) return;

            const productCard = button.closest('.product-card');
            const id = productCard.dataset.id;
            const name = productCard.querySelector('.product-name')?.textContent.trim() ||
                        productCard.querySelector('.product-description').textContent.trim();
            const priceText = productCard.querySelector('.product-price').textContent.trim();
            const price = parseFloat(priceText.replace(/[^0-9.]/g, ''));
            const image = productCard.querySelector('.product-image-container img').src;

            const product = { id, name, price, image, quantity: 1 };
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            const existingItem = cart.find(item => item.id === product.id);

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push(product);
            }

            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();
            showToast(`${product.name} added to cart!`);

            button.disabled = true;
            button.innerHTML = '<i class="fas fa-check"></i> Added';
            setTimeout(() => {
                button.innerHTML = '<i class="fas fa-shopping-cart"></i> Add to cart';
                button.disabled = false;
            }, 1500);
        });
    });
}
