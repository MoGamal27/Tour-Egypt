// Function to display items currently in the cart
function displayCartItems() {
    const cartContainer = document.querySelector('.cart-items-container');
    const subtotalElement = document.getElementById('subtotal');
    const shippingElement = document.getElementById('shipping');
    const totalElement = document.getElementById('total');
    const cartSummary = document.querySelector('.cart-summary');

    if (!cartContainer || !subtotalElement || !shippingElement || !totalElement || !cartSummary) {
        return;
    }

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    let subtotal = 0;
    let html = '';

    if (cart.length === 0) {
        html = '<p class="empty-cart">Your cart is empty. <a href="SOUV.HTML" style="text-decoration:none">Shop now</a>.</p>';
        subtotal = 0;
        cartSummary.style.display = 'none';
        cartContainer.innerHTML = html;
    } else {
        cartSummary.style.display = 'block';
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            subtotal += itemTotal;
            html += `
                <div class="cart-item" data-id="${item.id}">
                    <img src="${item.image}" alt="${item.name}">
                    <div class="item-details">
                        <h4>${item.name}</h4>
                        <p>$${item.price.toFixed(2)}</p>
                    </div>
                    <div class="item-quantity">
                        <button class="quantity-btn minus" data-id="${item.id}">-</button>
                        <span>${item.quantity}</span>
                        <button class="quantity-btn plus" data-id="${item.id}">+</button>
                    </div>
                    <div class="item-total">
                        $${itemTotal.toFixed(2)}
                    </div>
                    <button class="remove-btn" data-id="${item.id}">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
        });
        cartContainer.innerHTML = html;

        const shipping = 5.00;
        const total = subtotal + shipping;

        subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
        shippingElement.textContent = `$${shipping.toFixed(2)}`;
        totalElement.textContent = `$${total.toFixed(2)}`;

        addCartActionListeners();
    }

    const checkoutBtn = document.querySelector('.checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            const currentCart = JSON.parse(localStorage.getItem('cart')) || [];
            if (currentCart.length === 0) {
                showToast('Your cart is empty. Add items before proceeding to checkout.');
            } else {
                window.location.href = 'checkout.html';
            }
        });
        checkoutBtn.disabled = cart.length === 0;
    }
}

function addCartActionListeners() {
    const cartContainer = document.querySelector('.cart-items-container');
    if (!cartContainer) return;

    cartContainer.addEventListener('click', function(event) {
        const target = event.target;
        const button = target.closest('.quantity-btn') || target.closest('.remove-btn');
        
        if (!button) return;

        const productId = button.dataset.id;
        if (!productId) return;

        if (button.classList.contains('minus') || button.classList.contains('plus')) {
            const change = button.classList.contains('plus') ? 1 : -1;
            updateQuantity(productId, change);
        } else if (button.classList.contains('remove-btn')) {
            removeItem(productId);
        }
    });
}

function updateQuantity(productId, change) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.map(item => {
        if (item.id === productId) {
            item.quantity += change;
        }
        return item;
    }).filter(item => item.quantity > 0);

    localStorage.setItem('cart', JSON.stringify(cart));
    displayCartItems();
    updateCartCount();
}

function removeItem(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const updatedCart = cart.filter(item => item.id !== productId);
    
    if (updatedCart.length < cart.length) {
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        displayCartItems();
        updateCartCount();
        showToast('Item removed from cart.');
    }
}
// عند إعادة رسم عناصر السلة، لا تحتاج لإضافة event listener جديد كل مرة
function displayCartItems() {
    const cartContainer = document.querySelector('.cart-items-container');
    const subtotalElement = document.getElementById('subtotal');
    const shippingElement = document.getElementById('shipping');
    const totalElement = document.getElementById('total');
    const cartSummary = document.querySelector('.cart-summary');

    if (!cartContainer || !subtotalElement || !shippingElement || !totalElement || !cartSummary) {
        return;
    }

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    let subtotal = 0;
    let html = '';

    if (cart.length === 0) {
        html = '<p class="empty-cart">Your cart is empty. <a href="SOUV.HTML">Shop now</a>.</p>';
        subtotal = 0;
        cartSummary.style.display = 'none';
        cartContainer.innerHTML = html;
    } else {
        cartSummary.style.display = 'block';
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            subtotal += itemTotal;
            html += `
                <div class="cart-item" data-id="${item.id}">
                    <img src="${item.image}" alt="${item.name}">
                    <div class="item-details">
                        <h4>${item.name}</h4>
                        <p>$${item.price.toFixed(2)}</p>
                    </div>
                    <div class="item-quantity">
                        <button class="quantity-btn minus" data-id="${item.id}">-</button>
                        <span>${item.quantity}</span>
                        <button class="quantity-btn plus" data-id="${item.id}">+</button>
                    </div>
                    <div class="item-total">
                        $${itemTotal.toFixed(2)}
                    </div>
                    <button class="remove-btn" data-id="${item.id}">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
        });
        cartContainer.innerHTML = html;

        const shipping = 5.00;
        const total = subtotal + shipping;

        subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
        shippingElement.textContent = `$${shipping.toFixed(2)}`;
        totalElement.textContent = `$${total.toFixed(2)}`;
    }

    const checkoutBtn = document.querySelector('.checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            const currentCart = JSON.parse(localStorage.getItem('cart')) || [];
            if (currentCart.length === 0) {
                showToast('Your cart is empty. Add items before proceeding to checkout.');
            } else {
                window.location.href = 'checkout.html';
            }
        }, { once: true });
        checkoutBtn.disabled = cart.length === 0;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    if (document.querySelector('.cart-items-container')) {
        displayCartItems();
        addCartActionListeners(); // <-- مرة واحدة فقط
    }
});
