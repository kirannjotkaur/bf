// Initial stats
let hunger = 100;
let happiness = 100;
let health = 100;

// Buttons (fixed the IDs)
const feedBtn = document.getElementById('feed-btn');  // Corrected
const playBtn = document.getElementById('play-btn');  // Corrected
const healBtn = document.getElementById('heal-btn');  // Corrected

// Stats Display
const hungerDisplay = document.getElementById('hunger');
const happinessDisplay = document.getElementById('happiness');
const healthDisplay = document.getElementById('health');

// Pet Image
const petImage = document.getElementById('pet');

// Status Alert
const statusAlert = document.getElementById('status-alert');

// Decrease stats over time (simulating hunger, happiness, health depletion)
setInterval(() => {
  hunger = Math.max(0, hunger - 1);
  happiness = Math.max(0, happiness - 1);
  health = Math.max(0, health - 1);

  // Check if stats are low and alert
  checkStatusAlert();

  updateStats();
}, 1000);

// Update stats on the UI
function updateStats() {
  hungerDisplay.textContent = hunger;
  happinessDisplay.textContent = happiness;
  healthDisplay.textContent = health;
}

// Check if stats are low and display alert
function checkStatusAlert() {
  let alertMessage = '';

  if (hunger <= 20) {
    alertMessage += 'Your pet is hungry! Feed it soon.\n';
  }
  if (happiness <= 20) {
    alertMessage += 'Your pet is sad! Play with it.\n';
  }
  if (health <= 20) {
    alertMessage += 'Your pet is sick! Heal it.\n';
  }

  if (alertMessage) {
    showAlert(alertMessage);
  } else {
    statusAlert.textContent = ''; // Clear alert if all is well
  }
}

// Display alert
function showAlert(message) {
  statusAlert.innerHTML = message.trim().replace(/\n/g, '<br>');
}

// Actions
feedBtn.addEventListener('click', () => {
  hunger = Math.min(100, hunger + 20);
  playAnimation('feed');
  playSound('feed');
  updateStats();
});

playBtn.addEventListener('click', () => {
  happiness = Math.min(100, happiness + 20);
  playAnimation('play');
  playSound('play');
  updateStats();
});

healBtn.addEventListener('click', () => {
  health = Math.min(100, health + 20);
  playAnimation('heal');
  playSound('heal');
  updateStats();
});

// Animations (switch pet images for corresponding actions)
function playAnimation(action) {
  let animationDuration = 15000; // Default 1 second duration

  if (action === 'feed') {
    petImage.src = 'eating.gif';
  } else if (action === 'play') {
    petImage.src = 'playing.gif';
  } else if (action === 'heal') {
    petImage.src = 'healing.gif';
  }

  // Get the GIF duration (optional: read the GIF's duration from its properties, or assume fixed duration)
  setTimeout(() => petImage.src = 'bubududu.gif', animationDuration);
}

