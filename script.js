document.addEventListener("DOMContentLoaded", () => {
    const SPACE_ID = 'g9fqokvd9b7d';
    const ACCESS_TOKEN = 'ANeTj3WEegFMYrW8Rqj-VbSQe7vPncMdF1Ow1ZZruk0';
    let heroSwiper, reelsSwiper;

    async function loadSliderImages() {
        const swiperWrapper = document.querySelector('.hero-swiper .swiper-wrapper');
        // --- THE FINAL FIX FOR IMAGES IS HERE ---
        // ID ko 'sliderImage' (chota 's') kar diya hai
        const url = `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master/entries?access_token=${ACCESS_TOKEN}&content_type=sliderImage&include=1`;
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

    async function loadReels() {
        const swiperWrapper = document.querySelector('.reels-swiper .swiper-wrapper');
        const url = `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master/entries?access_token=${ACCESS_TOKEN}&content_type=reel&include=1`;
        try {
            const response = await fetch(url); const data = await response.json();
            if (!data.items || !data.items.length || !data.includes || !data.includes.Asset) { return; }
            const assets = data.includes.Asset.reduce((acc, asset) => { acc[asset.sys.id] = asset.fields.file.url; return acc; }, {});
            let slidesHTML = '';
            data.items.forEach(item => {
                if (item.fields.videoFile && Array.isArray(item.fields.videoFile)) {
                    item.fields.videoFile.forEach(videoLink => {
                        if (videoLink && videoLink.sys && assets[videoLink.sys.id]) {
                            const videoUrl = 'https:' + assets[videoLink.sys.id];
                            slidesHTML += `<div class="swiper-slide"><div class="reel-card"><div class="reel-overlay"></div><video src="${videoUrl}" loop muted playsinline></video><div class="play-pause-btn"><svg class="icon-play" width="24" height="24" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" fill="currentColor"></path></svg><svg class="icon-pause" width="24" height="24" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" fill="currentColor"></path></svg></div><div class="sound-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 4L8 8H4V16H8L12 20V4ZM14 8.5V15.5C15.86 15.17 17.17 13.56 17.17 11.75C17.17 9.94 15.86 8.33 14 8.5Z" fill="white"/></svg></div></div></div>`;
                        }
                    });
                }
            });
            if (slidesHTML) { swiperWrapper.innerHTML = slidesHTML; initializeReelsSwiper(); }
        } catch (error) { console.error("Error loading reels:", error); }
    }

    function initializeHeroSwiper() {
        heroSwiper = new Swiper('.hero-swiper', { loop: document.querySelectorAll('.hero-swiper .swiper-slide').length > 1, autoplay: { delay: 3000, disableOnInteraction: false }, speed: 600, pagination: { el: '.swiper-pagination', clickable: true }, navigation: { nextEl: '.hero-swiper .swiper-button-next', prevEl: '.hero-swiper .swiper-button-prev' } });
    }
    
    function initializeReelsSwiper() {
        reelsSwiper = new Swiper('.reels-swiper', {
            effect: 'slide', slidesPerView: 'auto', spaceBetween: 30, centeredSlides: true, 
            loop: document.querySelectorAll('.reels-swiper .swiper-slide').length > 2,
            navigation: { nextEl: '.reels-swiper .swiper-button-next', prevEl: '.reels-swiper .swiper-button-prev' }
        });
        
        const reelSlides = document.querySelectorAll('.reels-swiper .swiper-slide');
        reelSlides.forEach(slide => {
            const video = slide.querySelector('video');
            const playPauseBtn = slide.querySelector('.play-pause-btn');
            const soundIcon = slide.querySelector('.sound-icon');

            if (video && playPauseBtn) {
                playPauseBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    if (video.paused) {
                        reelSlides.forEach(s => {
                            if (s !== slide) {
                                s.querySelector('video')?.pause();
                                s.classList.remove('is-playing');
                            }
                        });
                        video.play();
                        slide.classList.add('is-playing');
                    } else {
                        video.pause();
                        slide.classList.remove('is-playing');
                    }
                });
            }
            if(video && soundIcon) {
                soundIcon.addEventListener('click', (e) => {
                    e.stopPropagation();
                    video.muted = !video.muted;
                    // Optional: Add visual feedback for sound icon
                    soundIcon.style.opacity = video.muted ? 0.6 : 1;
                });
            }
        });
    }

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

    loadSliderImages();
    loadReels();
});
                
