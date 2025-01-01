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

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Cache DOM elements
    const locationSelect = document.getElementById('locationSelect');
    const carGrid = document.getElementById('carGrid');
    const locationAddress = document.getElementById('locationAddress');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.querySelector('.nav-menu');
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    // Mobile Navigation Toggle
    navToggle?.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Create card HTML helper function
    function createCarCard(car) {
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

    // Update location content
    function updateLocation(location) {
        const locationData = locations[location];
        
        // Update car grid
        if (carGrid) {
            carGrid.innerHTML = locationData.cars.map(createCarCard).join('');
        }

        // Update location address
        if (locationAddress) {
            const addressText = locationAddress.querySelector('p');
            if (addressText) {
                addressText.textContent = locationData.address;
            }
        }
    }

    // Filter functionality
    function handleFilter(filter) {
        const cards = document.querySelectorAll('.car-card');
        cards.forEach(card => {
            const tags = card.dataset.tags;
            card.style.display = (filter === 'all' || tags.includes(filter)) ? 'block' : 'none';
        });
    }

    // Event Listeners
    locationSelect?.addEventListener('change', (e) => {
        updateLocation(e.target.value);
    });

    filterButtons?.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            handleFilter(button.dataset.filter);
        });
    });

    // Investment CTA functionality
    const investmentCTA = document.querySelector('.investment-cta .btn-primary');
    investmentCTA?.addEventListener('click', () => {
        const contactSection = document.getElementById('contact');
        contactSection?.scrollIntoView({ behavior: 'smooth' });
    });

    // Metrics animation
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.metric-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });

    // Initialize with default location
    updateLocation('las-vegas');
});