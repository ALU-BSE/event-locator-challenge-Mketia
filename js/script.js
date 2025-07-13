const eventData = [
  {
    id: 1,
    name: "Tech Conference 2025",
    date: "2025-08-15",
    time: "09:00",
    location: "Kigali Convention Centre",
    category: "technology",
    description: "Annual conference on AI, blockchain, and more.",
    price: "$50",
    image: "images/pic1.jpg"
  },
  {
    id: 2,
    name: "Music Festival",
    date: "2025-07-20",
    time: "18:00",
    location: "Amahoro Stadium",
    category: "music",
    description: "Three-day music festival with local and international artists.",
    price: "$25",
    image: "images/concert.jpg"
  },
  {
    id: 3,
    name: "Art Exhibition",
    date: "2025-07-25",
    time: "10:00",
    location: "Kigali Art Gallery",
    category: "art",
    description: "Contemporary art from emerging African artists.",
    price: "Free",
    image: "images/art.jpg"
  }
];

// Utils
const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);
const formatDate = dateStr => new Date(dateStr).toLocaleDateString("en-US", {
  year: 'numeric', month: 'long', day: 'numeric'
});
const truncate = (str, len) => str.length > len ? str.slice(0, len) + '...' : str;

// ==================== index.html ====================
function loadHomePage() {
  const featuredEventsContainer = document.getElementById("featuredEvents");
  const searchInput = document.getElementById("searchInput");
  const categoryFilter = document.getElementById("categoryFilter");
  const dateFilter = document.getElementById("dateFilter");
  const searchForm = document.getElementById("searchForm");
  const eventContainer = document.getElementById("eventContainer");

  function filterAndDisplay() {
    const term = searchInput.value.toLowerCase();
    const category = categoryFilter.value;
    const date = dateFilter.value;

    const filtered = eventData.filter(e => {
      const matchSearch = e.name.toLowerCase().includes(term) ||
        e.description.toLowerCase().includes(term) ||
        e.location.toLowerCase().includes(term);
      const matchCategory = !category || e.category === category;
      const matchDate = !date || e.date === date;
      return matchSearch && matchCategory && matchDate;
    });

    if (eventContainer) {
      if (filtered.length === 0) {
        eventContainer.innerHTML = '<div class="col-12"><p class="text-danger">No events found matching your search.</p></div>';
      } else {
        displayEvents(filtered, eventContainer);
      }
    } else {
      displayEvents(filtered, featuredEventsContainer);
    }
  }

  if (searchForm) {
    searchForm.addEventListener("submit", (e) => {
      e.preventDefault();
      filterAndDisplay();
    });
  }

  displayEvents(eventData, featuredEventsContainer);
}

// ==================== events.html ====================
function loadEventsPage() {
  const searchBox = document.getElementById("searchEvents");
  const category = document.getElementById("filterCategory");
  const date = document.getElementById("filterDate");
  const clearBtn = document.getElementById("clearFilters");
  const container = document.getElementById("eventsContainer");
  const noMsg = document.getElementById("noEventsMessage");

  function filterEvents() {
    const term = searchBox.value.toLowerCase();
    const cat = category.value.toLowerCase();
    const selectedDate = date.value;

    const filtered = eventData.filter(e => {
      const matchSearch = e.name.toLowerCase().includes(term) || e.location.toLowerCase().includes(term);
      const matchCategory = !cat || e.category === cat;
      const matchDate = !selectedDate || e.date === selectedDate;
      return matchSearch && matchCategory && matchDate;
    });

    if (filtered.length === 0) {
      container.innerHTML = '';
      noMsg.style.display = 'block';
    } else {
      displayEvents(filtered, container);
      noMsg.style.display = 'none';
    }
  }

  if (searchBox) searchBox.addEventListener("input", filterEvents);
  if (category) category.addEventListener("change", filterEvents);
  if (date) date.addEventListener("change", filterEvents);
  if (clearBtn) clearBtn.addEventListener("click", () => {
    searchBox.value = '';
    category.value = '';
    date.value = '';
    filterEvents();
  });

  displayEvents(eventData, container);
}

//  event-details.html
function loadEventDetailsPage() {
  const detailsContainer = document.getElementById("eventDetailsContainer");

  // Simulate selecting an event (in real app this should come from URL param or storage)
  const eventId = new URLSearchParams(window.location.search).get("id") || "1";
  const event = eventData.find(e => e.id.toString() === eventId);

  if (!event) {
    detailsContainer.innerHTML = "<p class='text-danger'>Event not found.</p>";
    return;
  }

  detailsContainer.innerHTML = `
    <div class="col-md-6">
      <img src="${event.image}" class="img-fluid rounded" alt="${event.name}">
    </div>
    <div class="col-md-6">
      <h2>${event.name}</h2>
      <p class="text-muted">${formatDate(event.date)} at ${event.time}</p>
      <p><strong>Location:</strong> ${event.location}</p>
      <p><strong>Category:</strong> ${capitalize(event.category)}</p>
      <p><strong>Price:</strong> ${event.price}</p>
      <p>${event.description}</p>
      <button class="btn btn-primary mt-3">Book Now</button>
    </div>
  `;
}

// ==================== Shared ====================
function displayEvents(events, container) {
  container.innerHTML = events.map(event => `
    <div class="col-md-6 col-lg-4 mb-4">
      <div class="card h-100 shadow-sm">
        <img src="${event.image}" class="card-img-top" alt="${event.name}">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${event.name}</h5>
          <p class="text-muted small">
            <i class="fas fa-calendar"></i> ${formatDate(event.date)} at ${event.time}<br>
            <i class="fas fa-map-marker-alt"></i> ${event.location}<br>
            <i class="fas fa-tag"></i> ${capitalize(event.category)}
          </p>
          <p>${truncate(event.description, 100)}</p>
          <div class="mt-auto d-flex justify-content-between align-items-center">
            <span class="badge bg-primary">${event.price}</span>
            <a href="event-details.html?id=${event.id}" class="btn btn-outline-primary btn-sm">View Details</a>
          </div>
        </div>
      </div>
    </div>
  `).join('');
}

document.addEventListener("DOMContentLoaded", () => {
  const page = window.location.pathname;
  if (page.includes("index.html")) loadHomePage();
  else if (page.includes("events.html")) loadEventsPage();
  else if (page.includes("event-details.html")) loadEventDetailsPage();
});
