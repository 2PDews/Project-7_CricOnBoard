// Updates the character count dynamically
function updateCharCount() {
  const nameInput = document.getElementById("name");
  const charCount = document.getElementById("charCount");
  charCount.textContent = `${nameInput.value.length}/40`;
}

// Saves the tournament details to localStorage and navigates to the next page
function saveTournamentDetails() {
  const tournamentName = document.getElementById("name").value.trim();
  const format = document.getElementById("format").value;

  if (tournamentName === "") {
      alert("Tournament name is required!");
      return; // Prevent navigation
  }

  // Store tournament details
  localStorage.setItem("tournamentName", tournamentName);
  localStorage.setItem("tournamentFormat", format);

  // Redirect to the format selection page
  window.location.href = "SelectFormat.html";
}

// Load tournament name from localStorage on page load
window.onload = function () {
  const storedTournamentName = localStorage.getItem("tournamentName");
  if (storedTournamentName) {
      document.getElementById("name").value = storedTournamentName;
      updateCharCount(); // Update character count on page load
  }
};
document.addEventListener("DOMContentLoaded", () => {
  const formatSelect = document.getElementById("format");

  // Save selected format in sessionStorage
  formatSelect.addEventListener("change", () => {
      sessionStorage.setItem("selectedFormat", formatSelect.value);
  });
});
