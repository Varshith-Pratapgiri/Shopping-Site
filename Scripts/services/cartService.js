import { data } from "./api.js";
import { renderCartItems } from "../components/cartRender.js";
import { statusDisplay } from "../utils/helpers.js";

const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
const inventory = JSON.parse(localStorage.getItem("inventory")) || {};

export function addToCart(productId) {
    const item = data.find((product) => product.id === productId);
    let count = inventory[productId] || 0;
    if (count === 0) cartItems.push(item);
    inventory[productId] = count + 1; 
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    localStorage.setItem("inventory", JSON.stringify(inventory));
    console.log(item);
    console.log(inventory[productId]);
    statusDisplay("Item added to the cart", ".status-text");
}


export function removeCartItem(productId) {
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

export function generateTotal() {
    // const totalClass = document.querySelector(".invoice-items");
    // if (!totalClass) return;
    const localCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const localInventory = JSON.parse(localStorage.getItem("inventory")) || {};
    
    let totalVal = 0;
    let totalCount = 0;
    // totalClass.innerHTML = "";

    localCartItems.forEach((item) => {
        const count = localInventory[item.id] || 0;
        totalCount += count;
        const total = Number(item.price) * Number(count);

        totalVal += total;
        // totalClass.innerHTML += `
        // <div class="item-bill">
        // <p>${total}</p>
        // </div>
        // `
    })
    const finalValue = document.querySelector(".invoice-value");
    totalVal = totalVal.toFixed(2);
    finalValue.innerHTML = `Total (${totalCount} items): $${totalVal}`;
}

export function getCartItems() {
    return JSON.parse(
        localStorage.getItem("cartItems")
    ) || [];
}

export function getInventory() {
    return JSON.parse(
        localStorage.getItem("inventory")
    ) || {};
}