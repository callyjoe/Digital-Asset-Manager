// --- DOM Element Selection ---
const filterBtns = document.querySelectorAll('.filter-btn');
const assetGrid = document.getElementById('asset-grid');
const tagInput = document.getElementById('new-tag-input');
const uploadBtn = document.getElementById('btn-upload');

// --- 1. Filtering Logic ---
function filterAssets(filterCategory) {
    // We grab the cards inside the function so it always includes newly uploaded ones
    const assetCards = document.querySelectorAll('.asset-card');

    assetCards.forEach(card => {
        // Look at the data-category attribute we put in the HTML
        const cardCategory = card.getAttribute('data-category');

        if (filterCategory === 'all' || filterCategory === cardCategory) {
            // Show the card
            card.style.display = 'block'; 
            // Add a tiny animation effect when they reappear
            card.style.animation = 'fadeIn 0.3s ease-in-out';
        } else {
            // Hide the card
            card.style.display = 'none';
        }
    });
}

// Attach click listeners to all filter buttons
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove the 'active' styling class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        
        // Add the 'active' class to the specific button that was clicked
        btn.classList.add('active');
        
        // Find out which category this button represents and run the filter
        const category = btn.getAttribute('data-filter');
        filterAssets(category);
    });
});

// --- 2. Simulate Upload Logic ---
function simulateUpload() {
    const rawTag = tagInput.value.trim();
    
    // Stop the function if the user didn't type anything
    if (rawTag === '') {
        alert('Please enter a tag (e.g., "Promo", "Logo") before uploading.');
        return;
    }

    // Format the tag so it can be used as a data-category (lowercase, no spaces)
    const categorySlug = rawTag.toLowerCase().replace(/[^a-z0-9]/g, '');
    
    // Create a new blank card element
    const newCard = document.createElement('div');
    newCard.className = 'asset-card';
    newCard.setAttribute('data-category', categorySlug);
    
    // Build the HTML that goes inside the new card
    // We use a gray placeholder div instead of an <img> tag so we don't get a broken image icon
    newCard.innerHTML = `
        <div class="image-container">
            <div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background-color: #cbd5e1; color: #475569; font-weight: 600; text-transform: uppercase; font-size: 0.875rem;">
                New Upload
            </div>
        </div>
        <div class="asset-details">
            <span class="tag">${rawTag}</span>
            <h3>Newly Uploaded Asset</h3>
        </div>
    `;

    // Insert this new card at the very beginning of our CSS Grid
    assetGrid.insertBefore(newCard, assetGrid.firstChild);

    // Clear the input field
    tagInput.value = '';

    // UX Trick: Automatically click the "All Assets" button so the user immediately sees their new upload
    document.querySelector('[data-filter="all"]').click();
}

// Listen for clicks on the upload button
uploadBtn.addEventListener('click', simulateUpload);

// Allow the user to press "Enter" on their keyboard to upload
tagInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        simulateUpload();
    }
});