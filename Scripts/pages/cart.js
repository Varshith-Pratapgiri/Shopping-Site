import { loadHeader } from "../components/header.js";
import { loadFooter } from "../components/footer.js";
import { fetchProducts } from "../services/api.js";
import { renderCartItems } from "../components/cartRender.js";
import { generateTotal } from "../services/cartService.js";

async function init() {
    await loadHeader();
    await loadFooter();
    await fetchProducts();
    
    renderCartItems();
    generateTotal();
}

init();
