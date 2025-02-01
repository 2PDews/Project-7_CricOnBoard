document.addEventListener("DOMContentLoaded", () => {
    const availablePlayersList = document.getElementById("availablePlayersList");
    const selectedPlayersList = document.getElementById("selectedPlayersList");

    let selectedPlayers = JSON.parse(localStorage.getItem("selectedPlayers")) || [];

    function loadAvailablePlayers() {
        const players = JSON.parse(localStorage.getItem("players")) || [];
        availablePlayersList.innerHTML = "";

        players.forEach(player => {
            if (!selectedPlayers.includes(player.name)) {
                const li = document.createElement("li");
                li.innerHTML = `<span class="player-name">${player.name}</span> 
                                <button class="select-button">Select</button>`;
                li.querySelector(".select-button").addEventListener("click", () => selectPlayer(player.name, li));
                availablePlayersList.appendChild(li);
            }
        });
    }

    function selectPlayer(playerName, listItem) {
        selectedPlayers.push(playerName);
        availablePlayersList.removeChild(listItem);
        renderSelectedPlayers();
        localStorage.setItem("selectedPlayers", JSON.stringify(selectedPlayers));
    }

    function removePlayer(playerName) {
        selectedPlayers = selectedPlayers.filter(player => player !== playerName);
        renderSelectedPlayers();
        loadAvailablePlayers();
        localStorage.setItem("selectedPlayers", JSON.stringify(selectedPlayers));
    }

    function renderSelectedPlayers() {
        selectedPlayersList.innerHTML = "";
        selectedPlayers.forEach(player => {
            const li = document.createElement("li");
            li.innerHTML = `<span class="player-name">${player}</span> 
                            <button class="remove-button">Remove</button>`;
            li.querySelector(".remove-button").addEventListener("click", () => removePlayer(player));
            selectedPlayersList.appendChild(li);
        });
    }

    document.querySelector(".next-button").addEventListener("click", () => {
        if (selectedPlayers.length > 0) {
            localStorage.setItem("selectedPlayers", JSON.stringify(selectedPlayers));
            window.location.href = "ShufflePlayers.html";
        } else {
            alert("Please select at least one player before proceeding.");
        }
    });

    window.onload = function () {
        const tournamentName = localStorage.getItem("tournamentName");
        if (tournamentName) {
            document.getElementById("tournamentInput").value = tournamentName;
        }
    };

    loadAvailablePlayers();
    renderSelectedPlayers();
});
