// Ожидание загрузки DOM перед выполнением кода
document.addEventListener('DOMContentLoaded', () => {
    // Форма для добавления нового гаджета
    const submitGadgetForm = document.querySelector('#submit-gadget-form');
    const gadgetList = document.querySelector('.gadget-list');
    
    // Добавление гаджета через форму (простейший пример)
    if (submitGadgetForm) {
        submitGadgetForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const gadgetName = document.querySelector('#gadget-name').value;
            const gadgetPrice = document.querySelector('#gadget-price').value;
            const gadgetImage = document.querySelector('#gadget-image').value;  // URL картинки
            
            // Проверка на заполненность полей
            if (gadgetName && gadgetPrice && gadgetImage) {
                // Создаем новый элемент для списка гаджетов
                const newGadget = document.createElement('div');
                newGadget.classList.add('gadget-item');
                newGadget.innerHTML = `
                    <img src="${gadgetImage}" alt="${gadgetName}">
                    <h3>${gadgetName}</h3>
                    <p>Price: $${gadgetPrice}/day</p>
                    <a href="#" class="btn">Rent Now</a>
                `;
                gadgetList.appendChild(newGadget);

                // Очищаем форму
                submitGadgetForm.reset();
                alert('Gadget successfully added!');
            } else {
                alert('Please fill in all fields.');
            }
        });
    }

    // Функционал для аренды гаджета
    gadgetList.addEventListener('click', function(event) {
        if (event.target.classList.contains('btn')) {
            event.preventDefault();
            const gadgetName = event.target.closest('.gadget-item').querySelector('h3').textContent;
            const price = event.target.closest('.gadget-item').querySelector('p').textContent.split(' ')[1];
            alert(`You have rented the ${gadgetName} for ${price} per day.`);
        }
    });

    // Пример функции для расчета процентов от аренд
    function calculateEarnings(rentals, percentage) {
        const totalEarnings = rentals.reduce((total, rent) => total + rent, 0);
        const userEarnings = totalEarnings * (percentage / 100);
        return userEarnings;
    }

    // Пример использования функции
    const exampleRentals = [20, 30, 40];  // Тестовые данные, например, суммы аренд
    const ownerPercentage = 15;  // Допустим, владелец получает 15% от аренды
    console.log(`User's earnings: $${calculateEarnings(exampleRentals, ownerPercentage)}`);
});
// Cart array to store selected products
let cart = [];

// Function to toggle cart visibility
function toggleCart() {
    const cartDrawer = document.getElementById('cart-drawer');
    cartDrawer.classList.toggle('open');
}

// Function to update the cart UI
function updateCart() {
    const cartItemsDiv = document.getElementById('cart-items');
    const cartTotalDiv = document.getElementById('cart-total');
    const cartCount = document.getElementById('cart-count');

    cartItemsDiv.innerHTML = ''; // Clear current cart display

    let total = 0;
    let itemCount = 0;

    // Loop through cart items and display each in the cart drawer
    cart.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <div style="display: flex; align-items: center;">
                <img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px; margin-right: 10px;">
                <div>
                    <span>${item.name}</span> - $${item.price}/day
                    <div>Quantity: <input type="number" value="${item.quantity}" min="1" style="width: 50px;" onchange="changeQuantity(${index}, this.value)"></div>
                </div>
                <button style="margin-left: auto;" onclick="removeFromCart(${index})">Remove</button>
            </div>
        `;
        cartItemsDiv.appendChild(cartItem);

        // Calculate total price
        total += item.price * item.quantity;
        itemCount += item.quantity;
    });

    // Update total and item count in the cart
    cartTotalDiv.innerText = `Total: $${total}`;
    cartCount.innerText = itemCount;
}

// Function to add items to the cart
function addToCart(name, price, image) {
    // Check if the item already exists in the cart
    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity++; // Increase quantity if item already in cart
    } else {
        // Add new item to the cart array
        cart.push({ name, price, image, quantity: 1 });
    }

    updateCart(); // Update the cart UI
}

// Function to remove items from the cart
function removeFromCart(index) {
    cart.splice(index, 1);  // Remove the item from the cart array
    updateCart();  // Update the cart display
}

// Function to change item quantity
function changeQuantity(index, quantity) {
    cart[index].quantity = parseInt(quantity);
    updateCart();
}

// Add event listeners to "Add to Cart" buttons
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
        const gadgetItem = this.closest('.gadget-item');
        const name = gadgetItem.getAttribute('data-name');
        const price = parseFloat(gadgetItem.getAttribute('data-price'));
        const image = gadgetItem.querySelector('img').src;
        addToCart(name, price, image);
    });
});

// Checkout button functionality
document.getElementById('checkout-btn').addEventListener('click', function() {
    if (cart.length === 0) {
        alert("Your cart is empty.");
    } else {
        alert("Proceeding to checkout...");
        // Add checkout logic here
    }
});

let isLoggedIn = false; // Assume user is not logged in (for demonstration)

// Function to toggle profile menu dropdown
function toggleProfileMenu() {
    const menu = document.getElementById('profile-menu');
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
}




// Call this function on page load to initialize the profile display
window.onload = function() {
    showProfile();
};


// Handle form submission
document.getElementById('loginForm').onsubmit = function(e) {
    e.preventDefault();
    // Handle login logic here (API call, authentication, etc.)
    closeLoginModal();
};
// Open the login modal
function openLoginModal() {
    document.getElementById('loginModal').style.display = 'block';
}

// Close the login modal
function closeLoginModal() {
    document.getElementById('loginModal').style.display = 'none';
}

// Handle form submission (You can add actual login logic here)
document.getElementById('loginForm').onsubmit = function(e) {
    e.preventDefault();
    alert("Login Successful!");
    closeLoginModal(); // Close modal after login
};
// Scroll to login section
function goToProfileSection() {
    document.getElementById('login-section').style.display = 'block';
    document.getElementById('login-section').scrollIntoView({ behavior: 'smooth' });
}
// Toggle the login section and scroll into view
function goToProfileSection() {
    const loginSection = document.getElementById('login-section');
    loginSection.style.display = 'block'; // Show the login form
    loginSection.scrollIntoView({ behavior: 'smooth' }); // Smooth scroll to the login section
}

// Hook up the "Profile" button to the login section
document.getElementById('profile-link').addEventListener('click', goToProfileSection);

// Handle form submission (You can add actual login logic here)
document.getElementById('loginForm').onsubmit = function(e) {
    e.preventDefault(); // Prevent the page from refreshing
    alert("Login Successful!"); // Replace with real login logic
};
// Function to toggle login section visibility
function toggleLoginSection() {
    const loginSection = document.getElementById('login-section');
    if (loginSection.style.display === 'none' || loginSection.style.display === '') {
        loginSection.style.display = 'block'; // Show login form
        loginSection.scrollIntoView({ behavior: 'smooth' }); // Smooth scroll to the form
    } else {
        loginSection.style.display = 'none'; // Hide login form
    }
}
document.getElementById('checkout-btn').addEventListener('click', function() {
    if (cart.length === 0) {
        alert("Your cart is empty.");
        return;
    }

    const userId = 1; // Replace this with the actual logged-in user ID
    const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const cartItems = cart.map(item => ({
        gadget_id: item.gadget_id, // You should ensure you have gadget_id in each cart item
        quantity: item.quantity,
        price: item.price
    }));

    // Make POST request to checkout endpoint
    fetch('/checkout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userId: userId,
            cartItems: cartItems,
            totalAmount: totalAmount
        })
    })
        .then(response => response.json())
        .then(data => {
            if (data.message) {
                alert("Checkout successful!");
                cart = [];  // Clear the cart
                updateCart();  // Update the cart display
            } else {
                alert("Checkout failed.");
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert("An error occurred during checkout.");
        });
});
