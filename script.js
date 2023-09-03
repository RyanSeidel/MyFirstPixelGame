document.addEventListener("DOMContentLoaded", function() {
  const playText = document.getElementById("play-text");
  const menuContainer = document.getElementById("menu-container");

  let gameStarted = false;  // Flag to indicate whether the game has started

  playText.addEventListener("click", function() {
    menuContainer.classList.add("hidden");
    gameStarted = true;  // Set the flag to true when "Play" is clicked
  });

  document.addEventListener("keydown", function(event) {
    if (gameStarted) {  // Only move the cube if the game has started
      moveCube(event);
    }
  });
});

let cube = document.getElementById("cube");
let style = window.getComputedStyle(cube);
let cubeLeft = parseInt(style.left, 10);
let cubeTop = parseInt(style.top, 10);

function moveCube(event) {
  switch (event.key) {
    case 'a': // Move left
      cubeLeft -= 10;
      break;
    case 'w': // Move up
      cubeTop -= 10;
      break;
    case 'd': // Move right
      cubeLeft += 10;
      break;
    case 's': // Move down
      cubeTop += 10;
      break;
  }
  cube.style.left = cubeLeft + "px";
  cube.style.top = cubeTop + "px";
}
