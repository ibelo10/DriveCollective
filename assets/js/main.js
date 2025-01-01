// Location-specific data
const locations = {
    'las-vegas': {
        cars: [
            { id: 1, name: 'Economy Sedan', price: 89, image: 'https://placehold.co/400x200', tags: ['rideshare', 'tourist'] },
            { id: 2, name: 'Mid-Size SUV', price: 129, image: 'https://placehold.co/400x200', tags: ['rideshare', 'tourist'] },
            { id: 3, name: 'Luxury Sedan', price: 199, image: 'https://placehold.co/400x200', tags: ['tourist'] }
        ],
        address: 'Las Vegas, NV'
    },
    'south-dakota': {
        cars: [
            { id: 4, name: 'Full-Size SUV', price: 149, image: 'https://placehold.co/400x200', tags: ['tourist'] },
            { id: 5, name: 'Economy Sedan', price: 89, image: 'https://placehold.co/400x200', tags: ['rideshare'] },
            { id: 6, name: 'Premium SUV', price: 179, image: 'https://placehold.co/400x200', tags: ['tourist'] }
        ],
        address: 'Rapid City, SD'
    }
};

// DOM Elements
const locationSelect = document.getElementById('locationSelect');
const carGrid = document.getElementById('carGrid');
const locationAddress = document.getElementById('locationAddress');
const navToggle = document.getElementById('navToggle');
const navMenu = document.querySelector('.nav-menu');

// Mobile Navigation Toggle
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Update content based on location
function updateLocation(location) {
    // Update car grid
    carGrid.innerHTML = locations[location].cars.map(car => `
        <div class="car-card">
            <img src="${car.image}" alt="${car.name}" class="car-image">
            <div class="car-details">
                <h3>${car.name}</h3>
                <div class="tags">
                    ${car.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
                <p class="price">$${car.price}/day</p>
                <button class="btn-primary">Book Now</button>
            </div>
        </div>
    `).join('');

    // Update address
    locationAddress.querySelector('p').textContent = locations[location].address;
}

// Location change event listener
locationSelect.addEventListener('change', (e) => {
    updateLocation(e.target.value);
});

// Initialize with default location
updateLocation('las-vegas');

// Investment CTA Button Handler
document.querySelector('.investment-cta .btn-primary').addEventListener('click', () => {
    const contactSection = document.getElementById('contact');
    contactSection.scrollIntoView({ behavior: 'smooth' });
});

// Animate metrics on scroll
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