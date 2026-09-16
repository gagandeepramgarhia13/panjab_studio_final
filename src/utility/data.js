// what we do
export const whatWeDo = [
    {
        logo: "/svg/camera.svg",
        title: "Wedding Photography & Cinematography",
        paragraph:
            "We immortalize every cherished moment—exchanging vows, emotional glances, and heartfelt celebrations—with cinematic flair and photographic artistry. Trust us to capture your story in a way that feels timeless and true to you.",
    },
    {
        logo: "/svg/video.svg",
        title: "Pre-Wedding & Engagement Shoots",
        paragraph:
            "Picture you both bathed in golden-hour light, sharing genuine laughter or tender whispers. Our shoots are fun, authentic, and styled to reflect who you are—whether strolling through a vibrant park or dancing by the coast. We create a relaxed atmosphere to capture your love story in its most natural and beautiful form.",
    },
    {
        logo: "/svg/music.svg",
        title: "Music Videos & Event Coverage",
        paragraph:
            "Want a powerful music video or live event documentation? We bring cinematic storytelling, high-end production gear, and passion to every project—whether it’s a chart-topping track or a live gala.",
    },
    {
        logo: "/svg/bag.svg",
        title: "Set & Product Shoots",
        paragraph:
            "Need professional imagery for brand, product, or portfolio? From concept to final edit, our full-service productions cater to creatives, models, and brands seeking beautiful, impactful visuals. ",
    },
];

// home gallery
export const galleryImages = [
    "https://i.pinimg.com/1200x/79/52/58/795258031ab9e309c0f449a0bb5e154d.jpg",
    "https://i.pinimg.com/736x/47/14/ff/4714ffa3165df1b7caca5910f52e1496.jpg",
    "https://i.pinimg.com/736x/80/9d/41/809d41835a03db12a3620aa10b815ae7.jpg",
];

// 🔥 Images Data (can come from API later)
const images = [
    { src: "https://i.pinimg.com/1200x/a7/36/9a/a7369a5b3302a3bc249f9ff75bc14f2d.jpg", size: "large" },
    { src: "https://i.pinimg.com/736x/83/da/4a/83da4aab6a972a7efb1cfcdfb321a5bc.jpg", size: "wide" },
    { src: "https://i.pinimg.com/1200x/a7/36/9a/a7369a5b3302a3bc249f9ff75bc14f2d.jpg", size: "tall" },
    { src: "/images/4.jpg" },
    { src: "/images/5.jpg" },
    { src: "/images/6.jpg", size: "wide" },
    { src: "/images/7.jpg" },
    { src: "/images/8.jpg", size: "tall" },
];

const videos = [
    { src: "/videos/v1.mp4" },
    { src: "/videos/v2.mp4" },
    { src: "/videos/v3.mp4" },
];

// instagram links
export const socialLinks = {
    instagram: "https://www.instagram.com/panjabstudiosuk?igsh=aHMyOXRseG81emN5",
};

// social links (desktop follow bar)
// export const followLinks = [
//     { id: 1, icon: "ri-instagram-line", url: "https://www.instagram.com/panjabstudiosuk/" },
//     { id: 2, icon: "ri-tiktok-line", url: "https://www.tiktok.com/@panjabstudiosuk?_r=1&_t=ZS-97RlUde3L53" },
//     { id: 3, icon: "ri-youtube-line", url: "https://www.youtube.com/@panjabstudiosuk" },
// ];

// social links (desktop follow bar)
export const followLinks = [
    { id: 1, icon: "ri-instagram-line", url: "https://www.instagram.com/panjabstudiosuk/" },
    { id: 2, icon: "ri-tiktok-line", url: "https://www.tiktok.com/@panjabstudiosuk?_r=1&_t=ZS-97RlUde3L53" },
    { id: 3, icon: "ri-youtube-line", url: "https://www.youtube.com/@panjabstudiosuk" },
    { id: 4, icon: "ri-facebook-line", url: "https://www.facebook.com/panjabstudiosuk" },
];
// ─────────────────────────────────────────────────────────
// Photography & Cinematography categories
// Single source of truth — used by the Photography/Cinematography
// pages AND by the Home Page preview sections, so the category
// list never has to be duplicated or kept in sync by hand.
// ─────────────────────────────────────────────────────────
export const photographyCategories = [
    {
        label: "Weddings",
        path: "/photography/weddings",
        icon: "💍",
        image: "https://i.pinimg.com/1200x/79/52/58/795258031ab9e309c0f449a0bb5e154d.jpg",
        desc: "Punjabi, Hindu & white wedding celebrations, told with elegance.",
    },
    {
        label: "Live Events",
        path: "/photography/live-events",
        icon: "🎤",
        image: "https://i.pinimg.com/1200x/6e/3e/4e/6e3e4e9e8a1b2c3d4e5f6a7b8c9d0e1f.jpg",
        desc: "The energy of concerts, galas and celebrations, frozen in a frame.",
    },
    {
        label: "Portrait Shoot",
        path: "/photography/portrait-shoot",
        icon: "📸",
        image: "https://i.pinimg.com/1200x/a7/36/9a/a7369a5b3302a3bc249f9ff75bc14f2d.jpg",
        desc: "Personal, editorial portraits that reveal real character.",
    },
    {
        label: "Commercial Photographs",
        path: "/photography/commercial-photos",
        icon: "🏢",
        image: "https://i.pinimg.com/736x/e3/c1/f6/e3c1f6f7cd60abe2245c71e0ba5669de.jpg",
        desc: "Polished brand, product & portfolio imagery for businesses.",
    },
];

export const cinematographyCategories = [
    {
        label: "Weddings",
        path: "/cinematography/wedding-videos",
        icon: "💍",
        desc: "Cinematic wedding films that relive your day, scene by scene.",
    },
    {
        label: "Live Events",
        path: "/cinematography/live-events-videos",
        icon: "🎤",
        desc: "Full production coverage of concerts, galas & live moments.",
    },
    {
        label: "Music Videos",
        path: "/cinematography/music-videos",
        icon: "🎵",
        desc: "High-end music video production with cinematic storytelling.",
    },
    {
        label: "Commercial Videos",
        path: "/cinematography/commercial-videos",
        icon: "🎬",
        desc: "Brand & product films built to captivate and convert.",
    },
];

// Shared showreel used as the hero background across cinematography category pages
export const cinematographyReel = "/videos/cinematography.mp4";

// Pages featured in the Home Page "More To Discover" section
export const explorePages = [
    {
        label: "About Us",
        path: "/about",
        image: "https://i.pinimg.com/1200x/96/7d/db/967ddb68db475eec28ccb46fb152c3f6.jpg",
        desc: "Get to know the studio, our journey, and the people behind the lens.",
    },
    {
        label: "Our Mission",
        path: "/our-mission",
        image: "https://i.pinimg.com/vwebp/1200x/14/d6/39/14d639f490597e4f176d6762f3ab9864.webp",
        desc: "The values that guide every shoot — emotion first, craft always.",
    },
    {
        label: "FAQs",
        path: "/faq",
        image: "https://i.pinimg.com/1200x/79/52/58/795258031ab9e309c0f449a0bb5e154d.jpg",
        desc: "Booking process, delivery timelines & everything else you're wondering.",
    },
];
