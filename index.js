
let data = [];

function productDescription(product) {
    
    return `
         <div class="products-card" >
           <p>${product.title}</p>
            <img src="${product.image}" width="100">
            <strong>$${product.price}</strong>
            <button class="add-to-cart" data-id="${product.id}">Add to cart</button>
        </div>
    `;
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function statusDisplay(text, className) {
    const statusText = document.querySelector(className);
    statusText.innerHTML = text;
    await sleep(3000);
    statusText.innerHTML = "";
}

// fetching data and storing in an array 
async function fetchProducts() {
    try {
        const url = "https://fakestoreapi.com/products";
        const response = await fetch(url);

        if (!response.ok) {
           throw new Error(`error ${response.status}`);
        }
        data = await response.json();

    }
    catch (error) {
        console.log(error.message);
    } 
    renderJson(data);
}

fetchProducts();


const container = document.querySelector(".products-container");

// Rendering data on to UI
function renderJson(products) {
    if (!container) return;
    container.innerHTML = "";
    products.forEach(product => {
        container.innerHTML += productDescription(product);
    });

    const addToCartButtons = document.querySelectorAll(".add-to-cart");
    addToCartButtons.forEach((button) => {
        button.addEventListener("click", () => {
    
            const prod = Number(button.dataset.id);
            
            addToCart(prod);
        })
    })
}

let searchInput;

async function loadHeader() {
    const response = await fetch("header.html");
    const data = await response.text();
    document.getElementById("header").innerHTML = data;

    searchInput = document.getElementById("search-input");
    searchInput.addEventListener("input", () => fetchSearchResults());
}

loadHeader();


// filtering data as per search input 
function fetchSearchResults() {
    
    if (searchInput.value.trim() === "") {
        renderJson(data);
        return;
    }
    const filteredData = data.filter((product) => 
        product.title
    .toLowerCase()
    .includes(searchInput.value.toLowerCase()));

    renderJson(filteredData);
}

const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
const inventory = JSON.parse(localStorage.getItem("inventory")) || {};

function addToCart(productId) {
    const item = data.find((product) => product.id === productId);
    let count = inventory[productId] || 0;
    if (count === 0) cartItems.push(item);
    inventory[productId] = count + 1; 
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    localStorage.setItem("inventory", JSON.stringify(inventory));
    console.log(item);
    console.log(inventory[productId]);
    generateTotal();
    statusDisplay("Item added to the cart", ".status-text");
}

function renderCartItems() {
    const cartContainer = document.querySelector(".cart-container");
    if (!cartContainer) return;
    const localCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const localInventory = JSON.parse(localStorage.getItem("inventory")) || {};
    
    cartContainer.innerHTML = "";
    localCartItems.forEach((item) => {
        if (!item) return;
        const count = localInventory[item.id] || 0;
        cartContainer.innerHTML += 
        `
        <div class="products-card">
        <h3>${item.title}</h3>
        <p>${item.price}</p>
        <img src="${item.image}">
        <p>${count}</p>
        <button class="remove-button" data-id="${item.id}">remove</button>
        </div>
        `
    });
    const removeButtons = document.querySelectorAll(".remove-button");
    removeButtons.forEach((removeButton) => {
        removeButton.addEventListener("click", () => {
            const prodId = removeButton.dataset.id;
            removeCartItem(prodId);
        });
    });
}

renderCartItems();

function removeCartItem(productId) {
    const localCartItems = JSON.parse(localStorage.getItem("cartItems"));
    const localInventory = JSON.parse(localStorage.getItem("inventory"));
    localInventory[productId]--;
    if (localInventory[productId] <= 0) {
        delete localInventory[productId];

        const updatedCartItems = localCartItems.filter((item) => item.id !== Number(productId));

        localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
        localStorage.setItem("inventory", JSON.stringify(localInventory));
    } else {
        localStorage.setItem("cartItems", JSON.stringify(localCartItems));
        localStorage.setItem("inventory", JSON.stringify(localInventory));
    }
    renderCartItems();
    generateTotal();
    statusDisplay("Item removed successfully", ".cart-status-text");
}

function generateTotal() {
    const totalClass = document.querySelector(".invoice-items");
    if (!totalClass) return;
    const localCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const localInventory = JSON.parse(localStorage.getItem("inventory")) || {};
    
    let totalVal = 0;
    totalClass.innerHTML = "";

    localCartItems.forEach((item) => {
        const count = localInventory[item.id] || 0;
        const total = Number(item.price) * Number(count);
        const maxLen = (item.title).slice(0, 20);
        totalVal += total;
        totalClass.innerHTML += `
        <div class="item-bill">
        <strong>${maxLen}...</strong>
        <p>${item.price}</p>
        <p>${count}</p>
        <p>${total}</p>
        </div>
        `
    })
    const finalValue = document.querySelector(".invoice-value");
    finalValue.innerHTML = `Total: ${totalVal}`;
}

generateTotal();



