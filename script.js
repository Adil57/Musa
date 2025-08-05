document.addEventListener("DOMContentLoaded", () => {

    // --- Contentful Setup ---
    const SPACE_ID = 'g9fqokvd9b7d';
    const ACCESS_TOKEN = 'ANeTj3WEegFMYrW8Rqj-VbSQe7vPncMdF1Ow1ZZruk0';
    let heroSwiper, reelsSwiper;

    // --- Function to load Hero Slider Images ---
    async function loadSliderImages() {
        const swiperWrapper = document.querySelector('.hero-swiper .swiper-wrapper');
        const url = `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master/entries?access_token=${ACCESS_TOKEN}&content_type=SliderImage&include=1`;
        try {
            const response = await fetch(url); const data = await response.json();
            if (!data.items || !data.items.length || !data.includes || !data.includes.Asset) return;
            const assets = data.includes.Asset.reduce((acc, asset) => { acc[asset.sys.id] = asset.fields.file.url; return acc; }, {});
            let slidesHTML = '';
            data.items.forEach(item => {
                if (item.fields.photo && Array.isArray(item.fields.photo)) {
                    item.fields.photo.forEach(photoLink => {
                        if (photoLink && photoLink.sys && assets[photoLink.sys.id]) {
                            slidesHTML += `<div class="swiper-slide"><img src="https:${assets[photoLink.sys.id]}" alt="Slider Image"></div>`;
                        }
                    });
                }
            });
            if (slidesHTML) { swiperWrapper.innerHTML = slidesHTML; initializeHeroSwiper(); }
        } catch (error) { console.error("Error loading hero images:", error); }
    }

    // --- Function to load Reels ---
    async function loadReels() {
        const swiperWrapper = document.querySelector('.reels-swiper .swiper-wrapper');
        const url = `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master/entries?access_token=${ACCESS_TOKEN}&content_type=reel&include=1`;
        try {
            const response = await fetch(url); const data = await response.json();
            if (!data.items || !data.items.length || !data.includes || !data.includes.Asset) {
                console.log("No published reels found from Contentful API.");
                return;
            }
            const assets = data.includes.Asset.reduce((acc, asset) => { acc[asset.sys.id] = asset.fields.file.url; return acc; }, {});
            let slidesHTML = '';

            // --- THE FINAL FIX IS HERE ---
            // Ab yeh code har entry ke andar multiple videos ko bhi handle karega
            data.items.forEach(item => {
                if (item.fields.videoFile && Array.isArray(item.fields.videoFile)) {
                    item.fields.videoFile.forEach(videoLink => {
                        if (videoLink && videoLink.sys && assets[videoLink.sys.id]) {
                            const videoUrl = 'https:' + assets[videoLink.sys.id];
                            slidesHTML += `
                                <div class="swiper-slide">
                                    <div class="reel-card">
                                        <video src="${videoUrl}" autoplay loop muted playsinline></video>
                                        <div class="sound-icon">
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 4L8 8H4V16H8L12 20V4ZM14 8.5V15.5C15.86 15.17 17.17 13.56 17.17 11.75C17.17 9.94 15.86 8.33 14 8.5Z" fill="white"/></svg>
                                        </div>
                                    </div>
                                </div>`;
                        }
                    });
                }
            });

            if (slidesHTML) { swiperWrapper.innerHTML = slidesHTML; initializeReelsSwiper(); }
        } catch (error) { console.error("Error loading reels:", error); }
    }

    // --- Swiper Initializers ---
    function initializeHeroSwiper() {
        heroSwiper = new Swiper('.hero-swiper', { loop: document.querySelectorAll('.hero-swiper .swiper-slide').length > 1, autoplay: { delay: 3000, disableOnInteraction: false }, speed: 600, pagination: { el: '.swiper-pagination', clickable: true }, navigation: { nextEl: '.hero-swiper .swiper-button-next', prevEl: '.hero-swiper .swiper-button-prev' } });
    }
    
    function initializeReelsSwiper() {
        reelsSwiper = new Swiper('.reels-swiper', {
            effect: 'slide', slidesPerView: 'auto', spaceBetween: 30, centeredSlides: true, 
            loop: document.querySelectorAll('.reels-swiper .swiper-slide').length > 1,
            navigation: { nextEl: '.reels-swiper .swiper-button-next', prevEl: '.reels-swiper .swiper-button-prev' }
        });
        const reelCards = document.querySelectorAll('.reels-swiper .swiper-slide');
        reelCards.forEach(card => {
            const video = card.querySelector('video');
            if(video) {
                card.addEventListener('mouseenter', () => { video.muted = false; });
                card.addEventListener('mouseleave', () => { video.muted = true; });
            }
        });
    }

    // --- GSAP Animations ---
    gsap.registerPlugin(ScrollTrigger);
    gsap.from(".main-title .title-wrapper", { yPercent: 105, duration: 0.8, ease: "power3.out", delay: 0.5 });
    gsap.from(".subtitle .title-wrapper", { yPercent: 105, duration: 0.8, ease: "power3.out", delay: 0.7 });
    const sectionsToAnimate = gsap.utils.toArray(['#about', '#projects', '#skills', '#tools']);
    sectionsToAnimate.forEach(section => {
        gsap.from(section.querySelector('h2'), { opacity: 0, y: 50, scrollTrigger: { trigger: section, start: "top 85%", toggleActions: "play none none reset" } });
        gsap.from(section.querySelectorAll('p, .project-item'), { opacity: 0, y: 30, stagger: 0.15, scrollTrigger: { trigger: section, start: "top 80%", toggleActions: "play none none reset" } });
    });
    gsap.from(".skill-list span, .tool-list span", { opacity: 0, y: 30, scale: 0.9, stagger: 0.08, scrollTrigger: { trigger: "#skills", start: "top 75%", toggleActions: "play none none reset" } });
    gsap.from("footer", { opacity: 0, y: 50, scrollTrigger: { trigger: "footer", start: "top 95%", toggleActions: "play none none reset" } });

    // --- Start everything ---
    loadSliderImages();
    loadReels();
});
                             
