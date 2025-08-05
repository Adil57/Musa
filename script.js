// Wait for the entire HTML to be ready before running any script
document.addEventListener("DOMContentLoaded", () => {

    // --- Contentful Setup ---
    const SPACE_ID = 'g9fqokvd9b7d';
    const ACCESS_TOKEN = 'ANeTj3WEegFMYrW8Rqj-VbSQe7vPncMdF1Ow1ZZruk0';
    let swiper;

    // --- Contentful Fetch Function ---
    async function loadSliderImages() {
        const swiperWrapper = document.querySelector('.swiper-wrapper');
        const url = `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master/entries?access_token=${ACCESS_TOKEN}&content_type=sliderImage&include=1`;

        try {
            const response = await fetch(url);
            const data = await response.json();

            // --- DEEPEST DEBUGGER ---
            console.log("--- FINAL DEBUGGER LOG ---");
            console.log("1. Contentful se aaya poora data:", data);

            if (!data.items || data.items.length === 0) {
                console.error("2. ERROR: Contentful se koi entry (item) nahi mili.");
                swiperWrapper.innerHTML = `<div class="swiper-slide"><p>No entries found in Contentful.</p></div>`;
                return;
            }
            console.log("2. Entries mili hain:", data.items);

            if (!data.includes || !data.includes.Asset) {
                console.error("3. ERROR: Entries toh hain, par unke saath photos (Assets) nahi aaye.");
                swiperWrapper.innerHTML = `<div class="swiper-slide"><p>Entries found, but no linked assets.</p></div>`;
                return;
            }
            console.log("3. Photos (Assets) bhi mili hain:", data.includes.Asset);
            // --- END DEBUGGER ---

            const assets = data.includes.Asset.reduce((acc, asset) => { acc[asset.sys.id] = asset.fields; return acc; }, {});
            let slidesHTML = '';

            data.items.forEach(entry => {
                if (entry.fields.photo && entry.fields.photo.sys) {
                    const assetId = entry.fields.photo.sys.id;
                    const imageFile = assets[assetId]?.file;
                    if (imageFile) {
                        const imageUrl = 'https:' + imageFile.url;
                        slidesHTML += `<div class="swiper-slide"><img src="${imageUrl}" alt="Slider Image"></div>`;
                    } else {
                        console.error(`4. ERROR: Entry mein photo link hai (ID: ${assetId}), par woh photo published assets ki list mein nahi mili!`);
                    }
                }
            });
            
            if (slidesHTML) {
                swiperWrapper.innerHTML = slidesHTML;
                initializeSwiper();
            } else {
                swiperWrapper.innerHTML = `<div class="swiper-slide"><p>Could not build slides. Check console logs.</p></div>`;
            }

        } catch (error) {
            console.error("Main Error:", error);
            swiperWrapper.innerHTML = `<div class="swiper-slide"><p>A critical error occurred.</p></div>`;
        }
    }

    // --- Swiper and GSAP Animations ---
    function initializeSwiper() {
        swiper = new Swiper('.swiper', {
            loop: true, autoplay: { delay: 3000, disableOnInteraction: false }, speed: 600,
            pagination: { el: '.swiper-pagination', clickable: true },
            navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
        });
    }

    gsap.registerPlugin(ScrollTrigger);
    gsap.from(".main-title .title-wrapper", { yPercent: 105, duration: 0.8, ease: "power3.out", delay: 0.5 });
    gsap.from(".subtitle .title-wrapper", { yPercent: 105, duration: 0.8, ease: "power3.out", delay: 0.7 });
    
    const sectionsToAnimate = gsap.utils.toArray(['#about', '#projects', '#skills', '#tools']);
    sectionsToAnimate.forEach(section => {
        gsap.from(section.querySelector('h2'), { opacity: 0, y: 50, scrollTrigger: { trigger: section, start: "top 85%", toggleActions: "play none none reset" }});
        gsap.from(section.querySelectorAll('p, .project-item'), { opacity: 0, y: 30, stagger: 0.15, scrollTrigger: { trigger: section, start: "top 80%", toggleActions: "play none none reset" }});
    });
    gsap.from(".skill-list span, .tool-list span", { opacity: 0, y: 30, scale: 0.9, stagger: 0.08, scrollTrigger: { trigger: "#skills", start: "top 75%", toggleActions: "play none none reset" }});
    gsap.from("footer", { opacity: 0, y: 50, scrollTrigger: { trigger: "footer", start: "top 95%", toggleActions: "play none none reset" }});

    // --- Start everything ---
    loadSliderImages();

    console.log("Musa's Portfolio ULTIMATE DEBUGGER loaded!");
});
                         
