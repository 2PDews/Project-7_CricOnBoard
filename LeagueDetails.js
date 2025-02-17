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


  document.addEventListener("DOMContentLoaded", () => {
    // Attach event listeners to increment and decrement buttons
    document.querySelectorAll(".minus-btn, .plus-btn").forEach((button) => {
        button.addEventListener("click", function () {
            let targetId = this.getAttribute("data-target");
            let targetElement = document.getElementById(targetId);
            let currentValue = parseInt(targetElement.textContent);

            // Update the value based on button type
            if (this.classList.contains("plus-btn")) {
                currentValue++;
            } else if (this.classList.contains("minus-btn") && currentValue > 0) {
                currentValue--;
            }

            targetElement.textContent = currentValue;
        });
    });

    // Function to navigate back
    window.goBack = function () {
        window.history.back();
    };
});








document.addEventListener("DOMContentLoaded", () => {
    // Handling innings adjustments
    const inningsDisplay = document.getElementById("innings");
    const minusButton = document.querySelector(".minus-btn[data-target='innings']");
    const plusButton = document.querySelector(".plus-btn[data-target='innings']");

    if (inningsDisplay && minusButton && plusButton) {
        let innings = parseInt(sessionStorage.getItem("totalInnings") || "4");
        inningsDisplay.textContent = innings;

        minusButton.addEventListener("click", () => {
            if (innings > 1) {
                innings--;
                inningsDisplay.textContent = innings;
                sessionStorage.setItem("totalInnings", innings);
            }
        });

        plusButton.addEventListener("click", () => {
            innings++;
            inningsDisplay.textContent = innings;
            sessionStorage.setItem("totalInnings", innings);
        });
    }

    // Handling Runs Per Wicket adjustments
    const runsPerWicketDisplay = document.getElementById("winPoints");
    const minusRunsBtn = document.querySelector(".minus-btn[data-target='winPoints']");
    const plusRunsBtn = document.querySelector(".plus-btn[data-target='winPoints']");

    if (runsPerWicketDisplay && minusRunsBtn && plusRunsBtn) {
        let runsPerWicket = parseInt(localStorage.getItem("runsPerWicket") || "0");
        runsPerWicketDisplay.textContent = runsPerWicket;

        minusRunsBtn.addEventListener("click", () => {
            if (runsPerWicket > 0) {
                runsPerWicket--;
                runsPerWicketDisplay.textContent = runsPerWicket;
                localStorage.setItem("runsPerWicket", runsPerWicket);
            }
        });

        plusRunsBtn.addEventListener("click", () => {
            runsPerWicket++;
            runsPerWicketDisplay.textContent = runsPerWicket;
            localStorage.setItem("runsPerWicket", runsPerWicket);
        });
    }
    const runsPerCatchDisplay = document.getElementById("catchPoints");
    const minusCatchBtn = document.querySelector(".minus-btn[data-target='catchPoints']");
    const plusCatchBtn = document.querySelector(".plus-btn[data-target='catchPoints']");

    if (runsPerCatchDisplay && minusCatchBtn && plusCatchBtn) {
        let runsPerCatch = parseInt(localStorage.getItem("runsPerCatch") || "0");
        runsPerCatchDisplay.textContent = runsPerCatch;

        minusCatchBtn.addEventListener("click", () => {
            if (runsPerCatch > 0) {
                runsPerCatch--;
                runsPerCatchDisplay.textContent = runsPerCatch;
                localStorage.setItem("runsPerCatch", runsPerCatch);
            }
        });

        plusCatchBtn.addEventListener("click", () => {
            runsPerCatch++;
            runsPerCatchDisplay.textContent = runsPerCatch;
            localStorage.setItem("runsPerCatch", runsPerCatch);
        });
    }
    // Load Tournament Name
    window.onload = function () {
        const tournamentName = localStorage.getItem("tournamentName");
        if (tournamentName) {
            document.getElementById("tournamentInput").value = tournamentName;
        }
    };

    // Function to navigate back
    window.goBack = function () {
        window.history.back();
    };
});

