import { renderJson } from "../pages/renderProducts.js";

export let data = [];

export async function fetchProducts() {
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