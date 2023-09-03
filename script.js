let gameStarted = false;  // Flag to indicate whether the game has started

// Variable initialization for gravity and jumping
let gravity = 1;
let velocityY = 0;
let jumping = false;

document.addEventListener("DOMContentLoaded", function() {
  const playText = document.getElementById("play-text");
  const menuContainer = document.getElementById("menu-container");

  // Game loop for gravity and other constant updates
  function gameLoop() {
    if (gameStarted) {
      // Apply gravity if not jumping
      if (!jumping) {
        velocityY += gravity;
      } else {
        velocityY = -10;  // Upward velocity for jump
        jumping = false;  // Reset jumping state
      }

      cubeTop += velocityY;  // Apply vertical velocity

      // Ground collision
      if (cubeTop + 50 >= 560) {
        cubeTop = 560 - 50;
        velocityY = 0;
      }

      cube.style.top = cubeTop + "px";
    }
    requestAnimationFrame(gameLoop);
  }
  
  playText.addEventListener("click", function() {
    menuContainer.classList.add("hidden");
    gameStarted = true;  // Set the flag to true when "Play" is clicked
    requestAnimationFrame(gameLoop); // Start the game loop
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
  const containerWidth = 960;
  const containerHeight = 560;
  const cubeSize = 50;

  switch (event.key) {
    case 'a':
      if (cubeLeft - 10 >= 0) {
        cubeLeft -= 10;
      }
      break;
    case 'w':
      if (velocityY === 0) {  // Can jump only if not already in air
        jumping = true;
      }
      break;
    case 'd':
      if (cubeLeft + cubeSize + 10 <= containerWidth) {
        cubeLeft += 10;
      }
      break;
    case 's':
      // Do nothing as gravity will pull the cube down
      break;
  }

  cube.style.left = cubeLeft + "px";
}
