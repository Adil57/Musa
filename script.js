gsap.registerPlugin(ScrollTrigger);

// --- NEW: HERO SLIDER ANIMATION ---
const slides = gsap.utils.toArray(".slide");
const numSlides = slides.length - 1; // -1 because of the duplicate slide

// Slider ko seamlessly loop karne ka animation
let sliderLoop = gsap.to(".hero-slider", {
    xPercent: -100 * (numSlides - 1), // 4 slides hain (0 to 3)
    ease: "none",
    duration: 20, // Total time for all slides
    repeat: -1,
});


// --- HERO SECTION TEXT REVEAL ANIMATION ---
gsap.from("#hero .line", {
    yPercent: 100,
    stagger: 0.1,
    duration: 1,
    ease: "power4.out",
    delay: 0.5
});

// --- GENERAL SCROLL ANIMATIONS (No Changes) ---
const sectionsToAnimate = gsap.utils.toArray(['#about', '#projects', '#skills', '#tools']);
sectionsToAnimate.forEach(section => {
    gsap.from(section.querySelector('h2'), { opacity: 0, y: 50, duration: 0.8, ease: "power2.out", scrollTrigger: { trigger: section, start: "top 85%", toggleActions: "play none none reset" }});
    gsap.from(section.querySelectorAll('p, .project-item'), { opacity: 0, y: 30, stagger: 0.15, duration: 0.6, ease: "power2.out", scrollTrigger: { trigger: section, start: "top 80%", toggleActions: "play none none reset" }});
});
gsap.from(".skill-list span, .tool-list span", { opacity: 0, y: 30, scale: 0.9, stagger: 0.08, duration: 0.5, ease: "power2.out", scrollTrigger: { trigger: "#skills", start: "top 75%", toggleActions: "play none none reset" }});
gsap.from("footer", { opacity: 0, y: 50, duration: 1, ease: "power2.out", scrollTrigger: { trigger: "footer", start: "top 95%", toggleActions: "play none none reset" }});

console.log("Musa's Portfolio animations V4 (with Slider) loaded!");
