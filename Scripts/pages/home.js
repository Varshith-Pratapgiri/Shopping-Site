import { loadHeader } from "../components/header.js";
import { loadFooter } from "../components/footer.js";
import { renderJson, renderCategories } from "./renderProducts.js";
import { data, fetchProducts } from "../services/api.js";




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

    renderCategories(data);
}

init();
