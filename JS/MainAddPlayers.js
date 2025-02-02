document.addEventListener("DOMContentLoaded", () => {
    const playerNameInput = document.getElementById("playerNameInput");
    const addPlayerButton = document.getElementById("addPlayerButton");
    const playerList = document.getElementById("playerList");

    const deletePopup = document.getElementById("deletePopup");
    const deleteMessage = document.getElementById("deleteMessage");
    const confirmationCodeInput = document.getElementById("confirmationCodeInput");
    const confirmDeleteButton = document.getElementById("confirmDeleteButton");
    const cancelDeleteButton = document.getElementById("cancelDeleteButton");

    let playerToDelete = null; // Track the player to delete
    let confirmationCode = ""; // Store the confirmation code

    // Load players from local storage
    function loadPlayers() {
        const storedPlayers = JSON.parse(localStorage.getItem("players")) || [];
        storedPlayers.forEach(player => {
            addPlayerToList(player.name || player);
        });
    }

    // Save players to local storage
    function savePlayers() {
        const players = Array.from(playerList.children).map(listItem => (listItem.querySelector("span").textContent));
        localStorage.setItem("players", JSON.stringify(players));
    }

    // Function to generate a 4-digit code
    function generateUniqueCode() {
        return Math.floor(1000 + Math.random() * 9000).toString();
    }

    // Add player to the list
    function addPlayerToList(playerName) {
        const listItem = document.createElement("li");

        // Player name and action buttons
        listItem.innerHTML = `
            <span>${playerName}</span>
            <div>
                <button class="edit-button">Edit</button>
                <button class="delete-button">Delete</button>
            </div>
        `;

        // Add Edit and Delete button functionality
        listItem.querySelector(".edit-button").addEventListener("click", () => {
            const newPlayerName = prompt("Edit Player Name:", playerName);
            if (newPlayerName) {
                listItem.querySelector("span").textContent = newPlayerName.trim();
                savePlayers(); // Save changes
            }
        });

        listItem.querySelector(".delete-button").addEventListener("click", () => {
            showDeletePopup(listItem);
        });

        playerList.appendChild(listItem);
    }

    // Show delete confirmation popup
    function showDeletePopup(listItem) {
        playerToDelete = listItem;
        confirmationCode = generateUniqueCode();
        deleteMessage.textContent = `Enter the code "${confirmationCode}" to confirm deletion.`;
        deletePopup.style.display = "block";
    }

    // Restrict confirmation code input to numerical values only
    confirmationCodeInput.addEventListener("input", () => {
        confirmationCodeInput.value = confirmationCodeInput.value.replace(/\D/g, ""); // Remove non-digit characters
    });

    // Confirm deletion
    confirmDeleteButton.addEventListener("click", () => {
        const enteredCode = confirmationCodeInput.value.trim();
        if (enteredCode === confirmationCode) {
            playerList.removeChild(playerToDelete);
            playerToDelete = null;
            confirmationCode = "";
            deletePopup.style.display = "none";
            confirmationCodeInput.value = "";
            savePlayers(); // Save changes
        } else {
            alert("Incorrect confirmation code. Try again.");
        }
    });

    // Cancel deletion
    cancelDeleteButton.addEventListener("click", () => {
        playerToDelete = null;
        confirmationCode = "";
        deletePopup.style.display = "none";
        confirmationCodeInput.value = "";
    });

    // Add new player
    addPlayerButton.addEventListener("click", () => {
        const playerName = playerNameInput.value.trim();
        if (playerName) {
            const players = JSON.parse(localStorage.getItem('players')) || [];
            players.push(playerName);
            localStorage.setItem('players', JSON.stringify(players));

            addPlayerToList(playerName); // Add player to the list UI
            playerNameInput.value = "";  // Clear the input field
        } else {
            alert("Please enter a player name!");
        }
    });

    // Load existing players on page load
    loadPlayers();
});
