document.addEventListener("DOMContentLoaded", function () {
    let tournamentList = document.getElementById("tournament-list");
    let savedTournaments = JSON.parse(localStorage.getItem("tournaments")) || [];

    if (savedTournaments.length === 0) {
        tournamentList.innerHTML = "<p>No saved tournaments found.</p>";
    } else {
        savedTournaments.forEach(tournament => {
            let tournamentDiv = document.createElement("div");
            tournamentDiv.innerHTML = `<a href="StartTournament.html?tournament=${encodeURIComponent(tournament.name)}">${tournament.name}</a>`;
            tournamentList.appendChild(tournamentDiv);
        });
    }
});
document.addEventListener("DOMContentLoaded", () => {
    const tournamentData = JSON.parse(localStorage.getItem("tournamentData")) || [];

    const savedTournamentsList = document.getElementById("saved-tournaments-list");

    if (tournamentData.length === 0) {
        savedTournamentsList.innerHTML = "<p>No tournaments saved yet.</p>";
        return;
    }

    tournamentData.forEach(tournament => {
        const tournamentDiv = document.createElement("div");
        tournamentDiv.classList.add("tournament-item");
        tournamentDiv.innerHTML = `
            <h3>${tournament.name}</h3>
            <p>ID: ${tournament.id}</p>
        `;
        savedTournamentsList.appendChild(tournamentDiv);
    });
});



// Function to display saved tournaments
function displayTournaments() {
    // Retrieve tournaments from Local Storage
    const tournaments = JSON.parse(localStorage.getItem('tournaments')) || [];

    // Reference to the container element
    const container = document.getElementById('tournamentContainer');

    // Clear existing content
    container.innerHTML = '';

    // Iterate and display each tournament
    tournaments.forEach((tournament, index) => {
        const tournamentElement = document.createElement('div');
        tournamentElement.innerHTML = `
            <p>Sr. No.: ${index + 1}</p>
            <p>Name: ${tournament.name}</p>
            <p>Scorecard: ${tournament.scorecard}</p>
        `;
        container.appendChild(tournamentElement);
    });
}

// Call the function on page load
window.onload = displayTournaments;
