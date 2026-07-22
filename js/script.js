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
const heroBg = document.querySelector(".hero-bg");
const heroWrapper = document.querySelector(".hero-wrapper");
const heroRight = document.querySelector(".hero-right");
const heroScroll = document.querySelector(".hero-scroll");
const logoTarget = document.querySelector(".logo-target");

const navLinks = document.querySelectorAll("nav ul li");

let heroHeight = hero.offsetHeight;
let ticking = false;

function updateHeroMetrics(){

    heroHeight = hero.offsetHeight;

}

window.addEventListener("resize", updateHeroMetrics);

function updateHero(){

    const scroll = window.scrollY;

    const progress = Math.min(scroll / heroHeight,1);

    if(progress > .08){

        nav.classList.add("scrolled");

    }

    else{

        nav.classList.remove("scrolled");

    }

    /* -------------------------
       Background Motion
    ------------------------- */

    heroBg.style.transform =
        `scale(${1 + progress*0.08})
         translateY(${progress*30}px)`;

    /* -------------------------
       Hero Content
    ------------------------- */

    heroRight.style.transform =
        `translateY(${progress*-60}px)`;

    heroRight.style.opacity =
        1-progress*1.2;

    /* -------------------------
       Scroll Indicator
    ------------------------- */

    heroScroll.style.opacity =
        1-progress*5;

    heroScroll.style.transform =
        `translate(-50%,${progress*20}px)`;

    /* -------------------------
       Logo Movement
    ------------------------- */

    if(logoTarget){

        const start = heroLogo.getBoundingClientRect();

        const end = logoTarget.getBoundingClientRect();

        const x = (end.left-start.left)*progress;

        const y = (end.top-start.top)*progress;

        const scale =
            1-progress*0.82;

        heroLogo.style.transform =

            `translate(${x}px,calc(-50% + ${y}px))
             scale(${scale})
             rotate(${progress*0.4}deg)`;

    }

}

window.addEventListener("scroll",()=>{

    if(!ticking){

        requestAnimationFrame(()=>{

            updateHero();

            ticking=false;

        });

        ticking=true;

    }

},{passive:true});

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

function animateHeroLogo(){

    if(!logo || !logoTarget) return;

    const heroHeight = hero.offsetHeight;

    const progress = Math.min(window.scrollY/heroHeight,1);

    const start = {

        x:window.innerWidth*0.07,

        y:window.innerHeight*0.5

    };

    const target = logoTarget.getBoundingClientRect();

    const end = {

        x:target.left,

        y:target.top+10

    };

    const currentX =

        start.x + (end.x-start.x)*progress;

    const currentY =

        start.y + (end.y-start.y)*progress;

    const scale =

        1-progress*0.84;

    const rotate =

        progress*0.35;

    logo.style.left=currentX+"px";

    logo.style.top=currentY+"px";

    logo.style.transform=

        `translateY(-50%)
         scale(${scale})
         rotate(${rotate}deg)`;

    logo.style.filter=

        `drop-shadow(
            0 ${25-progress*15}px
            ${50-progress*20}px
            rgba(0,0,0,.45)
        )
        drop-shadow(
            0 0
            ${25-progress*15}px
            rgba(199,154,118,.15)
        )`;

    if(progress>.82 && !logoAnimated){

        nav.classList.add("hero-complete");

        navItems.forEach((item,index)=>{

            item.style.transitionDelay=

                `${index*60}ms`;

            item.classList.add("show");

        });

        logoAnimated=true;

    }

    if(progress<.82 && logoAnimated){

        nav.classList.remove("hero-complete");

        navItems.forEach(item=>{

            item.classList.remove("show");

            item.style.transitionDelay="0ms";

        });

        logoAnimated=false;

    }

}

window.addEventListener("scroll",()=>{

    updateNavigation();

    animateHeroLogo();

},{passive:true});

updateNavigation();

animateHeroLogo();


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
