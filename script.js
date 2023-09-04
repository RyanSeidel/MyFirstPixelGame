const startGameButton = document.getElementById("startGame");
startGameButton.addEventListener("click", function() {
    // Initialize the game
    document.querySelector(".game-map1").style.display = "block"; // Assuming the gameContainer is initially hidden
});

platformElement.addEventListener('click', () => {
    console.log('Platform clicked!');
});