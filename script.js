document.addEventListener('DOMContentLoaded', () => {
	const splashScreen = document.getElementById('splash-screen');
	const loadingBar = document.getElementById('loading-bar');
	const mainContent = document.getElementById('main-content');

	// After a brief delay, start the loading bar animation
	setTimeout(() => {
		loadingBar.style.width = '100%';
	}, 500); // Wait for 0.5 seconds before starting

	// After the loading bar animation is complete, fade out the splash screen
	loadingBar.addEventListener('transitionend', () => {
		// Add the fadeOut animation class
		splashScreen.style.animation = 'fadeOut 1s forwards';

		// Wait for the fadeOut animation to finish, then hide the splash screen and show main content
		setTimeout(() => {
			splashScreen.style.display = 'none';
			mainContent.style.display = 'block';
			document.body.style.overflow = 'auto'; // Re-enable scrolling
		}, 1000); // This should match the fadeOut animation duration
	});
});

console.clear();

gsap.registerPlugin(ScrollTrigger);

window.addEventListener('load', () => {
	gsap.timeline({
		scrollTrigger: {
			trigger: '.wrapper',
			start: 'top top',
			end: '+=140%', // less scroll space
			pin: true,
			scrub: 1, // Added smoothness value
			markers: false,
			invalidateOnRefresh: true, // Better refresh handling
		},
	})
		.to('.image-container img', {
			scale: 37, // normal zoom
			z: 450,
			transformOrigin: 'center center',
			ease: 'power1.inOut',
			force3D: true, // GPU acceleration
		})
		.to('.section.hero', {
			scale: 1.1,
			transformOrigin: 'center center',
			ease: 'power1.inOut',
			force3D: true, // GPU acceleration
		}, '<');
	// Add performance optimizations
	ScrollTrigger.config({
		limitCallbacks: true, // Limit callback frequency
		syncInterval: 60, // Sync at 60fps max
	});
});

// Resume Download Function
function downloadResume() {
    // Yahan apna resume file path dalo
    const resumeUrl = 'resume/Nilesh_Kumar_Ahirwar_Resume.png';  
    const fileName = 'Nilesh_Kumar_Ahirwar_Resume.png';  
    
    // Download link create karo
    const link = document.createElement('a');
    link.href = resumeUrl;
    link.download = fileName;
    
    // Download start karo
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    console.log('Resume downloaded!');
}

// Additional performance optimizations
document.addEventListener('DOMContentLoaded', () => {
    // Preload critical images
    const criticalImages = [
        'images/Background1.jpg',
        'images/Foreground1.jpg'
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
    
    // Add will-change property to animated elements
    const animatedElements = document.querySelectorAll('.image-container img, .section.hero');
    animatedElements.forEach(el => {
        el.style.willChange = 'transform';
    });
});

// Background Music System - SIMPLE VERSION
let backgroundMusic;
let musicStarted = false;

// Initialize music
document.addEventListener('DOMContentLoaded', () => {
    backgroundMusic = document.getElementById('background-music');
    if (backgroundMusic) {
        backgroundMusic.volume = 0.3;
    }
    
    // Start music on FIRST user interaction (scroll, click, etc.)
    let interactionStarted = false;
    
    function startMusicOnInteraction() {
        if (!interactionStarted && backgroundMusic && !musicStarted) {
            interactionStarted = true;
            setTimeout(() => {
                backgroundMusic.play().then(() => {
                    musicStarted = true;
                    console.log('🎵 Music started!');
                    const musicBtn = document.getElementById('music-toggle-btn');
                    if (musicBtn) {
                        musicBtn.innerHTML = '🔊';
                        musicBtn.classList.remove('muted');
                    }
                }).catch(() => console.log('Music blocked'));
            }, 1000);
        }
    }
    
    // Add listeners for any user interaction
    window.addEventListener('scroll', startMusicOnInteraction, { once: true });
    window.addEventListener('click', startMusicOnInteraction, { once: true });
    window.addEventListener('touchstart', startMusicOnInteraction, { once: true });
});

// Toggle music function
function toggleMusic() {
    const musicBtn = document.getElementById('music-toggle-btn');
    
    if (!backgroundMusic) return;
    
    if (backgroundMusic.paused) {
        backgroundMusic.play().then(() => {
            musicBtn.innerHTML = '🔊';
            musicBtn.classList.remove('muted');
            musicStarted = true;
        }).catch(() => {});
    } else {
        backgroundMusic.pause();
        musicBtn.innerHTML = '🔇';
        musicBtn.classList.add('muted');
    }
}

