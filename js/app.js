/* ============================================================
   SHL DIGITAL PORTFOLIO
   Premium SaaS Interaction System
   Version 2026
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {

    "use strict";


    /* ============================================================
       01 — ELEMENTS
       ============================================================ */

    const body = document.body;

    const header =
        document.getElementById("header");

    const navbar =
        document.getElementById("navbar");

    const menuToggle =
        document.getElementById("menuToggle");

    const scrollProgress =
        document.getElementById("scrollProgress");

    const cursorGlow =
        document.getElementById("cursorGlow");

    const currentYear =
        document.getElementById("currentYear");


    /* ============================================================
       02 — REDUCED MOTION
       ============================================================ */

    const reducedMotionQuery =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );

    const reducedMotion =
        reducedMotionQuery.matches;


    if (reducedMotion) {

        document.documentElement.classList.add(
            "reduce-motion"
        );

    }


    /* ============================================================
       03 — CURRENT PAGE
       ============================================================ */

    function normalizePage(path) {

        let page =
            String(path || "")
                .split("?")[0]
                .split("#")[0]
                .split("/")
                .pop()
                .toLowerCase();

        if (
            !page ||
            page === ""
        ) {

            page = "index.html";

        }

        return page;

    }


    const currentPage =
        normalizePage(
            window.location.pathname
        );


    /* ============================================================
       04 — ACTIVE NAVIGATION
       Compatible avec :
       index.html
       about.html
       skills.html
       projects.html
       parcours.html
       contact.html
       cv.html
       ============================================================ */

    function setActiveNavigation() {

        const links =
            document.querySelectorAll(
                ".nav-link[data-page]"
            );


        links.forEach(link => {

            const target =
                normalizePage(
                    link.getAttribute(
                        "data-page"
                    )
                );


            /*
             * Gestion spéciale de la page d'accueil.
             *
             * "/" et "index.html"
             * doivent être considérés
             * comme la même page.
             */

            const isHome =
                (
                    currentPage === "index.html" &&
                    target === "index.html"
                );


            const isActive =
                isHome ||
                target === currentPage;


            link.classList.toggle(
                "active",
                isActive
            );


            if (isActive) {

                link.setAttribute(
                    "aria-current",
                    "page"
                );

            } else {

                link.removeAttribute(
                    "aria-current"
                );

            }

        });

    }


    setActiveNavigation();


    /* ============================================================
       05 — MOBILE MENU
       ============================================================ */

    function closeMobileMenu() {

        if (!navbar || !menuToggle) {
            return;
        }


        navbar.classList.remove(
            "open"
        );

        menuToggle.classList.remove(
            "active"
        );


        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        menuToggle.setAttribute(
            "aria-label",
            "Ouvrir le menu"
        );


        body.classList.remove(
            "menu-open"
        );

    }


    function openMobileMenu() {

        if (!navbar || !menuToggle) {
            return;
        }


        navbar.classList.add(
            "open"
        );

        menuToggle.classList.add(
            "active"
        );


        menuToggle.setAttribute(
            "aria-expanded",
            "true"
        );

        menuToggle.setAttribute(
            "aria-label",
            "Fermer le menu"
        );


        body.classList.add(
            "menu-open"
        );

    }


    if (
        menuToggle &&
        navbar
    ) {

        /*
         * État initial
         */

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        menuToggle.setAttribute(
            "aria-label",
            "Ouvrir le menu"
        );


        menuToggle.addEventListener(
            "click",
            event => {

                event.stopPropagation();


                const isOpen =
                    navbar.classList.contains(
                        "open"
                    );


                if (isOpen) {

                    closeMobileMenu();

                } else {

                    openMobileMenu();

                }

            }
        );

    }


    /* ============================================================
       06 — NAVIGATION LINKS
       
       IMPORTANT :
       Aucun preventDefault().
       
       Le navigateur charge réellement :
       about.html
       skills.html
       projects.html
       etc.
       ============================================================ */

    document
        .querySelectorAll(
            "a[href]"
        )
        .forEach(link => {

            link.addEventListener(
                "click",
                () => {

                    /*
                     * Fermeture immédiate
                     * du menu mobile.
                     */

                    if (
                        link.classList.contains(
                            "nav-link"
                        )
                    ) {

                        closeMobileMenu();

                    }


                    /*
                     * Petite animation de sortie
                     * sans bloquer la navigation.
                     */

                    const href =
                        link.getAttribute(
                            "href"
                        );


                    if (
                        !href ||
                        href.startsWith("#") ||
                        href.startsWith("mailto:") ||
                        href.startsWith("tel:") ||
                        href.startsWith("javascript:")
                    ) {

                        return;

                    }


                    /*
                     * Uniquement pour les pages
                     * internes du portfolio.
                     */

                    const isInternalPage =
                        href.endsWith(".html") &&
                        !href.startsWith("http");


                    if (
                        isInternalPage &&
                        !reducedMotion
                    ) {

                        body.classList.add(
                            "page-leaving"
                        );

                    }

                }
            );

        });


    /* ============================================================
       07 — ESCAPE
       ============================================================ */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape"
            ) {

                closeMobileMenu();

            }

        }
    );


    /* ============================================================
       08 — CLICK OUTSIDE MOBILE MENU
       ============================================================ */

    document.addEventListener(
        "click",
        event => {

            if (
                !navbar ||
                !menuToggle
            ) {

                return;

            }


            if (
                !navbar.classList.contains(
                    "open"
                )
            ) {

                return;

            }


            const clickedInsideNavbar =
                navbar.contains(
                    event.target
                );


            const clickedToggle =
                menuToggle.contains(
                    event.target
                );


            if (
                !clickedInsideNavbar &&
                !clickedToggle
            ) {

                closeMobileMenu();

            }

        }
    );


    /* ============================================================
       09 — RESIZE
       ============================================================ */

    window.addEventListener(
        "resize",
        () => {

            if (
                window.innerWidth > 1050
            ) {

                closeMobileMenu();

            }

        }
    );


    /* ============================================================
       10 — HEADER SCROLL
       ============================================================ */

    function updateHeader() {

        if (!header) {
            return;
        }


        const shouldScroll =
            window.scrollY > 30;


        header.classList.toggle(
            "scrolled",
            shouldScroll
        );

    }


    window.addEventListener(
        "scroll",
        updateHeader,
        {
            passive: true
        }
    );


    updateHeader();


    /* ============================================================
       11 — SCROLL PROGRESS
       ============================================================ */

    function updateScrollProgress() {

        if (!scrollProgress) {
            return;
        }


        const documentHeight =
            document.documentElement
                .scrollHeight -
            window.innerHeight;


        if (
            documentHeight <= 0
        ) {

            scrollProgress.style.width =
                "0%";

            return;

        }


        const progress =
            (
                window.scrollY /
                documentHeight
            ) * 100;


        scrollProgress.style.width =
            `${Math.min(
                Math.max(progress, 0),
                100
            )}%`;

    }


    window.addEventListener(
        "scroll",
        updateScrollProgress,
        {
            passive: true
        }
    );


    window.addEventListener(
        "resize",
        updateScrollProgress,
        {
            passive: true
        }
    );


    updateScrollProgress();


    /* ============================================================
       12 — REVEAL ANIMATIONS
       
       IMPORTANT :
       Ton CSS utilise ".visible".
       Le JS utilise donc ".visible"
       et non ".revealed".
       ============================================================ */

    const revealElements =
        document.querySelectorAll(
            "[data-reveal], " +
            ".reveal, " +
            ".reveal-left, " +
            ".reveal-right"
        );


    function revealElement(
        element
    ) {

        element.classList.add(
            "visible"
        );

    }


    if (
        reducedMotion ||
        !("IntersectionObserver" in window)
    ) {

        revealElements.forEach(
            revealElement
        );

    } else if (
        revealElements.length
    ) {

        const revealObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(
                        entry => {

                            if (
                                entry.isIntersecting
                            ) {

                                revealElement(
                                    entry.target
                                );


                                revealObserver.unobserve(
                                    entry.target
                                );

                            }

                        }
                    );

                },
                {
                    threshold: 0.12,

                    rootMargin:
                        "0px 0px -50px 0px"
                }
            );


        revealElements.forEach(
            element => {

                revealObserver.observe(
                    element
                );

            }
        );

    }


    /* ============================================================
       13 — STAGGER CARDS
       ============================================================ */

    const staggerCards =
        document.querySelectorAll(
            ".stagger-card"
        );


    if (
        reducedMotion
    ) {

        staggerCards.forEach(
            card => {

                card.classList.add(
                    "visible"
                );

            }
        );

    } else if (
        "IntersectionObserver" in window &&
        staggerCards.length
    ) {

        const staggerObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(
                        entry => {

                            if (
                                !entry.isIntersecting
                            ) {

                                return;

                            }


                            const parent =
                                entry.target.parentElement;


                            const cards =
                                parent
                                    ? parent.querySelectorAll(
                                        ".stagger-card"
                                    )
                                    : [];


                            cards.forEach(
                                (
                                    card,
                                    index
                                ) => {

                                    card.style.transitionDelay =
                                        `${index * 80}ms`;


                                    card.classList.add(
                                        "visible"
                                    );

                                }
                            );


                            staggerObserver.unobserve(
                                entry.target
                            );

                        }
                    );

                },
                {
                    threshold: 0.10,

                    rootMargin:
                        "0px 0px -40px 0px"
                }
            );


        staggerCards.forEach(
            card => {

                staggerObserver.observe(
                    card
                );

            }
        );

    } else {

        staggerCards.forEach(
            card => {

                card.classList.add(
                    "visible"
                );

            }
        );

    }


    /* ============================================================
       14 — COUNTERS
       ============================================================ */

    const counters =
        document.querySelectorAll(
            "[data-counter]"
        );


    function animateCounter(
        element
    ) {

        if (
            element.dataset.animated === "true"
        ) {

            return;

        }


        element.dataset.animated =
            "true";


        const target =
            Number(
                element.dataset.counter
            );


        if (
            !Number.isFinite(target)
        ) {

            return;

        }


        const suffix =
            element.dataset.suffix || "";


        const prefix =
            element.dataset.prefix || "";


        /*
         * Pour les utilisateurs ayant
         * activé "réduire les animations".
         */

        if (reducedMotion) {

            element.textContent =
                prefix +
                target +
                suffix;

            return;

        }


        const duration =
            1200;


        const startTime =
            performance.now();


        function update(
            currentTime
        ) {

            const elapsed =
                currentTime -
                startTime;


            const progress =
                Math.min(
                    elapsed / duration,
                    1
                );


            /*
             * Ease-out cubic.
             */

            const eased =
                1 -
                Math.pow(
                    1 - progress,
                    3
                );


            const value =
                Math.round(
                    target * eased
                );


            element.textContent =
                prefix +
                value +
                suffix;


            if (
                progress < 1
            ) {

                requestAnimationFrame(
                    update
                );

            }

        }


        requestAnimationFrame(
            update
        );

    }


    if (
        counters.length
    ) {

        if (
            reducedMotion ||
            !("IntersectionObserver" in window)
        ) {

            counters.forEach(
                animateCounter
            );

        } else {

            const counterObserver =
                new IntersectionObserver(
                    entries => {

                        entries.forEach(
                            entry => {

                                if (
                                    entry.isIntersecting
                                ) {

                                    animateCounter(
                                        entry.target
                                    );


                                    counterObserver.unobserve(
                                        entry.target
                                    );

                                }

                            }
                        );

                    },
                    {
                        threshold: 0.5
                    }
                );


            counters.forEach(
                counter => {

                    counterObserver.observe(
                        counter
                    );

                }
            );

        }

    }


    /* ============================================================
       15 — SKILL PROGRESS BARS
       
       Compatible avec :
       --skill: 85%
       
       et le CSS :
       transform: scaleX(0)
       ============================================================ */

    const skillProgressBars =
        document.querySelectorAll(
            ".skill-progress"
        );


    function animateSkill(
        skill
    ) {

        const value =
            skill.style.getPropertyValue(
                "--skill"
            );


        if (
            value
        ) {

            /*
             * Le CSS utilise déjà
             * width: var(--skill).
             *
             * On force simplement
             * l'animation vers 100%.
             */

            skill.style.setProperty(
                "--skill-target",
                value
            );

            skill.classList.add(
                "visible"
            );

        }

    }


    if (
        skillProgressBars.length
    ) {

        if (
            reducedMotion ||
            !("IntersectionObserver" in window)
        ) {

            skillProgressBars.forEach(
                animateSkill
            );

        } else {

            const skillObserver =
                new IntersectionObserver(
                    entries => {

                        entries.forEach(
                            entry => {

                                if (
                                    entry.isIntersecting
                                ) {

                                    animateSkill(
                                        entry.target
                                    );


                                    skillObserver.unobserve(
                                        entry.target
                                    );

                                }

                            }
                        );

                    },
                    {
                        threshold: 0.30
                    }
                );


            skillProgressBars.forEach(
                skill => {

                    skillObserver.observe(
                        skill
                    );

                }
            );

        }

    }


    /* ============================================================
       16 — MAGNETIC ELEMENTS
       ============================================================ */

    const magneticElements =
        document.querySelectorAll(
            ".magnetic"
        );


    const finePointer =
        window.matchMedia(
            "(pointer: fine)"
        ).matches;


    if (
        finePointer &&
        !reducedMotion
    ) {

        magneticElements.forEach(
            element => {

                element.addEventListener(
                    "mousemove",
                    event => {

                        const rect =
                            element.getBoundingClientRect();


                        const x =
                            event.clientX -
                            rect.left -
                            rect.width / 2;


                        const y =
                            event.clientY -
                            rect.top -
                            rect.height / 2;


                        const strength =
                            0.08;


                        element.style.transform =
                            `translate(
                                ${x * strength}px,
                                ${y * strength}px
                            )`;

                    }
                );


                element.addEventListener(
                    "mouseleave",
                    () => {

                        element.style.transform =
                            "";

                    }
                );

            }
        );

    }


    /* ============================================================
       17 — CURSOR GLOW
       ============================================================ */

    if (
        cursorGlow &&
        finePointer &&
        !reducedMotion
    ) {

        let cursorX = 0;
        let cursorY = 0;

        let glowX = 0;
        let glowY = 0;


        window.addEventListener(
            "pointermove",
            event => {

                cursorX =
                    event.clientX;

                cursorY =
                    event.clientY;

            },
            {
                passive: true
            }
        );


        function animateCursorGlow() {

            glowX +=
                (
                    cursorX -
                    glowX
                ) * 0.12;


            glowY +=
                (
                    cursorY -
                    glowY
                ) * 0.12;


            cursorGlow.style.left =
                `${glowX}px`;


            cursorGlow.style.top =
                `${glowY}px`;


            requestAnimationFrame(
                animateCursorGlow
            );

        }


        animateCursorGlow();

    }


    /* ============================================================
       18 — PROJECT CARD INTERACTION
       ============================================================ */

    const projectCards =
        document.querySelectorAll(
            ".project-card"
        );


    if (
        finePointer &&
        !reducedMotion
    ) {

        projectCards.forEach(
            card => {

                card.addEventListener(
                    "mousemove",
                    event => {

                        const rect =
                            card.getBoundingClientRect();


                        const x =
                            (
                                event.clientX -
                                rect.left
                            ) /
                            rect.width;


                        const y =
                            (
                                event.clientY -
                                rect.top
                            ) /
                            rect.height;


                        const rotateX =
                            (
                                0.5 - y
                            ) * 3;


                        const rotateY =
                            (
                                x - 0.5
                            ) * 3;


                        card.style.transform =
                            `
                            translateY(-7px)
                            perspective(900px)
                            rotateX(${rotateX}deg)
                            rotateY(${rotateY}deg)
                            `;

                    }
                );


                card.addEventListener(
                    "mouseleave",
                    () => {

                        card.style.transform =
                            "";

                    }
                );

            }
        );

    }


    /* ============================================================
       19 — CONTACT FORM
       ============================================================ */

    const contactForm =
        document.getElementById(
            "contactForm"
        );


    if (
        contactForm
    ) {

        contactForm.addEventListener(
            "submit",
            () => {

                body.classList.add(
                    "form-submitting"
                );

            }
        );

    }


    /* ============================================================
       20 — CURRENT YEAR
       ============================================================ */

    if (
        currentYear
    ) {

        currentYear.textContent =
            new Date().getFullYear();

    }


    /*
     * Permet aussi d'utiliser :
     *
     * <span class="current-year"></span>
     *
     * sans ID.
     */

    document
        .querySelectorAll(
            ".current-year"
        )
        .forEach(
            element => {

                element.textContent =
                    new Date().getFullYear();

            }
        );


    /* ============================================================
       21 — PAGE TRANSITION
       ============================================================ */

    window.addEventListener(
        "pageshow",
        () => {

            body.classList.remove(
                "page-leaving"
            );

            body.classList.remove(
                "form-submitting"
            );

        }
    );


    /*
     * Si une page utilise :
     *
     * <div class="page-transition"></div>
     *
     * on la fait disparaître après
     * le chargement de la page.
     */

    const pageTransition =
        document.querySelector(
            ".page-transition"
        );


    if (
        pageTransition
    ) {

        requestAnimationFrame(
            () => {

                pageTransition.classList.add(
                    "loaded"
                );

            }
        );

    }


    /* ============================================================
       22 — SMOOTH ANCHOR LINKS
       
       Les liens #section restent fonctionnels
       à l'intérieur d'une même page.
       ============================================================ */

    document
        .querySelectorAll(
            'a[href^="#"]'
        )
        .forEach(
            link => {

                link.addEventListener(
                    "click",
                    event => {

                        const targetId =
                            link.getAttribute(
                                "href"
                            );


                        if (
                            !targetId ||
                            targetId === "#"
                        ) {

                            return;

                        }


                        const target =
                            document.querySelector(
                                targetId
                            );


                        if (
                            !target
                        ) {

                            return;

                        }


                        event.preventDefault();


                        const headerHeight =
                            header
                                ? header.offsetHeight
                                : 0;


                        const targetPosition =
                            target.getBoundingClientRect()
                                .top +
                            window.scrollY -
                            headerHeight -
                            20;


                        window.scrollTo(
                            {
                                top:
                                    Math.max(
                                        targetPosition,
                                        0
                                    ),

                                behavior:
                                    reducedMotion
                                        ? "auto"
                                        : "smooth"
                            }
                        );


                        closeMobileMenu();

                    }
                );

            }
        );


    /* ============================================================
       23 — LAZY IMAGE SUPPORT
       ============================================================ */

    const images =
        document.querySelectorAll(
            "img[data-src]"
        );


    if (
        images.length
    ) {

        images.forEach(
            image => {

                const source =
                    image.getAttribute(
                        "data-src"
                    );


                if (
                    source
                ) {

                    image.setAttribute(
                        "src",
                        source
                    );

                    image.removeAttribute(
                        "data-src"
                    );

                }

            }
        );

    }


    /* ============================================================
       24 — INITIALIZATION COMPLETE
       ============================================================ */

    body.classList.add(
        "js-ready"
    );


});