export function loadSideBar() {
    const sideBar = document.getElementById("side-bar");
    if (sideBar.children.length) return;
    
    sideBar.innerHTML = `
    <div class="side-bar">
       <button id="close-button">close</button>
       <ul>
          <li data-page="profile">Profile</li>
          <li data-page="myOrders">My Order</li>
          <li data-page="kyc">KYC</li>
       </ul>
    </div>
    `

    const closeButton = document.getElementById("close-button");
    closeButton.addEventListener("click", () => closeSideBar());
}

export function openSideBar() {
    loadSideBar();
    document.querySelector(".side-bar")
    .classList.add("open");
}

export function closeSideBar() {
    document.querySelector(".side-bar")
    ?.classList.remove("open");
}