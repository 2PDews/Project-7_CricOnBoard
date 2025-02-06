document.addEventListener("DOMContentLoaded", () => {
    const tournamentInput = document.getElementById("tournamentInput");
    const saveTournamentButton = document.getElementById("saveTournamentButton");
    const goToTournamentButton = document.getElementById("goToTournamentButton");

    // Retrieve tournament name from sessionStorage
    const storedTournamentName = sessionStorage.getItem("currentTournamentName");
    if (storedTournamentName) {
        tournamentInput.value = storedTournamentName;
    }

    // Save the tournament when the Save button is clicked
    saveTournamentButton.addEventListener("click", () => {
        saveTournament();
        window.location.href = "Tournament.html"; // Redirect to the Tournament list page
    });

    // Save the tournament when "Go To Tournament" button is clicked
    goToTournamentButton.addEventListener("click", () => {
        saveTournament();
    });

    function saveTournament() {
        const tournamentName = tournamentInput.value.trim();
        if (!tournamentName) {
            alert("Tournament name is required!");
            return;
        }
    
        // Retrieve existing tournaments from localStorage
        let tournamentData = JSON.parse(localStorage.getItem("tournamentData")) || [];
    
        // Create new tournament object
        const newTournament = {
            id: Date.now(),
            name: tournamentName
        };
    
        // Add the new tournament to the array
        tournamentData.push(newTournament);
    
        // Save updated tournament data back to localStorage
        localStorage.setItem("tournamentData", JSON.stringify(tournamentData));
    
        alert("Tournament saved successfully!");
    }
    

    // ✅ Show tournaments in Tournament.html ✅
    const tournamentContainer = document.getElementById("tournament-info-container");
    if (tournamentContainer) {
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
    }
    // Function to handle the "Continue" button click
function continueTournament(index) {
    const tournaments = JSON.parse(localStorage.getItem('tournamentData')) || [];
    const selectedTournament = tournaments[index];

    if (selectedTournament) {
        // Save the selected tournament in sessionStorage
        sessionStorage.setItem('currentTournament', JSON.stringify(selectedTournament));

        // Redirect to the tournament details page
        window.location.href = 'TournamentDetails.html';
    } else {
        alert("Tournament not found!");
    }
}


    // ** Tournament Inning & Player Details Logic ** //
    let inningsCount = parseInt(sessionStorage.getItem("totalInnings")) || 4; // Default to 4 innings
    const selectedPlayers = JSON.parse(localStorage.getItem("selectedPlayers")) || [];

    const playerTotals = selectedPlayers.reduce((totals, player) => {
        totals[player.name || player] = { runs: 0, wickets: 0, previousInningData: [] };
        return totals;
    }, {});

    function generateTournamentSections(inningsCount, players) {
        const inningsContainer = document.getElementById("innings-container");
        if (!inningsContainer) return; // Prevent errors if not on the right page

        inningsContainer.innerHTML = ""; // Clear previous content

        for (let i = 1; i <= inningsCount; i++) {
            const inningDiv = document.createElement("div");
            inningDiv.classList.add("inning");
            inningDiv.innerHTML = `<h2>Innings ${i}</h2>`;

            players.forEach(player => {
                const playerDiv = document.createElement("div");
                playerDiv.classList.add("player");

                const playerInfo = document.createElement("div");
                playerInfo.innerHTML = `<i class="fas fa-user"></i> ${player.name || player}`;
                playerDiv.appendChild(playerInfo);

                const playerStats = document.createElement("div");
                playerStats.classList.add("player-stats");
                playerStats.innerHTML = `
                    <input type="number" placeholder="Runs" class="runs-input" data-player="${player.name || player}">
                    <input type="number" placeholder="Wickets" class="wickets-input" data-player="${player.name || player}">
                `;
                playerDiv.appendChild(playerStats);
                inningDiv.appendChild(playerDiv);
            });

            const submitButton = document.createElement("button");
            submitButton.textContent = `Submit Innings ${i}`;
            submitButton.classList.add("submit-btn");
            submitButton.addEventListener("click", () => {
                saveInningData(i);
                updatePlayerTotals();
            });

            inningDiv.appendChild(submitButton);
            inningsContainer.appendChild(inningDiv);
        }
    }

    function saveInningData(inningNumber) {
        const inningData = [];
        const inningDiv = document.querySelector(`.inning:nth-child(${inningNumber})`);
        if (!inningDiv) return;
    
        const playersDiv = inningDiv.querySelectorAll(".player");
    
        playersDiv.forEach(playerDiv => {
            const playerName = playerDiv.querySelector("div").textContent.trim();
            const runsInput = parseInt(playerDiv.querySelector(".runs-input").value) || 0;
            const wicketsInput = parseInt(playerDiv.querySelector(".wickets-input").value) || 0;
    
            if (playerTotals[playerName]) {
                const previousInningData = playerTotals[playerName].previousInningData[inningNumber - 1] || { runs: 0, wickets: 0 };
    
                playerTotals[playerName].runs -= previousInningData.runs;
                playerTotals[playerName].wickets -= previousInningData.wickets;
    
                playerTotals[playerName].runs += runsInput;
                playerTotals[playerName].wickets += wicketsInput;
    
                playerTotals[playerName].previousInningData[inningNumber - 1] = { runs: runsInput, wickets: wicketsInput };
            }
    
            inningData.push({ name: playerName, runs: runsInput, wickets: wicketsInput });
        });
    
        // Store the inning data in sessionStorage
        sessionStorage.setItem(`inning${inningNumber}Data`, JSON.stringify(inningData));
    
        alert(`Inning ${inningNumber} data saved successfully!`);
    }
    
    function updatePlayerTotals() {
        const runsPerWicket = parseInt(localStorage.getItem("runsPerWicket")) || 0; // Get the runs per wicket value from localStorage
        const playerTotalsList = document.getElementById("player-totals");
        if (!playerTotalsList) return;
    
        playerTotalsList.innerHTML = ""; // Clear existing totals
    
        const sortedPlayerNames = Object.keys(playerTotals).sort((a, b) => playerTotals[b].runs - playerTotals[a].runs);
    
        sortedPlayerNames.forEach(playerName => {
            const player = playerTotals[playerName];
    
            // Add runs per wicket to the total runs
            const totalRuns = player.runs + (player.wickets * runsPerWicket);
    
            const totalDiv = document.createElement("li");
            totalDiv.innerHTML = `
                <div class="player-name">${playerName}</div>
                <div class="run">R: ${player.runs}</div>
                <div class="wicket">W: ${player.wickets}</div>
                <div class="total runs">TR: ${totalRuns}</div>
            `;
    
            playerTotalsList.appendChild(totalDiv);
        });
    }
    
    function handleInputChanges() {
        document.querySelectorAll(".runs-input, .wickets-input").forEach(input => {
            input.addEventListener("input", updatePlayerTotals);
        });
    }

    generateTournamentSections(inningsCount, selectedPlayers);
    updatePlayerTotals();
    handleInputChanges();
});

window.onload = function() {
    const tournamentName = localStorage.getItem("tournamentName");
    if (tournamentName) {
        const inputField = document.getElementById("tournamentInput");
        if (inputField) inputField.value = tournamentName;
    }

    const goToTournamentButton = document.getElementById("goToTournamentButton");
    if (goToTournamentButton) {
        goToTournamentButton.onclick = function() {
            window.location.href = "Tournament.html";
        };
    }
};



