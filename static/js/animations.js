gsap.registerPlugin(ScrollTrigger);

// Animate sections on scroll
function animateSections() {
    gsap.utils.toArray('section').forEach((section, i) => {
        const sectionElements = section.children;
        gsap.set(sectionElements, { y: 50, opacity: 0 });

        ScrollTrigger.create({
            trigger: section,
            start: 'top 80%',
            end: 'bottom 20%',
            onEnter: () => gsap.to(sectionElements, {
                y: 150,
                opacity: 1,
                duration: 0.8,
                stagger: 0.2,
                ease: 'power3.out'
            }),
            onLeaveBack: () => gsap.to(sectionElements, {
                y: 50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: 'power3.in'
            })
        });
    });
}

// Animate navbar on scroll
function animateNavbar() {
    const navbar = document.querySelector('nav');
    gsap.to(navbar, {
        scrollTrigger: {
            trigger: 'body',
            start: 'top -80px',
            end: '+=80',
            scrub: true
        },
        // backgroundColor: 'rgba(255, 255, 255, 0.9)',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        padding: '10px 0'
    });
}

// Animate skill badges
function animateSkills() {
    gsap.utils.toArray('.skill-badge').forEach((badge, i) => {
        gsap.from(badge, {
            scrollTrigger: {
                trigger: badge,
                start: 'top 90%',
                end: 'bottom 10%',
                toggleActions: 'play none none reverse'
            },
            scale: 0.5,
            opacity: 0,
            duration: 0.5,
            delay: i * 0.1,
            ease: 'back.out(1.7)'
        });
    });
}

// Run animations
animateSections();
animateNavbar();
animateSkills();

gsap.registerPlugin(ScrollTrigger);
