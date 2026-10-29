// ==========================================================================
// 1. STARFIELD CANVAS ANIMATION (MONOCHROME PARTICLES)
// ==========================================================================
const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');

let stars = [];
const numStars = 150;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Inisialisasi posisi bintang
for (let i = 0; i < numStars; i++) {
    stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.8,
        speed: Math.random() * 0.5 + 0.1,
        opacity: Math.random()
    });
}

function animateStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    stars.forEach(star => {
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();

        // Pergerakan vertikal ke bawah
        star.y += star.speed;
        if (star.y > canvas.height) {
            star.y = 0;
            star.x = Math.random() * canvas.width;
        }
    });

    requestAnimationFrame(animateStars);
}

animateStars();

// ==========================================================================
// 2. SPACE TRANSMISSION SOUND EFFECTS (WEB AUDIO API)
// ==========================================================================
let audioCtx = null;
let soundEnabled = false;

const soundToggleBtn = document.getElementById('soundToggle');
const soundStatusSpan = document.getElementById('soundStatus');

soundToggleBtn.addEventListener('click', () => {
    soundEnabled = !soundEnabled;
    soundStatusSpan.textContent = soundEnabled ? 'ON' : 'OFF';
    
    if (soundEnabled && !audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    
    if (soundEnabled) {
        playBeep(800, 0.05);
    }
});

function playBeep(freq = 600, duration = 0.08) {
    if (!soundEnabled || !audioCtx) return;
    
    try {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        
        osc.type = 'sine';
        osc.frequency.value = freq;
        
        gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
        
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        
        osc.start();
        osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
        console.error("Audio error:", e);
    }
}

// Bunyi Beep saat klik tombol
document.querySelectorAll('button, a, .mission-card').forEach(element => {
    element.addEventListener('mouseenter', () => playBeep(400, 0.03));
    element.addEventListener('click', () => playBeep(900, 0.08));
});

// ==========================================================================
// 3. CONTACT FORM TRANSMISSION HANDLER
// ==========================================================================
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    formStatus.style.color = '#ffffff';
    formStatus.textContent = 'MENGIRIM TRANSMISI KE STASIUN BUMI...';

    // Simulasi Pengiriman Pesan
    setTimeout(() => {
        formStatus.textContent = `TRANSMISI DITERIMA! TERIMA KASIH, ${name.toUpperCase()}.`;
        contactForm.reset();
        playBeep(1200, 0.15);
    }, 1500);
});