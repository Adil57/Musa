gsap.registerPlugin(ScrollTrigger);

// --- BACKGROUND CIRCLE ANIMATION ---
// Yeh animation hamesha chalta rahega
gsap.to(".circle1", {
    duration: 15,
    x: "random(-100, 100)",
    y: "random(-100, 100)",
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
});
gsap.to(".circle2", {
    duration: 20,
    x: "random(-150, 150)",
    y: "random(-150, 150)",
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
});
gsap.to(".circle3", {
    duration: 18,
    x: "random(-120, 120)",
    y: "random(-120, 120)",
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
});


// --- HERO SECTION TEXT REVEAL ANIMATION ---
gsap.from("#hero .line", {
    yPercent: 100,
    stagger: 0.1,
    duration: 1,
    ease: "power4.out",
    delay: 0.5
});

// --- GENERAL SCROLL ANIMATIONS FOR SECTIONS ---
const sectionsToAnimate = gsap.utils.toArray(['#about', '#projects', '#skills', '#tools']);

sectionsToAnimate.forEach(section => {
    // Har section ke heading (h2) ko animate karenge
    gsap.from(section.querySelector('h2'), {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
            trigger: section,
            start: "top 85%",
            toggleActions: "play none none none" // Yeh ensure karega ki animation scroll par aane pe play ho
        }
    });

    // Paragraphs (p) aur project links (.project-item) ko animate karenge
    gsap.from(section.querySelectorAll('p, .project-item'), {
        opacity: 0,
        y: 30,
        stagger: 0.15,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none none"
        }
    });
});

// --- SKILLS & TOOLS TAGS STAGGER ANIMATION ---
gsap.from(".skill-list span, .tool-list span", {
    opacity: 0,
    y: 30,
    scale: 0.9,
    stagger: 0.08,
    duration: 0.5,
    ease: "power2.out",
    scrollTrigger: {
        trigger: "#skills",
        start: "top 75%",
        toggleActions: "play none none none"
    }
});

// --- CONTACT BUTTON ANIMATION ---
gsap.from("footer", {
    opacity: 0,
    y: 50,
    duration: 1,
    ease: "power2.out",
    scrollTrigger: {
        trigger: "footer",
        start: "top 95%",
        toggleActions: "play none none none"
    }
});

console.log("Musa's Portfolio animations V2 loaded!");
        
