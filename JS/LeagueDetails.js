document.addEventListener("DOMContentLoaded", () => {
    const inningsDisplay = document.getElementById("innings");
    const minusButton = document.querySelector(".minus-btn[data-target='innings']");
    const plusButton = document.querySelector(".plus-btn[data-target='innings']");

    // Check if the necessary elements are present
    if (!inningsDisplay || !minusButton || !plusButton) {
        console.error("Required elements are missing.");
        return; // Exit if elements are not found
    }

    // Retrieve current innings value from sessionStorage if it exists
    let innings = parseInt(sessionStorage.getItem("totalInnings") || "4"); // Default is 4

    // Update the display
    inningsDisplay.textContent = innings;

    // Decrement innings
    minusButton.addEventListener("click", () => {
        if (innings > 1) {
            innings--;
            inningsDisplay.textContent = innings;
            sessionStorage.setItem("totalInnings", innings); // Store updated innings value in sessionStorage
        }
    });

    // Increment innings
    plusButton.addEventListener("click", () => {
        innings++;
        inningsDisplay.textContent = innings;
        sessionStorage.setItem("totalInnings", innings); // Store updated innings value in sessionStorage
    });
});
window.onload = function() {
    const tournamentName = localStorage.getItem('tournamentName');
    if (tournamentName) {
      document.getElementById('tournamentInput').value = tournamentName; // Display tournament name in input
    } else {
      console.log("Tournament name not found in localStorage.");
    }
  }
