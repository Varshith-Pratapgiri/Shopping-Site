import { renderJson } from "./renderProducts.js";
import { data } from "../services/api.js";

export function fetchSearchResults() {
    const searchInput = document.getElementById("search-input");
    if (!searchInput) return;

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
