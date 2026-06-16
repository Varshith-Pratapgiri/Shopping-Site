import {
    getCartItems,
    getInventory,
    removeCartItem
} from "../services/cartService.js";

export function renderCartItems() {
    const cartProducts =
        document.querySelector(".cart-products");

    if (!cartProducts) return;

    const items = getCartItems();
    const inventory = getInventory();

    cartProducts.innerHTML = "";

    items.forEach(item => {
        const count =
            inventory[item.id] || 0;

            cartProducts.innerHTML += `
            <div class="products-card">
                <div class="image-section">
                   <img src="${item.image}">
                </div>

                <div class="details-section">
                   <h3>${item.title}</h3>
                   <p>${count}</p>
                   <button class="remove-button" data-id="${item.id}">remove</button>
                </div>
                
                <div class="price-section">
                   <strong>$${item.price}</strong>  
                </div>
            </div>
        `;
    });

    const removeButtons = document.querySelectorAll(".remove-button");
    removeButtons.forEach((removeButton) => {
        removeButton.addEventListener("click", () => {
            removeCartItem(removeButton.dataset.id);
        });
    });
}