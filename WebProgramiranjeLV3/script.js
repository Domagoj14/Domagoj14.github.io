// Get elements
const cartButton = document.querySelector('.cart-button');
const cartBadge = document.querySelector('.cart-badge');
const modal = document.querySelector('.modal');
const modalClose = document.querySelector('.close');
const buyButton = document.querySelector('.buy-btn');
const cartItemsList = document.querySelector('.cart-items');
const cartTotal = document.querySelector('.cart-total');
const itemsGrid = document.querySelector('.items-grid');
const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
const walletAmountDisplay = document.querySelector('.wallet-amount');

let items = [
    {
        id: 0,
        name: 'Apple',
        price: 0.99,
        image: "imgs/apple.jpg",
    },
    {
        id: 1,
        name: 'Banana',
        price: 10,
        image: "imgs/banana.jpg",
    },
    {
        id: 2,
        name: 'Mango',
        price: 15,
        image: "imgs/mango.jpg",
    },
    {
        id: 3,
        name: 'Kiwi',
        price: 5,
        image: "imgs/kiwi.jpg",
    },
    {
        id: 4,
        name: 'Orange',
        price: 8,
        image: "imgs/orange.jpg",
    },
    {
        id: 5,
        name: 'Lemon',
        price: 4,
        image: "imgs/lemon.jpg",
    },
    {
        id: 6,
        name: 'Watermelon',
        price: 40,
        image: "imgs/watermelon.jpg",
    },
    {
        id: 7,
        name: 'Cherry',
        price: 12,
        image: "imgs/cherry.jpg",
    },
    {
        id: 8,
        name: 'Blueberry',
        price: 9,
        image: "imgs/blueberry.jpg",
    },
    {
        id: 9,
        name: 'Grapes',
        price: 18,
        image: "imgs/grapes.jpg",
    },
    {
        id: 10,
        name: 'Passion fruit',
        price: 25,
        image: "imgs/passionfruit.jpg",
    },
    {
        id: 11,
        name: 'Pineapple',
        price: 35,
        image: "imgs/pineapple.jpg",
    },
    {
        id: 12,
        name: 'Coconut',
        price: 10,
        image: "imgs/coconut.jpg",
    },
    {
        id: 13,
        name: 'Strawberry',
        price: 6,
        image: "imgs/strawberry.jpg",
    },
];

let cart = [];
let walletBalance = 100.00;


function addToCart(itemName) {
    const existingItem = cart.find((item) => item.name === itemName);
    
    if(existingItem){
        existingItem.quantity++;
    } else{
        const theItem = items.find(item => item.name === itemName);
        theItem.quantity = 1;
        cart.push(theItem);
    }

    updateCartBadge();
    updateCartItemsList();
}

function removeFromCart(index) {
    const item = cart[index];
    if (item.quantity > 1) {
        item.quantity--;
    } else {
        cart.splice(index, 1);
    }

    updateCartBadge();
    updateCartItemsList();
}

function buyItems() {
    const totalPrice = cart.reduce((total, currentItem) => total + currentItem.price * currentItem.quantity, 0);
    if(totalPrice==0.00){
        alert('Your cart is empty!');
    }
    else if (totalPrice <= walletBalance) {
        walletBalance -= totalPrice;
        walletAmountDisplay.textContent = `$${walletBalance.toFixed(2)}`;
        
        cart = [];
        updateCartBadge();
        updateCartItemsList();
        alert('Purchase successful!');
    } else {
        alert('Insufficient funds!');
    }
}



function updateCartBadge() {
    const totalItems = cart.reduce((total, currentItem) => total + currentItem.quantity, 0);
    cartBadge.textContent = totalItems;
}

function updateCartItemsList() {
    cartItemsList.innerHTML = '';

    cart.forEach(item => {
        const cartItemElement = document.createElement('li');
        cartItemElement.textContent = `${item.name} - $${item.price} x${item.quantity}`;
        cartItemsList.appendChild(cartItemElement);
    });

    const totalPrice = cart.reduce((total, currentItem) => total + currentItem.price * currentItem.quantity, 0);
    cartTotal.textContent = `$${totalPrice.toFixed(2)}`;
}



function fillItemsGrid() {
    itemsGrid.innerHTML = ''; // Clear the items grid

    for (const item of items) {
        let itemElement = document.createElement('div');
        itemElement.classList.add('item');
        itemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <h2>${item.name}</h2>
            <p>$${item.price}</p>
            <button class="add-to-cart-btn" data-name="${item.name}">Add to cart</button>
        `;
        itemElement.querySelector('.add-to-cart-btn').addEventListener('click', function(event){
            const itemName = event.currentTarget.getAttribute('data-name');
            addToCart(itemName);
        });
        itemsGrid.appendChild(itemElement);
    }
}


function filterItemsByPrice(maxPrice) {
    itemsGrid.innerHTML = ''; // Clear the items grid

    const filteredItems = items.filter(item => item.price <= maxPrice);

    for (const item of filteredItems) {
        let itemElement = document.createElement('div');
        itemElement.classList.add('item');
        itemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <h2>${item.name}</h2>
            <p>$${item.price}</p>
            <button class="add-to-cart-btn" data-name="${item.name}">Add to cart</button>
        `;
        itemElement.querySelector('.add-to-cart-btn').addEventListener('click', function(event){
            const itemName = event.currentTarget.getAttribute('data-name');
            addToCart(itemName);
        });
        itemsGrid.appendChild(itemElement);
    }
}


// Event listeners
buyButton.addEventListener('click', buyItems);
cartButton.addEventListener('click', toggleModal);
modalClose.addEventListener('click', toggleModal);
cartItemsList.addEventListener('click', function(event) {
    if (event.target.tagName === 'LI') {
        const index = Array.from(cartItemsList.children).indexOf(event.target);
        removeFromCart(index);
    }
});
document.getElementById('search-btn').addEventListener('click', function() {
    const maxPriceInput = document.getElementById('max-price');
    const maxPrice = parseFloat(maxPriceInput.value);

    if (maxPriceInput.value === '') {
        fillItemsGrid();
    } else if (!isNaN(maxPrice)) {
        filterItemsByPrice(maxPrice);
    } else {
        alert('Please enter a valid number');
    }
});

// Call fillItemsGrid function when page loads
fillItemsGrid();


// Adding the .show-modal class to an element will make it visible
// because it has the CSS property display: block; (which overrides display: none;)
// See the CSS file for more details.
function toggleModal() {
    modal.classList.toggle('show-modal');
  }