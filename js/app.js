/* =====================================
   PORTFOLIO HERBY
   APP.JS
===================================== */

document.addEventListener("DOMContentLoaded", () => {

    initNavbar();
    initMobileMenu();
    initCounters();
    initReveal();
    initTiltCards();
    initParallax();
    initSmoothScroll();

});

/* =====================================
   HEADER SCROLL
===================================== */

function initNavbar(){

    const header =
    document.querySelector(".header");

    window.addEventListener("scroll", () => {

        if(window.scrollY > 50){

            header.classList.add("scrolled");

        }else{

            header.classList.remove("scrolled");

        }

    });

}

/* =====================================
   MENU MOBILE
===================================== */

function initMobileMenu(){

    const menuBtn =
    document.getElementById("menu-btn");

    const navbar =
    document.querySelector(".navbar");

    if(!menuBtn || !navbar) return;

    menuBtn.addEventListener("click", () => {

        navbar.classList.toggle("mobile-open");

        if(navbar.classList.contains("mobile-open")){

            menuBtn.innerHTML =
            '<i class="fa-solid fa-xmark"></i>';

        }else{

            menuBtn.innerHTML =
            '<i class="fa-solid fa-bars"></i>';

        }

    });

}

/* =====================================
   ACTIVE NAVIGATION
===================================== */

const sections =
document.querySelectorAll("section");

const navLinks =
document.querySelectorAll(".navbar a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop =
        section.offsetTop - 150;

        if(window.scrollY >= sectionTop){

            current =
            section.getAttribute("id");

        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if(
            link.getAttribute("href")
            .includes(current)
        ){

            link.classList.add("active");

        }

    });

});

/* =====================================
   COUNTER
===================================== */

function initCounters(){

    const counters =
    document.querySelectorAll(".counter");

    counters.forEach(counter => {

        counter.innerText = "0";

        const updateCounter = () => {

            const target =
            +counter.getAttribute(
            "data-target"
            );

            const c =
            +counter.innerText;

            const increment =
            target / 100;

            if(c < target){

                counter.innerText =
                `${Math.ceil(
                    c + increment
                )}`;

                setTimeout(
                updateCounter,
                20
                );

            }else{

                counter.innerText =
                target;

            }

        };

        const observer =
        new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if(entry.isIntersecting){

                    updateCounter();

                    observer.unobserve(
                    entry.target
                    );

                }

            });

        });

        observer.observe(counter);

    });

}

/* =====================================
   REVEAL ANIMATION
===================================== */

function initReveal(){

    const elements =
    document.querySelectorAll(
    ".card,.project-card,.stat-card,.timeline-item"
    );

    const observer =
    new IntersectionObserver(

    entries => {

        entries.forEach(entry => {

            if(entry.isIntersecting){

                entry.target.classList.add(
                "show"
                );

            }

        });

    },

    {
        threshold:0.2
    }

    );

    elements.forEach(el => {

        el.classList.add(
        "hidden-element"
        );

        observer.observe(el);

    });

}

/* =====================================
   3D HOVER CARDS
===================================== */

function initTiltCards(){

    const cards =
    document.querySelectorAll(
    ".card,.project-card,.skill-card"
    );

    cards.forEach(card => {

        card.addEventListener(
        "mousemove",
        e => {

            const rect =
            card.getBoundingClientRect();

            const x =
            e.clientX - rect.left;

            const y =
            e.clientY - rect.top;

            const centerX =
            rect.width / 2;

            const centerY =
            rect.height / 2;

            const rotateX =
            ((y - centerY)/12);

            const rotateY =
            ((centerX - x)/12);

            card.style.transform =

            `perspective(1000px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)
             translateY(-10px)`;

        });

        card.addEventListener(
        "mouseleave",
        () => {

            card.style.transform =
            "perspective(1000px) rotateX(0) rotateY(0)";

        });

    });

}

/* =====================================
   HERO PARALLAX
===================================== */

function initParallax(){

    const heroImage =
    document.querySelector(
    ".hero-image"
    );

    if(!heroImage) return;

    window.addEventListener(
    "mousemove",
    e => {

        let x =
        (window.innerWidth / 2
        - e.pageX) / 50;

        let y =
        (window.innerHeight / 2
        - e.pageY) / 50;

        heroImage.style.transform =

        `translateX(${x}px)
         translateY(${y}px)`;

    });

}

/* =====================================
   SMOOTH SCROLL
===================================== */

function initSmoothScroll(){

    document
    .querySelectorAll('a[href^="#"]')
    .forEach(anchor => {

        anchor.addEventListener(
        "click",
        function(e){

            e.preventDefault();

            const target =
            document.querySelector(
            this.getAttribute("href")
            );

            if(target){

                window.scrollTo({

                    top:
                    target.offsetTop - 80,

                    behavior:
                    "smooth"

                });

            }

        });

    });

}

/* =====================================
   HERO TEXT ANIMATION
===================================== */

window.addEventListener(
"load",
() => {

    const heroTitle =
    document.querySelector(
    ".hero h1"
    );

    if(heroTitle){

        heroTitle.animate([

        {
            opacity:0,
            transform:
            "translateY(50px)"
        },

        {
            opacity:1,
            transform:
            "translateY(0)"
        }

        ],

        {
            duration:1200,
            easing:
            "ease-out"
        });

    }

});

/* =====================================
   PRELOADER
===================================== */

window.addEventListener(
"load",
() => {

    const loader =
    document.querySelector(
    ".preloader"
    );

    if(loader){

        setTimeout(() => {

            loader.classList.add(
            "hide"
            );

        },800);

    }

});

/* =====================================
   BACK TO TOP
===================================== */

const topBtn =
document.querySelector(
".back-to-top"
);

window.addEventListener(
"scroll",
() => {

    if(!topBtn) return;

    if(window.scrollY > 400){

        topBtn.classList.add(
        "show-top"
        );

    }else{

        topBtn.classList.remove(
        "show-top"
        );

    }

});

if(topBtn){

    topBtn.addEventListener(
    "click",
    () => {

        window.scrollTo({

            top:0,
            behavior:"smooth"

        });

    });

}

// Scroll effect header
window.addEventListener("scroll", () => {
  const header = document.getElementById("header");

  if(window.scrollY > 50){
    header.style.background = "#071739";
  } else {
    header.style.background = "#071739";
  }
});


/* =====================================
   CURRENT YEAR FOOTER
===================================== */

const year =
document.getElementById(
"currentYear"
);

if(year){

    year.textContent =
    new Date().getFullYear();

}