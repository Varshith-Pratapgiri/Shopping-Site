export function loadSideBar() {
    const sideBar = document.getElementById("side-bar");

    if (sideBar.children.length) return;
    
    sideBar.innerHTML = `
    <div class="side-bar">
       <button id="close-button">close</button>
       <nav>
         <ul>
           <li>
             <a href="/Components/sidebar/pages/kyc.html">KYC</a>
             <a href="/Components/sidebar/pages/myorders.html">My Orders</a>
             <a href="/Components/sidebar/pages/profile.html">Profile</a>
           </li>
         </ul>
       </nav>
    </div>
    `

    const closeButton = document.getElementById("close-button");
    closeButton.addEventListener("click", () => closeSideBar());
}

export function openSideBar() {
    loadSideBar();
    document.querySelector(".side-bar")
    .classList.add("open");
    document.querySelector(".overlay")
    ?.classList.add("show");
    console.log(document.querySelector(".overlay"));
    console.log(document.getElementById("overlay"));
}

export function closeSideBar() {
    document.querySelector(".side-bar")
    ?.classList.remove("open");
    document.querySelector(".overlay")
    ?.classList.remove("show");
}