gsap.registerPlugin(ScrollTrigger);

// Background animation ka JS code hata diya gaya hai, ab woh CSS se handle ho raha hai.

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
            // UPDATED: Animation har baar chalane ke liye
            toggleActions: "play none none reset" 
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
            // UPDATED: Animation har baar chalane ke liye
            toggleActions: "play none none reset"
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
        // UPDATED: Animation har baar chalane ke liye
        toggleActions: "play none none reset"
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
        // UPDATED: Animation har baar chalane ke liye
        toggleActions: "play none none reset"
    }
});

console.log("Musa's Portfolio animations V3 (Final) loaded!");
              
