document.addEventListener('DOMContentLoaded', () => {
    const checkoutForm = document.getElementById('checkoutForm');
    const orderItemsContainer = document.getElementById('order-items');

    if (!checkoutForm || !orderItemsContainer) return;

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) {
        showToast('Your cart is empty. Please add items before proceeding to checkout.');
        setTimeout(() => window.location.href = 'cart.html', 2000);
        return;
    }

    const paymentMethods = checkoutForm.querySelectorAll('input[name="paymentType"]');
    const cardDetailDivs = checkoutForm.querySelectorAll('.card-details');

    function displayOrderSummary() {
        const subtotalElement = document.getElementById('subtotal');
        const shippingElement = document.getElementById('shipping');
        const totalElement = document.getElementById('total');

        if (!orderItemsContainer || !subtotalElement || !shippingElement || !totalElement) {
            return;
        }

        let subtotal = 0;
        let html = '';

        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            subtotal += itemTotal;
            html += `
                <div class="order-item">
                    <span>${item.name} (x${item.quantity})</span>
                    <span>$${itemTotal.toFixed(2)}</span>
                </div>
            `;
        });

        orderItemsContainer.innerHTML = html;
        const shipping = 5.00;
        const total = subtotal + shipping;

        subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
        shippingElement.textContent = `$${shipping.toFixed(2)}`;
        totalElement.textContent = `$${total.toFixed(2)}`;
    }

    function toggleCardDetails() {
        const selectedPayment = checkoutForm.querySelector('input[name="paymentType"]:checked').value;
        const showCardDetails = selectedPayment === 'credit';

        cardDetailDivs.forEach(div => {
            const inputs = div.querySelectorAll('input');
            div.style.display = showCardDetails ? 'block' : 'none';
            inputs.forEach(input => {
                input.required = showCardDetails;
                if (!showCardDetails) input.value = '';
            });
        });
    }

    function handleFormSubmit(event) {
        event.preventDefault();
        let isValid = true;
        const requiredFields = ['fullName', 'email', 'address', 'phone'];

        requiredFields.forEach(id => {
            const input = document.getElementById(id);
            if (!input.value.trim()) {
                isValid = false;
                input.style.borderColor = 'var(--error-color)';
            } else {
                input.style.borderColor = '#ddd';
            }
        });

        const paymentType = checkoutForm.querySelector('input[name="paymentType"]:checked').value;
        if (paymentType === 'credit') {
            const cardFields = ['cardNumber', 'cardName', 'expDate', 'cvv'];
            cardFields.forEach(id => {
                const input = document.getElementById(id);
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = 'var(--error-color)';
                } else {
                    input.style.borderColor = '#ddd';
                }
            });
        }

        if (isValid) {
            localStorage.removeItem('cart');
            updateCartCount();
            document.querySelector('.checkout-container').style.display = 'none';
            document.getElementById('success-message').style.display = 'block';
            showToast('Order placed successfully!');
        } else {
            showToast('Please fill in all required fields.');
        }
    }

    paymentMethods.forEach(method => {
        method.addEventListener('change', toggleCardDetails);
    });

    checkoutForm.addEventListener('submit', handleFormSubmit);
    displayOrderSummary();
    toggleCardDetails();
});
