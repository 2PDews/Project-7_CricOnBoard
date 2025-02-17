document.addEventListener("DOMContentLoaded", function () {
    let savedTournaments = JSON.parse(localStorage.getItem("tournaments")) || [];

    // Display in different formats
    displayTournamentsTable(savedTournaments);
    displayTournamentsList(savedTournaments);
    displayTournamentsContainer(savedTournaments);
});

// 🎯 Function to display tournaments in a table format
function displayTournamentsTable(tournaments) {
    let tournamentsTableBody = document.querySelector("#tournamentsTable tbody");
    if (!tournamentsTableBody) return;
    
    // Clear table content
    tournamentsTableBody.innerHTML = "";

    if (tournaments.length === 0) {
        tournamentsTableBody.innerHTML = "<tr><td colspan='3'>No saved tournaments found.</td></tr>";
    } else {
        tournaments.forEach((tournament, index) => {
            let row = document.createElement("tr");

            row.innerHTML = `
                <td>${index + 1}</td>
                <td><a href="StartTournament.html?tournament=${encodeURIComponent(tournament.name)}">${tournament.name}</a></td>
                <td><button onclick="viewTournamentDetails(${index})">View</button></td>
            `;

            tournamentsTableBody.appendChild(row);
        });
    }
}

// 🎯 Function to display tournaments as a simple list
function displayTournamentsList(tournaments) {
    let tournamentList = document.getElementById("tournament-list");
    if (!tournamentList) return;
    
    if (tournaments.length === 0) {
        tournamentList.innerHTML = "<p>No saved tournaments found.</p>";
    } else {
        tournamentList.innerHTML = "";
        tournaments.forEach(tournament => {
            let tournamentDiv = document.createElement("div");
            tournamentDiv.innerHTML = `<a href="StartTournament.html?tournament=${encodeURIComponent(tournament.name)}">${tournament.name}</a>`;
            tournamentList.appendChild(tournamentDiv);
        });
    }
}

// 🎯 Function to display tournaments in a detailed format
function displayTournamentsContainer(tournaments) {
    let container = document.getElementById("tournamentContainer");
    if (!container) return;
    
    container.innerHTML = "";

    if (tournaments.length === 0) {
        container.innerHTML = "<p>No tournaments saved yet.</p>";
        return;
    }

    tournaments.forEach((tournament, index) => {
        const tournamentElement = document.createElement("div");
        tournamentElement.classList.add("tournament-item");
        tournamentElement.innerHTML = `
            <h3>${tournament.name}</h3>
            <p>Sr. No.: ${index + 1}</p>
            <p>Scorecard: ${tournament.scorecard}</p>
        `;
        container.appendChild(tournamentElement);
    });
}

// 🎯 Function to view a tournament's details
function viewTournamentDetails(index) {
    let savedTournaments = JSON.parse(localStorage.getItem("tournaments")) || [];
    let tournament = savedTournaments[index];

    if (tournament) {
        localStorage.setItem("currentTournament", JSON.stringify(tournament));
        window.location.href = "StartTournament.html";
    }
}
