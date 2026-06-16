import { container } from "./home.js";
import { addToCart } from "../services/cartService.js";

// Rendering data on to UI
export function renderJson(products) {
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

export function productDescription(product) {
    
    return `
         <div class="products-card" >
           <p>${product.title}</p>
            <img src="${product.image}" width="100">
            <strong>$${product.price}</strong>
            <button class="add-to-cart" data-id="${product.id}">Add to cart</button>
        </div>
    `;
}