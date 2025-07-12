// Event Locator JavaScript - Complete Implementation

// Sample event data
const eventsData = [
    {
        id: 1,
        name: "Summer Music Festival",
        date: "2025-07-25",
        time: "18:00",
        location: "Central Park Amphitheater",
        category: "music",
        description: "Join us for an incredible evening of live music featuring local and international artists. Experience the best of summer entertainment with food trucks, drinks, and amazing performances.",
        price: "$45",
        organizer: "Music Events Co.",
        image: "https://via.placeholder.com/400x250?text=Summer+Music+Festival"
    },
    {
        id: 2,
        name: "Tech Innovation Conference",
        date: "2025-08-15",
        time: "09:00",
        location: "Convention Center Hall A",
        category: "technology",
        description: "Discover the latest trends in technology and innovation. Network with industry leaders, attend workshops, and learn about cutting-edge developments in AI, blockchain, and more.",
        price: "$120",
        organizer: "TechHub Events",
        image: "https://via.placeholder.com/400x250?text=Tech+Conference"
    },
    {
        id: 3,
        name: "Food & Wine Tasting",
        date: "2025-07-30",
        time: "19:00",
        location: "Riverside Restaurant",
        category: "food",
        description: "Indulge in a curated selection of gourmet dishes paired with fine wines. Meet local chefs, learn about culinary techniques, and enjoy an unforgettable dining experience.",
        price: "$85",
        organizer: "Culinary Arts Society",
        image: "https://via.placeholder.com/400x250?text=Food+Wine+Tasting"
    },
    {
        id: 4,
        name: "Art Gallery Opening",
        date: "2025-08-05",
        time: "17:00",
        location: "Modern Art Museum",
        category: "art",
        description: "Experience contemporary art from emerging and established artists. This exclusive opening features interactive installations, paintings, and sculptures that challenge conventional boundaries.",
        price: "Free",
        organizer: "Modern Art Museum",
        image: "https://via.placeholder.com/400x250?text=Art+Gallery"
    },
    {
        id: 5,
        name: "Business Networking Mixer",
        date: "2025-08-20",
        time: "18:30",
        location: "Downtown Business Center",
        category: "business",
        description: "Connect with fellow professionals, entrepreneurs, and business leaders. Expand your network, share ideas, and discover new opportunities in a relaxed, professional environment.",
        price: "$25",
        organizer: "Business Network Alliance",
        image: "https://via.placeholder.com/400x250?text=Business+Networking"
    },
    {
        id: 6,
        name: "Jazz Under the Stars",
        date: "2025-08-10",
        time: "20:00",
        location: "Rooftop Lounge",
        category: "music",
        description: "Enjoy smooth jazz performances under the night sky. Featuring renowned jazz musicians, craft cocktails, and a sophisticated atmosphere perfect for music lovers.",
        price: "$35",
        organizer: "Jazz Society",
        image: "https://via.placeholder.com/400x250?text=Jazz+Night"
    },
    {
        id: 7,
        name: "Startup Pitch Competition",
        date: "2025-09-01",
        time: "14:00",
        location: "Innovation Hub",
        category: "business",
        description: "Watch innovative startups pitch their ideas to investors and industry experts. Witness the future of business and technology as entrepreneurs compete for funding and mentorship.",
        price: "$15",
        organizer: "Startup Incubator",
        image: "https://via.placeholder.com/400x250?text=Startup+Pitch"
    },
    {
        id: 8,
        name: "Outdoor Movie Night",
        date: "2025-07-28",
        time: "21:00",
        location: "City Park",
        category: "entertainment",
        description: "Bring your blankets and enjoy a classic movie under the stars. Family-friendly event with popcorn, snacks, and a great community atmosphere.",
        price: "Free",
        organizer: "City Recreation Department",
        image: "https://via.placeholder.com/400x250?text=Movie+Night"
    }
];

// Global variables
let filteredEvents = [...eventsData];
let currentPage = 1;
const eventsPerPage = 6;

// Utility functions
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
}

function formatTime(timeString) {
    const time = new Date(`2000-01-01T${timeString}`);
    return time.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit', 
        hour12: true 
    });
}

function getEventById(id) {
    return eventsData.find(event => event.id === parseInt(id));
}

// Debounce function for search input
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Search and filter functionality
function filterEvents() {
    const searchTerm = document.getElementById('searchInput')?.value.toLowerCase() || '';
    const dateFilter = document.getElementById('dateFilter')?.value || '';
    const categoryFilter = document.getElementById('categoryFilter')?.value || '';

    filteredEvents = eventsData.filter(event => {
        const matchesSearch = event.name.toLowerCase().includes(searchTerm) ||
                            event.location.toLowerCase().includes(searchTerm) ||
                            event.description.toLowerCase().includes(searchTerm);
        
        const matchesDate = !dateFilter || event.date === dateFilter;
        const matchesCategory = !categoryFilter || event.category === categoryFilter;
        
        return matchesSearch && matchesDate && matchesCategory;
    });

    currentPage = 1;
    displayEvents();
    updatePagination();
}

// Event display functions
function createEventCard(event) {
    return `
        <div class="col-md-6 col-lg-4 mb-4">
            <div class="card h-100 shadow-sm event-card">
                <img src="${event.image}" class="card-img-top" alt="${event.name}" style="height: 200px; object-fit: cover;">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${event.name}</h5>
                    <p class="card-text flex-grow-1">${event.description.substring(0, 100)}...</p>
                    <div class="event-details mt-auto">
                        <p class="mb-1"><i class="fas fa-calendar-alt"></i> ${formatDate(event.date)}</p>
                        <p class="mb-1"><i class="fas fa-clock"></i> ${formatTime(event.time)}</p>
                        <p class="mb-1"><i class="fas fa-map-marker-alt"></i> ${event.location}</p>
                        <p class="mb-2"><i class="fas fa-tag"></i> ${event.category.charAt(0).toUpperCase() + event.category.slice(1)}</p>
                        <p class="mb-3"><strong>Price: ${event.price}</strong></p>
                        <a href="event-details.html?id=${event.id}" class="btn btn-primary">View Details</a>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function displayEvents() {
    const eventsContainer = document.getElementById('eventsContainer');
    if (!eventsContainer) return;

    const startIndex = (currentPage - 1) * eventsPerPage;
    const endIndex = startIndex + eventsPerPage;
    const eventsToShow = filteredEvents.slice(startIndex, endIndex);

    if (eventsToShow.length === 0) {
        eventsContainer.innerHTML = `
            <div class="col-12">
                <div class="alert alert-info text-center" role="alert">
                    <h4>No events found</h4>
                    <p>Try adjusting your search criteria or filters.</p>
                </div>
            </div>
        `;
        return;
    }

    eventsContainer.innerHTML = eventsToShow.map(createEventCard).join('');
}

// Pagination
function updatePagination() {
    const paginationContainer = document.getElementById('paginationContainer');
    if (!paginationContainer) return;

    const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);
    
    if (totalPages <= 1) {
        paginationContainer.innerHTML = '';
        return;
    }

    let paginationHTML = '<nav aria-label="Events pagination"><ul class="pagination justify-content-center">';
    
    // Previous button
    paginationHTML += `
        <li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
            <button class="page-link" onclick="changePage(${currentPage - 1})" ${currentPage === 1 ? 'disabled' : ''}>
                Previous
            </button>
        </li>
    `;
    
    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
        paginationHTML += `
            <li class="page-item ${i === currentPage ? 'active' : ''}">
                <button class="page-link" onclick="changePage(${i})">${i}</button>
            </li>
        `;
    }
    
    // Next button
    paginationHTML += `
        <li class="page-item ${currentPage === totalPages ? 'disabled' : ''}">
            <button class="page-link" onclick="changePage(${currentPage + 1})" ${currentPage === totalPages ? 'disabled' : ''}>
                Next
            </button>
        </li>
    `;
    
    paginationHTML += '</ul></nav>';
    paginationContainer.innerHTML = paginationHTML;
}

function changePage(newPage) {
    const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);
    if (newPage >= 1 && newPage <= totalPages) {
        currentPage = newPage;
        displayEvents();
        updatePagination();
        // Scroll to top of events container
        document.getElementById('eventsContainer')?.scrollIntoView({ behavior: 'smooth' });
    }
}

// Event details page functionality
function displayEventDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const eventId = urlParams.get('id');
    
    if (!eventId) {
        document.getElementById('eventDetailsContainer').innerHTML = `
            <div class="alert alert-warning" role="alert">
                <h4>Event not found</h4>
                <p>The requested event could not be found.</p>
                <a href="events.html" class="btn btn-primary">Back to Events</a>
            </div>
        `;
        return;
    }

    const event = getEventById(eventId);
    
    if (!event) {
        document.getElementById('eventDetailsContainer').innerHTML = `
            <div class="alert alert-warning" role="alert">
                <h4>Event not found</h4>
                <p>The requested event could not be found.</p>
                <a href="events.html" class="btn btn-primary">Back to Events</a>
            </div>
        `;
        return;
    }

    document.getElementById('eventDetailsContainer').innerHTML = `
        <div class="row">
            <div class="col-md-8">
                <img src="${event.image}" class="img-fluid rounded mb-4" alt="${event.name}">
                <h1>${event.name}</h1>
                <p class="lead">${event.description}</p>
                
                <h3>Event Details</h3>
                <ul class="list-unstyled">
                    <li><strong><i class="fas fa-calendar-alt"></i> Date:</strong> ${formatDate(event.date)}</li>
                    <li><strong><i class="fas fa-clock"></i> Time:</strong> ${formatTime(event.time)}</li>
                    <li><strong><i class="fas fa-map-marker-alt"></i> Location:</strong> ${event.location}</li>
                    <li><strong><i class="fas fa-tag"></i> Category:</strong> ${event.category.charAt(0).toUpperCase() + event.category.slice(1)}</li>
                    <li><strong><i class="fas fa-user"></i> Organizer:</strong> ${event.organizer}</li>
                </ul>
            </div>
            <div class="col-md-4">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Event Information</h5>
                        <p class="card-text"><strong>Price:</strong> ${event.price}</p>
                        <p class="card-text"><strong>Category:</strong> ${event.category.charAt(0).toUpperCase() + event.category.slice(1)}</p>
                        <p class="card-text"><strong>Organizer:</strong> ${event.organizer}</p>
                        <div class="d-grid gap-2">
                            <button class="btn btn-primary" onclick="alert('Registration functionality would be implemented here')">
                                Register Now
                            </button>
                            <button class="btn btn-outline-secondary" onclick="shareEvent()">
                                Share Event
                            </button>
                            <a href="events.html" class="btn btn-outline-primary">Back to Events</a>
                        </div>
                    </div>
                </div>
                
                <div class="card mt-3">
                    <div class="card-body">
                        <h5 class="card-title">Similar Events</h5>
                        <div id="similarEvents">
                            ${getSimilarEvents(event).map(similarEvent => `
                                <div class="mb-2">
                                    <a href="event-details.html?id=${similarEvent.id}" class="text-decoration-none">
                                        <small>${similarEvent.name}</small>
                                    </a>
                                    <br>
                                    <small class="text-muted">${formatDate(similarEvent.date)}</small>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function getSimilarEvents(currentEvent) {
    return eventsData
        .filter(event => event.id !== currentEvent.id && event.category === currentEvent.category)
        .slice(0, 3);
}

function shareEvent() {
    const urlParams = new URLSearchParams(window.location.search);
    const eventId = urlParams.get('id');
    const event = getEventById(eventId);
    
    if (navigator.share) {
        navigator.share({
            title: event.name,
            text: event.description,
            url: window.location.href
        });
    } else {
        // Fallback for browsers that don't support Web Share API
        const shareUrl = window.location.href;
        navigator.clipboard.writeText(shareUrl).then(() => {
            alert('Event URL copied to clipboard!');
        }).catch(() => {
            alert('Share this event: ' + shareUrl);
        });
    }
}

// Home page featured events
function displayFeaturedEvents() {
    const featuredContainer = document.getElementById('featuredEventsContainer');
    if (!featuredContainer) return;

    const featuredEvents = eventsData.slice(0, 3);
    featuredContainer.innerHTML = featuredEvents.map(createEventCard).join('');
}

// Initialize application
function initializeApp() {
    const currentPath = window.location.pathname;
    
    if (currentPath.includes('events.html')) {
        setupEventListeners();
        displayEvents();
        updatePagination();
    } else if (currentPath.includes('event-details.html')) {
        displayEventDetails();
    } else {
        setupEventListeners();
        displayFeaturedEvents();
    }
}

function setupEventListeners() {
    // Search input listener
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', debounce(filterEvents, 300));
    }

    // Filter listeners
    const dateFilter = document.getElementById('dateFilter');
    if (dateFilter) {
        dateFilter.addEventListener('change', filterEvents);
    }

    const categoryFilter = document.getElementById('categoryFilter');
    if (categoryFilter) {
        categoryFilter.addEventListener('change', filterEvents);
    }

    // Search form submission
    const searchForm = document.getElementById('searchForm');
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
                window.location.href = 'events.html';
            } else {
                filterEvents();
            }
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeApp);

// Make functions available globally for onclick handlers
window.changePage = changePage;
window.shareEvent = shareEvent;