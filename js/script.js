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

    /* -------------------------
       NAVBAR TARGET
    ------------------------- */

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

    /* -------------------------
       HERO LOGO START POSITION
    ------------------------- */

    const logoRect = heroLogo.getBoundingClientRect();

    if (logoRect.width > 0 && logoRect.height > 0) {

        slotDocX = logoRect.left + logoRect.width / 2;
        slotDocY = logoRect.top + logoRect.height / 2;
        slotWidth = logoRect.width;

    } else {

        if (isMobile) {

            slotDocX = window.innerWidth / 2;
            slotDocY = 130;
            slotWidth = Math.min(220, window.innerWidth * 0.58);

        } else {

            slotDocX = window.innerWidth * 0.07;
            slotDocY = window.innerHeight * 0.50;
            slotWidth = Math.min(440, window.innerWidth * 0.32);

        }

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

const animEnd = Math.min(420, heroHeight * 0.60);

const progress = Math.max(
    0,
    Math.min(scrollY / animEnd, 1)
);

const ease = 1 - Math.pow(1 - progress, 3);

/* Hero logo is already in viewport coordinates */

const currentX =
    slotDocX + (targetViewportX - slotDocX) * ease;

const currentY =
    slotDocY + (targetViewportY - slotDocY) * ease;

const currentWidth =
    slotWidth + (targetWidth - slotWidth) * ease;

heroLogo.style.left = `${currentX}px`;

heroLogo.style.top = `${currentY}px`;

heroLogo.style.width = `${currentWidth}px`;

if (window.innerWidth <= 768) {

    heroLogo.style.transform =
        "translate(-50%,0)";

} else {

    heroLogo.style.transform =
        "translate(-50%,-50%)";

}

const shadowY = 25 - ease * 18;

const shadowBlur = 45 - ease * 33;

heroLogo.style.filter =
`
drop-shadow(
0 ${shadowY}px ${shadowBlur}px rgba(0,0,0,.35)
)
drop-shadow(
0 0 ${25-ease*18}px rgba(199,154,118,.12)
)
`;
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
