import { fetchSearchResults } from "../pages/search.js";
import { openSideBar } from "./sidebar.js";

export async function loadHeader() {
    const response = await fetch("/Components/header.html");
    const data = await response.text();
    document.getElementById("header").innerHTML = data;

    document.getElementById("search-input").addEventListener("input", () => fetchSearchResults());

    const profileButton = document.getElementById("profile-button");
    if (profileButton) profileButton.addEventListener("click", () => openSideBar());
}

