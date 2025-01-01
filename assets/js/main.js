// Location-specific data
const locations = {
    'las-vegas': {
        cars: [
            {
                id: 1,
                name: 'Hyundai Elantra 2024',
                image: 'https://placehold.co/400x200',
                price: 45,
                rating: 4.9,
                trips: 127,
                features: ['Bluetooth', 'Apple CarPlay', 'Backup camera', 'Keyless entry'],
                specifications: {
                    mpg: '35 combined',
                    doors: 4,
                    seats: 5,
                    fuelType: 'Gas'
                },
                tags: ['rideshare', 'tourist'],
                guidelines: [
                    'No smoking',
                    'Pet friendly',
                    'Clean car upon return',
                    'Replace fuel used'
                ],
                extras: [
                    { name: 'Prepaid refuel', price: 45 },
                    { name: 'Unlimited miles', price: 30 },
                    { name: 'Post-trip cleaning', price: 25 }
                ]
            },
            {
                id: 2,
                name: 'Toyota Camry 2024',
                image: 'https://placehold.co/400x200',
                price: 55,
                rating: 4.8,
                trips: 98,
                features: ['Bluetooth', 'Apple CarPlay', 'Android Auto', 'Lane departure warning'],
                specifications: {
                    mpg: '32 combined',
                    doors: 4,
                    seats: 5,
                    fuelType: 'Gas'
                },
                tags: ['rideshare', 'tourist'],
                guidelines: [
                    'No smoking',
                    'No pets',
                    'Clean car upon return',
                    'Replace fuel used'
                ],
                extras: [
                    { name: 'Prepaid refuel', price: 50 },
                    { name: 'Unlimited miles', price: 35 },
                    { name: 'Post-trip cleaning', price: 30 }
                ]
            },
            {
                id: 3,
                name: 'Tesla Model 3 2023',
                image: 'https://placehold.co/400x200',
                price: 89,
                rating: 5.0,
                trips: 64,
                features: ['Autopilot', 'Premium Audio', 'Supercharger access', 'Glass roof'],
                specifications: {
                    range: '358 miles',
                    doors: 4,
                    seats: 5,
                    fuelType: 'Electric'
                },
                tags: ['luxury', 'tourist'],
                guidelines: [
                    'No smoking',
                    'No pets',
                    'Return with 20% charge minimum',
                    'Sentry mode enabled when parked'
                ],
                extras: [
                    { name: 'Return with low charge', price: 35 },
                    { name: 'Unlimited miles', price: 45 },
                    { name: 'Post-trip cleaning', price: 35 }
                ]
            }
        ],
        address: 'Las Vegas, NV'
    },
    'south-dakota': {
        cars: [
            {
                id: 4,
                name: 'Ford Explorer 2024',
                image: 'https://placehold.co/400x200',
                price: 149,
                rating: 4.7,
                trips: 45,
                features: ['Third Row Seating', '4WD', 'Roof Rack', 'Towing Package'],
                specifications: {
                    mpg: '24 combined',
                    doors: 4,
                    seats: 7,
                    fuelType: 'Gas'
                },
                tags: ['tourist'],
                guidelines: [
                    'No smoking',
                    'Pet friendly',
                    'Clean car upon return',
                    'Replace fuel used'
                ],
                extras: [
                    { name: 'Prepaid refuel', price: 65 },
                    { name: 'Unlimited miles', price: 45 },
                    { name: 'Post-trip cleaning', price: 40 }
                ]
            },
            {
                id: 5,
                name: 'Honda Civic 2024',
                image: 'https://placehold.co/400x200',
                price: 89,
                rating: 4.9,
                trips: 82,
                features: ['Bluetooth', 'Apple CarPlay', 'Android Auto', 'Keyless entry'],
                specifications: {
                    mpg: '36 combined',
                    doors: 4,
                    seats: 5,
                    fuelType: 'Gas'
                },
                tags: ['rideshare'],
                guidelines: [
                    'No smoking',
                    'No pets',
                    'Clean car upon return',
                    'Replace fuel used'
                ],
                extras: [
                    { name: 'Prepaid refuel', price: 45 },
                    { name: 'Unlimited miles', price: 35 },
                    { name: 'Post-trip cleaning', price: 30 }
                ]
            },
            {
                id: 6,
                name: 'Jeep Grand Cherokee 2024',
                image: 'https://placehold.co/400x200',
                price: 179,
                rating: 4.8,
                trips: 38,
                features: ['Premium Audio', '4WD', 'Panoramic Roof', 'Advanced Safety Features'],
                specifications: {
                    mpg: '22 combined',
                    doors: 4,
                    seats: 5,
                    fuelType: 'Gas'
                },
                tags: ['tourist'],
                guidelines: [
                    'No smoking',
                    'Pet friendly with deposit',
                    'Clean car upon return',
                    'Replace fuel used'
                ],
                extras: [
                    { name: 'Prepaid refuel', price: 70 },
                    { name: 'Unlimited miles', price: 50 },
                    { name: 'Post-trip cleaning', price: 45 },
                    { name: 'Pet deposit', price: 100 }
                ]
            }
        ],
        address: 'Rapid City, SD'
    }
};

// Class to handle intro page functionality
class IntroPage {
    constructor() {
        this.engineSound = document.getElementById('engine-sound');
        this.video = document.getElementById('intro-video');
        this.audioPlayed = false;
        this.isVideoPlaying = false;
        this.isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        
        // Ensure video is muted and playsinline for mobile
        if (this.video) {
            this.video.muted = true;
            this.video.setAttribute('playsinline', '');
            this.video.setAttribute('webkit-playsinline', '');
        }
        
        this.initializeIntro();
    }

    async initializeIntro() {
        if (this.video) {
            // Load video first
            await this.loadVideo();
            // Then try to play
            await this.playVideo();
        }
        if (this.engineSound) this.initAudio();
    }

    async loadVideo() {
        return new Promise((resolve) => {
            if (this.video.readyState >= 2) {
                resolve();
            } else {
                this.video.addEventListener('loadeddata', () => resolve());
                this.video.load();
            }
        });
    }

    async playVideo() {
        try {
            // Try immediate autoplay
            await this.video.play();
            this.isVideoPlaying = true;
            console.log('Video autoplayed successfully');
        } catch (error) {
            console.log('Autoplay prevented:', error);
            
            // Add play UI for mobile
            if (this.isMobile) {
                this.addPlayButton();
            } else {
                // For desktop, try on user interaction
                this.addInteractionPlayHandler();
            }
        }
    }

    addPlayButton() {
        // Create a play button overlay
        const playButton = document.createElement('button');
        playButton.className = 'video-play-button';
        playButton.innerHTML = `
            <svg viewBox="0 0 24 24" width="64" height="64">
                <circle cx="12" cy="12" r="11" fill="rgba(0,0,0,0.5)" stroke="#fff" stroke-width="2"/>
                <path d="M9.5 7.5v9l7-4.5-7-4.5z" fill="#fff"/>
            </svg>
        `;
        
        // Add styles
        const style = document.createElement('style');
        style.textContent = `
            .video-play-button {
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                z-index: 1000;
                background: none;
                border: none;
                cursor: pointer;
                padding: 0;
                opacity: 0.8;
                transition: opacity 0.3s;
            }
            .video-play-button:hover {
                opacity: 1;
            }
        `;
        document.head.appendChild(style);

        // Add click handler
        playButton.addEventListener('click', async () => {
            try {
                await this.video.play();
                this.isVideoPlaying = true;
                playButton.remove();
            } catch (error) {
                console.error('Play failed:', error);
            }
        });

        document.body.appendChild(playButton);
    }

    addInteractionPlayHandler() {
        const playOnInteraction = async () => {
            try {
                await this.video.play();
                this.isVideoPlaying = true;
                document.removeEventListener('click', playOnInteraction);
                document.removeEventListener('touchstart', playOnInteraction);
            } catch (error) {
                console.error('Play attempt failed:', error);
            }
        };

        document.addEventListener('click', playOnInteraction);
        document.addEventListener('touchstart', playOnInteraction);
    }

    initAudio() {
        // Ensure audio is loaded
        this.engineSound.load();
        
        // Only try to play audio after video has started
        if (this.isVideoPlaying) {
            this.playAudio();
        } else {
            // Wait for video to play before attempting audio
            this.video.addEventListener('play', () => {
                this.playAudio();
            });
        }
    }

    async playAudio() {
        if (!this.audioPlayed && this.engineSound.readyState >= 2) {
            try {
                this.engineSound.volume = 0;
                await this.engineSound.play();
                this.audioPlayed = true;
                this.fadeInAudio();
            } catch (error) {
                console.log('Audio autoplay prevented:', error);
                // Enable play on user interaction
                if (this.isMobile) {
                    // On mobile, rely on the audio toggle button
                    console.log('Use audio button to enable sound');
                } else {
                    this.addInteractionAudioHandler();
                }
            }
        }
    }

    addInteractionAudioHandler() {
        const playAudioOnInteraction = async () => {
            try {
                await this.playAudio();
                document.removeEventListener('click', playAudioOnInteraction);
                document.removeEventListener('touchstart', playAudioOnInteraction);
            } catch (error) {
                console.error('Audio play attempt failed:', error);
            }
        };

        document.addEventListener('click', playAudioOnInteraction);
        document.addEventListener('touchstart', playAudioOnInteraction);
    }

    fadeInAudio() {
        let vol = 0;
        const fadeIn = setInterval(() => {
            if (vol < 0.7) {
                vol += 0.1;
                this.engineSound.volume = vol;
            } else {
                clearInterval(fadeIn);
            }
        }, 100);
    }

    fadeOutAudio() {
        let vol = this.engineSound.volume;
        const fadeOut = setInterval(() => {
            if (vol > 0) {
                vol -= 0.1;
                this.engineSound.volume = vol;
            } else {
                clearInterval(fadeOut);
                this.engineSound.pause();
                this.engineSound.currentTime = 0;
            }
        }, 50);
    }

    toggleAudio() {
        if (this.engineSound.paused) {
            this.engineSound.volume = 0;
            this.engineSound.play()
                .then(() => {
                    this.audioPlayed = true;
                    this.fadeInAudio();
                })
                .catch(e => console.log('Toggle failed:', e));
        } else {
            this.fadeOutAudio();
        }
    }
}

export { IntroPage };

// Class to handle main site functionality
class MainSite {
    constructor() {
        this.locationSelect = document.getElementById('locationSelect');
        this.carGrid = document.getElementById('carGrid');
        this.locationAddress = document.getElementById('locationAddress');
        this.navToggle = document.getElementById('navToggle');
        this.navMenu = document.querySelector('.nav-menu');
        this.filterButtons = document.querySelectorAll('.filter-btn');
        this.initializeMainSite();
    }

    initializeMainSite() {
        this.setupEventListeners();
        this.setupIntersectionObserver();
        this.updateLocation('las-vegas');
    }

    setupEventListeners() {
        // Mobile Navigation
        this.navToggle?.addEventListener('click', () => {
            this.navMenu.classList.toggle('active');
        });

        // Location Change
        this.locationSelect?.addEventListener('change', (e) => {
            this.updateLocation(e.target.value);
        });

        // Filters
        this.filterButtons?.forEach(button => {
            button.addEventListener('click', () => {
                this.filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                this.handleFilter(button.dataset.filter);
            });
        });

        // Investment CTA
        const investmentCTA = document.querySelector('.investment-cta .btn-primary');
        investmentCTA?.addEventListener('click', () => {
            const contactSection = document.getElementById('contact');
            contactSection?.scrollIntoView({ behavior: 'smooth' });
        });
    }

    setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        });

        document.querySelectorAll('.metric-card').forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            observer.observe(card);
        });
    }

    createCarCard(car) {
        return `
            <div class="car-card" data-tags="${car.tags.join(' ')}">
                <div class="car-image">
                    <img src="${car.image}" alt="${car.name}" loading="lazy">
                    <div class="car-rating">
                        <span class="star">★</span>
                        <span>${car.rating}</span>
                        <span class="trips">(${car.trips} trips)</span>
                    </div>
                    ${car.tags.includes('rideshare') ? 
                        '<div class="rideshare-badge"><svg class="rideshare-icon" width="20" height="20"><use href="#icon-rideshare"></use></svg>Rideshare Ready</div>' 
                        : ''}
                </div>
                <div class="car-details">
                    <h3 class="car-title">${car.name}</h3>
                    <div class="car-specs">
                        ${Object.entries(car.specifications).map(([key, value]) => `
                            <div class="spec-item">
                                <svg class="spec-icon" width="16" height="16">
                                    <use href="#icon-${key.toLowerCase()}"></use>
                                </svg>
                                <span>${value}</span>
                            </div>
                        `).join('')}
                    </div>
                    <div class="car-features">
                        ${car.features.slice(0, 4).map(feature => 
                            `<span class="feature-tag">${feature}</span>`
                        ).join('')}
                    </div>
                    <div class="car-price">
                        <span class="amount">$${car.price}</span>
                        <span class="period">/day</span>
                    </div>
                    <div class="car-guidelines">
                        <h4>Trip Guidelines</h4>
                        <ul>
                            ${car.guidelines.map(guideline => 
                                `<li>${guideline}</li>`
                            ).join('')}
                        </ul>
                    </div>
                    <div class="car-extras">
                        <h4>Available Extras</h4>
                        ${car.extras.map(extra => `
                            <div class="extra-item">
                                <span>${extra.name}</span>
                                <span class="extra-price">$${extra.price}</span>
                            </div>
                        `).join('')}
                    </div>
                    <div class="car-actions">
                        <button class="btn-primary">Book Now</button>
                        <button class="btn-secondary">View Details</button>
                    </div>
                </div>
            </div>
        `;
    }

    updateLocation(location) {
        const locationData = locations[location];
        
        if (this.carGrid) {
            this.carGrid.innerHTML = locationData.cars.map(car => this.createCarCard(car)).join('');
        }

        if (this.locationAddress) {
            const addressText = this.locationAddress.querySelector('p');
            if (addressText) {
                addressText.textContent = locationData.address;
            }
        }
    }

    handleFilter(filter) {
        const cards = document.querySelectorAll('.car-card');
        cards.forEach(card => {
            const tags = card.dataset.tags;
            card.style.display = (filter === 'all' || tags.includes(filter)) ? 'block' : 'none';
        });
    }

    attachBookingHandlers() {
        // Attach handlers to booking buttons
        document.querySelectorAll('.btn-primary').forEach(button => {
            button.addEventListener('click', (e) => {
                const carCard = e.target.closest('.car-card');
                if (carCard) {
                    const carName = carCard.querySelector('.car-title').textContent;
                    this.handleBooking(carName);
                }
            });
        });

        // Attach handlers to view details buttons
        document.querySelectorAll('.btn-secondary').forEach(button => {
            button.addEventListener('click', (e) => {
                const carCard = e.target.closest('.car-card');
                if (carCard) {
                    const carName = carCard.querySelector('.car-title').textContent;
                    this.showCarDetails(carName);
                }
            });
        });
    }

    handleBooking(carName) {
        // TODO: Implement booking functionality
        console.log(`Booking ${carName}`);
    }

    showCarDetails(carName) {
        // TODO: Implement car details modal
        console.log(`Showing details for ${carName}`);
    }
}

// Handle smooth scrolling for all anchor links
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Initialize based on current page
document.addEventListener('DOMContentLoaded', () => {
    // Determine if we're on the intro page or main site
    const isIntroPage = document.querySelector('.video-container') !== null;
    
    // Setup smooth scrolling for both pages
    setupSmoothScroll();

    if (isIntroPage) {
        // Initialize intro page
        window.introPage = new IntroPage();
        // Make toggleAudio available globally for the button
        window.toggleAudio = () => window.introPage.toggleAudio();
    } else {
        // Initialize main site
        window.mainSite = new MainSite();
    }

    // Handle navigation state
    const handleNavState = () => {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    };

    // Add scroll event listener for navbar state
    window.addEventListener('scroll', handleNavState);
    
    // Handle initial navbar state
    handleNavState();
});

// Export for module usage
export { IntroPage, MainSite };