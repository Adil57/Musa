// Sabse pehle, hum GSAP aur ScrollTrigger plugin ko register karte hain
gsap.registerPlugin(ScrollTrigger);

// --- HERO SECTION TEXT REVEAL ANIMATION ---
// Yeh animation page load hote hi chalega
gsap.from("#hero .line", {
    yPercent: 100, // Text neeche se upar aayega
    stagger: 0.1, // Har line ke beech thoda sa delay
    duration: 1, // Animation ka time
    ease: "power4.out", // Ek smooth, professional ease
    delay: 0.5 // Page load hone ke 0.5s baad shuru hoga
});

// --- GENERAL SCROLL ANIMATIONS FOR SECTIONS ---
// Hum sabhi sections ko select kar rahe hain jinko animate karna hai
const sectionsToAnimate = gsap.utils.toArray(['#about', '#projects', '#skills', '#tools']);

sectionsToAnimate.forEach(section => {
    // Har section ke heading (h2) ko animate karenge
    gsap.from(section.querySelector('h2'), {
        opacity: 0,
        y: 50, // Neeche se 50px upar aayega
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
            trigger: section,
            start: "top 85%", // Jab section ka top 85% screen par dikhe
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
        }
    });
});


// --- SKILLS & TOOLS TAGS STAGGER ANIMATION ---
gsap.from(".skill-list span, .tool-list span", {
    opacity: 0,
    y: 30,
    scale: 0.9,
    stagger: 0.08, // Har tag ke beech thoda sa delay
    duration: 0.5,
    ease: "power2.out",
    scrollTrigger: {
        trigger: "#skills", // Skills section trigger karega
        start: "top 75%",
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
    }
});

console.log("Musa's Portfolio animations loaded!"); // Check karne ke liye ki file kaam kar rahi hai

                          
