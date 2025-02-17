document.addEventListener("DOMContentLoaded", function () {
    // Get elements
    const tournamentInput = document.getElementById("tournamentInput");
    const goToTournamentButton = document.getElementById("goToTournamentButton");
    const saveButton = document.getElementById("saveTournamentButton");

    let inningsCount = parseInt(sessionStorage.getItem("totalInnings")) || 4;
    const selectedPlayers = JSON.parse(localStorage.getItem("selectedPlayers")) || [];

    // Initialize player totals
    const playerTotals = selectedPlayers.reduce((totals, player) => {
        totals[player.name || player] = { runs: 0, wickets: 0, catches: 0, previousInningData: [] };
        return totals;
    }, {});

    // Load saved tournament name from localStorage
    const tournamentName = localStorage.getItem("tournamentName");
    if (tournamentName) {
        document.getElementById("tournamentTitle").innerText = tournamentName;
    }

    // Generate innings and player sections
    function generateTournamentSections(inningsCount, players) {
        const inningsContainer = document.getElementById("innings-container");
        if (!inningsContainer) return;
        inningsContainer.innerHTML = "";

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
                    <input type="number" placeholder="Catches" class="catches-input" data-player="${player.name || player}">
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

    // Save Inning Data
    function saveInningData(inningNumber) {
        const inningData = [];
        const innings = document.querySelectorAll(".inning");

        if (inningNumber > innings.length) return;
        const inningDiv = innings[inningNumber - 1];

        const playersDiv = inningDiv.querySelectorAll(".player");

        playersDiv.forEach(playerDiv => {
            const playerName = playerDiv.querySelector("div").textContent.trim();
            const runsInput = parseInt(playerDiv.querySelector(".runs-input").value) || 0;
            const wicketsInput = parseInt(playerDiv.querySelector(".wickets-input").value) || 0;
            const catchesInput = parseInt(playerDiv.querySelector(".catches-input").value) || 0;

            if (playerTotals[playerName]) {
                const previousInningData = playerTotals[playerName].previousInningData[inningNumber - 1] || { runs: 0, wickets: 0, catches: 0 };
                playerTotals[playerName].runs -= previousInningData.runs;
                playerTotals[playerName].wickets -= previousInningData.wickets;
                playerTotals[playerName].catches -= previousInningData.catches;
                playerTotals[playerName].runs += runsInput;
                playerTotals[playerName].wickets += wicketsInput;
                playerTotals[playerName].catches += catchesInput;
                playerTotals[playerName].previousInningData[inningNumber - 1] = { runs: runsInput, wickets: wicketsInput, catches: catchesInput };
            }

            inningData.push({ name: playerName, runs: runsInput, wickets: wicketsInput, catches: catchesInput });
        });

        sessionStorage.setItem(`inning${inningNumber}Data`, JSON.stringify(inningData));
        alert(`Inning ${inningNumber} data saved successfully!`);
    }

    // Merged Update Player Totals function
    function updatePlayerTotals() {
        const runsPerWicket = parseInt(localStorage.getItem("runsPerWicket")) || 0; // Get runs per wicket value
        const runsPerCatch = parseInt(localStorage.getItem("runsPerCatch")) || 0;   // Get runs per catch value
        const playerTotalsList = document.getElementById("player-totals");
        if (!playerTotalsList) return;

        playerTotalsList.innerHTML = "";
        const sortedPlayerNames = Object.keys(playerTotals).sort((a, b) => playerTotals[b].runs - playerTotals[a].runs);

        sortedPlayerNames.forEach((playerName, index) => {
            const player = playerTotals[playerName];
            // Correctly calculate TR, including runs, wickets, and catches
            const totalRuns = player.runs + (player.wickets * runsPerWicket) + (player.catches * runsPerCatch); // Catches included
            const totalDiv = document.createElement("li");
            totalDiv.innerHTML = `
                <div class="rank">${index + 1}.</div> 
                <div class="player-name"> ${playerName}</div>
                <div class="run">R: ${player.runs}</div>
                <div class="wicket">W: ${player.wickets}</div>
                <div class="catch">C: ${player.catches}</div>
                <div class="total runs">TR: ${totalRuns}</div>
            `;
            playerTotalsList.appendChild(totalDiv);
        });
    }

    // Save Tournament
    function saveTournament() {
        const tournamentName = document.getElementById("tournamentTitle").innerText;
        if (!tournamentName) {
            alert("Please enter a tournament name before saving.");
            return;
        }

        let allInningData = [];
        for (let i = 1; i <= inningsCount; i++) {
            let data = sessionStorage.getItem(`inning${i}Data`);
            if (data) {
                allInningData.push({ inning: i, data: JSON.parse(data) });
            }
        }

        const tournament = {
            srNo: Date.now(),
            name: tournamentName,
            innings: allInningData,
            players: document.getElementById("players-container").innerHTML,
            totals: document.getElementById("totals-container").innerHTML
        };

        let savedTournaments = JSON.parse(localStorage.getItem("tournaments")) || [];
        let existingTournamentIndex = savedTournaments.findIndex(t => t.name === tournamentName);

        if (existingTournamentIndex !== -1) {
            savedTournaments[existingTournamentIndex] = tournament;
        } else {
            savedTournaments.push(tournament);
        }

        localStorage.setItem("tournaments", JSON.stringify(savedTournaments));
        alert("Tournament saved successfully!");
    }

    // Event Listeners
    if (saveButton) {
        saveButton.addEventListener("click", saveTournament);
    } else {
        console.error("Save Tournament button not found!");
    }

    if (goToTournamentButton) {
        goToTournamentButton.addEventListener("click", () => {
            window.location.href = "tournament.html";
        });
    } else {
        console.error("Go to Tournament button not found!");
    }

    // Initial Page Setup
    generateTournamentSections(inningsCount, selectedPlayers);
    updatePlayerTotals();
});
