export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export async function statusDisplay(text, className) {
    const statusText = document.querySelector(className);
    statusText.innerHTML = text;
    await sleep(3000);
    statusText.innerHTML = "";
}
