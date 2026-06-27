import { loadHeader } from "/Scripts/components/header.js"
import { loadFooter } from "/Scripts/components/footer.js";



async function init() {
    await loadHeader();
    await loadFooter();

}

init();