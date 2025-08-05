// --- NEW: Swiper Slider Initialization ---
const swiper = new Swiper('.swiper', {
    // AAPKI REQUIREMENTS KE HISAB SE OPTIONS:
    
    // 1. Lagatar loop mein chalega
    loop: true,

    // 2. Har 3 second (3000ms) ke baad slide hoga
    autoplay: {
      delay: 3000,
      disableOnInteraction: false, // User ke slide karne ke baad bhi chalta rahega
    },

    // 3. Slide "fatak se" (fast) hoga - 600ms mein
    speed: 600,

    // 4. Manual drag/swipe ke liye navigation buttons aur pagination dots
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
});


// --- Baaki ka GSAP Animation Code waise hi rahega ---

gsap.registerPlugin(ScrollTrigger);

// HERO SECTION TEXT REVEAL ANIMATION
gsap.from("#hero .line", {
    yPercent: 100,
    stagger: 0.1,
    duration: 1,
    ease: "power4.out",
    delay: 0.5
});

// GENERAL SCROLL ANIMATIONS
const sectionsToAnimate = gsap.utils.toArray(['#about', '#projects', '#skills', '#tools']);
sectionsToAnimate.forEach(section => {
    gsap.from(section.querySelector('h2'), { opacity: 0, y: 50, duration: 0.8, ease: "power2.out", scrollTrigger: { trigger: section, start: "top 85%", toggleActions: "play none none reset" }});
    gsap.from(section.querySelectorAll('p, .project-item'), { opacity: 0, y: 30, stagger: 0.15, duration: 0.6, ease: "power2.out", scrollTrigger: { trigger: section, start: "top 80%", toggleActions: "play none none reset" }});
});
gsap.from(".skill-list span, .tool-list span", { opacity: 0, y: 30, scale: 0.9, stagger: 0.08, duration: 0.5, ease: "power2.out", scrollTrigger: { trigger: "#skills", start: "top 75%", toggleActions: "play none none reset" }});
gsap.from("footer", { opacity: 0, y: 50, duration: 1, ease: "power2.out", scrollTrigger: { trigger: "footer", start: "top 95%", toggleActions: "play none none reset" }});

console.log("Musa's Portfolio animations V5 (with Swiper.js) loaded!");
    
