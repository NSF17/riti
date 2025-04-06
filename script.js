// Create randomized heart bursts
function createHeartBurst(x, y, container) {
    const heart = document.createElement('div');
    heart.className = 'heart';
    
    // Random position adjustments
    const randomAngle = Math.random() * Math.PI * 2;
    const randomDistance = Math.random() * 100;
    
    heart.style.left = `${x}px`;
    heart.style.top = `${y}px`;
    
    // Add random movement
    heart.style.transform = `translate(
        ${Math.cos(randomAngle) * randomDistance}px, 
        ${Math.sin(randomAngle) * randomDistance}px
    )`;
    
    container.appendChild(heart);
    
    setTimeout(() => heart.remove(), 1000);
}

// Continuous heart burst animation
function startHeartBurst() {
    const container = document.querySelector('.container');
    const button = document.getElementById('yesButton');
    const rect = button.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    // Create hearts at random positions around the button
    const heartInterval = setInterval(() => {
        const angle = Math.random() * Math.PI * 2;
        const radius = 80;
        const centerX = button.offsetLeft + button.offsetWidth / 2;
        const centerY = button.offsetTop + button.offsetHeight / 2;
        
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
        
        createHeartBurst(x, y, container);
    }, 100);

    return heartInterval;
}

// Create hearts on button hover
document.getElementById('yesButton').addEventListener('mousemove', function(e) {
    const heart = document.createElement('div');
    heart.className = 'heart';
    
    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    heart.style.left = `${x}px`;
    heart.style.top = `${y}px`;
    
    this.appendChild(heart);
    
    setTimeout(() => heart.remove(), 1000);
});

// Function to handle navigation to the next page
function nextPage() {
    const button = document.getElementById('yesButton');
    const heartInterval = startHeartBurst();
    
    // Add wiggle animation
    button.classList.add('wiggle');
    
    // Create large burst of hearts
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.className = 'heart';
            
            const angle = (i / 20) * Math.PI * 2;
            const radius = 100;
            const x = button.offsetWidth / 2 + Math.cos(angle) * radius;
            const y = button.offsetHeight / 2 + Math.sin(angle) * radius;
            
            heart.style.left = `${x}px`;
            heart.style.top = `${y}px`;
            
            button.appendChild(heart);
        }, i * 50);
    }
    
    // Navigate after animation
    setTimeout(() => {
        clearInterval(heartInterval);
        window.location.href = 'yes.html';
    }, 1000);
}

// Remove wiggle class after animation ends
document.getElementById('yesButton').addEventListener('animationend', function() {
    this.classList.remove('wiggle');
});