document.addEventListener("DOMContentLoaded", () => {
    const tournamentInput = document.getElementById("tournamentInput");
    const goToTournamentButton = document.getElementById("goToTournamentButton");
    const saveButton = document.getElementById("saveTournamentBtn");

    let inningsCount = parseInt(sessionStorage.getItem("totalInnings")) || 4; // Default to 4 innings
    const selectedPlayers = JSON.parse(localStorage.getItem("selectedPlayers")) || [];

    const playerTotals = selectedPlayers.reduce((totals, player) => {
        totals[player.name || player] = { runs: 0, wickets: 0, previousInningData: [] };
        return totals;
    }, {});

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
        const innings = document.querySelectorAll(".inning");

        if (inningNumber > innings.length) return;
        const inningDiv = innings[inningNumber - 1]; // Correct selection

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

        sessionStorage.setItem(`inning${inningNumber}Data`, JSON.stringify(inningData));
        alert(`Inning ${inningNumber} data saved successfully!`);
    }

    function updatePlayerTotals() {
        const runsPerWicket = parseInt(localStorage.getItem("runsPerWicket")) || 0;
        const playerTotalsList = document.getElementById("player-totals");
        if (!playerTotalsList) return;

        playerTotalsList.innerHTML = "";

        const sortedPlayerNames = Object.keys(playerTotals).sort((a, b) => playerTotals[b].runs - playerTotals[a].runs);

        sortedPlayerNames.forEach(playerName => {
            const player = playerTotals[playerName];

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

    function saveTournament() {
        const tournamentNameInput = document.getElementById("tournamentInput");
        const tournamentName = tournamentNameInput ? tournamentNameInput.value.trim() : "Unnamed Tournament";

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
            srNo: Date.now(), // Unique ID
            name: tournamentName,
            scorecard: allInningData.length ? JSON.stringify(allInningData) : "No Scorecard Data"
        };

        let tournaments = JSON.parse(localStorage.getItem("tournaments")) || [];
        tournaments.push(tournament);
        localStorage.setItem("tournaments", JSON.stringify(tournaments));

        alert("Tournament saved successfully!");
    }

    if (saveButton) {
        saveButton.addEventListener("click", saveTournament);
    } else {
        console.error("Save Tournament button not found!");
    }

    generateTournamentSections(inningsCount, selectedPlayers);
    updatePlayerTotals();
    handleInputChanges();

    // Simulated stored data for testing
    sessionStorage.setItem("inning1Data", JSON.stringify([{ name: "Player 1", runs: 50, wickets: 2 }]));
});
if (goToTournamentButton) {
    goToTournamentButton.addEventListener("click", () => {
        // Redirect to the tournament page
        window.location.href = "tournament.html";  // Change this to your actual tournament page URL
    });
} else {
    console.error("Go to Tournament button not found!");
}