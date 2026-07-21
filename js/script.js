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
   NAVBAR SCROLL
========================================= */

const nav = document.querySelector("nav");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {

        nav.classList.add("scrolled");

    } else {

        nav.classList.remove("scrolled");
    }
});


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

const hero = document.querySelector(".hero");

if (hero) {

    const heroImages = [

        "assets/hero/hero1.webp",
        "assets/hero/hero2.webp",
        "assets/hero/hero3.webp",
        "assets/hero/hero4.webp",
        "assets/hero/hero5.webp",
        "assets/hero/hero6.webp"

    ];

    let currentHero = 0;

    setInterval(() => {

        currentHero++;

        if (currentHero >= heroImages.length) {

            currentHero = 0;
        }

        hero.style.backgroundImage =
            `url('${heroImages[currentHero]}')`;

    }, 7000);
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
   ACTIVE NAV LINK
========================================= */

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav ul li a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop =
            section.offsetTop - 150;

        if (pageYOffset >= sectionTop) {

            current = section.getAttribute("id");
        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === `#${current}`) {

            link.classList.add("active");
        }

    });

});

/* =========================================
   HERO SUBTITLE
========================================= */

const heroSubtitle = document.getElementById("heroSubtitle");

if(heroSubtitle){

    const subtitles=[

        "Capture.",
        "Create.",
        "Inspire.",

        "Lights, Cameras, Khachaak",

        "Stealth Era.",

        "Every Frame Matters."

    ];

    let current=0;

    setInterval(()=>{

        heroSubtitle.classList.add("fade");

        setTimeout(()=>{

            current=(current+1)%subtitles.length;

            heroSubtitle.textContent=subtitles[current];

            heroSubtitle.classList.remove("fade");

        },450);

    },3200);

}

/* =========================================
   CAMERA FOCUS
========================================= */

if(hero){

    setInterval(()=>{

        hero.classList.add("hero-focus");

        setTimeout(()=>{

            hero.classList.remove("hero-focus");

        },450);

    },10000);

}
