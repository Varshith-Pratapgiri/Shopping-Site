import { loadHeader } from "../components/header.js";
import { loadFooter } from "../components/footer.js";
import { renderJson } from "./renderProducts.js";
import { data, fetchProducts } from "../services/api.js";


export const container = document.querySelector(".products-container");

export const shopNowButton = document.querySelector(".shop-now");
export const scrollView = document.querySelector(".scroll-view");

if (shopNowButton && scrollView) {
    shopNowButton.addEventListener("click", () => {
        scrollView.scrollIntoView({
            behavior : 'smooth',
            block: 'start'
        })
    } )
}

async function init() {
    await loadHeader();
    await loadFooter();
    await fetchProducts();

    renderJson(data);
}

init();
