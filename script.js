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

            if (!data.items || data.items.length === 0 || !data.includes || !data.includes.Asset) {
                swiperWrapper.innerHTML = `<div class="swiper-slide"><p>No published content found.</p></div>`;
                return;
            }

            const assets = data.includes.Asset.reduce((acc, asset) => {
                acc[asset.sys.id] = asset.fields.file.url;
                return acc;
            }, {});

            let slidesHTML = '';
            
            // --- THE FINAL FIX IS HERE ---
            // Ab yeh code har entry ke andar multiple photos ko bhi handle karega
            data.items.forEach(item => {
                // Check if the photo field exists and is an array
                if (item.fields.photo && Array.isArray(item.fields.photo)) {
                    // Loop through each photo object in the array
                    item.fields.photo.forEach(photoLink => {
                        if (photoLink && photoLink.sys) {
                            const photoId = photoLink.sys.id;
                            const imageUrl = assets[photoId];
                            if (imageUrl) {
                                slidesHTML += `<div class="swiper-slide"><img src="https:${imageUrl}" alt="Slider Image"></div>`;
                            }
                        }
                    });
                }
            });

            if (slidesHTML) {
                swiperWrapper.innerHTML = slidesHTML;
                initializeSwiper();
            } else {
                swiperWrapper.innerHTML = `<div class="swiper-slide"><p>Could not build slides. Check that all linked 'Media' files are published.</p></div>`;
            }

        } catch (error) {
            console.error("Error loading images:", error);
            swiperWrapper.innerHTML = `<div class="swiper-slide"><p>An error occurred.</p></div>`;
        }
    }

    // --- Swiper and GSAP Animations ---
    function initializeSwiper() {
        const slideCount = document.querySelectorAll('.swiper-slide').length;
        swiper = new Swiper('.swiper', {
            loop: slideCount > 1,
            autoplay: { delay: 3000, disableOnInteraction: false },
            speed: 600,
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

    console.log("Musa's Portfolio Final Version Loaded!");
});
