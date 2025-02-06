
// Handle redirection on button clicks
document.getElementById('create-tournament-btn').addEventListener('click', () => {
    window.location.href = 'CreateTournament.html'; // Redirect to Create Tournament page
});

document.getElementById('follow-tournament-btn').addEventListener('click', () => {
    alert('You are following a tournament.');
    // You can implement more functionality here if needed.
});

// Function to continue tournament (redirection or any further logic)
function continueTournament(index) {
    const tournaments = JSON.parse(localStorage.getItem('tournaments')) || [];
    const tournament = tournaments[index];
    
    // You can implement further logic here, like redirecting to a tournament page with the specific tournament data
    alert(`Continuing Tournament: ${tournament}`);
    // Example: window.location.href = `TournamentPage.html?name=${tournament}`;
}




        document.addEventListener("DOMContentLoaded", function () {
            const tournamentName = localStorage.getItem("tournamentName") || "Tournament";
            document.getElementById("tournamentName").textContent = tournamentName;
        });

        // Redirect to StartTournament.html while preserving data
        document.getElementById("continueButton").addEventListener("click", function () {
            window.location.href = "StartTournament.html";
        });

        document.addEventListener("DOMContentLoaded", () => {
            const tournamentContainer = document.getElementById("tournament-info-container");
            const tournaments = JSON.parse(localStorage.getItem("tournamentData")) || [];
        
            if (tournaments.length === 0) {
                tournamentContainer.innerHTML = "<p>No tournaments available. Create one!</p>";
            } else {
                tournamentContainer.innerHTML = ""; // Clear previous listings
        
                tournaments.forEach((tournament, index) => {
                    const tournamentDiv = document.createElement("div");
                    tournamentDiv.classList.add("tournament-item");
        
                    tournamentDiv.innerHTML = `
                        <p><strong>Sr. No:</strong> ${index + 1}</p>
                        <p><strong>League Name:</strong> ${tournament.name}</p>
                        <button class="continue-btn" data-id="${tournament.id}">Continue Tournament</button>
                    `;
                    tournamentContainer.appendChild(tournamentDiv);
                });
            }
        
            // Continue Tournament button click logic
            document.querySelectorAll(".continue-btn").forEach(button => {
                button.addEventListener("click", (event) => {
                    const tournamentId = event.target.getAttribute("data-id");
                    const selectedTournament = tournaments.find(t => t.id == tournamentId);
                    if (selectedTournament) {
                        sessionStorage.setItem("currentTournament", JSON.stringify(selectedTournament));
                        window.location.href = "TournamentDetails.html"; // Redirect to tournament details
                    } else {
                        alert("Tournament not found!");
                    }
                });
            });
        });
        document.addEventListener("DOMContentLoaded", () => {
            const tournamentContainer = document.getElementById("tournament-info-container");
        
            // Retrieve tournament data from localStorage
            const tournaments = JSON.parse(localStorage.getItem("tournamentData")) || [];
        
            // Check if there are no tournaments
            if (tournaments.length === 0) {
                tournamentContainer.innerHTML = "<p>No tournaments available. Create one!</p>";
            } else {
                tournamentContainer.innerHTML = ""; // Clear previous listings
        
                tournaments.forEach((tournament, index) => {
                    // Create div for each tournament
                    const tournamentDiv = document.createElement("div");
                    tournamentDiv.classList.add("tournament-item");
        
                    // Populate the innerHTML with tournament details
                    tournamentDiv.innerHTML = `
                        <p><strong>Sr. No:</strong> ${index + 1}</p>
                        <p><strong>League Name:</strong> ${tournament.name}</p>
                        <button class="continue-btn" data-id="${tournament.id}">Continue Tournament</button>
                    `;
        
                    // Append the tournament item to the container
                    tournamentContainer.appendChild(tournamentDiv);
                });
            }
        
            // Handle "Continue Tournament" button click
            document.querySelectorAll(".continue-btn").forEach(button => {
                button.addEventListener("click", (event) => {
                    const tournamentId = event.target.getAttribute("data-id");
                    const selectedTournament = tournaments.find(t => t.id == tournamentId);
        
                    if (selectedTournament) {
                        // Store the selected tournament in sessionStorage
                        sessionStorage.setItem("currentTournament", JSON.stringify(selectedTournament));
        
                        // Redirect to the TournamentDetails.html page
                        window.location.href = "TournamentDetails.html";
                    } else {
                        alert("Tournament not found!");
                    }
                });
            });
        });
                