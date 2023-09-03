let gameStarted = false;  // Flag to indicate whether the game has started
let gravity = 1;
let velocityY = 0;
let jumping = false;
let velocityX = 0;
let keyState = {};

document.addEventListener("keydown", function(event) {
  keyState[event.key] = true;
  moveCube();
});

document.addEventListener("keyup", function(event) {
  keyState[event.key] = false;
});

document.addEventListener("DOMContentLoaded", function() {
  const playText = document.getElementById("play-text");
  const menuContainer = document.getElementById("menu-container");

  function gameLoop() {
    if (gameStarted) {
      if (!jumping) {
        velocityY += gravity;
        velocityX *= 0.7;

      } else {
        velocityY = -10;
        jumping = false;
        changeCubeImage("animations/Sprite-jump256.gif");

      }

      cubeTop += velocityY;
      cubeLeft += velocityX;

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
        velocityX = 0;
      }

      cube.style.top = cubeTop + "px";
      cube.style.left = cubeLeft + "px";
    }
    requestAnimationFrame(gameLoop);
  }

  playText.addEventListener("click", function() {
    menuContainer.classList.add("hidden");
    gameStarted = true;
    requestAnimationFrame(gameLoop);
  });
});

let cube = document.getElementById("cube");
let cubeImage = cube.querySelector("img");
let style = window.getComputedStyle(cube);
let cubeLeft = parseInt(style.left, 10);
let cubeTop = parseInt(style.top, 10);

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
    if (velocityY === 0) {
      if (keyState['a']) {
        cubeLeft -= 10;
      }
      if (keyState['d']) {
        cubeLeft += 10;
      }
    }
    if (keyState['w'] && velocityY === 0) {
      jumping = true;
      if (keyState['d']) {
        velocityX = 5;
      } else if (keyState['a']) {
        velocityX = -5;
      } else {
        velocityX = 0;
      }
    }
    cube.style.left = cubeLeft + "px";
  }
}
