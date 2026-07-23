/* =========================================
   LOADER
========================================= */

window.addEventListener("load", () => {

    const loader = document.querySelector(".loader");

    if (loader) {

        loader.style.opacity = "0";

        setTimeout(() => {

            loader.style.display = "none";

        }, 800);
    }
});


/* =========================================
   NAVBAR + HERO SCROLL ENGINE
========================================= */

const nav = document.querySelector("nav");
const hero = document.querySelector(".hero");
const heroLogo = document.getElementById("heroLogo");
const heroLogoLink = document.getElementById("heroLogoLink");
const logoTarget = document.querySelector(".logo-target");
const logoSlot = document.querySelector(".logo-slot");

const heroBg = document.querySelector(".hero-bg");
const heroRight = document.querySelector(".hero-right");
const heroScroll = document.querySelector(".hero-scroll");

const isHeroPage = !!(hero && heroLogo && logoTarget && logoSlot);

if (!isHeroPage && nav) {
    nav.classList.add("visible", "scrolled");
}

let slotDocX = 0;
let slotDocY = 0;
let slotWidth = 0;

let targetViewportX = 0;
let targetViewportY = 0;
let targetWidth = 0;

function measurePositions() {
    if (!isHeroPage) return;

    const isMobile = window.innerWidth <= 768;

    // Get Target bounding box in fixed viewport space
    const targetRect = logoTarget.getBoundingClientRect();
    if (targetRect.width > 0 && targetRect.height > 0) {
        targetViewportX = targetRect.left + targetRect.width / 2;
        targetViewportY = targetRect.top + targetRect.height / 2;
        targetWidth = targetRect.width;
    } else {
        targetViewportX = isMobile ? 55 : 80;
        targetViewportY = isMobile ? 32 : 36;
        targetWidth = isMobile ? 58 : 75;
    }

    // Get Slot bounding box in document space
    const slotRect = logoSlot.getBoundingClientRect();
    const currentScrollY = window.scrollY || window.pageYOffset || 0;
    if (slotRect.width > 0 && slotRect.height > 0) {
        slotDocX = slotRect.left + slotRect.width / 2 + window.scrollX;
        slotDocY = slotRect.top + slotRect.height / 2 + currentScrollY;
        slotWidth = slotRect.width;
    } else {
        slotDocX = window.innerWidth / 2;
        slotDocY = isMobile ? 220 : 320;
        slotWidth = isMobile ? 210 : 380;
    }
}

let ticking = false;

function updateHero() {
    if (!isHeroPage) return;

    const scrollY = window.scrollY || window.pageYOffset || 0;
    const heroHeight = hero.offsetHeight || window.innerHeight;

    /* -------------------------
       Navbar Glassmorphism State
    ------------------------- */
    if (scrollY > 30) {
        nav.classList.add("scrolled");
    } else {
        nav.classList.remove("scrolled");
    }

    /* -------------------------
       Hero Motion Effects
    ------------------------- */
    const heroProgress = Math.min(scrollY / heroHeight, 1);
    if (heroBg) {
        heroBg.style.transform = `scale(${1 + heroProgress * 0.08}) translateY(${heroProgress * 30}px)`;
    }

    if (heroRight) {
        heroRight.style.transform = `translateY(${heroProgress * -50}px)`;
        heroRight.style.opacity = Math.max(0, 1 - heroProgress * 1.25);
    }

    if (heroScroll) {
        heroScroll.style.opacity = Math.max(0, 1 - heroProgress * 4);
    }

    /* -------------------------
       Logo Interpolation Engine
    ------------------------- */
    const animEnd = Math.min(320, heroHeight * 0.45);
    const progress = Math.max(0, Math.min(scrollY / animEnd, 1));
    
    // Cubic Ease-Out for ultra-smooth natural motion
    const ease = 1 - Math.pow(1 - progress, 3);

    // Document -> Viewport coordinates for slot
    const slotViewportX = slotDocX - (window.scrollX || 0);
    const slotViewportY = slotDocY - scrollY;

    // Smoothly interpolate position and scale
    const currentX = slotViewportX + (targetViewportX - slotViewportX) * ease;
    const currentY = slotViewportY + (targetViewportY - slotViewportY) * ease;
    const currentWidth = slotWidth + (targetWidth - slotWidth) * ease;

    const logoElem = heroLogoLink || heroLogo;
    if (logoElem) {
        logoElem.style.position = "fixed";
        logoElem.style.left = `${currentX.toFixed(2)}px`;
        logoElem.style.top = `${currentY.toFixed(2)}px`;
        logoElem.style.width = `${currentWidth.toFixed(2)}px`;
        logoElem.style.height = "auto";
        logoElem.style.transform = "translate(-50%, -50%) translateZ(0)";
        logoElem.style.zIndex = "5500";
        logoElem.style.willChange = "left, top, width, transform";
    }

    if (heroLogo && heroLogoLink && logoElem !== heroLogo) {
        heroLogo.style.width = "100%";
        heroLogo.style.height = "auto";
    }

    // Dynamic subtle shadow transition
    if (heroLogo) {
        const shadowY = Math.round(25 - ease * 18);
        const shadowBlur = Math.round(45 - ease * 33);
        const shadowAlpha = (0.45 - ease * 0.25).toFixed(2);
        const glowAlpha = (0.15 - ease * 0.1).toFixed(2);
        heroLogo.style.filter = `drop-shadow(0 ${shadowY}px ${shadowBlur}px rgba(0,0,0,${shadowAlpha})) drop-shadow(0 0 ${Math.round(25 - ease * 18)}px rgba(199,154,118,${glowAlpha}))`;
    }
}

function requestTick() {
    if (!ticking) {
        requestAnimationFrame(() => {
            updateHero();
            ticking = false;
        });
        ticking = true;
    }
}

window.addEventListener("scroll", requestTick, { passive: true });

window.addEventListener("resize", () => {
    measurePositions();
    requestTick();
});

window.addEventListener("orientationchange", () => {
    setTimeout(() => {
        measurePositions();
        requestTick();
    }, 150);
});

// Initial measurement and trigger
document.addEventListener("DOMContentLoaded", () => {
    measurePositions();
    updateHero();
});

window.addEventListener("load", () => {
    measurePositions();
    updateHero();
    setTimeout(() => {
        measurePositions();
        updateHero();
    }, 900);
});

measurePositions();
updateHero();


/* =========================================
   MOBILE MENU
========================================= */

const hamburger = document.querySelector(".hamburger");
const mobileMenu = document.querySelector(".mobile-menu");
const closeMenu = document.querySelector(".close-menu");

if(hamburger && mobileMenu){

    hamburger.addEventListener("click",()=>{

        mobileMenu.classList.add("active");

        document.body.style.overflow="hidden";

    });

}

if(closeMenu){

    closeMenu.addEventListener("click",()=>{

        mobileMenu.classList.remove("active");

        document.body.style.overflow="";

    });

}

document.querySelectorAll(".mobile-menu a").forEach(link=>{

    link.addEventListener("click",()=>{

        mobileMenu.classList.remove("active");

        document.body.style.overflow="";

    });

});


/* =========================================
   HERO SLIDESHOW
========================================= */

const heroImages = [

    "assets/hero/hero1.webp",
    "assets/hero/hero2.webp",
    "assets/hero/hero3.webp",
    "assets/hero/hero4.webp"

];

let heroIndex = 0;

const heroBackground = document.querySelector(".hero-bg");

function changeHeroImage(){

    if(!heroBackground) return;

    heroBackground.style.transition =
        "opacity .8s ease, transform 8s ease";

    heroBackground.style.opacity = "0";

    setTimeout(()=>{

        heroIndex =
            (heroIndex+1)%heroImages.length;

        heroBackground.style.backgroundImage =
            `url("${heroImages[heroIndex]}")`;

        heroBackground.style.opacity = "1";

        heroBackground.style.transform =
            "scale(1.04)";

        requestAnimationFrame(()=>{

            setTimeout(()=>{

                heroBackground.style.transform =
                    "scale(1)";

            },50);

        });

    },800);

}

if(heroBackground){

    heroBackground.style.backgroundImage =
        `url("${heroImages[0]}")`;

    setInterval(changeHeroImage,7000);

}

/* =========================================
   CURSOR GLOW
========================================= */

const glow = document.createElement("div");

glow.classList.add("cursor-glow");

document.body.appendChild(glow);

document.addEventListener("mousemove", (e) => {

    glow.style.left = e.clientX + "px";
    glow.style.top = e.clientY + "px";

});


/* =========================================
   FADE ANIMATION
========================================= */

const observer = new IntersectionObserver(

    (entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");
            }

        });

    },

    {
        threshold: 0.15
    }

);

document.querySelectorAll("section").forEach(section => {

    section.classList.add("fade-up");

    observer.observe(section);

});


/* =========================================
   GALLERY FILTERS
========================================= */

const filterButtons =
    document.querySelectorAll(".gallery-filters button");

const galleryItems =
    document.querySelectorAll(".gallery-item");

const isFullGallery =
    document.querySelector(".gallery-page");

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn => {

            btn.classList.remove("active");

        });

        button.classList.add("active");

        const filter =
            button.textContent
            .toLowerCase()
            .replace(/\s+/g,"-");

        const isMobile = window.innerWidth <= 768;

        galleryItems.forEach(item => {

            /* gallery.html */
            if(isFullGallery){

                if(filter === "all"){

                    item.style.display = "block";

                }

                else{

                    item.style.display =
                        item.classList.contains(filter)
                        ? "block"
                        : "none";

                }

            }

            /* homepage */
            else{

                /* Mobile → hide non-matching */
                if(isMobile){

                    if(filter === "all"){

                        item.style.display = "block";

                    }

                    else{

                        item.style.display =
                            item.classList.contains(filter)
                            ? "block"
                            : "none";

                    }

                }

                /* Desktop → fade non-matching */
                else{

                    item.style.display = "block";

                    if(filter === "all"){

                        item.classList.remove("dimmed");
                        item.classList.remove("active-filter");

                    }

                    else{

                        if(item.classList.contains(filter)){

                            item.classList.remove("dimmed");
                            item.classList.add("active-filter");

                        }

                        else{

                            item.classList.remove("active-filter");
                            item.classList.add("dimmed");

                        }

                    }

                }

            }

        });

        /* Scroll to first matching image on mobile */
        if(!isFullGallery && isMobile && filter !== "all"){

            const firstMatch =
                document.querySelector(`.gallery-item.${filter}`);

            if(firstMatch){

                firstMatch.scrollIntoView({

                    behavior:"smooth",

                    block:"start"

                });

            }

        }

    });

});



/* =========================================
   LIGHTBOX
========================================= */

const lightbox =
    document.querySelector(".lightbox");

const lightboxImage =
    document.querySelector(".lightbox img");

const closeLightbox =
    document.querySelector(".close-lightbox");

document.querySelectorAll(".gallery-item img")
    .forEach(image => {

        image.addEventListener("click", () => {

            if (!lightbox) return;

            lightbox.classList.add("active");

            lightboxImage.src = image.src;

        });

    });

if (closeLightbox) {

    closeLightbox.addEventListener("click", () => {

        lightbox.classList.remove("active");

    });

}

if (lightbox) {

    lightbox.addEventListener("click", (e) => {

        if (e.target === lightbox) {

            lightbox.classList.remove("active");
        }

    });

}

/* =========================================
   ACTIVE NAV LINKS + HERO LOGO ANIMATION
========================================= */

const sections = document.querySelectorAll("section[id]");
const navItems = document.querySelectorAll("nav ul li");
const logo = document.getElementById("heroLogo");

let logoAnimated = false;

function updateNavigation(){

    const scroll = window.scrollY + 140;

    sections.forEach(section=>{

        const top = section.offsetTop;

        const height = section.offsetHeight;

        const id = section.getAttribute("id");

        if(scroll>=top && scroll<top+height){

            navItems.forEach(item=>{

                item.classList.remove("active");

                const link = item.querySelector("a");

                if(link && link.getAttribute("href")==="#"+id){

                    item.classList.add("active");

                }

            });

        }

    });

}



/* =========================================
   HERO SUBTITLE
========================================= */

const subtitle = document.getElementById("heroSubtitle");

const subtitleWords = [

    "Capture.",

    "Create.",

    "Observe.",

    "Compose.",

    "Lights. Cameras. Khachaak.",

    "Stealth Era."

];

let subtitleIndex = 0;

function rotateSubtitle(){

    if(!subtitle) return;

    subtitle.classList.add("fade");

    setTimeout(()=>{

        subtitleIndex =
            (subtitleIndex + 1) % subtitleWords.length;

        subtitle.textContent =
            subtitleWords[subtitleIndex];

        subtitle.classList.remove("fade");

    },250);

}

setInterval(rotateSubtitle,3200);


/* =========================================
   CAMERA FOCUS
========================================= */

const focusBox = document.querySelector(".hero-focus-box");

function triggerFocus(){

    if(!focusBox) return;

    focusBox.animate([

        {

            opacity:0,

            transform:"translate(-50%,-50%) scale(1.35)"

        },

        {

            opacity:1,

            transform:"translate(-50%,-50%) scale(.94)",

            offset:.45

        },

        {

            opacity:0,

            transform:"translate(-50%,-50%) scale(1)"

        }

    ],{

        duration:700,

        easing:"cubic-bezier(.22,.61,.36,1)"

    });

}

setInterval(triggerFocus,6500);

setTimeout(triggerFocus,1200);

/* =========================================
   HERO PARALLAX
========================================= */

let mouseX = 0;
let mouseY = 0;

window.addEventListener("mousemove",(e)=>{

    mouseX = (e.clientX/window.innerWidth-.5)*20;

    mouseY = (e.clientY/window.innerHeight-.5)*20;

});

function heroParallax(){

    heroBg.style.transform =

        `translate(${mouseX}px,${mouseY}px)
         scale(1.04)`;

    requestAnimationFrame(heroParallax);

}

heroParallax();
