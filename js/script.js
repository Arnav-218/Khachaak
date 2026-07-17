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

if (hamburger && mobileMenu) {

    hamburger.addEventListener("click", () => {

        mobileMenu.classList.toggle("active");
    });

    document.querySelectorAll(".mobile-menu a").forEach(link => {

        link.addEventListener("click", () => {

            mobileMenu.classList.remove("active");
        });

    });
}


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

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn => {

            btn.classList.remove("active");

        });

        button.classList.add("active");

        const filter =
    button.textContent
    .toLowerCase()
    .replace(/\s+/g, "-");

        galleryItems.forEach(item => {

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

        });

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
   FEATURED STORIES
========================================= */

const stories = document.querySelectorAll(".story-card");

stories.forEach(card => {

    card.addEventListener("click", () => {

        stories.forEach(item => {

            if(item !== card){

                item.classList.remove("active");
            }

        });

        card.classList.toggle("active");

    });

});


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
