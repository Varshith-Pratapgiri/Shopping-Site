import { addToCart } from "../services/cartService.js";

// Rendering data on to UI

export const container = document.querySelector(".products-container");


export function renderJson(products, category) {
    if (!container) return;
    container.innerHTML = "";
    
    if (!category) {
        products.forEach(product => {
            container.innerHTML += productDescription(product);
        });
    } else {
        products.filter(p => p.category === category).forEach((product) => {
            container.innerHTML += productDescription(product);
        })
    }

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

export function renderCategories(products) {
    const categories = document.querySelector(".categories");
    if (!categories) {
        console.log("categories not found");
        return;
    }
    const categoriesSet = [
        ...new Set(
            products.map((product) => product.category)
        )
    ]
    
    categoriesSet.forEach((category) => {
        categories.innerHTML += `
        <button data-category="${category}">
           ${category}
        </button>
        `
    })

    categories.addEventListener('click', (e) => {
        const category = e.target.dataset.category;
        const categoriesBtn = document.querySelectorAll(".categories button");
        categoriesBtn.forEach((cat) => cat.classList.remove("active"));
        e.target.classList.add("active");
        renderJson(products, category);
    });
}