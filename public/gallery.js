const eventButtons = document.querySelectorAll('.event-btn');
const galleryContainer = document.querySelector('.gallery-slideshow');
let currentEvent = 'annual-day';
let pictures = {}; // This will hold event images from backend
let currentIndex = 0;

function showImages(event) {
    const images = pictures[event] || [];
    if (images.length === 0) {
        galleryContainer.innerHTML = '<p>No images available for this event.</p>';
        return;
    }
    const visibleImages = images.slice(currentIndex, currentIndex + 3);
    galleryContainer.innerHTML = visibleImages.map(src => `
        <img src="${src}" class="gallery-image" />
    `).join('');
}

function rotateImages() {
    const images = pictures[currentEvent] || [];
    if (images.length === 0) return;

    currentIndex = (currentIndex + 1) % images.length;
    showImages(currentEvent);
}

// Event button click handler
eventButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        currentEvent = btn.dataset.event;
        currentIndex = 0;
        showImages(currentEvent);
    });
});

// Auto-rotate every 3 seconds
setInterval(() => {
    rotateImages();
}, 3000);

// View All button
document.getElementById('viewAllBtn').addEventListener('click', () => {
    window.location.href = '/gallery';
});

// Fetch pictures from backend API
fetch('/api/gallery')
    .then(res => res.json())
    .then(data => {
        console.log('Fetched gallery data:', data); // Debugging
        pictures = data;
        showImages(currentEvent);
    })
    .catch(err => {
        console.error('Failed to load gallery data:', err);
        galleryContainer.innerHTML = '<p>Error loading gallery.</p>';
    });
