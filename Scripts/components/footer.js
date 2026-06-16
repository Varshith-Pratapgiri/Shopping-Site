export async function loadFooter() {
    const response = await fetch("/Components/footer.html");
    const data = await response.text();
    document.getElementById("footer").innerHTML = data;
}