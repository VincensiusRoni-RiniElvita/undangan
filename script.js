// Initialize AOS
AOS.init({
    duration: 1200,
    once: true,
});

// Get guest name from URL
const urlParams = new URLSearchParams(window.location.search);
const guestName = urlParams.get('to');
if (guestName) {
    const guestNameEl = document.getElementById('guest-name');
    if (guestNameEl) guestNameEl.innerText = guestName;
}

// Elements
const music = document.getElementById('bg-music');
const musicIcon = document.getElementById('music-icon');
let isPlaying = false;

// Open Invitation Function
function openInvitation() {
    const splash = document.getElementById('splash-screen');
    const main = document.getElementById('main-content');
    const body = document.body;
    
    splash.style.opacity = '0';
    setTimeout(() => {
        splash.style.display = 'none';
        main.style.display = 'block';
        body.classList.remove('scroll-hidden');
        
        // Play music
        playMusic();
        
        // Refresh AOS
        AOS.refresh();
    }, 1000);
}

// Music Controls
function playMusic() {
    if (music) {
        music.play().then(() => {
            isPlaying = true;
            if (musicIcon) musicIcon.classList.add('fa-spin');
        }).catch(err => {
            console.log("Auto-play was prevented. Waiting for user interaction.");
        });
    }
}

function toggleMusic() {
    if (!music) return;
    
    if (isPlaying) {
        music.pause();
        if (musicIcon) musicIcon.classList.remove('fa-spin');
    } else {
        music.play();
        if (musicIcon) musicIcon.classList.add('fa-spin');
    }
    isPlaying = !isPlaying;
}

// Countdown Timer
const weddingDate = new Date("May 17, 2026 10:00:00").getTime();

const countdown = setInterval(function() {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const daysEl = document.getElementById("days");
    const hoursEl = document.getElementById("hours");
    const minsEl = document.getElementById("minutes");
    const secsEl = document.getElementById("seconds");

    if (daysEl) daysEl.innerHTML = days.toString().padStart(2, '0');
    if (hoursEl) hoursEl.innerHTML = hours.toString().padStart(2, '0');
    if (minsEl) minsEl.innerHTML = minutes.toString().padStart(2, '0');
    if (secsEl) secsEl.innerHTML = seconds.toString().padStart(2, '0');

    if (distance < 0) {
        clearInterval(countdown);
        const countdownEl = document.getElementById("countdown");
        if (countdownEl) countdownEl.innerHTML = "<h3 class='text-2xl font-serif text-wedding-secondary'>HARI BAHAGIA TELAH TIBA!</h3>";
    }
}, 1000);
