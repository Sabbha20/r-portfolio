gsap.registerPlugin(ScrollTrigger);

// Smooth scroll function
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Animations for each section
gsap.from("#home .banner-item", {
    scrollTrigger: {
        trigger: "#home",
        start: "top center",
        end: "bottom center",
        scrub: true
    },
    y: 100,
    opacity: 0,
    stagger: 0.2
});

gsap.from("#about p", {
    scrollTrigger: {
        trigger: "#about",
        start: "top center",
        end: "bottom center",
        scrub: true
    },
    x: -100,
    opacity: 0,
    stagger: 0.2
});

gsap.from("#projects .project", {
    scrollTrigger: {
        trigger: "#projects",
        start: "top center",
        end: "bottom center",
        scrub: true
    },
    y: 50,
    opacity: 0,
    stagger: 0.2
});

gsap.from("#contact p", {
    scrollTrigger: {
        trigger: "#contact",
        start: "top center",
        end: "bottom center",
        scrub: true
    },
    scale: 0.8,
    opacity: 0,
    stagger: 0.2
});