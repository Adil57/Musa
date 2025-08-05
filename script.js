document.addEventListener("DOMContentLoaded", () => {
    // --- Contentful Setup ---
    const SPACE_ID = 'g9fqokvd9b7d';
    const ACCESS_TOKEN = 'ANeTj3WEegFMYrW8Rqj-VbSQe7vPncMdF1Ow1ZZruk0';

    // --- Function to load Hero Slider Images (Ismein koi change nahi) ---
    async function loadSliderImages() {
        // ... (hero slider code is unchanged)
    }

    // --- NEW: Reel Debugger Function ---
    async function loadReels() {
        const url = `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master/entries?access_token=${ACCESS_TOKEN}&content_type=reel&include=1`;
        try {
            const response = await fetch(url);
            const data = await response.json();

            // --- REEL DEBUGGER ---
            console.log("--- REEL DEBUGGER ---");
            console.log("'reel' content type ke liye API se yeh 'items' mile hain:");
            console.log(data.items); // Hum bas raw data print kar rahe hain
            console.log("-------------------");
            // --- END DEBUGGER ---

        } catch (error) {
            console.error("Error loading reels:", error);
        }
    }

    // --- Swiper Initializers (Reels wala abhi call nahi hoga) ---
    function initializeHeroSwiper() { /* ... */ }
    function initializeReelsSwiper() { /* ... */ }

    // --- GSAP Animations (Unchanged) ---
    gsap.registerPlugin(ScrollTrigger);
    // ... (saara GSAP code waise hi rahega)


    // --- Start everything ---
    loadSliderImages();
    loadReels(); // Hum bas debugger function call kar rahe hain

// --- Neeche ka code copy paste kar dijiye ---
function initializeHeroSwiper() { const slideCount = document.querySelectorAll('.hero-swiper .swiper-slide').length; new Swiper('.hero-swiper', { loop: slideCount > 1, autoplay: { delay: 3000, disableOnInteraction: false }, speed: 600, pagination: { el: '.swiper-pagination', clickable: true }, navigation: { nextEl: '.hero-swiper .swiper-button-next', prevEl: '.hero-swiper .swiper-button-prev' } }); }
async function loadSliderImages() { const swiperWrapper = document.querySelector('.hero-swiper .swiper-wrapper'); const url = `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master/entries?access_token=${ACCESS_TOKEN}&content_type=SliderImage&include=1`; try { const response = await fetch(url); const data = await response.json(); if (!data.items || !data.items.length || !data.includes || !data.includes.Asset) return; const assets = data.includes.Asset.reduce((acc, asset) => { acc[asset.sys.id] = asset.fields.file.url; return acc; }, {}); let slidesHTML = ''; data.items.forEach(item => { if (item.fields.photo && Array.isArray(item.fields.photo)) { item.fields.photo.forEach(photoLink => { if (photoLink && photoLink.sys && assets[photoLink.sys.id]) { slidesHTML += `<div class="swiper-slide"><img src="https:${assets[photoLink.sys.id]}" alt="Slider Image"></div>`; } }); } }); if (slidesHTML) { swiperWrapper.innerHTML = slidesHTML; initializeHeroSwiper(); } } catch (error) { console.error("Error loading hero images:", error); } }
gsap.from(".main-title .title-wrapper", { yPercent: 105, duration: 0.8, ease: "power3.out", delay: 0.5 });
gsap.from(".subtitle .title-wrapper", { yPercent: 105, duration: 0.8, ease: "power3.out", delay: 0.7 });
const sectionsToAnimate = gsap.utils.toArray(['#about', '#projects', '#skills', '#tools']);
sectionsToAnimate.forEach(section => {
    gsap.from(section.querySelector('h2'), { opacity: 0, y: 50, scrollTrigger: { trigger: section, start: "top 85%", toggleActions: "play none none reset" } });
    gsap.from(section.querySelectorAll('p, .project-item'), { opacity: 0, y: 30, stagger: 0.15, scrollTrigger: { trigger: section, start: "top 80%", toggleActions: "play none none reset" } });
});
gsap.from(".skill-list span, .tool-list span", { opacity: 0, y: 30, scale: 0.9, stagger: 0.08, scrollTrigger: { trigger: "#skills", start: "top 75%", toggleActions: "play none none reset" } });
gsap.from("footer", { opacity: 0, y: 50, scrollTrigger: { trigger: "footer", start: "top 95%", toggleActions: "play none none reset" } });
});
                                         
