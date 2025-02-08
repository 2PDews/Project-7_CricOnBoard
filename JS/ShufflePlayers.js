document.addEventListener("DOMContentLoaded", () => {
    const selectedPlayersList = document.getElementById("selectedPlayersList");
    const shuffleButton = document.getElementById("shuffleButton");
    const startTournamentButton = document.getElementById("startTournamentButton");

    let selectedPlayers = JSON.parse(localStorage.getItem("selectedPlayers")) || [];

    // Function to render selected players
    function renderSelectedPlayers() {
        selectedPlayersList.innerHTML = "";

        if (selectedPlayers.length === 0) {
            selectedPlayersList.innerHTML = "<li>No players selected.</li>";
            return;
        }

        selectedPlayers.forEach((player, index) => {
            const li = document.createElement("li");
            li.innerHTML = `<span class="player-name">${index + 1}. ${player}</span>`;
            selectedPlayersList.appendChild(li);
        });
    }

    // Function to shuffle an array (Fisher-Yates shuffle)
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    // Shuffle button event listener
    if (shuffleButton) {
        shuffleButton.addEventListener("click", () => {
            if (selectedPlayers.length > 1) {
                shuffleArray(selectedPlayers);
                localStorage.setItem("selectedPlayers", JSON.stringify(selectedPlayers));
                renderSelectedPlayers();
            } else {
                alert("At least two players are needed to shuffle.");
            }
        });
    }

    // Start Tournament button event listener
    if (startTournamentButton) {
        startTournamentButton.addEventListener("click", () => {
            if (selectedPlayers.length === 0) {
                alert("No players selected. Please add players before starting the tournament.");
                return;
            }

            shuffleArray(selectedPlayers);
            localStorage.setItem("selectedPlayers", JSON.stringify(selectedPlayers));
            window.location.href = "StartTournament.html"; // Replace with actual tournament start page URL
        });
    }

    // Initial rendering of selected players
    renderSelectedPlayers();
});




window.onload = function() {
    const tournamentName = localStorage.getItem('tournamentName');
    if (tournamentName) {
      document.getElementById('tournamentTitle').innerText = tournamentName;  // Set the tournament name in the title
    }
  }