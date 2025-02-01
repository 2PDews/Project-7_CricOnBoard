// Handle Floating Action Button (FAB) and Pop-up behavior
const fab = document.getElementById('fab');
const popup = document.getElementById('popup');
const closePopupBtn = document.getElementById('close-popup-btn');

// Open pop-up when FAB is clicked
fab.addEventListener('click', () => {
    popup.style.display = 'flex'; // Ensure the popup becomes visible
});

// Close pop-up when the close icon is clicked
closePopupBtn.addEventListener('click', () => {
    popup.style.display = 'none'; // Hide the popup
});

// Close pop-up by clicking outside the content area
popup.addEventListener('click', (e) => {
    if (e.target === popup) {
        popup.style.display = 'none';
    }
});

// Handle redirection on button clicks
document.getElementById('create-tournament-btn').addEventListener('click', () => {
    window.location.href = 'CreateTournament.html'; // Redirect to Create Tournament page
});



// JavaScript for Tournament.js
document.addEventListener("DOMContentLoaded", () => {
    const tournamentInfoContainer = document.getElementById('tournament-info-container');

    // Retrieve the tournaments from localStorage
    const tournaments = JSON.parse(localStorage.getItem('tournaments')) || [];

    // Clear any previous tournament listings
    tournamentInfoContainer.innerHTML = '';

    // Loop through the tournaments and display them numerically
    tournaments.forEach((tournament, index) => {
        const tournamentDiv = document.createElement('div');
        tournamentDiv.classList.add('tournament-item');
        
        // Create the tournament display
        tournamentDiv.innerHTML = `
            <div class="tournament-name">Tournament ${index + 1}: ${tournament}</div>
            <button class="continue-btn" onclick="continueTournament(${index})">Continue</button>
        `;
        
        tournamentInfoContainer.appendChild(tournamentDiv);
    });
});

// Function to handle the "Continue" button click
function continueTournament(index) {
    // You can redirect to another page or load more tournament details
    // For example, redirecting to a tournament details page:
    alert('Continuing to tournament ' + (index + 1));
    // window.location.href = 'TournamentDetails.html'; // Uncomment this to redirect to tournament details page
}
