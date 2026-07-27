document.addEventListener("DOMContentLoaded", ()=>{
    
    window.addEventListener("load", ()=>{
        const preloader = document.getElementById("preloader");
        setTimeout(() => preloader.classList.add("hidden"), 400);
    });

    const hamburger = document.getElementById("hamburger");
    const navLinks = document.getElementById("navLinks");

    hamburger.addEventListener("click", () => {
        navLinks.classList.toggle("open");
    });

    navLinks.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => navLinks.classList.remove("open"));
    });

});