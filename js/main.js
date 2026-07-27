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

    const typedTextEl = document.getElementById("typedText");
    const fullText = "Test Your Memory with Simon Says!";
    let charIndex = 0;

    function typeWriter() {
        if (charIndex < fullText.length) {
        typedTextEl.textContent += fullText.charAt(charIndex);
        charIndex++;
        setTimeout(typeWriter, 55);
        }
    }
    setTimeout(typeWriter, 500);

});