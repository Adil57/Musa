// --- Swiper Slider Initialization ---
const swiper = new Swiper('.swiper', {
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    speed: 600,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
});

// --- Baaki ka GSAP Animation Code ---
gsap.registerPlugin(ScrollTrigger);

// --- UPDATED: New Hero Title Animation ---
// Pehle purana animation target hata diya gaya hai.
// Ab naye title aur subtitle ko animate karenge.
gsap.from(".main-title .title-wrapper", {
    yPercent: 105,
    duration: 0.8,
    ease: "power3.out",
    delay: 0.5
});

gsap.from(".subtitle .title-wrapper", {
    yPercent: 105,
    duration: 0.8,
    ease: "power3.out",
    delay: 0.7 // Thode delay ke baad subtitle aayega
});


// --- GENERAL SCROLL ANIMATIONS (No Changes) ---
const sectionsToAnimate = gsap.utils.toArray(['#about', '#projects', '#skills', '#tools']);
sectionsToAnate.forEach(section => {
    gsap.from(section.querySelector('h2'), { opacity: 0, y: 50, duration: 0.8, ease: "power2.out", scrollTrigger: { trigger: section, start: "top 85%", toggleActions: "play none none reset" }});
    gsap.from(section.querySelectorAll('p, .project-item'), { opacity: 0, y: 30, stagger: 0.15, duration: 0.6, ease: "power2.out", scrollTrigger: { trigger: section, start: "top 80%", toggleActions: "play none none reset" }});
});
gsap.from(".skill-list span, .tool-list span", { opacity: 0, y: 30, scale: 0.9, stagger: 0.08, duration: 0.5, ease: "power2.out", scrollTrigger: { trigger: "#skills", start: "top 75%", toggleActions: "play none none reset" }});
gsap.from("footer", { opacity: 0, y: 50, duration: 1, ease: "power2.out", scrollTrigger: { trigger: "footer", start: "top 95%", toggleActions: "play none none reset" }});

console.log("Musa's Portfolio animations V6 (Stylish Title) loaded!");
                                                             
