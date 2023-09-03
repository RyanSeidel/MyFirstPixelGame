let gameStarted = false;  // Flag to indicate whether the game has started
let gravity = .75;
let velocityY = 0;
let jumping = false;
let velocityX = 0;
let keyState = {};

document.addEventListener("keydown", function(event) {
  keyState[event.key] = true;
  moveCube();
});

document.addEventListener("keyup", function(event) {
  if (event.key === 'a' || event.key === 'd') {
    setTimeout(function() {
      velocityX = 0;
    }, 500);  // Reset velocityX to 0 after 500 milliseconds
  }
  keyState[event.key] = false;
});

document.addEventListener("DOMContentLoaded", function() {
  const playText = document.getElementById("play-text");
  const menuContainer = document.getElementById("menu-container");

function gameLoop() {
  if (gameStarted) {
    // Apply gravity
    velocityY += gravity;
  
    cubeTop += velocityY;
    cubeLeft += velocityX;
  
    // Boundary checks
    if (cubeLeft < 0) {
      cubeLeft = 0;
      velocityX = 0;
    } else if (cubeLeft + 50 > 960) {
      cubeLeft = 960 - 50;
      velocityX = 0;
    }
  
    const cubeHeight = parseInt(window.getComputedStyle(cubeImage).height, 10);
  
    if (cubeTop + cubeHeight >= 560) {
      cubeTop = 560 - cubeHeight;
      velocityY = 0;
    }
  
    cube.style.top = cubeTop + "px";
    cube.style.left = cubeLeft + "px";
  }
  requestAnimationFrame(gameLoop);
}
  
  
  

  playText.addEventListener("click", function() {
    menuContainer.classList.add("hidden");
    gameStarted = true;
    jumping = true;  // Set jumping to true when the game starts
    changeCubeImage("animations/Sprite-jump256.gif");  // Set the initial image to the jumping animation
    requestAnimationFrame(gameLoop);
  });
  
});

let cube = document.getElementById("cube");
let cubeImage = cube.querySelector("img");
let style = window.getComputedStyle(cube);
let cubeLeft = parseInt(style.left, 10);
let cubeTop = parseInt(style.top, 10);


// editting animation bc it smaller than mn
function changeCubeImage(newSrc) {
  cubeImage.src = newSrc;

  if (newSrc === "animations/Sprite-jump256.gif") {
    cubeImage.style.width = '64px';
    cubeImage.style.height = '64px';
  } else {
    cubeImage.style.width = '';
    cubeImage.style.height = '';
  }

  cube.offsetHeight;

  const newCubeHeight = parseInt(window.getComputedStyle(cubeImage).height, 10);
  cubeTop = 560 - newCubeHeight;
}


function moveCube() {
  if (gameStarted) {
    // Handle horizontal movement without checking if on the ground
    if (keyState['a']) {
      cubeLeft -= 5;
      velocityX = -.5;
    } else if (keyState['d']) {
      cubeLeft += 5;
      velocityX = .5;
    } else {
      velocityX = 0;
    }

    // Handle jump
    if (keyState['w']) {
      // Only jump if the cube is on the ground
      if (cubeTop + parseInt(window.getComputedStyle(cubeImage).height, 10) >= 560) {
        velocityY = -10;  // Upward velocity for jump
      }
    }

    cube.style.left = cubeLeft + "px";
  }
}



