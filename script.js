// --- Step 1: Contentful API Keys aur Swiper ko setup karna ---
const SPACE_ID = 'g9fqokvd9b7d';
const ACCESS_TOKEN = 'ANeTj3WEegFMYrW8Rqj-VbSQe7vPncMdF1Ow1ZZruk0';
let swiper;

// --- Step 2: Contentful se Data Fetch karne ka function ---
async function loadSliderImages() {
    const swiperWrapper = document.querySelector('.swiper-wrapper');
    const url = `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master/entries?access_token=${ACCESS_TOKEN}&content_type=sliderImage&include=1`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        // Check if assets exist to prevent errors
        if (!data.includes || !data.includes.Asset) {
            throw new Error("Contentful response mein Assets nahi hain.");
        }

        const assets = data.includes.Asset.reduce((acc, asset) => {
            acc[asset.sys.id] = asset.fields;
            return acc;
        }, {});

        let slidesHTML = '';

        data.items.forEach(entry => {
            // FIX: Check if photo field exists before trying to access it
            if (entry.fields.photo && entry.fields.photo.sys) {
                const assetId = entry.fields.photo.sys.id;
                const imageFile = assets[assetId].file;
                if (imageFile) {
                    const imageUrl = 'https:' + imageFile.url;
                    slidesHTML += `
                        <div class="swiper-slide">
                            <img src="${imageUrl}" alt="Slider Image">
                        </div>
                    `;
                }
            }
        });
        
        if (slidesHTML) {
            swiperWrapper.innerHTML = slidesHTML;
            initializeSwiper();
        } else {
            swiperWrapper.innerHTML = `<div class="swiper-slide"><p>No images found in Contentful.</p></div>`;
        }

    } catch (error) {
        console.error("Contentful se data fetch karne mein error aaya:", error);
        swiperWrapper.innerHTML = `<div class="swiper-slide"><p>Error loading images. Please check console.</p></div>`;
    }
}

// --- Step 3: Naye data ke saath Swiper ko chalu karna ---
function initializeSwiper() {
    swiper = new Swiper('.swiper', {
        loop: true,
        autoplay: { delay: 3000, disableOnInteraction: false },
        speed: 600,
        pagination: { el: '.swiper-pagination', clickable: true },
        navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
    });
}

// --- Baaki ka GSAP Animation Code ---
gsap.registerPlugin(ScrollTrigger);

// HERO TITLE ANIMATION
gsap.from(".main-title .title-wrapper", { yPercent: 105, duration: 0.8, ease: "power3.out", delay: 0.5 });
gsap.from(".subtitle .title-wrapper", { yPercent: 105, duration: 0.8, ease: "power3.out", delay: 0.7 });

// GENERAL SCROLL ANIMATIONS
const sectionsToAnimate = gsap.utils.toArray(['#about', '#projects', '#skills', '#tools']);
// TYPO FIX: Neeche 'sectionsToAnate' ki jagah 'sectionsToAnimate' kar diya hai
sectionsToAnimate.forEach(section => {
    gsap.from(section.querySelector('h2'), { opacity: 0, y: 50, duration: 0.8, ease: "power2.out", scrollTrigger: { trigger: section, start: "top 85%", toggleActions: "play none none reset" }});
    gsap.from(section.querySelectorAll('p, .project-item'), { opacity: 0, y: 30, stagger: 0.15, duration: 0.6, ease: "power2.out", scrollTrigger: { trigger: section, start: "top 80%", toggleActions: "play none none reset" }});
});
gsap.from(".skill-list span, .tool-list span", { opacity: 0, y: 30, scale: 0.9, stagger: 0.08, duration: 0.5, ease: "power2.out", scrollTrigger: { trigger: "#skills", start: "top 75%", toggleActions: "play none none reset" }});
gsap.from("footer", { opacity: 0, y: 50, duration: 1, ease: "power2.out", scrollTrigger: { trigger: "footer", start: "top 95%", toggleActions: "play none none reset" }});

// --- Step 4: Page load hote hi Contentful se images load karna ---
loadSliderImages();

console.log("Musa's Portfolio V7 (with Bug Fixes) loaded!");
    
