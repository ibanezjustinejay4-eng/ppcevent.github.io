// --- JAVASCRIPT LOGIC ---

// 1. Initial Data (Simulating a database)
let events = [
  {
    id: 1,
    title: "Sunday Service",
    date: "2024-11-10",
    image: "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    description: "Join us for our weekly worship service."
  },
  {
    id: 2,
    title: "Youth Camp",
    date: "2024-12-05",
    image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    description: "An exciting weekend of fellowship and learning."
  }
];

// 2. Admin Credentials (For demo purposes)
const ADMIN_USERNAME = "ppc";
const ADMIN_PASSWORD = "ppc123";

// 3. Admin Mode Logic
let isAdmin = false;

function openLoginModal() {
  document.getElementById('loginModal').style.display = "block";
  document.getElementById('loginError').style.display = "none";
}

function closeLoginModal() {
  document.getElementById('loginModal').style.display = "none";
  document.getElementById('loginForm').reset();
  document.getElementById('loginError').style.display = "none";
}

function handleLogin(e) {
  e.preventDefault();
  
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const errorMsg = document.getElementById('loginError');

  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    isAdmin = true;
    closeLoginModal();
    
    // Update UI
    const btn = document.getElementById('adminToggleBtn');
    const postBtn = document.getElementById('postBtn');
    
    btn.textContent = "Logout Admin";
    btn.style.backgroundColor = "#e74c3c";
    postBtn.style.display = "inline-block";
    
    alert("Login successful! You are now in Admin Mode.");
    renderEvents();
  } else {
    errorMsg.style.display = "block";
  }
}

function toggleAdminMode() {
  if (isAdmin) {
    isAdmin = false;
    const btn = document.getElementById('adminToggleBtn');
    const postBtn = document.getElementById('postBtn');
    
    btn.textContent = "Login as Admin";
    btn.style.backgroundColor = "transparent";
    postBtn.style.display = "none";
    
    alert("You have logged out. You are now in User Mode.");
    renderEvents();
  }
}

// 4. Render Events Function
function renderEvents() {
  const container = document.getElementById('event-Container');
  container.innerHTML = ""; // Clear current content

  events.forEach(event => {
    const card = document.createElement('div');
    card.className = 'event-card';
    
    // Create HTML for the card
    card.innerHTML = `
      <button class="delete-btn" onclick="deleteEvent(${event.id})" style="display: ${isAdmin ? 'block' : 'none'}">Delete</button>
      <div class="event-image-container" onclick="openLightbox('${event.image}')">
        <img src="${event.image}" alt="${event.title}">
      </div>
      <div class="event-details">
        <span class="event-date">${event.date}</span>
        <h3 class="event-title">${event.title}</h3>
        <p class="event-desc">${event.description}</p>
      </div>
    `;
    container.appendChild(card);
  });
}

// 5. Delete Event Function
function deleteEvent(id) {
  if(confirm("Are you sure you want to delete this event?")) {
    events = events.filter(event => event.id !== id);
    renderEvents();
  }
}

// 6. Handle Form Submit (Add Event) - FIXED
function handleFormSubmit(e) {
  e.preventDefault();
  
  const title = document.getElementById('eventTitle').value;
  const date = document.getElementById('eventDate').value;
  const imageInput = document.getElementById('eventImage');
  const desc = document.getElementById('eventDesc').value;

  // Check if a file was selected
  if (imageInput.files && imageInput.files[0]) {
    const reader = new FileReader();
    
    // When the file is read, convert it to a data URL (base64)
    reader.onload = function(e) {
      const imageSrc = e.target.result;

      const newEvent = {
        id: Date.now(),
        title: title,
        date: date,
        image: imageSrc,
        description: desc
      };

      events.push(newEvent);
      renderEvents();
      closeModal();
      document.getElementById('eventForm').reset();
      alert("Event published successfully!");
    };
    
    // Read the file as a Data URL
    reader.readAsDataURL(imageInput.files[0]);
  } else {
    alert("Please select an image file.");
  }
}

// 7. Modal Controls
function openModal() {
  document.getElementById('postModal').style.display = "block";
}

function closeModal() {
  document.getElementById('postModal').style.display = "none";
}

// Close modal if clicking outside content
window.onclick = function(event) {
  const postModal = document.getElementById('postModal');
  const loginModal = document.getElementById('loginModal');
  
  if (event.target == postModal) {
    postModal.style.display = "none";
  }
  if (event.target == loginModal) {
    loginModal.style.display = "none";
  }
}

// 8. Lightbox Controls (Image Viewer)
function openLightbox(src) {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  
  lightboxImg.src = src;
  lightbox.style.display = "block";
}

function closeLightbox() {
  const lightbox = document.getElementById('lightbox');
  lightbox.style.display = "none";
}

// Initialize events on page load
window.onload = function() {
  renderEvents();
};