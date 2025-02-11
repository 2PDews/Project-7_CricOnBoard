document.addEventListener("DOMContentLoaded", () => {
    const teamNameInput = document.getElementById("teamNameInput");
    const addTeamBtn = document.getElementById("addTeamBtn");
    const teamsContainer = document.getElementById("teamsContainer");
    const saveTeamsBtn = document.getElementById("saveTeamsBtn");

    const playerModal = document.getElementById("playerModal");
    const closeModal = document.querySelector(".close");
    const selectedTeamName = document.getElementById("selectedTeamName");
    const playersList = document.getElementById("playersList");
    const confirmPlayersBtn = document.getElementById("confirmPlayersBtn");

    let selectedTeam = null;
    let players = JSON.parse(localStorage.getItem("players")) || [];

    // Add Team
    addTeamBtn.addEventListener("click", () => {
        const teamName = teamNameInput.value.trim();
        if (teamName) {
            const li = document.createElement("li");
            li.innerHTML = `
                <span class="team-name">${teamName}</span>
                <div class="team-players"></div>
                <div class="buttons">
                    <button class="add-players-btn" onclick="openPlayerModal(this)">Add Players</button>
                    <button class="delete-btn" onclick="deleteTeam(this)">Remove</button>
                </div>
            `;
            teamsContainer.appendChild(li);
            teamNameInput.value = "";
        }
    });

    // Delete Team
    window.deleteTeam = (btn) => {
        btn.closest("li").remove();
    };

    // Open Player Modal
    window.openPlayerModal = (btn) => {
        playerModal.style.display = "block";
        selectedTeam = btn.closest("li");
        selectedTeamName.textContent = selectedTeam.querySelector(".team-name").textContent;
        loadPlayersList();
    };

    // Load players from MainAddPlayers.html
    function loadPlayersList() {
        playersList.innerHTML = "";
        players.forEach((player) => {
            const li = document.createElement("li");
            li.innerHTML = `<input type="checkbox" value="${player}"> ${player}`;
            playersList.appendChild(li);
        });
    }

    // Confirm Player Selection
    confirmPlayersBtn.addEventListener("click", () => {
        const selectedPlayers = [];
        document.querySelectorAll("#playersList input:checked").forEach((checkbox) => {
            selectedPlayers.push(checkbox.value);
        });

        const teamPlayersDiv = selectedTeam.querySelector(".team-players");
        teamPlayersDiv.innerHTML = `<strong>Players:</strong> ${selectedPlayers.join(", ")}`;

        playerModal.style.display = "none";
    });

    // Close Modal
    closeModal.addEventListener("click", () => {
        playerModal.style.display = "none";
    });
});
